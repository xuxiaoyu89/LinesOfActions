'use strict';

angular.module('myApp', ['ngTouch', 'ngDragDrop'])
  .controller('Ctrl', function (
      $scope, $log, $timeout,
      gameService, scaleBodyService, gameLogic) {
    
	var moveAudio = new Audio('move.wav');  
	moveAudio.load();
	
	function sendComputerMove() {
		
		$scope.style = [[{},{},{},{},{},{},{},{}],
		                [{},{},{},{},{},{},{},{}],
		                [{},{},{},{},{},{},{},{}],
		                [{},{},{},{},{},{},{},{}],
		                [{},{},{},{},{},{},{},{}],
						[{},{},{},{},{},{},{},{}],
						[{},{},{},{},{},{},{},{}],
			 			[{},{},{},{},{},{},{},{}]];
		//add animate;
		var move = gameLogic.createComputerMove($scope.board, $scope.turnIndex);
		var brow = move[2].set.value.brow;
		var bcol = move[2].set.value.bcol;
		var arow = move[2].set.value.arow;
		var acol = move[2].set.value.acol;
		$scope.style[brow][bcol] = getStyle(brow, bcol, arow, acol);
		$timeout(function(){
			gameService.makeMove(move);
		}, 500);
	    //gameService.makeMove(move);
	}
	  
    function updateUI(params) {
    	//alert("hello");
      //$scope.params = params;
      $scope.board = params.stateAfterMove.board;
      $scope.delta = params.stateAfterMove.delta;
      if ($scope.board === undefined) {
        $scope.board = gameLogic.getInitialBoard();
      }
      else{
    	  moveAudio.play();
      }
      
      $scope.isYourTurn = params.turnIndexAfterMove >= 0 && // game is ongoing
        params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn
      $scope.turnIndex = params.turnIndexAfterMove;
      
      // Is it the computer's turn?
      if ($scope.isYourTurn
          && params.playersInfo[params.yourPlayerIndex].playerId === '') {
        // Wait 500 milliseconds until animation ends.
        $timeout(sendComputerMove, 750);
      }
    }
    
    function updateDroppable(row, col) {
    	$scope.droppable = [[false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false],
                            [false,false,false,false,false,false,false,false]
                            ];
    	var possibleMoves = gameLogic.getPossibleMoves($scope.board, row, col, $scope.turnIndex);
    	for (var i=0; i<possibleMoves.length; i++){
    		var r = possibleMoves[i][0];
    		var c = possibleMoves[i][1];
    		$scope.droppable[r][c] = true;
    	}
    }
    updateUI({stateAfterMove: {}, turnIndexAfterMove: 0, yourPlayerIndex: -2});
    
    $scope.droppable = [[false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false],
                        [false,false,false,false,false,false,false,false]
                        ];
    $scope.firstClicked = false;
    $scope.brow = -1;
    $scope.bcol = -1;
    $scope.isDragging = false;
    $scope.cellClicked = function (row, col) {
        $log.info(["Clicked on cell:", row, col]);
        if (!$scope.isYourTurn) {
          return;
        }
        if($scope.board[row][col] !== ''){
        	$scope.firstClicked = true;
        	$scope.brow = row;
        	$scope.bcol = col;
        	//update droppable;
        	updateDroppable(row, col);
        	return;
        }
        
        try { 
          var move = gameLogic.createMove($scope.board, $scope.brow, $scope.bcol, row, col, $scope.turnIndex);
          //test if the move is OK.
          var test = gameLogic.isMoveOk({turnIndexBeforeMove: $scope.turnIndex,
	                                stateBeforeMove: {board: $scope.board,
   	                                                  delta: {brow: $scope.brow, bcol: $scope.bcol, arow: row, acol: col}},
                                    move: move});
          if(!test){
        	  $scope.firstClicked = false;
        	  //updateUI($scope.params);
        	  return;
          }
          
          $scope.isYourTurn = false; // to prevent making another move
          $scope.firstClicked = false;
          // TODO: show animations and only then send makeMove.
          //$log.info("before makeMove()");
          if($scope.isDragging === false){
        	  $scope.style = [[{},{},{},{},{},{},{},{}],
            	                [{},{},{},{},{},{},{},{}],
            	                [{},{},{},{},{},{},{},{}],
            	                [{},{},{},{},{},{},{},{}],
            	                [{},{},{},{},{},{},{},{}],
            					[{},{},{},{},{},{},{},{}],
            					[{},{},{},{},{},{},{},{}],
            		 			[{},{},{},{},{},{},{},{}]];
        		  var brow = move[2].set.value.brow;
        		  var bcol = move[2].set.value.bcol;
        		  var arow = move[2].set.value.arow;
        		  var acol = move[2].set.value.acol;
        		  var style = getStyle(brow, bcol, arow, acol);
        		  $scope.style[brow][bcol] = style;
        		  //$log.info("style: ", style);
        		  $timeout(function(){
      			  gameService.makeMove(move);
      		  }, 500);
          }
          else gameService.makeMove(move);
          $scope.isDragging = false;
        } catch (e) {
          $log.info(["Cell is already full in position:", row, col]);
          return;
        }
    };
    
    $scope.onStartCallback = function(){
    	var r = arguments[2];
    	var c = arguments[3];
    	$log.info("drag start on cell: ", r,c);
    	$scope.cellClicked(r,c);
    	return;
    };
    
    $scope.onDropCallback = function(){
    	var r = arguments[2];
    	var c = arguments[3];
    	$log.info("drop on cell: ", r,c);
    	$scope.isDragging = true;
    	$scope.cellClicked(r,c);
    	return;
    };
    
    $scope.isEven = function(row, col){
    	var t = row + col;
    	return t%2 === 0;
    }
    $scope.isOdd = function(row, col){
    	var t = row + col;
    	return t%2 === 1;
    }
    
    $scope.isSelected = function(row, col){
    	return $scope.brow === row && $scope.bcol === col;
    }
    
    function getStyle (brow, bcol, arow, acol) {
        var left = (acol - bcol) * 100 + "px";
        var top = (arow - brow) * 100 + "px";
        return {top: top, left: left, position: "relative",
                "-webkit-animation": "moveAnimation 0.5s",
                "animation": "moveAnimation 0.5s"};
    }
    
    scaleBodyService.scaleBody({width: 820, height: 820});
    
    gameService.setGame({
        gameDeveloperEmail: "yoav.zibin@gmail.com",
        minNumberOfPlayers: 2,
        maxNumberOfPlayers: 2,
        exampleGame: gameLogic.getExampleGame(),
        riddles: gameLogic.getRiddles(),
        isMoveOk: gameLogic.isMoveOk,
        updateUI: updateUI
      });
  });
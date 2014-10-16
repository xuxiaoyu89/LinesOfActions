'use strict';

angular.module('myApp', ['ngTouch', 'ngDragDrop'])
  .controller('Ctrl', function (
      $scope, $log, $timeout,
      gameService, scaleBodyService, gameLogic) {
    
	function sendComputerMove() {
	      gameService.makeMove(gameLogic.createComputerMove($scope.board, $scope.turnIndex));
	}
	  
    function updateUI(params) {
    	//alert("hello");
      $scope.params = params;
      $scope.board = params.stateAfterMove.board;
      //$scope.delta = params.stateAfterMove.delta;
      if ($scope.board === undefined) {
        $scope.board = gameLogic.getInitialBoard();
      }
      $scope.isYourTurn = params.turnIndexAfterMove >= 0 && // game is ongoing
        params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn
      $scope.turnIndex = params.turnIndexAfterMove;
      
      // Is it the computer's turn?
      if ($scope.isYourTurn
          && params.playersInfo[params.yourPlayerIndex].playerId === '') {
        // Wait 500 milliseconds until animation ends.
        $timeout(sendComputerMove, 500);
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
    //$animate.a  = "test";
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
        	  updateUI($scope.params);
        	  return;
          }
          
          $scope.isYourTurn = false; // to prevent making another move
          $scope.firstClicked = false;
          // TODO: show animations and only then send makeMove.
          $log.info("before makeMove()");
          gameService.makeMove(move);
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
    	$scope.cellClicked(r,c);
    	return;
    };

    scaleBodyService.scaleBody({width: 1300, height: 1300});
    
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
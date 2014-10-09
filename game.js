'use strict';

// TODO: remove stateService before launching the game.
angular.module('myApp',
    ['myApp.messageService', 'myApp.gameLogic', 'platformApp', 'myApp.scaleBodyService'])
  .controller('Ctrl', function (
      $window, $scope, $log,
      messageService, scaleBodyService, stateService, gameLogic) {

    function updateUI(params) {
      $scope.jsonState = angular.toJson(params.stateAfterMove, true);
      $scope.board = params.stateAfterMove.board;
      if ($scope.board === undefined) {
        $scope.board = gameLogic.getInitialBoard();
      }
      $scope.isYourTurn = params.turnIndexAfterMove >= 0 && // game is ongoing
        params.yourPlayerIndex === params.turnIndexAfterMove; // it's my turn
      $scope.turnIndex = params.turnIndexAfterMove;
    }
    
    function sendMakeMove(move) {
        $log.info(["Making move:", move]);
        if (isLocalTesting) {
          stateService.makeMove(move);
        } else {
          messageService.sendMessage({makeMove: move});
      }
    }
    
    updateUI({stateAfterMove: {}, turnIndexAfterMove: 0, yourPlayerIndex: -2});
    //alert("hello");
    var game = {
      gameDeveloperEmail: "yoav.zibin@gmail.com",
      minNumberOfPlayers: 2,
      maxNumberOfPlayers: 2,
      exampleGame: gameLogic.getExampleGame(),
      riddles: gameLogic.getRiddles()
    };

    var isLocalTesting = $window.parent === $window;
    
    $scope.firstClicked = false;
    $scope.brow = -1;
    $scope.bcol = -1;
    $scope.cellClicked = function (row, col) {
        $log.info(["Clicked on cell:", row, col]);
        //alert("Clicked on cell: " + row + ", " + col); 
        //alert($scope.firstClicked);
        //alert($scope.isYourTurn);
        if (!$scope.isYourTurn) {
          return;
        }
        if(!$scope.firstClicked){
        	$scope.firstClicked = true;
        	$scope.brow = row;
        	$scope.bcol = col;
        	return;
        }
        
        try { 
          var move = gameLogic.createMove($scope.board, $scope.brow, $scope.bcol, row, col, $scope.turnIndex);
          //test if the move is OK.
          //params: {turnIndexBeforeMove: 0,
          //         stateBeforeMove: {},
          //         move: []
          if(!game.isMoveOk({turnIndexBeforeMove: $scope.turnIndex,
        	            stateBeforeMove: {board: $scope.board,
        	            	             delta: {brow: $scope.brow, bcol: $scope.bcol, arow: row, acol: col}},
        	            move: move})){
        	  //alert("illegal move!");
        	  $scope.firstClicked = false;
        	  return;
          }
          
          $scope.isYourTurn = false; // to prevent making another move
          $scope.firstClicked = false;
          // TODO: show animations and only then send makeMove.
          sendMakeMove(move);
        } catch (e) {
          $log.info(["Cell is already full in position:", row, col]);
          return;
        }
    };

    scaleBodyService.scaleBody({width: 430, height: 430});
    
    if (isLocalTesting) {
      game.isMoveOk = gameLogic.isMoveOk;
      game.updateUI = updateUI;
      stateService.setGame(game);
    } else {
      messageService.addMessageListener(function (message) {
        if (message.isMoveOk !== undefined) {
          var isMoveOkResult = gameLogic.isMoveOk(message.isMoveOk);
          messageService.sendMessage({isMoveOkResult: isMoveOkResult});
        } else if (message.updateUI !== undefined) {
          updateUI(message.updateUI);
        }
      });

      messageService.sendMessage({gameReady : game});
    }
  });

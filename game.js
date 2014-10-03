'use strict';

// TODO: remove stateService before launching the game.
angular.module('myApp',
    ['myApp.messageService', 'myApp.gameLogic', 'platformApp'])
  .controller('Ctrl', function (
      $window, $scope, $log,
      messageService, stateService, gameLogic) {

    function updateUI(params) {
      $scope.jsonState = angular.toJson(params.stateAfterMove, true);
      $scope.board = params.stateAfterMove.board;
      if ($scope.board === undefined) {
        $scope.board = [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
       	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['', 'R', 'R', 'R', 'R', 'R', 'R', '']];
      }
    }
    
    updateUI({stateAfterMove: {}});
    //alert("hello");
    var game = {
      gameDeveloperEmail: "yoav.zibin@gmail.com",
      minNumberOfPlayers: 2,
      maxNumberOfPlayers: 2,
      exampleGame: gameLogic.getExampleGame(),
      riddles: gameLogic.getRiddles()
    };

    var isLocalTesting = $window.parent === $window;
    $scope.move = "[\n" +
	               "{setTurn: {turnIndex : 1}},\n" +
	               "{set: {key: 'board', value: [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],\n" +
	          	        	                  "['', '', 'W', '', '', '', '', 'W'],\n" +
	        	        	                  "['W', '', '', '', '', '', '', 'W'],\n" +
	        	        	                  "['W', '', '', '', '', '', '', 'W'],\n" +
	        	        	                  "['W', '', '', '', '', '', '', 'W'],\n" +
	        	        	                  "['W', '', '', '', '', '', '', 'W'],\n" +
	        	        	                  "['W', '', '', '', '', '', '', 'W'],\n" + 
	        	        	                  "['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},\n" +
	               "{set: {key: 'delta', value: {brow: 1, bcol: 0, arow: 1, acol: 2}}}\n" +
	              "]";
    $scope.makeMove = function () {
      $log.info(["Making move:", $scope.move]);
      var moveObj = eval($scope.move);
      if (isLocalTesting) {
        stateService.makeMove(moveObj);
      } else {
        messageService.sendMessage({makeMove: moveObj});
      }
    };

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

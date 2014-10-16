describe("In LinesOfAction", function(){
    function expectMoveOK(turnIndexBeforeMove, stateBeforeMove, move){
    	expect(LinesOfActionsLogic.isMoveOK(
    	{turnIndexBeforeMove: turnIndexBeforeMove,
    	 stateBeforeMove: stateBeforeMove,
    	 move: move
    	})
    	).toBe(true);
    }
    
    function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move){
    	expect(LinesOfActionsLogic.isMoveOK({
    		turnIndexBeforeMove: turnIndexBeforeMove,
       	    stateBeforeMove: stateBeforeMove,
       	    move: move
    	})).toBe(false);
    }
    
    it("white moves (1,0) to (1,2) from initial state is legal", function(){
    	expectMoveOK(0,
    			{board:
    	            [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
    	         delta: {brow: 0, bcol: 0, arow: 0, acol: 0}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 1}},
	               {set: {key: 'board', value: [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
	          	        	                  ['', '', 'W', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 1, bcol: 0, arow: 1, acol: 2}}}
	              ]);
    });
});

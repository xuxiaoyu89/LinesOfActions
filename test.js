describe("In LinesOfAction", function(){	
    function expectMoveOK(turnIndexBeforeMove, stateBeforeMove, move){
    	expect(gameLogic.isMoveOK(
    	{turnIndexBeforeMove: turnIndexBeforeMove,
    	 stateBeforeMove: stateBeforeMove,
    	 move: move
    	})
    	).toBe(true);
    }
    
    function expectIllegalMove(turnIndexBeforeMove, stateBeforeMove, move){
    	expect(gameLogic.isMoveOK({
    		turnIndexBeforeMove: turnIndexBeforeMove,
       	    stateBeforeMove: stateBeforeMove,
       	    move: move
    	})).toBe(false);
    }
    
    it("white moves (1,0) to (1,2) from initial state is legal", function(){
    	expectMoveOK(0,
    			{}, 
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
    
    it("white moves (1,0) to (1,3) from initial state is legal: wrong distance", function(){
    	expectIllegalMove(0,
    			{}, 
    	         [
	               {setTurn: {turnIndex : 1}},
	               {set: {key: 'board', value: [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
	          	        	                  ['', '', '', 'W', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 1, bcol: 0, arow: 1, acol: 3}}}
	              ]);
    });
    
    
    it("white moves (0,0) to (1,2) from initial state is legal: no checker in (0,0)", function(){
    	expectIllegalMove(0,
    			{}, 
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
	               {set: {key: 'delta', value: {brow: 0, bcol: 0, arow: 1, acol: 2}}}
	              ]);
    });
    
    it("red moves (0,3) to (2,3) is legal", function(){
    	expectMoveOK(1,
    			{board:
    	            [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
    	             ['', '', 'W', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 0}},
	               {set: {key: 'board', value: [['', 'R', 'R', '', 'R', 'R', 'R', ''],
	          	        	                  ['', '', 'W', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', 'R', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 0, bcol: 3, arow: 2, acol: 3}}}
	              ]);
    });
    
    it("red moves (0,3) to (2,3) is illegal, move to a occupied place", function(){
    	expectIllegalMove(1,
    			{board:
    	            [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
    	             ['', '', 'W', '', '', '', '', 'W'],
    	             ['W', '', '', 'R', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['', 'R', 'R', '', 'R', 'R', 'R', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 0}},
	               {set: {key: 'board', value: [['', 'R', 'R', '', 'R', 'R', 'R', ''],
	          	        	                  ['', '', 'W', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', 'R', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['', 'R', 'R', '', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 0, bcol: 3, arow: 2, acol: 3}}}
	              ]);
    });
    
    it("red moves (0,3) to (2,3) is illegal, move to a occupied place", function(){
    	expectIllegalMove(1,
    			{board:
    	            [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
    	             ['', '', 'W', '', '', '', '', 'W'],
    	             ['W', '', '', 'R', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['', 'R', 'R', '', 'R', 'R', 'R', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 0}},
	               {set: {key: 'board', value: [['', 'R', 'R', '', 'R', 'R', 'R', ''],
	          	        	                  ['', '', 'W', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', 'R', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['', 'R', 'R', '', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 0, bcol: 3, arow: 2, acol: 3}}}
	              ]);
    });
    
    it("red moves (1,2) to (1,0) is illegal: move a enemy checker", function(){
    	expectIllegalMove(1,
    			{board:
    	            [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
    	             ['', '', 'W', '', '', '', '', 'W'],
    	             ['W', '', '', 'R', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['', 'R', 'R', '', 'R', 'R', 'R', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 0}},
	               {set: {key: 'board', value: [['', 'R', 'R', '', 'R', 'R', 'R', ''],
	          	        	                  ['W', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', 'R', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['', 'R', 'R', '', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 1, bcol: 2, arow: 1, acol: 0}}}
	              ]);
    });
    
    
    
    it("white moves (1,2) to (4,2) is legal", function(){
    	expectMoveOK(0,
    			{board:
    	            [['', 'R', 'R', '', 'R', 'R', 'R', ''],
    	             ['', '', 'W', '', '', '', '', 'W'],
    	             ['W', '', '', 'R', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 1}},
	               {set: {key: 'board', value: [['', 'R', 'R', '', 'R', 'R', 'R', ''],
	          	        	                  ['', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', 'R', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', 'W', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 1, bcol: 2, arow: 4, acol: 2}}}
	              ]);
    });
    
    it("white moves (2,0) to (4,2) is legal", function(){
    	expectMoveOK(0,
    			{board:
    	            [['', 'R', 'R', '', 'R', 'R', 'R', ''],
    	             ['', '', 'W', '', '', '', '', 'W'],
    	             ['W', '', '', 'R', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'],
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['W', '', '', '', '', '', '', 'W'], 
    	             ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 1}},
	               {set: {key: 'board', value: [['', 'R', 'R', '', 'R', 'R', 'R', ''],
	          	        	                  ['', '', 'W', '', '', '', '', 'W'],
	        	        	                  ['', '', '', 'R', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', 'W', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 2, bcol: 0, arow: 4, acol: 2}}}
	              ]);
    });
    
    it("red moves (0,1) to (3,4) is legal", function(){
    	expectMoveOK(1,
    			{board:
    				[['', 'R', 'R', '', 'R', 'R', 'R', ''],
 	                  ['', '', '', '', '', '', '', 'W'],
	                  ['W', '', '', 'R', '', '', '', 'W'],
	                  ['W', '', '', '', '', '', '', 'W'], 
	                  ['W', '', 'W', '', '', '', '', 'W'],
	                  ['W', '', '', '', '', '', '', 'W'], 
	                  ['W', '', '', '', '', '', '', 'W'], 
	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 0}},
	               {set: {key: 'board', value: [['', '', 'R', '', 'R', 'R', 'R', ''],
		          	        	                  ['', '', '', '', '', '', '', 'W'],
		        	        	                  ['W', '', '', 'R', '', '', '', 'W'],
		        	        	                  ['W', '', '', '', 'R', '', '', 'W'], 
		        	        	                  ['W', '', 'W', '', '', '', '', 'W'],
		        	        	                  ['W', '', '', '', '', '', '', 'W'], 
		        	        	                  ['W', '', '', '', '', '', '', 'W'], 
		        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 0, bcol: 1, arow: 3, acol: 4}}}
	              ]);
    });
    
    it("red moves (0,6) to (3,3) is legal", function(){
    	expectMoveOK(1,
    			{board:
    				[['', 'R', 'R', '', 'R', 'R', 'R', ''],
 	                  ['', '', '', '', '', '', '', 'W'],
	                  ['W', '', '', 'R', '', '', '', 'W'],
	                  ['W', '', '', '', '', '', '', 'W'], 
	                  ['W', '', 'W', '', '', '', '', 'W'],
	                  ['W', '', '', '', '', '', '', 'W'], 
	                  ['W', '', '', '', '', '', '', 'W'], 
	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 0}},
	               {set: {key: 'board', value: [['', 'R', 'R', '', 'R', 'R', '', ''],
	                       	                  ['', '', '', '', '', '', '', 'W'],
	                    	                  ['W', '', '', 'R', '', '', '', 'W'],
	                    	                  ['W', '', '', 'R', '', '', '', 'W'], 
	                    	                  ['W', '', 'W', '', '', '', '', 'W'],
	                    	                  ['W', '', '', '', '', '', '', 'W'], 
	                    	                  ['W', '', '', '', '', '', '', 'W'], 
	                    	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 0, bcol: 6, arow: 3, acol: 3}}}
	              ]);
    });
    
    it("red moves (7,2) to (3,2) is illegal: jump over an enemy", function(){
    	expectIllegalMove(1,
    			{board:
    				[['', 'R', 'R', '', 'R', 'R', 'R', ''],
 	                  ['', '', '', '', '', '', '', 'W'],
	                  ['W', '', 'R', '', '', '', '', 'W'],
	                  ['W', '', '', '', '', '', '', 'W'], 
	                  ['W', '', 'W', '', '', '', '', 'W'],
	                  ['W', '', '', '', '', '', '', 'W'], 
	                  ['W', '', '', '', '', '', '', 'W'], 
	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 0}},
	               {set: {key: 'board', value: [['', 'R', 'R', '', 'R', 'R', 'R', ''],
	                       	                  ['', '', '', '', '', '', '', 'W'],
	                    	                  ['W', '', 'R', '', '', '', '', 'W'],
	                    	                  ['W', '', 'R', '', '', '', '', 'W'], 
	                    	                  ['W', '', 'W', '', '', '', '', 'W'],
	                    	                  ['W', '', '', '', '', '', '', 'W'], 
	                    	                  ['W', '', '', '', '', '', '', 'W'], 
	                    	                  ['', 'R', '', 'R', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 7, bcol: 2, arow: 3, acol: 2}}}
	              ]);
    });
    
    it("red moves (0,4) to (2,4) is legal", function(){
    	expectMoveOK(1,
    			{board:
    				[['W', '', '', '', 'R', '', '', ''],
    	             ['W', 'W', 'W', '', '', '', '', ''],
    	             ['W', 'R', 'W', 'R', '', '', '', ''],
    	             ['W', '', 'R', '', '', '', '', 'R'], 
    	             ['W', '', '', 'R', '', 'W', '', ''],
    	             ['W', '', 'W', '', '', '', '', ''], 
    	             ['', '', 'W', 'R', '', '', '', ''], 
    	             ['', 'R', 'R', 'R', 'R', 'R', '', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 0}},
	               {set: {key: 'board', value: [['W', '', '', '', '', '', '', ''],
	                                            ['W', 'W', 'W', '', '', '', '', ''],
	                                            ['W', 'R', 'W', 'R', 'R', '', '', ''],
	                                            ['W', '', 'R', '', '', '', '', 'R'], 
	                                            ['W', '', '', 'R', '', 'W', '', ''],
	                                            ['W', '', 'W', '', '', '', '', ''], 
	                                            ['', '', 'W', 'R', '', '', '', ''], 
	                                            ['', 'R', 'R', 'R', 'R', 'R', '', '']]}},
	               {set: {key: 'delta', value: {brow: 0, bcol: 4, arow: 2, acol: 4}}}
	              ]);
    });
    
    it("red moves (7,5) to (6,6) is legal", function(){
    	expectMoveOK(1,
    			{board:
    				[['W', '', '', '', 'R', '', '', ''],
    	             ['W', 'W', 'W', '', '', '', '', ''],
    	             ['W', 'R', 'W', 'R', '', '', '', ''],
    	             ['W', '', 'R', '', '', '', '', 'R'], 
    	             ['W', '', '', 'R', '', 'W', '', ''],
    	             ['W', '', 'W', '', '', '', '', ''], 
    	             ['', '', 'W', 'R', '', '', '', ''], 
    	             ['', 'R', 'R', 'R', 'R', 'R', '', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {setTurn: {turnIndex : 0}},
	               {set: {key: 'board', value: [['W', '', '', '', 'R', '', '', ''],
	                           	             ['W', 'W', 'W', '', '', '', '', ''],
	                        	             ['W', 'R', 'W', 'R', '', '', '', ''],
	                        	             ['W', '', 'R', '', '', '', '', 'R'], 
	                        	             ['W', '', '', 'R', '', 'W', '', ''],
	                        	             ['W', '', 'W', '', '', '', '', ''], 
	                        	             ['', '', 'W', 'R', '', '', 'R', ''], 
	                        	             ['', 'R', 'R', 'R', 'R', '', '', '']]}},
	               {set: {key: 'delta', value: {brow: 7, bcol: 5, arow: 6, acol: 6}}}
	              ]);
    });
    
    
    it("red moves (3,7) to (3,4) is legal, red wins", function(){
    	expectMoveOK(1,
    			{board:
    				[['W', '', '', '', '', '', '', ''],
    	             ['W', 'W', 'W', '', '', 'W', '', ''],
    	             ['W', 'R', 'W', 'R', 'R', '', '', ''],
    	             ['W', '', 'R', '', '', '', '', 'R'], 
    	             ['W', '', '', 'R', '', '', '', ''],
    	             ['W', '', 'W', 'R', '', '', '', ''], 
    	             ['', '', 'W', 'R', '', '', '', ''], 
    	             ['', 'R', 'R', 'R', 'R', '', '', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {endMatch: {endMatchScores: [0, 1]}},
	               {set: {key: 'board', value: [['W', '', '', '', '', '', '', ''],
	                           	             ['W', 'W', 'W', '', '', 'W', '', ''],
	                        	             ['W', 'R', 'W', 'R', 'R', '', '', ''],
	                        	             ['W', '', 'R', '', 'R', '', '', ''], 
	                        	             ['W', '', '', 'R', '', '', '', ''],
	                        	             ['W', '', 'W', 'R', '', '', '', ''], 
	                        	             ['', '', 'W', 'R', '', '', '', ''], 
	                        	             ['', 'R', 'R', 'R', 'R', '', '', '']]}},
	               {set: {key: 'delta', value: {brow: 3, bcol: 7, arow: 3, acol: 4}}}
	              ]);
    });
    
    it("white moves (3,7) to (3,4) is legal: white wins", function(){
    	expectMoveOK(0,
    			{board:
    				[['R', '', '', '', '', '', '', ''],
    	             ['R', 'R', 'R', '', '', 'R', '', ''],
    	             ['R', 'W', 'R', 'W', 'W', '', '', ''],
    	             ['R', '', 'W', '', '', '', '', 'W'], 
    	             ['R', '', '', 'W', '', '', '', ''],
    	             ['R', '', 'R', 'W', '', '', '', ''], 
    	             ['', '', 'R', 'W', '', '', '', ''], 
    	             ['', 'W', 'W', 'W', 'W', '', '', '']], 
    	         delta: {brow: 1, bcol: 0, arow: 1, acol: 2}
    	         }, 
    	         [
	               {endMatch: {endMatchScores: [1, 0]}},
	               {set: {key: 'board', value: [['R', '', '', '', '', '', '', ''],
	                           	             ['R', 'R', 'R', '', '', 'R', '', ''],
	                        	             ['R', 'W', 'R', 'W', 'W', '', '', ''],
	                        	             ['R', '', 'W', '', 'W', '', '', ''], 
	                        	             ['R', '', '', 'W', '', '', '', ''],
	                        	             ['R', '', 'R', 'W', '', '', '', ''], 
	                        	             ['', '', 'R', 'W', '', '', '', ''], 
	                        	             ['', 'W', 'W', 'W', 'W', '', '', '']]}},
	               {set: {key: 'delta', value: {brow: 3, bcol: 7, arow: 3, acol: 4}}}
	              ]);
    });
    
    
    it("white moves (1,0) to (1,2) from initial state is legal, but: afterstate not agree with the expected afterstate", function(){
    	expectIllegalMove(0,
    			{}, 
    	         [
	               {setTurn: {turnIndex : 1}},
	               {set: {key: 'board', value: [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
	          	        	                  ['', '', 'W', '', '', '', '', 'W'],
	        	        	                  ['', '', 'W', '', '', '', '', 'W'],
	        	        	                  ['', '', 'W', 'W', '', '', '', 'W'], 
	        	        	                  ['', '', '', '', '', '', '', 'W'],
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
	               {set: {key: 'delta', value: {brow: 1, bcol: 0, arow: 1, acol: 2}}}
	              ]);
    });
    
    
    it("white moves (1,0) to (1,2) from initial state is legal, but: no borad in after state", function(){
    	expectIllegalMove(0,
    			{}, 
    	         [
	               {setTurn: {turnIndex : 1}},
	               {set: {key: 'delta', value: {brow: 1, bcol: 0, arow: 1, acol: 2}}}
	              ]);
    });
    
    
    function expectLegalHistoryThatEndsTheGame(history) {
        for (var i = 0; i < history.length; i++) {
            expectMoveOK(history[i].turnIndexBeforeMove,
            history[i].stateBeforeMove,
            history[i].move);
        }
        expect(history[history.length - 1].move[0].endMatch).toBeDefined();
      }
    
    it("getExampleGame returns a legal history and the last move ends the game", function() {
        var exampleGame = gameLogic.getExampleGame();
        expect(exampleGame.length).toBe(20);
        expectLegalHistoryThatEndsTheGame(exampleGame);
      });
    
    it("getRiddles returns legal histories where the last move ends the game", function() {
        var riddles = gameLogic.getRiddles();
        expect(riddles.length).toBe(1);
        for (var i = 0; i < riddles.length; i++) {
          expectLegalHistoryThatEndsTheGame(riddles[i]);
        }
      });
    
});








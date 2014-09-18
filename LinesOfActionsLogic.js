var isMoveOk = (function(){
    function isEqual(object1, object2){
        return JSON.stringify(object1) === JSON.stringify(object2);
    }
    function copyObject(object){
    	return JSON.parse(JSON.stringify(object));
    }
    function isWinner(r, c, board){
    	var visited = new Array(8);
    	for(i=0; i<8; i++){
    		visited[i] = new Array(false, false, false, false, false, false, false, false);
    	}
    	var id = board[r][c];
    	visited[r][c] = true;
    	//console.log(id);
    	var count = 1;
    	var stack = new Array();
    	stack.push([r,c]);
    	while(stack.length !== 0){
    		var curr = stack.pop();
    		//console.log(curr);
    		var row = curr[0];
    		var col = curr[1];
    		if(row+1<8 && col+1<8){
    			if(visited[row+1][col+1] === false){
    				if(board[row+1][col+1] === id){
    					//console.log(1);
        				stack.push([row+1, col+1]);
        				count++;
        				visited[row+1][col+1] = true;
        			}	
    			}
    		}
    		if(row-1>=0 && col-1>=0){
    			if(visited[row-1][col-1] === false){
    				if(board[row-1][col-1] === id){
    					//console.log(2);
        				stack.push([row-1, col-1]);
        				count++;
        				visited[row-1][col-1] = true;
        			}	
    			}
    		}
    		if(row+1<8 && col-1>=0){
    			if(visited[row+1][col-1] === false){
    				if(board[row+1][col-1] === id){
    					//console.log(3);
        				stack.push([row+1, col-1]);
        				count++;
        				visited[row+1][col-1] = true;
        			}	
    			}
    		}
    		if(row-1>=8 && col+1<8){
    			if(visited[row-1][col+1] === false){
    				if(board[row-1][col+1] === id){
    					//console.log(4);
        				stack.push([row-1, col+1]);
        				count++;
        				visited[row-1][col+1] = true;
        			}	
    			}
    		}
    		if(row+1<8){
    			if(visited[row+1][col] === false){
    				if(board[row+1][col] === id){
    					//console.log(5);
        				stack.push([row+1, col]);
        				count++;
        				visited[row+1][col] = true;
        			}	
    			}
    		}
    		if(row-1>=0){
    			if(visited[row-1][col] === false){
    				if(board[row-1][col] === id){
    					//console.log(6);
        				stack.push([row-1, col]);
        				count++;
        				visited[row-1][col] = true;
        			}	
    			}
    		}
    		if(col+1<8){
    			if(visited[row][col+1] === false){
    				if(board[row][col+1] === id){
    					//console.log(7);
        				stack.push([row, col+1]);
        				count++;
        				visited[row][col+1] = true;
        			}	
    			}
    		}
    		if(col-1>=0){
    			if(visited[row][col-1] === false){
    				if(board[row][col-1] === id){
    					//console.log(8);
        				stack.push([row, col-1]);
        				count++;
        				visited[row][col-1] = true;
        			}	
    			}
    		}
    	}
    	//console.log(count);
    	if(count === 12) return true;
    	else return false;
    }
    
    function getWinner(board){
    	var wrow = -1, wcol = -1;
    	var rrow = -1, rcol = -1;
        for(i=0; i<8; i++){
        	for(j=0; j<8; j++){
        		if(wrow>=0 && wcol>=0 && rrow>=0 && rcol>=0){
        			break;
        		}
        		if(board[i][j] === 'W'){
        			wrow = i;
        			wcol = j;
        		}
        		else if(board[i][j] === 'R'){
        			rrow = i;
        			rcol = j;
        		}
        	}
        }
        if(isWinner(wrow, wcol, board)) return 'W';
        if(isWinner(rrow, rcol, board)) return 'R';
        return '';   
    }

    function createMove(board, brow, bcol, arow, acol, turnIndexBeforeMove){
    	var boardAfterMove = copyObject(board);
        boardAfterMove[arow][acol] = turnIndexBeforeMove === 0 ? 'W' : 'R';
        boardAfterMove[brow][bcol] = '';
        var winner = getWinner(boardAfterMove);
        var firstOperation;
        if (winner !== '') {
          // Game over.
          firstOperation = {endMatch: {endMatchScores: 
            (winner === 'W' ? [1, 0] : [0, 1])}};
        } else {
          // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
          firstOperation = {setTurn: {turnIndex: 1 - turnIndexBeforeMove}};
        }
        return [firstOperation,
                {set: {key: 'board', value: boardAfterMove}},
                {set: {key: 'before', value: {row: brow, col: bcol}}},
                {set: {key: 'after', value:{row: arow, col: acol}}}
               ];
    }

    //get check num in that line;
    function getCheckNum(board, startR, startC, slope){
        var checkNum = 0;
        if(slope === 0){
            for(i=0; i<8; i++){
                if(board[startR][startC+i] !== '') {checkNum++;}
            }
        }
        else if(slope === 2){
            for(i=0; i<8; i++){
                if(board[startR+i][startC] !== '') {checkNum++;}
            }
        }
        else if(slope === 1){
            while(startR !== 8 && startC !== 8){
            	if(board[startR][startC] !== '') {checkNum++;}
            	startR++;
            	startC++;
            }
        }
        else{
        	while(startR !== 0 && startC !== 8){
        		if(board[startR][startC] !== '') {checkNum++;}
            	startR--;
            	startC++;
        	}
        }
        return checkNum;
    }
    
    function isMoveLegal(board, brow, bcol, arow, acol, turnIndexBeforeMove) {
        if (board[arow][acol] !== '') {
            return false;
        }
        var enemy = turnIndexBeforeMove === 0 ? 'R' : 'W';
        if(board[brow][bcol] === enemy) {return false;}
        if(Math.abs(brow-arow) !== Math.abs(bcol-acol) && brow !== arow && bcol !== acol) {return false;}
        var distance;
        var startR;
        var startC;
        var slope;
        if ((brow-arow) === 0) {
            distance = Math.abs(bcol-acol);
            startR = brow;
            startC = 0;
            slope = 0;
        }
        else if ((bcol-acol) === 0) {
            distance = Math.abs(brow-arow);
            startR = 0;
            startC = bcol;
            slope = 2;    //infinity;
        }
        else {
            distance = Math.abs(brow-arow);
            slope = (brow-arow)/(bcol-acol);
            if(slope>0){
                if(arow >= acol){
                    startR = arow-acol;
                    startC = 0;
                }
                else{
                    startR = 0;
                    startC = acol-arow;
                }
            }
            else {
                if((arow+acol)>=7){
                    startR = 7;
                    startC = arow+acol-7;
                }
                else{
                    startR = 7-arow-acol;
                    startC = 0;
                }
            }
        }
        var num = getCheckNum(board, startR, startC, slope);
        //console.log("checkNum: " + num);
        if(distance !== num){
            return false;
        }   
        //check if there are enemies in the way;     
        var moveR = (arow-brow)/distance;
        var moveC = (acol-bcol)/distance;
        var cursorR = brow;
        var cursorC = bcol;
        while(cursorR!==arow || cursorC!==acol){
            cursorR += moveR;
            cursorC += moveC;
            if(board[cursorR][cursorC] === enemy){
                return false;
            }
        }   
        return true;
    }
  
    //params: {turnIndexBeforeMove: 0,
    //         stateBeforeMove: {},
    //         move: []
    function isMoveOK(params){
        var move = params.move;
        var turnIndexBeforeMove = params.turnIndexBeforeMove;
        var stateBeforeMove = params.stateBeforeMove;
        try{
            var before = move[2].set.value;
            var after = move[3].set.value;
            var brow = before.row;
            var bcol = before.col;
            var arow = after.row;
            var acol = after.col;
            var board = stateBeforeMove.board;
            //test if a player can make a move in this position;
            if(!isMoveLegal(board, brow, bcol, arow, acol, turnIndexBeforeMove)){
                return false;
            }
            var expectedMove = createMove(board, brow, bcol, arow, acol, turnIndexBeforeMove);
            if(!isEqual(move, expectedMove)){
                return false;
            } 
        }catch(e){
            return false; 
        }
        return true;
    }

    console.log(
        [
    	//white checker from [1, 0] to [1, 2]: OK
        isMoveOK(
        		{   
        			turnIndexBeforeMove: 0, 
        	        stateBeforeMove: {board:
        	        	                 [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
        	        	              delta: {row: 0, col: 0}}, 
        	        move: [
        	               {setTurn: {turnIndex : 1}},
        	               {set: {key: 'board', value: [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
        	          	        	                  ['', '', 'W', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
        	               {set: {key: 'before', value: {row: 1, col: 0}}},
        	               {set: {key: 'after', value: {row: 1, col: 2}}}
        	              ]
        	    }),
        
        //white checker from [1, 0] to [1, 3]: Not OK!!! Jump to far!!!
        isMoveOK(
        		{   
        			turnIndexBeforeMove: 0, 
        	        stateBeforeMove: {board:
        	        	                 [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
        	        	              delta: {row: 0, col: 0}}, 
        	        move: [
        	               {setTurn: {turnIndex : 1}},
        	               {set: {key: 'board', value: [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
        	          	        	                  ['', '', '', 'W', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
        	               {set: {key: 'before', value: {row: 1, col: 0}}},
        	               {set: {key: 'after', value: {row: 1, col: 3}}}
        	              ]
        	    }),
        
      //red checker from [0, 1] to [3, 4]: Not OK!!! Jump over enemy!!!
        isMoveOK(
        		{   
        			turnIndexBeforeMove: 1, 
        	        stateBeforeMove: {board:
        	        	                 [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
        	        	                  ['', '', 'W', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
        	        	              delta: {row: 0, col: 0}}, 
        	        move: [
        	               {setTurn: {turnIndex : 0}},
        	               {set: {key: 'board', value: [['', '', 'R', 'R', 'R', 'R', 'R', ''],
        	          	        	                  ['', '', 'W', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', 'R', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
        	               {set: {key: 'before', value: {row: 0, col: 1}}},
        	               {set: {key: 'after', value: {row: 3, col: 4}}}
        	              ]
        	    }),
        
        //red from [0, 4] to [2, 2]: OK.
        isMoveOK(
        		{   
        			turnIndexBeforeMove: 1, 
        	        stateBeforeMove: {board:
        	        	                 [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
        	        	                  ['', '', 'W', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
        	        	              delta: {row: 0, col: 0}}, 
        	        move: [
        	               {setTurn: {turnIndex : 0}},
        	               {set: {key: 'board', value: [['', 'R', 'R', 'R', '', 'R', 'R', ''],
        	          	        	                  ['', '', 'W', '', '', '', '', 'W'],
        	        	        	                  ['W', '', 'R', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
        	               {set: {key: 'before', value: {row: 0, col: 4}}},
        	               {set: {key: 'after', value: {row: 2, col: 2}}}
        	              ]
        	    }),
        
        //red from [0, 2] to [3, 2]: OK, jump over friendly checker[2, 2]
        isMoveOK(
        		{   
        			turnIndexBeforeMove: 1, 
        	        stateBeforeMove: {board:
        	        						[['', 'R', 'R', 'R', '', 'R', 'R', ''],
        	        						 ['', '', '', 'W', '', '', '', 'W'],
        	        						 ['W', '', 'R', '', '', '', '', 'W'],
        	        						 ['W', '', '', '', '', '', '', 'W'], 
        	        						 ['W', '', '', '', '', '', '', 'W'],
        	        						 ['W', '', '', '', '', '', '', 'W'], 
        	        						 ['W', '', '', '', '', '', '', 'W'], 
        	        						 ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
        	        	              delta: {row: 0, col: 0}}, 
        	        move: [
        	               {setTurn: {turnIndex : 0}},
        	               {set: {key: 'board', value: [['', 'R', '', 'R', '', 'R', 'R', ''],
        	          	        	                  ['', '', '', 'W', '', '', '', 'W'],
        	        	        	                  ['W', '', 'R', '', '', '', '', 'W'],
        	        	        	                  ['W', '', 'R', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
        	               {set: {key: 'before', value: {row: 0, col: 2}}},
        	               {set: {key: 'after', value: {row: 3, col: 2}}}
        	              ]
        	    }),
        
      //red from [0, 2] to [3, 2]: Not OK!!! expected move does not agree with move in parameter!!!
        isMoveOK(
        		{   
        			turnIndexBeforeMove: 1, 
        	        stateBeforeMove: {board:
        	        						[['', 'R', 'R', 'R', '', 'R', 'R', ''],
        	        						 ['', '', '', 'W', '', '', '', 'W'],
        	        						 ['W', '', 'R', '', '', '', '', 'W'],
        	        						 ['W', '', '', '', '', '', '', 'W'], 
        	        						 ['W', '', '', '', '', '', '', 'W'],
        	        						 ['W', '', '', '', '', '', '', 'W'], 
        	        						 ['W', '', '', '', '', '', '', 'W'], 
        	        						 ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
        	        	              delta: {row: 0, col: 0}}, 
        	        move: [
        	               {setTurn: {turnIndex : 0}},
        	               {set: {key: 'board', value: [['', 'R', '', 'R', '', 'R', 'R', ''],
        	          	        	                  ['', '', '', 'W', '', '', '', 'W'],
        	        	        	                  ['W', '', 'R', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', 'R', '', '', '', '', 'W'],
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['W', '', '', '', '', '', '', 'W'], 
        	        	        	                  ['', 'R', 'R', 'R', 'R', 'R', 'R', '']]}},
        	               {set: {key: 'before', value: {row: 0, col: 2}}},
        	               {set: {key: 'after', value: {row: 3, col: 2}}}
        	              ]
        	    }),
        
        //red [7, 6] to [7, 3]: OK, and red wins!!!
        isMoveOK(
        		{   
        			turnIndexBeforeMove: 1, 
        	        stateBeforeMove: {board:
        	        						[['', 'R', 'R', 'R', '', '', '', ''],
        	        						 ['', '', 'R', 'W', '', '', '', 'W'],
        	        						 ['W', '', 'R', '', '', '', '', 'W'],
        	        						 ['W', 'R', '', '', '', '', '', 'W'], 
        	        						 ['W', '', 'R', '', '', '', '', 'W'],
        	        						 ['W', '', 'R', '', '', '', '', 'W'], 
        	        						 ['W', '', 'R', '', '', '', '', 'W'], 
        	        						 ['', 'R', 'R', '', '', '', 'R', '']], 
        	        	              delta: {row: 0, col: 0}}, 
        	        move: [
        	               {endMatch: {endMatchScores: [0, 1]}},
        	               {set: {key: 'board', value: [['', 'R', 'R', 'R', '', '', '', ''],
        	        	        						 ['', '', 'R', 'W', '', '', '', 'W'],
        	        	        						 ['W', '', 'R', '', '', '', '', 'W'],
        	        	        						 ['W', 'R', '', '', '', '', '', 'W'], 
        	        	        						 ['W', '', 'R', '', '', '', '', 'W'],
        	        	        						 ['W', '', 'R', '', '', '', '', 'W'], 
        	        	        						 ['W', '', 'R', '', '', '', '', 'W'], 
        	        	        						 ['', 'R', 'R', 'R', '', '', '', '']]}},
        	               {set: {key: 'before', value: {row: 7, col: 6}}},
        	               {set: {key: 'after', value: {row: 7, col: 3}}}
        	              ]
        	    }),
          ]
    );
    return isMoveOk;
})();






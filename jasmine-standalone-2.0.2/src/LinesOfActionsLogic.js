var LinesOfActionsLogic = (function(){
    function isEqual(object1, object2){
        return JSON.stringify(object1) === JSON.stringify(object2);
    }
    function copyObject(object){
    	return JSON.parse(JSON.stringify(object));
    }
    function isWinner(r, c, board){
    	var visited = new Array(8);
    	for(var i=0; i<8; i++){
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
        for(var i=0; i<8; i++){
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
                {set: {key: 'delta', value: {brow: brow, bcol: bcol, arow: arow, acol: acol}}}
               ];
    }

    //get check num in that line;
    function getCheckNum(board, startR, startC, slope){
        var checkNum = 0;
        if(slope === 0){
            for(var i=0; i<8; i++){
                if(board[startR][startC+i] !== '') {checkNum++;}
            }
        }
        else if(slope === 2){
            for(var i=0; i<8; i++){
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
        	while(startR !== -1 && startC !== 8){
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
                if(brow >= bcol){
                    startR = brow-bcol;
                    startC = 0;
                }
                else{
                    startR = 0;
                    startC = bcol-brow;
                }
            }
            else {
                if((brow+bcol)>=7){
                    startR = 7;
                    startC = brow+bcol-7;
                }
                else{
                    startR = brow+bcol;
                    startC = 0;
                }
            }
        }
        //console.log("startR: " + startR + "startC: " + startC);
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
    
    function getExampleMoves(initialTurnIndex, initialState, arrayOfRowColComment) {
        var exampleMoves = [];
        var state = initialState;
        var turnIndex = initialTurnIndex;
        for (var i = 0; i < arrayOfRowColComment.length; i++) {
          var rowColComment = arrayOfRowColComment[i];
          var move = createMove(state.board, rowColComment.brow, rowColComment.bcol, rowColComment.arow, rowColComment.acol, turnIndex);
          var stateAfterMove = {board : move[1].set.value, delta: move[2].set.value};
          
          exampleMoves.push({
            stateBeforeMove: state,
            stateAfterMove: stateAfterMove,
            turnIndexBeforeMove: turnIndex,
            turnIndexAfterMove: 1 - turnIndex,
            move: move,
            comment: {en: rowColComment.comment}});
            
          state = stateAfterMove;
          turnIndex = 1 - turnIndex;
        }
        return exampleMoves;
    }
    
    
    function getRiddles() {
    	return getExampleMoves(1, {board:
            [['W', '', '', '', 'R', '', '', ''],
             ['W', 'W', 'W', '', '', '', '', ''],
             ['W', 'R', 'W', 'R', '', '', '', ''],
             ['W', '', 'R', '', '', '', '', 'R'], 
             ['W', '', '', 'R', '', 'W', '', ''],
             ['W', '', 'W', '', '', '', '', ''], 
             ['', '', 'W', 'R', '', '', '', ''], 
             ['', 'R', 'R', 'R', 'R', 'R', '', '']], 
             delta: {brow: 0, bcol: 0, arow: 0, acol: 0}}, 
             [
          {brow: 0, bcol: 4, arow: 2, acol: 4, comment: "find the position for red where he could win the game"},
          {brow: 4, bcol: 5, arow: 2, acol: 5, comment: "white moves (4,5) to (2,5)"},
          {brow: 7, bcol: 5, arow: 5, acol: 3, comment: "red moves (7,5) to (5,3)"},
          {brow: 2, bcol: 5, arow: 1, acol: 4, comment: "white moves (2,5) to (1,4)"},
          {brow: 3, bcol: 7, arow: 3, acol: 4, comment: "red moves (3,7) to (3,4), red wins"}
        ]);
      }
    

    function getExampleGame() {
        return getExampleMoves(0, {board:
            [['', 'R', 'R', 'R', 'R', 'R', 'R', ''],
             ['W', '', '', '', '', '', '', 'W'],
             ['W', '', '', '', '', '', '', 'W'],
             ['W', '', '', '', '', '', '', 'W'], 
             ['W', '', '', '', '', '', '', 'W'],
             ['W', '', '', '', '', '', '', 'W'], 
             ['W', '', '', '', '', '', '', 'W'], 
             ['', 'R', 'R', 'R', 'R', 'R', 'R', '']], 
             delta: {brow: 0, bcol: 0, arow: 0, acol: 0}}, 
             [
          {brow: 1, bcol: 0, arow: 1, acol: 2, comment: "The classic opening: white moves (1,0) to (1,2)"},
          {brow: 0, bcol: 3, arow: 2, acol: 3, comment: "red moves (0,2) to (2,3)"},
          {brow: 1, bcol: 2, arow: 4, acol: 2, comment: "white moves (1,2) to (4,2)"},
          {brow: 0, bcol: 1, arow: 3, acol: 4, comment: "red moves (0,1) to (3,4)"},
          {brow: 6, bcol: 0, arow: 6, acol: 2, comment: "white moves (6,0) to (6,2)"},
          {brow: 0, bcol: 5, arow: 3, acol: 2, comment: "red moves (0,5) to (3,2)"},
          {brow: 5, bcol: 0, arow: 5, acol: 2, comment: "white moves (5,0) to (5,2)"},
          {brow: 0, bcol: 2, arow: 2, acol: 4, comment: "red moves (0,2) to (2,4)"},
          {brow: 6, bcol: 7, arow: 6, acol: 5, comment: "white moves (6,7) to (6,5)"},
          {brow: 0, bcol: 4, arow: 2, acol: 6, comment: "red moves (0,4) to (2,6)"},
          {brow: 5, bcol: 7, arow: 0, acol: 7, comment: "white moves (5,7) to (0,7)"},
          {brow: 0, bcol: 6, arow: 3, acol: 6, comment: "red moves (0,6) to (3,6)"},
          {brow: 0, bcol: 7, arow: 0, acol: 6, comment: "white moves (0,7) to (0,6)"},
          {brow: 3, bcol: 6, arow: 6, acol: 3, comment: "red moves (3,6) to (6,3)"},
          {brow: 6, bcol: 5, arow: 4, acol: 5, comment: "white moves (6,5) to (4,5)"},
          {brow: 2, bcol: 6, arow: 2, acol: 1, comment: "red moves (2,6) to (2,1)"},
          {brow: 4, bcol: 7, arow: 3, acol: 6, comment: "white moves (4,7) to (3,6)"},
          {brow: 7, bcol: 6, arow: 4, acol: 3, comment: "red moves (7,6) to (4,3)"},
          {brow: 2, bcol: 0, arow: 5, acol: 0, comment: "white moves (2,0) to (5,0)"},
          {brow: 7, bcol: 5, arow: 5, acol: 3, comment: "red moves (7,5) to (5,3), red wins!"}
        ]);
      }
  
    //params: {turnIndexBeforeMove: 0,
    //         stateBeforeMove: {},
    //         move: []
    function isMoveOK(params){
        var move = params.move;
        var turnIndexBeforeMove = params.turnIndexBeforeMove;
        var stateBeforeMove = params.stateBeforeMove;
        try{
            var brow = move[2].set.value.brow;
            var bcol = move[2].set.value.bcol;
            var arow = move[2].set.value.arow;
            var acol = move[2].set.value.acol;
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
    /*
    //test the example game;
    var moves = getExampleGame();
    for(var i=0; i<moves.length; i++){
    	var move = {
    			turnIndexBeforeMove: moves[i].turnIndexBeforeMove,
    			stateBeforeMove: moves[i].stateBeforeMove,
    			move: moves[i].move
    	}
    	console.log(isMoveOK(move));
    }
    
    //test the riddle;
    moves = getRiddles();
    for(var i=0; i<moves.length; i++){
    	var move = {
    			turnIndexBeforeMove: moves[i].turnIndexBeforeMove,
    			stateBeforeMove: moves[i].stateBeforeMove,
    			move: moves[i].move
    	}
    	console.log(isMoveOK(move));
    }
    */
    
    return {isMoveOK: isMoveOK, getExampleGame: getExampleGame, getRiddles: getRiddles};
})();



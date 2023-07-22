const redPlayer = 'R';
const yellowPlayer = 'Y';
let currentPlayer = redPlayer;
let gameOver = false;
let board = [];
const rows = 6;
const columns = 7;
let columnLevel = [5, 5, 5, 5, 5, 5, 5];

let redScore = 0;
let yellowScore = 0;

setBoard(); 

function playAgain() {
    gameOver = false;
    board = [];
    columnLevel = [5, 5, 5, 5, 5, 5, 5];
    currentPlayer = redPlayer;
    document.querySelector('.current').innerText = `Current player is Red`;
    document.querySelector('div.grid').innerHTML = null;
    document.querySelector('.winner').innerHTML = null;
    document.querySelector('.current').classList.add('is-red');
    document.querySelector('.current').classList.remove('is-yellow');
    setBoard();
 }

function setBoard() {
   for (let r = 0; r < rows; r++) {
       let row = [];
       for(let c= 0; c < columns; c++) {
          row.push(' ');
          const div = document.createElement('div');
          div.id = r.toString() + '-' + c.toString();
          div.classList.add('piece');
          div.addEventListener('click', setPiece);
          document.querySelector('div.grid').append(div);
       }    
       board.push(row);
   }

   document.querySelector('button').addEventListener('click', function() {
       isshowPlayAgainButton(false);
       playAgain();
   });
}

function setPiece() {
    if(gameOver) return;
 
    const coordinates = this.id.split('-');
    let rC = parseInt(coordinates[0]);
    let cC = parseInt(coordinates[1]);

    rC = columnLevel[cC];
    board[rC][cC] = currentPlayer;

    if(currentPlayer == redPlayer) {
        document.getElementById(rC.toString() + '-' + cC.toString()).classList.add('red');
        document.querySelector('.current').classList.remove('is-red');
        document.querySelector('.current').classList.add('is-yellow');
        currentPlayer = yellowPlayer;
        changeCurrentPlayerDisplay()
    } else {
        document.getElementById(rC.toString() + '-' + cC.toString()).classList.add('yellow');
        currentPlayer = redPlayer;
        changeCurrentPlayerDisplay();
        document.querySelector('.current').classList.add('is-red');
        document.querySelector('.current').classList.remove('is-yellow');
    }

    rC-= 1;
    columnLevel[cC] = rC;
    checkWinner();
}

function checkForTie() {
   const checkValue = columnLevel.filter(e => e>0);
   if(checkValue.length === 0) {
     gameOver = true;
     isshowPlayAgainButton(true);
     document.querySelector('.current').innerHTML = null;
     document.querySelector('.winner').innerHTML = 'Tie';
   }
}

function checkWinner() {
    //horizontal
    for(let r =0; r< rows; r++) {
       for(let c =0; c< columns - 3; c++) {
          if(board[r][c] !== ' ') {
             if(board[r][c] === board[r][c+1] && board[r][c+1] === board[r][c+2] &&board[r][c+2] === board[r][c+3]) {
                setWinner(r,c);
                return;
             }
          }
       }
    }

    for(let c =0; c< columns; c++) {
        for(let r =0; r< rows - 3; r++) {
            if(board[r][c] !== ' ') {
               if(board[r][c] === board[r+1][c] && board[r+1][c] === board[r+2][c] && board[r+2][c] === board[r+3][c]){
                   setWinner(r,c);
                   return;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
           if(board[r][c] !== ' ') {
              if(board[r][c] === board[r+1][c+1] && board[r+1][c+1] === board[r+2][c+2] && board[r+2][c+2] === board[r+3][c+3]) {
                setWinner(r,c);
                return;
              }
           }            
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if(board[r][c] !== ' ') {
                if(board[r][c] === board[r-1][c+1] && board[r-1][c+1] === board[r-2][c+2] && board[r-2][c+2] === board[r-3][c+3]) {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //tie
    checkForTie()
}

function setWinner(r,c) {
    document.querySelector('.winner').innerText = board[r][c] === 'R'? 'Red wins' : 'Yellow Wins';
    setScore(board[r][c]);
    gameOver = true;
    isshowPlayAgainButton(true);
    document.querySelector('.current').innerHTML = null;
}

function isshowPlayAgainButton(value) {
  value? document.querySelector('button').classList.remove('hide') : document.querySelector('button').classList.add('hide')
}

function setScore(winnerLetter) {
  if(winnerLetter === 'R') {
    redScore++;
    document.querySelector('.score-left').innerHTML = `${redScore}`;
  } else {
    yellowScore++;
    document.querySelector('.score-right').innerHTML = `${yellowScore}`;
  }
}

function changeCurrentPlayerDisplay() {
    if(currentPlayer == redPlayer) {
        document.querySelector('.current').innerText = `Current player is Red`;
    } else {
        document.querySelector('.current').innerText = `Current player is Yellow`;
    }
}


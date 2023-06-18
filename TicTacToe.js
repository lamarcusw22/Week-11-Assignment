// Game variables
let currentPlayer = 'X';
let moves = 0;
let gameEnded = false;
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// Function to handle cell click
function makeMove(row, col) {
  if (gameEnded || board[row][col] !== '') return;
  
  board[row][col] = currentPlayer;
  event.target.innerText = currentPlayer;
  event.target.classList.add(currentPlayer);
  moves++;

  if (checkWin(row, col)) {
    announceWinner();
    return;
  }

  if (moves === 9) {
    announceDraw();
    return;
  }

  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  document.getElementById('turn').innerText = "It's " + currentPlayer + "'s turn";
}

// Function to check if a player has won
function checkWin(row, col) {
  // Check row for win
  if (board[row][0] === currentPlayer && board[row][1] === currentPlayer && board[row][2] === currentPlayer) {
    return true;
  }

  // Check column for win
  if (board[0][col] === currentPlayer && board[1][col] === currentPlayer && board[2][col] === currentPlayer) {
    return true;
  }

  // Check diagonals for win
  if ((board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) ||
      (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer)) {
    return true;
  }

  return false;
}

// Function to announce the winner
function announceWinner() {
  gameEnded = true;
  document.getElementById('turn').innerText = '';
  document.getElementById('result').innerText = currentPlayer + ' wins!';
  document.getElementById('result').classList.remove('hidden');
}

// Function to announce a draw
function announceDraw() {
  gameEnded = true;
  document.getElementById('turn').innerText = '';
  document.getElementById('result').innerText = 'It\'s a draw!';
  document.getElementById('result').classList.remove('hidden');
}

// Function to restart the game
function restartGame() {
  currentPlayer = 'X';
  moves = 0;
  gameEnded = false;
  board.forEach(row => row.fill(''));
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('X', 'O');
  });
  document.getElementById('turn').innerText = "It's X's turn";
  document.getElementById('result').innerText = '';
  document.getElementById('result').classList.add('hidden');
}

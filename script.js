const board = document.getElementById('board');
const winnerDisplay = document.getElementById('winner');
const restartBtn = document.getElementById('restartBtn'); // Restart Button
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Create the game board
function renderBoard() {
    board.innerHTML = '';
    gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        if (value) cell.classList.add('taken');
        cell.textContent = value;
        cell.addEventListener('click', () => makeMove(index));
        board.appendChild(cell);
    });
}

// Handle player move
function makeMove(index) {
    if (!gameBoard[index]) {
        gameBoard[index] = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        renderBoard();
    }
}

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winnerDisplay.textContent = `${gameBoard[a]} Wins!`;
            board.style.pointerEvents = 'none';
            return;
        }
    }

    if (!gameBoard.includes('')) {
        winnerDisplay.textContent = "It's a Draw!";
    }
}

// Restart the game
restartBtn.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    winnerDisplay.textContent = '';
    board.style.pointerEvents = 'auto';
    renderBoard();
});

// Initialize the game
renderBoard();

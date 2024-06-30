// script.js

const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');
const twoPlayersBtn = document.getElementById('twoPlayersBtn');
const aiPlayerBtn = document.getElementById('aiPlayerBtn');
const playerInfo = document.getElementById('playerInfo');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let playWithAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    handleResultValidation();

    if (playWithAI && gameActive && currentPlayer === 'O') {
        handleAIMove();
    }
}

function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.innerHTML = `Player ${currentPlayer} has won!`;
        gameStatus.style.color = '#4caf50';
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        gameStatus.innerHTML = 'Game ended in a draw!';
        gameStatus.style.color = '#ff9800';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
    gameStatus.style.color = '#f44336';
}

function handleResetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
    gameStatus.style.color = '#f44336';
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

function handleAIMove() {
    let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = 'O';
    document.querySelector(`.cell[data-index='${randomIndex}']`).innerHTML = 'O';
    handleResultValidation();
}

function startTwoPlayerGame() {
    playWithAI = false;
    playerInfo.innerHTML = 'Player 1 (X) vs Player 2 (O)';
    playerInfo.style.color = '#3f51b5';
    handleResetGame();
}

function startAIGame() {
    playWithAI = true;
    playerInfo.innerHTML = 'Player (X) vs AI (O)';
    playerInfo.style.color = '#3f51b5';
    handleResetGame();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', handleResetGame);
twoPlayersBtn.addEventListener('click', startTwoPlayerGame);
aiPlayerBtn.addEventListener('click', startAIGame);
gameStatus.innerHTML = `It's ${currentPlayer}'s turn`;
gameStatus.style.color = '#f44336';

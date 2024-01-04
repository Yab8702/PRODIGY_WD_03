const board = document.getElementById("board");
const cells = [];
const winMessage = document.getElementById("winMessage");
const resetButton = document.getElementById("resetButton");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Initialize the game board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  cell.addEventListener("click", handleCellClick);
  cells.push(cell);
  board.appendChild(cell);
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const index = clickedCell.dataset.index;

  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    updateCell(clickedCell);
    checkWinner();
    switchPlayer();
  }
}

function updateCell(cell) {
  const index = cell.dataset.index;
  cell.textContent = gameBoard[index];
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      displayWinner(currentPlayer);
      return;
    }
  }

  if (!gameBoard.includes("")) {
    displayDraw();
  }
}

function displayWinner(player) {
  winMessage.textContent = `${player} wins!`;
  winMessage.style.color = player === "X" ? "#e74c3c" : "#3498db";
  gameActive = false;
  resetButton.style.display = "block";
}

function displayDraw() {
  winMessage.textContent = "It's a draw!";
  winMessage.style.color = "#2c3e50";
  gameActive = false;
  resetButton.style.display = "block";
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  winMessage.textContent = "";
  winMessage.style.color = "";
  resetButton.style.display = "none";

  cells.forEach((cell) => {
    cell.textContent = "";
  });
}

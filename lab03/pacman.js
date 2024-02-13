const gameBoardElement = document.getElementById("game-board");
let score = 0;
let gameBoard = createGame(10);
renderGameBoard(gameBoard);

// Attach keydown event to move Pac-Man
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    } else if (event.key === "ArrowRight") {
        moveRight();
    }
    renderGameBoard();
    checkLevelCompletion();
});

function createGame(n) {
    let board = new Array(n).fill(".");
    let pacmanIndex = Math.floor(n / 2);
    board[pacmanIndex] = "C";
    // Place fruit and ghost at random positions different from Pacman
    let fruitIndex, ghostIndex;
    do {
        fruitIndex = Math.floor(Math.random() * n);
        ghostIndex = Math.floor(Math.random() * n);
    } while (
        fruitIndex === pacmanIndex ||
        ghostIndex === pacmanIndex ||
        fruitIndex === ghostIndex
    );

    board[fruitIndex] = "@";
    board[ghostIndex] = "^";
    return board;
}

function moveLeft() {
    let pacmanIndex = gameBoard.indexOf("C");
    if (pacmanIndex > 0) {
        gameBoard[pacmanIndex] = ".";
        if (gameBoard[pacmanIndex - 1] === ".") {
            gameBoard[pacmanIndex - 1] = "C";
        } else {
            eatPellet(pacmanIndex - 1);
        }
    }
}

function moveRight() {
    let pacmanIndex = gameBoard.indexOf("C");
    if (pacmanIndex < gameBoard.length - 1) {
        gameBoard[pacmanIndex] = ".";
        if (gameBoard[pacmanIndex + 1] === ".") {
            gameBoard[pacmanIndex + 1] = "C";
        } else {
            eatPellet(pacmanIndex + 1);
        }
    }
}

function eatPellet(index) {
    if (gameBoard[index] === ".") {
        score += 10; // Update score for pellet
    } else if (gameBoard[index] === "@") {
        score += 50; // Update score for fruit
    }
    gameBoard[index] = "C"; // Move Pac-Man to the new position
}

function checkLevelCompletion() {
    if (!gameBoard.includes(".")) {
        // No more pellets
        alert("Level completed! Score: " + score);
        gameBoard = createGame(gameBoard.length); // Create a new level
        score = 0; // Reset score for the new level
    }
}

function renderGameBoard() {
    gameBoardElement.innerText = gameBoard.join(" ");
}

// Move the ghost
setInterval(moveGhost, 2000);

function moveGhost() {
    let ghostIndex = gameBoard.indexOf("^");
    let direction = Math.random() < 0.5 ? -1 : 1; // Randomly choose left or right
    let newIndex = ghostIndex + direction;
    // Check boundaries and move ghost
    if (
        newIndex >= 0 &&
        newIndex < gameBoard.length &&
        gameBoard[newIndex] !== "C"
    ) {
        gameBoard[ghostIndex] = ".";
        gameBoard[newIndex] = "^";
    }
    renderGameBoard();
}

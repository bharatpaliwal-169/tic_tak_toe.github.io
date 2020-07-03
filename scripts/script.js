const statusDisplay = document.querySelector('.game--status');

var gameActive = true;

var currentPlayer = 'X';
// game board
var gameState = ["", "", "",
                 "", "", "", 
                 "", "", ""];

const winningMessage = () => `Player ${currentPlayer} won!`;
const drawMessage = () => `It's a Tie!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn `;

// display what's going on in game......

statusDisplay.innerHTML = currentPlayerTurn();

// 8 possible wins ....
const winningConditions = [
    [0, 1, 2],  //rows
    [3, 4, 5],  //rows
    [6, 7, 8],  //rows
    [0, 3, 6],  //columns
    [1, 4, 7],  //columns
    [2, 5, 8],  //col
    [0, 4, 8],  //d1
    [2, 4, 6]   //d2
];

//  rest it will be draw or lose

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}


//change the player & it chance.... 
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


//check if we have winner or its tie
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}


function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//complette game restart......
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--reset').addEventListener('click', handleRestartGame);
// _____________________________END GAME___________________________


function like() {
    const test = document.getElementById('liked').innerHTML;

    if(test === 'Liked!'){
        document.getElementById('liked').innerHTML = 'Like';
    }
    else{
        document.getElementById('liked').innerHTML = 'Liked!';
    }
}


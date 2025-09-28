// Tic Tac Toe game

const cells = document.querySelectorAll('.cell');
const gameText = document.querySelector('#gameText');
const restartBtn = document.querySelector('#restartBtn');
const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    gameText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    gameText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++) {
       const condition = winConditions[i];
       const cellA = options[condition[0]];
       const cellB = options[condition[1]];
       const cellC = options[condition[2]];

       if(cellA == "" || cellB == "" || cellC == "") {
        continue;
       }
       if(cellA == cellB && cellB == cellC) {
        roundWon = true;
        break;
       }
    } 
    if(roundWon) {
        gameText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        gameText.textContent = 'Draw!';
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    gameText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

// prime number helpers

function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for( let i = 5; i * i <= n; i += 6) {
        if ( n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

function nextPrime(n) {
    if (n <= 1) {
        return 2;
    }
    let prime = n;
    let found = false;
    while (!found) {
        prime++;
        if (isPrime(prime)) {
            found = true;
        }
    }
    return prime; 
}

function findPrimes (lo, hi) {
    let primes = [];
    for (let num = lo; num <= hi; num++) {
        if (isPrime(num)) {
            primes.push(num);
        }
    }
    return primes;
}
function isPrimes(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}


// test the functions
console.log(isPrime(29));
console.log(isPrime(1));
console.log(nextPrime(13));
console.log(nextPrime(30));
console.log(findPrimes(10, 20));
console.log(findPrimes(22, 22));
console.log(findPrimes(20, 10));

debugger
// password strenght
let btnCheck = document.querySelector(`button`);
let input = document.querySelector(`input`);
let result = document.querySelector(`h1`);

let maxLength = 20;
let minLength = 10;

let lowerMinCount = 3;
const LOWER_REGEX = /[a-z]/g;

let upperMinCount = 3;
const UPPER_REGEX = /[A-Z]/g;

let numMinCount = 2;
const NUM_REGEX = /[0-9]/g;

let specialMinCount = 2;
const SPECIAL_REGEX = /[!@#$%^&*(),.?":{}|<>]/g;

btnCheck.addEventListener(`click`, checkPassword);

function checkPassword() {
    let password = input.value;

    if(password.length > maxLength) {
        result.textContent = `password is too long`;
        return;
    }

    result.textContent = isStrongPassword(password) ? `STRONG` : `WEAK`;
}

function isStrongPassword(password) {
    let upperMatch = password.match(UPPER_REGEX) || [];
    let lowerMatch = password.match(LOWER_REGEX) || [];
    let numMatch = password.match(NUM_REGEX) || [];
    let specialMatch = password.match(SPECIAL_REGEX) || [];

    return password.length >= minLength &&
        upperMatch.length >= upperMinCount &&
        lowerMatch.length >= lowerMinCount &&
        numMatch.length >= numMinCount &&
        specialMatch.length >= specialMinCount;
}

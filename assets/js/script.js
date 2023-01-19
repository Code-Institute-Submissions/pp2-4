/* jshint esversion: 6 */

import {allowedWords, answerWords} from './words.js';


let guesses = 0;
let currentRowLetters = 0;
let isGameOver = false;
let keyboard;
let answer = generateAnswer();

document.addEventListener("DOMContentLoaded", function() {
    initializeTable();
    initializeKeyboard();

    keyboard = document.getElementById("keyboard");

    document.addEventListener("keydown", function(event) {
        if (!event.repeat) handleKeyInput(event.key);
    });

    // add event listeners to onscreen keyboard keys
    let keys = document.getElementsByClassName("keyboard-key");
    for (let key of keys) {
        key.addEventListener("click", function() {
            handleKeyInput(this.dataset.key);
        });
    }
});


function initializeTable() {
    const board = document.getElementById("game-board");

    for (let i = 0; i < 6; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "board-row");

        for (let j = 0; j < 5; j++) {
            const cellDiv = document.createElement("div");
            cellDiv.setAttribute("class", "board-letter");

            rowDiv.appendChild(cellDiv);
        }

        board.appendChild(rowDiv);
    }
}

function initializeKeyboard() {
    const keyboard = document.getElementById("keyboard");
    const letterRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    for (let letterRow of letterRows) {
        const rowDiv = document.createElement("div");
        rowDiv.setAttribute("class", "keyboard-row");
        
        for (let letter of letterRow) {
            const key = document.createElement("button");
            key.setAttribute("class", "keyboard-key");
            key.setAttribute("data-key", `${letter}`);
            key.textContent = letter;
            
            rowDiv.appendChild(key);
        }
        
        keyboard.appendChild(rowDiv);
    }

    const enterKey = document.createElement("button");
    enterKey.setAttribute("class", "keyboard-key");
    enterKey.setAttribute("id", "key-enter");
    enterKey.setAttribute("data-key", "Enter");
    enterKey.textContent = "Enter";

    const backspaceKey = document.createElement("button");
    backspaceKey.setAttribute("class", "keyboard-key");
    backspaceKey.setAttribute("id", "key-backspace");
    backspaceKey.setAttribute("data-key", "Backspace");
    backspaceKey.innerHTML = "<i class='fa-solid fa-delete-left'></i>";

    const lastRow = keyboard.children[2];
    lastRow.insertBefore(enterKey, lastRow.firstChild);
    lastRow.appendChild(backspaceKey);
}


function handleKeyInput(key) {
    if (isGameOver) return;

    // a guess is only allowed if a 5 letter word is entered
    if (key === "Enter" && currentRowLetters == 5) {
        makeGuess();
    }
    else if (key === "Backspace" && currentRowLetters > 0) {
        let prevCell = getCell(guesses, currentRowLetters - 1);
        prevCell.innerHTML = "";
        currentRowLetters--;
    }
    // only allow letter keys, and only when the current row isn't full
    else if (/^[a-z]$/i.test(key) && currentRowLetters < 5) {
        let cell = getCell(guesses, currentRowLetters);
        cell.dataset.key = key.toLowerCase();
        cell.innerHTML = key.toLowerCase();
        currentRowLetters++;
    }
}


function getCell(row, column) {
    let curRow = document.getElementsByClassName("board-row")[row];
    let curCell = curRow.children[column];

    return curCell;
}


function showNotification(text) {
    console.log(text);
}


function makeGuess() {
    let curRow = document.getElementsByClassName("board-row")[guesses];
    let correctLetters = 0;

    let guess = "";
    for (let cell of curRow.children) {
        guess += cell.dataset.key;
    }

    if (!allowedWords.includes(guess) && !answerWords.includes(guess)) {
        showNotification("Not a valid word");
        return;
    }

    let answerCopy = answer.slice();
    for (let i = 0; i < guess.length; i++) {
        let cell = curRow.children[i];
        let letter = guess[i];
        // https://stackoverflow.com/a/62872204/12317855
        let keyboardKey = keyboard.querySelector(`[data-key="${letter}"]`);
        
        let answerIndex = answerCopy.indexOf(letter);

        // guessed letter wasn't found in answer
        if (answerIndex === -1) {
            cell.classList.add("incorrect-letter");
            keyboardKey.classList.add("incorrect-letter");
            continue;
        }
        // guessed letter is in the correct position
        else if (letter === answer[i]) {
            correctLetters++;
            cell.classList.add("correct-letter");
            keyboardKey.classList.add("correct-letter");
        }
        // guessed letter is present in the answer, but in the wrong position
        else {
            cell.classList.add("present-letter");
            keyboardKey.classList.add("present-letter");
        }

        // if execution gets here, the letter is in the answer in some position, so it
        // must be removed from the answer so as not to be marked correct more than once.
        let tmpArray = answerCopy.split('');
        tmpArray.splice(answerIndex, 1);
        answerCopy = tmpArray.join('');
    }

    guesses++;
    currentRowLetters = 0;
    if (guesses === 6 || correctLetters === 5) isGameOver = true;
}


function generateAnswer() {
    let answerIndex = Math.floor(Math.random() * answerWords.length);
    return answerWords[answerIndex];
}


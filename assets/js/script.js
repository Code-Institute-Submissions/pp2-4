import {allowedWords, answerWords} from './words.js';


let guesses = 0;
let currentRowLetters = 0;
let isGameOver = false;
let board;


document.addEventListener("DOMContentLoaded", function() {
    initializeTable();
    initializeKeyboard();

    board = document.getElementById("game-board");

    document.addEventListener("keydown", function(event) {
        handleKeyInput(event.key);
    });

    // add event listeners to onscreen keyboard keys
    let keys = document.getElementsByClassName("keyboard-key");
    for (let key of keys) {
        key.addEventListener("click", function() {
            handleKeyInput(this.dataset.key);
        })
    }

});


function initializeTable() {
    let board = document.getElementById("game-board");

    // https://stackoverflow.com/a/27646877/12317855
    let htmlBuffer = [];
    htmlBuffer.push("<tbody>");
    for (let i = 0; i < 6; i++) {
        htmlBuffer.push("<tr>");
        for (let j = 0; j < 5; j++) {
            htmlBuffer.push("<td></td>");
        }
        htmlBuffer.push("</tr>");
    }
    htmlBuffer.push("</tbody>");

    board.innerHTML = htmlBuffer.join("\n");
}

function initializeKeyboard() {
    let keyboard = document.getElementById("keyboard");
    const letterRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    // https://stackoverflow.com/a/34337004/12317855
    for (let [index, letterRow] of letterRows.entries()) {
        let htmlBuffer = [];
        htmlBuffer.push("<div class='keyboard-row'>");
        
        if (index === 2) {
            htmlBuffer.push("<button class='keyboard-key' id='key-enter' data-key='Enter'>Enter</button>")
        } 
        for (let letter of letterRow) {
            htmlBuffer.push(`<button class='keyboard-key letter-key' data-key='${letter}'>${letter}</button>`);
        }
        if (index === 2) {
            htmlBuffer.push("<button class='keyboard-key' id='key-backspace' data-key='Backspace'><i class='fa-solid fa-delete-left'></i></button>");
        }
        htmlBuffer.push("</div>");
        
        keyboard.innerHTML += htmlBuffer.join("\n");
    }
}


function handleKeyInput(key) {
    if (isGameOver) return;

    console.log("key input:", key);

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
        cell.innerHTML = key.toLowerCase();
        currentRowLetters++;
    }
}


function getCell(row, column) {
    let tBody = board.children[0];
    let curRow = tBody.children[row];
    let curCell = curRow.children[column];

    return curCell;
}


function makeGuess() {
    guesses++;
    currentRowLetters = 0;

    if (guesses === 6) isGameOver = true;
}


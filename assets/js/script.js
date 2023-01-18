import {allowedWords, answerWords} from './words.js';


let guesses = 0;
let currentRowLetters = 0;
let isGameOver = false;
let board;


document.addEventListener("DOMContentLoaded", function() {
    initializeTable();
    initializeKeyboard();

    board = document.getElementById("game-board");

    // add event listeners
    document.addEventListener("keydown", handleKeyInput)

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
            htmlBuffer.push("<button class='keyboard-key' id='key-enter'>Enter</button>")
        } 
        for (let letter of letterRow) {
            htmlBuffer.push(`<button class='keyboard-key'>${letter}</button>`);
        }
        if (index === 2) {
            htmlBuffer.push("<button class='keyboard-key' id='key-backspace'><i class='fa-solid fa-delete-left'></i></button>");
        }
        htmlBuffer.push("</div>");
        
        keyboard.innerHTML += htmlBuffer.join("\n");
    }
}


function handleKeyInput(event) {
    if (isGameOver) return;

    // a guess is only allowed if a 5 letter word is entered
    if (event.key === "Enter" && currentRowLetters == 5) {
        makeGuess();
        return;
    }

    if (event.key === "Backspace" && currentRowLetters > 0) {
        let prevCell = getCell(guesses, currentRowLetters - 1);
        prevCell.innerHTML = "";
        currentRowLetters--;
        return;
    }

    // only allow letter keys
    const key = event.key.toLowerCase();
    if (!/^[a-z]$/.test(key)) return;

    // if the current row is full the letter input shouldn't go through
    if (currentRowLetters >= 5) return;

    let cell = getCell(guesses, currentRowLetters);
    cell.innerHTML = key;
    currentRowLetters++;
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


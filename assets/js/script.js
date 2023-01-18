import {allowedWords, answerWords} from './words.js';


let guesses = 0;
let currentRowLetters = 0;
let isGameOver = false;
let board;


document.addEventListener("DOMContentLoaded", function() {
    initializeTable();

    board = document.getElementById("game-board");

    // add event listeners
    document.addEventListener("keydown", handleKeyInput)

});


function initializeTable() {
    let main = document.getElementsByTagName("main")[0];

    // https://stackoverflow.com/a/27646877/12317855
    let htmlBuffer = [];
    htmlBuffer.push("<table id='game-board'>");
    htmlBuffer.push("<tbody>");
    for (let i = 0; i < 6; i++) {
        htmlBuffer.push("<tr>");
        for (let j = 0; j < 5; j++) {
            htmlBuffer.push("<td></td>");
        }
        htmlBuffer.push("</tr>");
    }
    htmlBuffer.push("</tbody>");
    htmlBuffer.push("</table>");
    console.log(htmlBuffer);

    main.innerHTML = htmlBuffer.join("\n");
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


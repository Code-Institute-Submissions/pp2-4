import words from './words.js';


document.addEventListener("DOMContentLoaded", function() {
    initializeTable();
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
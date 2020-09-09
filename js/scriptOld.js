var answerLine; // element text to var
var answerLineArr; // turn string var to char array
var solutionLine; // element text to var
var solutionLineArr; // turn string var to char array
var solutionLineLastIndex; // index of the "last" char (two chars before the =)
var solutionLineLastChar; // char specified at index
var numberElements; // array of elements under class 'numbers'
var doesPeriodExist = false; // bool to check if period already exists
var doesNumberExist = false; // bool to check if number exists; for use with leading zero check
var plusSign = String.fromCharCode(43); // plus
var minusSign = String.fromCharCode(45); // hyphen
var timesSign = String.fromCharCode(215); // times
var divideSign = String.fromCharCode(247); // divide
var operations = [plusSign, minusSign, timesSign, divideSign];

console.log(operations);

document.getElementById("answer-text-value").textContent = "";
document.getElementById("solution-text-value").textContent = "0 =";

function updateValues() {
    answerLine = document.getElementById("answer-text-value").textContent;
    solutionLine = document.getElementById("solution-text-value").textContent;
    solutionLineArr = Array.from(solutionLine); // turn solutionLine to char array for easy manipulation
    solutionLineLastIndex = solutionLineArr.length - 3; // index of the last char (before ' ' and  '=')
    solutionLineLastChar = solutionLineArr[solutionLineLastIndex];
}

function updateScreen() {
    solutionLine = solutionLineArr.join(""); // turns solutionLineArr back into String
    document.getElementById("answer-text-value").textContent = answerLine;
    document.getElementById("solution-text-value").textContent = solutionLine;
}

// CLEAR BUTTON
document.getElementById("clear").addEventListener("click", function() {
    updateValues();

    if(solutionLineArr.length === 3) { // if last number
        solutionLineArr.splice(0, 1, "0"); // clear everything/clear array
    } else {
        if(solutionLineLastChar === " ") {
            solutionLineArr.splice(solutionLineLastIndex - 1, 2); // delete the last non-space char including the space after it
        } else {
            solutionLineArr.splice(solutionLineLastIndex, 1); // delete last non-space char
        }
    }

    answerLine = "";
    updateScreen();
});

// CLEAR ENTRY BUTTON
document.getElementById("clear-entry").addEventListener("click", function() {
    updateValues();

    solutionLineArr.length = 0; // clear solutionLine
    //answerLineArr.length = 0; // clear answerLine
    writeChar(0, "clear-entry"); // initialize a default format " ="

    updateScreen();
});

// PERIOD BUTTON
document.getElementById("dot").addEventListener("click", writePeriod);

function writePeriod() {
    updateValues();
    
    if(solutionLineLastChar != "." && doesPeriodExist == false) {
        writeChar(".", "dot");
        doesPeriodExist = true;
        console.log("writePeriod");
    }
}

// NUMBER BUTTONS
Array.from(document.getElementsByClassName("number")).forEach(function(element) {
    element.addEventListener('click', writeNumber); // give each element in class "number" an eventlistener leading to writeNumber
});

function writeNumber() { // thank god for event.target.id
    var activeNum;

    updateValues();

    console.log(event.target.id);
    switch(event.target.id) {
        case "one":
            activeNum = 1;
            break;
        case "two":
            activeNum = 2;
            break;
        case "three":
            activeNum = 3;
            break;
        case "four":
            activeNum = 4;
            break;
        case "five":
            activeNum = 5;
            break;
        case "six":
            activeNum = 6;
            break;
        case "seven":
            activeNum = 7;
            break;
        case "eight":
            activeNum = 8;
            break;
        case "nine":
            activeNum = 9;
            break;
        case "zero":
            activeNum = 0;
            break;
        default:
            activeNum = 69;
            break;
    }

    //TODO add functionality to avoid leading zeroes and functionality for single periods only
    writeChar(activeNum, "number");
    updateScreen();
}

// ZERO BUTTON
document.getElementById("zero").addEventListener("click", writeZero);

function writeZero() {
    updateValues();

    writeChar(0, event.target.className);

    updateScreen();
}

// OPERATION BUTTONS
Array.from(document.getElementsByClassName("operation")).forEach(function(element){
    element.addEventListener("click", writeOperation);
});

function writeOperation() {
    var activeOperation;
    
    updateValues();

    switch(event.target.id) {
        case "plus":
            activeOperation = plusSign;
            break;
        case "minus":
            activeOperation = minusSign;
            break;
        case "times":
            activeOperation = timesSign;
            break;
        case "divide":
            activeOperation = divideSign;
            break;
        default:
            activeOperation = "?";
            break;
    }

    writeChar(activeOperation, "operation");
    updateScreen();
}

// CALLED WHEN WRITING ANY CHAR

function writeChar(myChar, charClass) {
    updateValues();
    
    if(charClass == "number") {
        solutionLineArr.push(myChar);
    } else if(charClass == "operation") {

    }

    updateScreen();
}

function checkForOperation() {
    if(operations.includes(solutionLineLastChar)) {
        solutionLineLastChar.splice(solutionLine);
    }
}

/* rewriting for better readability
function writeChar(myChar) {

    if(solutionLineArr.length < 3 && operations.includes(solutionLineLastChar)) { // if nothing on screen and number pressed, initialize text with " ="
        solutionLineArr.push(myChar);
        solutionLineArr.push(" ");
        solutionLineArr.push("=");
    } else if(solutionLineArr.length === 3 && solutionLineLastChar == "0") { // replace placeholder zero with number
        solutionLineArr.splice(0, 1, myChar);
    //} else if(solutionLastLine == ) {

    } else { // write number
        solutionLineArr.splice(solutionLineLastIndex + 1, 0, myChar);
    }

    console.log(operations.includes(solutionLineLastChar));
}*/
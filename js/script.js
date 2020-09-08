var answerLine;
var answerLineArr;
var solutionLine;
var solutionLineArr;
var solutionLineLastIndex;
var solutionLineLastChar;
var numberElements; 

function updateValues() {
    answerLine = document.getElementById("answer-text-value").textContent;
    solutionLine = document.getElementById("solution-text-value").textContent;
}

function updateScreen() {
    document.getElementById("answer-text-value").textContent = answerLine;
    document.getElementById("solution-text-value").textContent = solutionLine;
}

function convertSolutionLine() { // turns solutionLine to char array for easy manipulation
    solutionLineArr = Array.from(solutionLine);
    solutionLineLastIndex = solutionLineArr.length - 3; // index of the last char (before ' ' and  '=')
    solutionLineLastChar = solutionLineArr[solutionLineLastIndex];
}

function updateSolutionLine() { // turns solutionLineArr back into String
    solutionLine = solutionLineArr.join("");
}

// CLEAR BUTTON
document.getElementById("clear").addEventListener("click", function() {
    updateValues();
    convertSolutionLine();

    if(solutionLineArr.length === 3) { // if last number
        solutionLineArr.length = 0; // clear everything/clear array
    } else {
        if(solutionLineLastChar === " ") {
            solutionLineArr.splice(solutionLineLastIndex - 1, 2); // delete the last non-space char including the space after it
        } else {
            solutionLineArr.splice(solutionLineLastIndex, 1); // delete last non-space char
        }
    }

    answerLine = "";
    updateSolutionLine();
    updateScreen();
});

// CLEAR ENTRY BUTTON
document.getElementById("clear-entry").addEventListener("click", function() {
    document.getElementById("answer-text-value").textContent = "";
    document.getElementById("solution-text-value").textContent = "";
    console.log("Performed clear entry");
});

// NUMBER BUTTONS
Array.from(document.getElementsByClassName("number")).forEach(function(element) {
    element.addEventListener('click', writeNumber); // give each element in class "number" an eventlistener leading to writeNumber
});

function writeNumber() { // thank god for event.target.id
    var activeNum;

    updateValues();
    convertSolutionLine();

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
        default:
            activeNum = 69;
            break;
    }

    //TODO add functionality to avoid leading zeroes and functionality for single periods only

    if(solutionLineArr.length < 3) {
        solutionLineArr.push(activeNum);
        solutionLineArr.push(" ");
        solutionLineArr.push("=");
    } else {
        solutionLineArr.splice(solutionLineLastIndex + 1, 0, activeNum);
    }
    updateSolutionLine();
    updateScreen();
}
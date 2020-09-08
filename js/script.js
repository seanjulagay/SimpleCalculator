var answerLine;
var solutionLine;
var answerLineArr;
var solutionLineArr;
var solutionLineLast;

document.getElementById("clear").addEventListener("click", function() { // clear function
    updateValues();
    solutionLineArr = Array.from(solutionLine);
    solutionLineLastIndex = solutionLineArr.length - 3;
    solutionLineLastChar = solutionLineArr[solutionLineLastIndex];
    console.log("solutionLineLastIndex: " + solutionLineLastIndex + " solutionLineLastChar: " + solutionLineLastChar);

    if(solutionLineLastChar === " ") {
        solutionLineArr.splice(solutionLineLastIndex - 1, 2);
        console.log("true");
    } else {
        solutionLineArr.splice(solutionLineLastIndex, 1);
        console.log("false");
    }

    console.log(solutionLineArr);
    solutionLine = solutionLineArr.join("");
    updateScreen();
});

document.getElementById("clear-entry").addEventListener("click", function(){
    document.getElementById("answer-text-value").textContent = "";
    document.getElementById("solution-text-value").textContent = "";
    console.log("Performed clear entry");
});

function updateValues() {
    answerLine = document.getElementById("answer-text-value").textContent;
    solutionLine = document.getElementById("solution-text-value").textContent;
}

function updateScreen() {
    document.getElementById("answer-text-value").textContent = answerLine;
    document.getElementById("solution-text-value").textContent = solutionLine;
}
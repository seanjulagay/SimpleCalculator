/*
    TODO:
    OK  1. Allow input of numbers, operations, zero, and period, then display on screen
    OK  2. Create clear function deleting one character, and clear entry function deleting everything on screen
        3. Solve the input on the screen by writing a parser function (instead of using eval()*) and display it
        4. Eliminate successive operations
        5. Eliminate successive decimals
        6. Eliminate successive zeroes
        7. Implement plus-minus function
        8. Go crazy on additional features

        * using eval() has alleged potential security risks -- plus writing a parser is a good exercise :)
*/

var solution;
var answer;
var numbersArr = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9};
var opArr = {"plus": "+", "minus": "-", "times": "×", "divide": "÷"};

Array.from(document.getElementsByClassName("number")).forEach(function(element) {
    element.addEventListener("click", performUpdate);
})

Array.from(document.getElementsByClassName("operation")).forEach(function(element) {
    element.addEventListener("click", performUpdate);
})

Array.from(document.getElementsByClassName("function")).forEach(function(element) {
    element.addEventListener("click", performUpdate);
})

document.getElementById("zero").addEventListener("click", performUpdate);
document.getElementById("period").addEventListener("click", performUpdate);
document.getElementById("equals").addEventListener("click", performUpdate);
document.getElementById("clear").addEventListener("click", performUpdate);

function performUpdate() {
    solution = document.getElementById("solution-text-value").textContent;
    answer = document.getElementById("answer-text-value").textContent;

    switch(event.target.className) {
        case "number":
            writeNumber();
            break;
        case "operation":
            writeOperation();
            break;
        case "function":
            doFunction();
            break;
        case "zero":
            writeZero();
            break;
        case "period":
            writePeriod();
            break;
        case "equals":
            doComputation();
            break;
        default:
            console.log("performUpdate default");
            break;
    }

    document.getElementById("solution-text-value").textContent = solution;
    document.getElementById("answer-text-value").textContent = answer;
}

function writeNumber() {
    solution += numbersArr[event.target.id];
}

function writeOperation() {
    solution += opArr[event.target.id];
}

function writeZero() {
    solution += 0;
}

function writePeriod() {
    solution += ".";
}

function doFunction() {
    switch(event.target.id) {
        case "clear":
            solution = Array.from(solution);
            solution.pop();
            solution = solution.join("");
            break;
        case "clear-entry":
            solution = "";
            answer = "";
            break;
        case "plus-minus":
            console.log("not implemented yet");
            break;
        default:
            console.log("doFunction default");
            break;
    }
}

function doComputation() { // parsing

}
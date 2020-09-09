var solutionElement = document.getElementById("solution-text-value");
var answerElement = document.getElementById("answer-text-value");
var solution;
var answer;
var numbersObj = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}

Array.from(document.getElementsByTagName("button")).forEach(function(element) {
    element.addEventListener("click", performChanges);
}); 

function performChanges() {
    solution = Array.from(solutionElement.textContent); // convert to array for line value manipulation
    answer = Array.from(answerElement.textContent);

    functionController();

    solutionElement.textContent = solution.join(""); // return back to string type
    answerElement.textContent = answer.join("");
}

function functionController() { // classify by class
    switch(event.target.className) {
        case "number":
            writeNumber();
            break;
        case "operation":
            writeOperation();
            break;
        case "function":
            executeFunction();
            break;
        case "zero":
            writeZero();
            break;
        case "period":
            writePeriod();
            break;
        default:
            console.log("switch default");
            break;
    }
}

function executeFunction() {
    if(event.target.id == "clear") {
        solution.pop();
    }
}

function writeNumber() { // classify by id
    if(numbersObj.hasOwnProperty(event.target.id)) {
        solution.push(numbersObj[event.target.id]);
    }
}

function writeOperator() {

}

function writeZero() {

}

function writePeriod() {

}
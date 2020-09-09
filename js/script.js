var solutionElement = document.getElementById("solution-text-value");
var answerElement = document.getElementById("answer-text-value");
var solution;
var answer;

Array.from(document.getElementsByTagName("button")).forEach(function(element) {
    element.addEventListener("click", performChanges);
}); 

function performChanges() {
    solution = Array.from(solutionElement.textContent); // convert to array for line value manipulation
    answer = Array.from(answerElement.textContent);

    console.log(solution, answer);

    functionController();

    solutionElement.textContent = solution.join(""); // return back to string type
    answerElement.textContent = answer.join("");
}

function functionController() {
    switch(event.target.className) {
        case "number":
            writeNumber();
            break;
        case "operation":
            writeOperation();
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

    console.log(event.target.className);
}

function writeNumber() {

}

function writeOperator() {

}

function writeZero() {

}

function writePeriod() {

}
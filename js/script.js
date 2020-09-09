var solutionElement = document.getElementById("solution-text-value");
var answerElement = document.getElementById("answer-text-value");
var solution;
var answer;
var solutionLastChar;
var solution2ndLastChar;
var numbersObj = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}
var plusSign = String.fromCharCode(43); // plus
var minusSign = String.fromCharCode(45); // hyphen
var timesSign = String.fromCharCode(215); // times
var divideSign = String.fromCharCode(247); // divide
var opChars = {"plus": String.fromCharCode(43), "minus": String.fromCharCode(45), "times": String.fromCharCode(215), "divide": String.fromCharCode(247)}; // key names matched with element ids for easy reference calls
var opArr = [opChars["plus"], opChars["minus"], opChars["times"], opChars["divide"]]; // used for checking presence of operation

function opExists(myChar) { return opArr.includes(myChar) ? true : false; } // wrote because opArr.includes() is confusing

Array.from(document.getElementsByTagName("button")).forEach(function(element) {
    element.addEventListener("click", performChanges);
}); 

function performChanges() {
    solution = Array.from(solutionElement.textContent); // convert to array for line value manipulation
    answer = Array.from(answerElement.textContent);
    solutionLastChar = solution[solution.length - 1];
    solution2ndLastChar = solution[solution.length - 2];

    functionController();

    solutionElement.textContent = solution.join(""); // return back to string type
    answerElement.textContent = answer.join("");
}

function functionController() { // classify by class, individual functions classify by id
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
    switch(event.target.id) {
        case "clear":
            solution.pop();
            break;
        case "clear-entry":
            solution.length = 0;
            answer.length = 0;
            break;
        case "plus-minus":
            solution[0] == "-" ? solution.unshift("-") : solution.shift();
            break;            
        default:
            break;
    }
}

function writeNumber() { 

    if(solutionLastChar == "0" || (solutionLastChar == "0" && opExists(solution2ndLastChar))) {
        solution.pop();
    }

    solution.push(numbersObj[event.target.id]);
}

function writeOperation() {
    console.log({opArr, solutionLastChar});

    if(!opExists(solutionLastChar)) { // if no operation symbol, write one
        solution.push(opChars[event.target.id]);
    }
}

function writeZero() {
    if(solutionLastChar != "0" && !opExists(solution2ndLastChar)) {
        solution.push("0");
    }
}

function writePeriod() {

}


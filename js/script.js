/*
    TODO:
    OK  1. Allow input of numbers, operations, zero, and period, then display on screen
    OK  2. Create clear function deleting one character, and clear entry function deleting everything on screen
        3. Solve the input on the screen by writing a parser function (instead of using eval()*) and display it
    OK      * Extend "clear" functionality on the expression arrays
    OK  4. Eliminate successive operations & allow operation replacement
        5. Eliminate successive decimals
        6. Eliminate successive zeroes
        7. Implement plus-minus function
        8. Go crazy on additional features

        * using eval() has alleged potential security risks
*/

var solution; // value of the solution text DOM element
var solutionArr; // char array split of solution (for easy maniupation)
var answer; // value of answer
var numbersObj = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9};
var opObj = {"plus": "+", "minus": "-", "times": "×", "divide": "÷"};
var doesOpExist; // boolean for operation replacement functionality check
var numExpressionArr = [""]; // leave empty index for the first expression's numbers
var numExpressionArrIndex = 0;
var opExpressionArr = [""]; // leave empty index for the first expression's operation
var opExpressionArrIndex = 0;
var calculationsDone = 0;

document.getElementById("solution-text-value").textContent = ""; // clear screen
document.getElementById("answer-text-value").textContent = "";

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
            if(!Object.values(opObj).includes(Array.from(solution)[Array.from(solution).length - 1])) { // check if last char is not an operation
                writeOperation("write");
            } else {
                writeOperation("replace");
            }
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

    console.log(JSON.stringify({numExpressionArr, opExpressionArr}));
    document.getElementById("solution-text-value").textContent = solution;
    document.getElementById("answer-text-value").textContent = answer;
}

function writeNumber() {
    numExpressionArr[numExpressionArr.length - 1] += numbersObj[event.target.id];
    solution += numbersObj[event.target.id];
}

function writeOperation(type) {
    if(type == "write") {
        opExpressionArr[opExpressionArr.length - 1] += opObj[event.target.id];
        solution += opExpressionArr[opExpressionArr.length - 1];
    } else if(type == "replace") {
        // replacement in opExpressionArr
        opExpressionArr.splice(opExpressionArr.length - 2, 2); // pop last empty and occupied elements
        numExpressionArr.pop(); // pop this as well to remove empty element
        opExpressionArr.push(opObj[event.target.id]);
        // replacement in solution (screen)
        solutionArr = solution.split("");
        solutionArr.splice(solutionArr.length - 1, 1, opObj[event.target.id]);
        solution = solutionArr.join("");
    }    
    opExpressionArr.push(""); // next operator will be in new index
    numExpressionArr.push(""); // next set of numbers will be in new index
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
            clearScreen("clear");
            break;
        case "clear-entry":
            clearScreen("clear-entry");
            break;
        case "plus-minus":
            console.log("not implemented yet");
            break;
        default:
            console.log("doFunction default");
            break;
    }
}

function clearScreen(type) {
    if(type == "clear") {
        solutionArr = solution.split("");
        // clear for arrays
        if(Object.values(opObj).includes(solutionArr[solutionArr.length - 1])) { // if last char is operation
            opExpressionArr.splice(opExpressionArr.length - 2, 2);
            opExpressionArr.push("");
        } else if(solutionArr[solutionArr.length - 1] > 0){ // if last char is num; prevents split error on basic else
            backspaceNumber();
        }
        // clear for screen
        solutionArr.pop();
        solution = solutionArr.join("");
    } else if("clear-entry") {
        console.log("Hi");
        solution = "";
        answer = "";
        numExpressionArr = [""];
        opExpressionArr = [""];
    }
}

function backspaceNumber() {
    var individualNumExpression = numExpressionArr[numExpressionArr.length - 1];
    var individualNumExpressionArr;

    if(individualNumExpression != "") { // expression not empty
        individualNumExpressionArr = individualNumExpression.split("");
        individualNumExpressionArr.pop();
        numExpressionArr[numExpressionArr.length - 1] = individualNumExpressionArr.join("");
    } else { 
        numExpressionArr.pop();
        backspaceNumber();
    }
}

function doComputation() { // parsing
    for(var i = 0; i < opExpressionArr.length; i++) {
        if(opExpressionArr[i] == "×") {
            console.log({i});
            answer = numExpressionArr[i] * numExpressionArr[i + 1];
            numExpressionArr.splice(i, 2, answer);
            opExpressionArr.splice(i, 1);
        }
    }
}
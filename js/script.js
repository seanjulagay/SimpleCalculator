var solution; // value of the solution text DOM element
var solutionArr; // char array split of solution (for easy maniupation)
var answer; // value of answer
var numbersObj = {"zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9};
var opObj = {"plus": "+", "minus": "-", "times": "×", "divide": "÷"};
var doesOpExist; // boolean for operation replacement functionality check
var numExpressionArr = [""]; // leave empty index for the first expression's numbers
var numExpressionArrHolder;
var opExpressionArr = [""]; // leave empty index for the first expression's operation
var opExpressionArrHolder; // holders will handle computation, regular will store values for future computation
var cycles = 0; // cycle for while loop - scanning and parsing

document.getElementById("solution-text-value").textContent = ""; // clear screen
document.getElementById("answer-text-value").textContent = "0";

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

    console.log(answer);
    console.log(JSON.stringify({numExpressionArr, opExpressionArr}));
    //console.log(JSON.stringify({numExpressionArrHolder, opExpressionArrHolder}));
    document.getElementById("solution-text-value").textContent = solution;
    document.getElementById("answer-text-value").textContent = answer;
}

function writeNumber() {

    if(numExpressionArr[numExpressionArr.length - 1] == "0") {
        console.log("Hello")
        numExpressionArr[numExpressionArr.length - 1] = "";
        solutionArr = solution.split("");
        solutionArr.pop();
        solution = solutionArr.join("");
    }
    
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

    if(numExpressionArr[numExpressionArr.length - 1] != "0") {
        numExpressionArr[numExpressionArr.length - 1] += numbersObj[event.target.id];
        solution += "0";
    }    
}

function writePeriod() {

    if(!/[.]/.test(numExpressionArr[numExpressionArr.length - 1])) {
        numExpressionArr[numExpressionArr.length - 1] += ".";
        solution += ".";
    }
}

function doFunction() {
    switch(event.target.id) {
        case "clear":
            clearScreen("clear");
            break;
        case "clear-entry":
            clearScreen("clear-entry");
            break;
        case "percentage":
            getPercentage()
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
            numExpressionArr.pop();
        } else if(solutionArr[solutionArr.length - 1] > 0){ // if last char is num; prevents split error on basic else
            backspaceNumber();
        }
        // clear for screen
        solutionArr.pop();
        solution = solutionArr.join("");
    } else if("clear-entry") {
        console.log("Hi");
        solution = "";
        answer = "0";
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

function getPercentage() {
    answer = parseFloat(answer) * .01;
}

function doComputation() { // parsing
    opExpressionArrHolder = opExpressionArr.slice(); // slice so values pass instead of reference to array
    numExpressionArrHolder = numExpressionArr.slice();

    for(var i = 0; i < numExpressionArrHolder.length; i++) {
        numExpressionArrHolder[i] = parseFloat(numExpressionArrHolder[i]);
    } // convert elements to number so it works properly (string results in "2" + "2" = "22")

    cycles = 0;

    while(cycles < opExpressionArrHolder.length) {
        if(/[+\-\×\÷]/g.test(opExpressionArrHolder[cycles]) || /^$/.test(opExpressionArrHolder[cycles])) { // i JUST learned about regex!! wtf this could have saved me time
            switch(opExpressionArrHolder[cycles]) {
                case "×":
                    answer = numExpressionArrHolder[cycles] * numExpressionArrHolder[cycles + 1];
                    break;
                case "÷":
                    answer = numExpressionArrHolder[cycles] / numExpressionArrHolder[cycles + 1];
                    break;
                case "+":
                    answer = numExpressionArrHolder[cycles] + numExpressionArrHolder[cycles + 1];
                    break;
                case "-":
                    answer = numExpressionArrHolder[cycles] - numExpressionArrHolder[cycles + 1];
                    break;
                case "":
                    answer = numExpressionArrHolder[cycles];
                    break;
                default:
                    console.log("doComputation default");
                    break;
            }
            numExpressionArrHolder.splice(cycles, 2, answer);
            opExpressionArrHolder.splice(cycles, 1);
            cycles = 0;
        } else {
            cycles++;
        }
    }
}
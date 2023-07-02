const NUMBERS_OBJECT = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const OPERATIONS_OBJECT = { plus: '+', minus: '-', times: '×', divide: '÷' };

var solution; // value of the solution text DOM element
var solutionArr; // char array split of solution (for easy maniupation)
var answer; // value of answer

var numExpressionArr = ['']; // leave empty index for the first expression's numbers
var numExpressionArrHolder;
var opExpressionArr = ['']; // leave empty index for the first expression's operation
var opExpressionArrHolder; // holders will handle computation, regular will store values for future computation
// var cycles = 0; // cycle for while loop - scanning and parsing

const solutionTextEl = document.querySelector('#solution-text-value');
const answerTextEl = document.querySelector('#answer-text-value');

solutionTextEl.textContent = ''; // clear screen
answerTextEl.textContent = '0';

['number', 'operation', 'function'].forEach((className) => {
  document
    .querySelectorAll(`.${className}`)
    .forEach((element) => element.addEventListener('click', performUpdate));
});

['zero', 'period', 'equals', 'clear'].forEach((elementId) => {
  document
    .querySelector(`#${elementId}`)
    .addEventListener('click', performUpdate);
});

function performUpdate(event) {
  const { id, className } = event.target;

  solution = solutionTextEl.textContent;
  answer = answerTextEl.textContent;

  const hasActiveOperation = !Object.values(OPERATIONS_OBJECT).includes(
    solution.charAt(solution.length - 1)
  );

  switch (className) {
    case 'number':
      writeNumber(id);
      break;
    case 'operation':
      writeOperation(hasActiveOperation ? 'write' : 'replace', id);
      break;
    case 'function':
      doFunction(id);
      break;
    case 'zero':
      writeZero(id);
      break;
    case 'period':
      writePeriod();
      break;
    case 'equals':
      doComputation();
      break;
    default:
      console.log('performUpdate default');
      break;
  }

  //console.log(JSON.stringify({numExpressionArrHolder, opExpressionArrHolder}));
  solutionTextEl.textContent = solution;
  answerTextEl.textContent = answer;
  console.log(
    JSON.stringify({ numExpressionArr, opExpressionArr, solutionArr })
  );
}

function writeNumber(targetId) {
  if (getLastArrayItem(numExpressionArr) === '0') {
    appendLastArrayItem(numExpressionArr, '');

    solutionArr = solution.split('');
    solutionArr.pop();
    solution = solutionArr.join('');
  }

  const number = NUMBERS_OBJECT[targetId];

  appendLastArrayItem(numExpressionArr, number);
  solution += number;
}

function writeOperation(type, targetId) {
  if (type === 'write') {
    appendLastArrayItem(opExpressionArr, OPERATIONS_OBJECT[targetId]);

    solution += opExpressionArr[opExpressionArr.length - 1];
  } else if (type === 'replace') {
    // replacement in opExpressionArr
    opExpressionArr.splice(opExpressionArr.length - 2, 2); // pop last empty and occupied elements
    numExpressionArr.pop(); // pop this as well to remove empty element
    opExpressionArr.push(OPERATIONS_OBJECT[targetId]);
    // replacement in solution (screen)
    solutionArr = solution.split('');
    solutionArr.splice(solutionArr.length - 1, 1, OPERATIONS_OBJECT[targetId]);
    solution = solutionArr.join('');
  }

  opExpressionArr.push(''); // next operator will be in new index
  numExpressionArr.push(''); // next set of numbers will be in new index
}

function writeZero(targetId) {
  if (getLastArrayItem(numExpressionArr) === '0') return;

  appendLastArrayItem(numExpressionArr, NUMBERS_OBJECT[targetId]);
  solution += '0';
}

function writePeriod() {
  const containsPeriod = !/[.]/.test(getLastArrayItem(numExpressionArr));

  if (!containsPeriod) return;

  appendLastArrayItem(numExpressionArr, '.');
  solution += '.';
}

function doFunction(targetId) {
  switch (targetId) {
    case 'clear':
      clearScreen();
      break;
    case 'clear-entry':
      clearScreen('all');
      break;
    case 'percentage':
      getPercentage();
      break;
    default:
      console.log('doFunction default');
      break;
  }
}

function clearScreen(type) {
  if (type === 'all') {
    console.log('Hi');
    solution = '';
    answer = '0';
    numExpressionArr = [''];
    opExpressionArr = [''];

    return;
  }

  solutionArr = solution.split('');
  // clear for arrays
  if (
    Object.values(OPERATIONS_OBJECT).includes(getLastArrayItem(solutionArr))
  ) {
    // if last char is operation
    opExpressionArr.splice(opExpressionArr.length - 2, 2);
    opExpressionArr.push('');
    numExpressionArr.pop();
  } else if (getLastArrayItem(solutionArr) > 0) {
    // if last char is num; prevents split error on basic else
    backspaceNumber();
  }
  // clear for screen
  solutionArr.pop();
  solution = solutionArr.join('');
}

function backspaceNumber() {
  var individualNumExpression = getLastArrayItem(numExpressionArr);
  var individualNumExpressionArr;

  if (individualNumExpression) {
    // expression not empty
    individualNumExpressionArr = individualNumExpression.split('');
    individualNumExpressionArr.pop();
    numExpressionArr[numExpressionArr.length - 1] =
      individualNumExpressionArr.join('');
  } else {
    numExpressionArr.pop();
    backspaceNumber();
  }
}

function getPercentage() {
  answer = parseFloat(answer) * 0.01;
}

// parsing
function doComputation() {
  opExpressionArrHolder = opExpressionArr.slice(); // slice so values pass instead of reference to array
  numExpressionArrHolder = numExpressionArr.slice();

  // convert elements to number so it works properly (string results in "2" + "2" = "22")
  numExpressionArrHolder = numExpressionArrHolder.map((numString) =>
    parseFloat(numString)
  );

  var cycles = 0;

  while (cycles < opExpressionArrHolder.length) {
    // i JUST learned about regex!! wtf this could have saved me time
    const isValidOperation =
      /[+\-\×\÷]/g.test(opExpressionArrHolder[cycles]) ||
      /^$/.test(opExpressionArrHolder[cycles]);

    if (isValidOperation) {
      const firstNum = numExpressionArrHolder[cycles];
      const secondNum = numExpressionArrHolder[cycles + 1];

      switch (opExpressionArrHolder[cycles]) {
        case '×':
          answer = firstNum * secondNum;
          break;
        case '÷':
          answer = firstNum / secondNum;
          break;
        case '+':
          answer = firstNum + secondNum;
          break;
        case '-':
          answer = firstNum - secondNum;
          break;
        case '':
          answer = firstNum;
          break;
        default:
          console.log('doComputation default');
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

function getLastArrayItem(inputArray) {
  return inputArray[inputArray.length - 1];
}

function appendLastArrayItem(inputArray, value) {
  inputArray[inputArray.length - 1] += value;
}

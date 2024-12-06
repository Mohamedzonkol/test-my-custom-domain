let display = document.getElementById('display');
let currentOperation = null;
let firstOperand = '';
let secondOperand = '';
let memory = 0;
let history = [];

function appendNumber(number) {
    if (currentOperation === null) {
        firstOperand += number;
        display.value = firstOperand;
    } else {
        secondOperand += number;
        display.value = secondOperand;
    }
}

function setOperation(operation) {
    if (currentOperation === null) {
        currentOperation = operation;
    } else {
        calculateResult();
        currentOperation = operation;
    }
}

function calculateResult() {
    let result;
    try {
        result = eval(firstOperand + currentOperation + secondOperand);
    } catch (e) {
        result = 'Error';
    }
    display.value = result;
    history.push(`${firstOperand} ${currentOperation} ${secondOperand} = ${result}`);
    firstOperand = result;
    secondOperand = '';
    currentOperation = null;
}

function clearDisplay() {
    display.value = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function toggleScientific() {
    let sciButtons = document.getElementById('scientific-buttons');
    sciButtons.style.display = sciButtons.style.display === 'none' ? 'block' : 'none';
}

function storeMemory() {
    memory = parseFloat(display.value);
}

function recallMemory() {
    if (currentOperation === null) {
        firstOperand = memory.toString();
        display.value = firstOperand;
    } else {
        secondOperand = memory.toString();
        display.value = secondOperand;
    }
}

function clearMemory() {
    memory = 0;
}

function showHistory() {
    let historyDiv = document.getElementById('history');
    let historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(entry => {
        let li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
    historyDiv.style.display = 'block';
}

function clearHistory() {
    history = [];
    document.getElementById('history-list').innerHTML = '';
}

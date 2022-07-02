const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousOperand, currentOperand){
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.clear();
    }

    delete(){
        this.currentOperandText = this.currentOperandText.toString().slice(0, -1);
    }

    calculate(){
        let result;

        const _previousOperandText = parseFloat(this.previousOperandText);
        const _currentOperandText = parseFloat(this.currentOperandText);

        if(isNaN(_previousOperandText) || isNaN(_currentOperandText)) return;

        switch(this.operation){
            case '+':
                result = _previousOperandText + _currentOperandText;
                break;
            case '-':
                result = _previousOperandText - _currentOperandText;
                break;
            case '÷':
                result = _previousOperandText / _currentOperandText;
                break;
            case 'x':
                result = _previousOperandText * _currentOperandText;
                break;
            default:
                return;
        }

        this.currentOperandText = result.toString();
        this.operation = undefined;
        this.previousOperandText = '';
    }

    chooseOperation(operation){
        if(this.previousOperandText != ''){
            this.calculate();
        }

        this.operation = operation;

        this.previousOperandText = this.currentOperandText;
        this.currentOperandText = '';
    }

    appendNumber(number){
        if(this.currentOperandText.includes('.') && number === '.') return;
        this.currentOperandText = `${this.currentOperandText}${number.toString()}`;
    }

    clear(){
        this.previousOperandText = '';
        this.currentOperandText = '';
        this.operation = undefined;
    }

    updateDisplay(){
        this.previousOperand.innerText = `${this.previousOperandText} ${this.operation || ''}`;
        this.currentOperand.innerText = this.currentOperandText;
    }
}

const calculator = new Calculator(
    previousOperand, 
    currentOperand
);

for(const numberButton of numberButtons){
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

for(const operationButton of operationButtons){
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
}

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});


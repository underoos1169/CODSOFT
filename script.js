class Calculator{
    constructor(prevOperandTextElement, currOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.currOperandTextElement = currOperandTextElement;
        this.clear();       //Call it at the beginning to have a clean slate
    }

    clear()         //Clears the calculator output and operators
    {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }
    appendNumber(number){
        if(number === '.' && this.currOperand.includes('.'))
            return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currOperand === '') return;
        if(this.prevOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }
    compute(){
        let computation;
        const prev = parseFloat(this.prevOperand); 
        const curr = parseFloat(this.currOperand);
        if(isNaN(prev) || isNaN(curr))  return;
        switch(this.operation)
        {
            case '+': computation = prev + curr;
                      break;
            case '-': computation = prev - curr;
                      break;
            case '×': computation = prev * curr;
                      break;
            case '÷': computation = prev / curr;
                      break;
            default: return;
        }
        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }
    updateDisplay(){
        this.currOperandTextElement.innerText = this.currOperand;
        if(this.operation != null)
        {
            this.prevOperandTextElement.innerText = `${this.prevOperand} ${this.operation}`;
        }
        else
        {
            this.prevOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const opnButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const prevOperandTextElement = document.querySelector('[data-prev-operand]');
const currOperandTextElement = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

opnButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
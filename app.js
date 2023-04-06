const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null; //uygulama ilk başlatıldığında ilk değer olmayacak
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue.replace('.', ',');
    
}

keys.addEventListener('click', function (event) {
    const element = event.target;
    const value = element.value;
    if (!element.matches('button')) return; //eğer butona basılmazsa bu functiondan çık
    // if (event.target.type != 'button') {
    // console.log('functiondan çıkılıyor');
    // return;
    // }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clearDisplay();
            break;
        default:
            inputNumber(value);
    }

    //switchcasesiz
    // if (element.classList.contains('operator')) {
    //     // console.log('bir operatöre tıklandı');
    //     handleOperator(element.value);
    //     return;
    // }
    // if (element.classList.contains('decimal')){
    //     // console.log('ondalık sayı yazmak üzere . işaretine tıklandı');
    //     inputDecimal();
    //     return;
    // }
    // if (element.classList.contains('clear')){
    //     // console.log('temizleme butonuna tıklandı');
    //     clearDisplay();
    //     return;
    // }
    // // console.log('bir rakama tıklandı');
    // inputNumber(element.value);
    //switchcasesiz

});

function inputNumber(num) {
    // displayValue = num;
    // displayValue += num; 
    if (waitingForSecondValue) { //if içerisinde default olarak boolean değişkenler true olarak kontrol edilir
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue == '0' ? num : displayValue + num;
    }
    updateDisplay();
}

function inputDecimal() {
    //iki kere nokta konmasını engelledik
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function clearDisplay() {
    displayValue = '0';
    firstValue = null; //uygulama ilk başlatıldığında ilk değer olmayacak
    operator = null;
    waitingForSecondValue = false;
    updateDisplay();
}

function handleOperator(nextOperator) {

    //kendi denemem
    // console.log(nextOperator);
    // if (displayValue != '0' && nextOperator == '+') {
    //     console.log('+ya bastın');
    // }
    //kendi denemem

    let value = parseFloat(displayValue);
    if (operator && waitingForSecondValue) { //true mu diye kontrol ediyor
        operator = nextOperator;
        return;
    }
    if (firstValue == null) {
        firstValue = value;
    }
    else if (operator) {
        //hesaplama işlemleri yapılabilir.
        const result = calculate(firstValue, operator, value);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }
    waitingForSecondValue = true;
    operator = nextOperator;
    updateDisplay();
    console.log(firstValue, nextOperator, operator, value);
}

function calculate(num1, op, num2) {
    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '*') return num1 * num2;
    if (op === '/') return num1 / num2;
    return num2; //eşittir'e basınca undefined yazmaması için.
}
var total = '';
var firstDigit = '';
var digits = document.querySelectorAll('.digits').length;
var operators = document.querySelectorAll('.operators').length;
for (let index = 0; index < digits; index++) {
    document.querySelectorAll('.digits')[index].addEventListener('click', function() {
        var digitValue = this.textContent;
        var classValue = this.classList[0];
        buttonAnimation(classValue);
        if (digitValue === '.') {
            if (total.length === 0) {
                total += '0.' 
                document.querySelector('#input-area').textContent = total;
            }
            else {
                total += digitValue 
                document.querySelector('#input-area').textContent = total;
            }
        }
        else{
            total += digitValue
            document.querySelector('#input-area').textContent = total;
        }
        
    })    
}

document.addEventListener('keydown', function(event) {
    var keyPressed = event.key;
    if (keyPressed === 'Backspace') {
        total = total.slice(0, -1);  // Assign the modified string back to the variable
        if (total.length === 0) {
            document.querySelector('#input-area').textContent = 0; 
        }
        else{
            document.querySelector('#input-area').textContent = total;
        }
        
    }
    else if (keyPressed === '+') {
        buttonAnimation('add');
        firstDigit = total      
        document.querySelector('#input-area').textContent = 0
        total = '';
        equalTotal('+');
    }
    else if (keyPressed === '*') {
        buttonAnimation('multiply');
        firstDigit = total;
        document.querySelector('#input-area').textContent = 0
        total = '';
        equalTotal('*');
    }
    else if (keyPressed === '-') {
        buttonAnimation('subtract');
        firstDigit = total;
        document.querySelector('#input-area').textContent = 0
        total = '';
        equalTotal('-');
    }
    else if (keyPressed === '/') {
        buttonAnimation('divide');
        firstDigit = total;
        document.querySelector('#input-area').textContent = 0
        total = '';
        equalTotal('/');
    }
    else if (keyPressed === '%') {
        buttonAnimation('percent');
        total = total / 100;
        document.querySelector('#input-area').textContent = total;
    }
});

for (let index = 0; index < digits; index++) {
    document.addEventListener('keydown', function(event) {
        if (event.key === document.querySelectorAll('.digits')[index].textContent) {
            var digitValue = document.querySelectorAll('.digits')[index].textContent;
            console.log(digitValue);
            var classValue = document.querySelectorAll('.digits')[index].classList[0];
            buttonAnimation(classValue);
            if (digitValue === '.') {
                if (total.length === 0) {
                    total += '0.' 
                    document.querySelector('#input-area').textContent = total;
                }
                else {
                    total += digitValue 
                    document.querySelector('#input-area').textContent = total;
                }
            }
            else{
                total += digitValue;
                document.querySelector('#input-area').textContent = total;
            }
            
        }
    });
}
document.querySelector('.minus').addEventListener('click', function() {
    var digitValue = '-'
    var classValue = this.classList[0];
    buttonAnimation(classValue);
    total += digitValue
    document.querySelector('#input-area').textContent = total;
    console.log(total)
})

for (let num = 0; num < operators; num++) {
    document.querySelectorAll('.operators')[num].addEventListener('click', function() {
        document.querySelector('#input-area').textContent = 0
        var digitValue = this.textContent;
        var classValue = this.classList[0];
        buttonAnimation(classValue);
        if (digitValue === '+') {
            firstDigit = total      
            document.querySelector('#input-area').textContent = 0
            total = '';
            equalTotal('+');
        }
        else if (digitValue === '−') {
            firstDigit = total;
            document.querySelector('#input-area').textContent = 0
            total = '';
            equalTotal('-');
        }
        
        else if (digitValue === '×') {
            firstDigit = total;
            document.querySelector('#input-area').textContent = 0
            total = '';
            equalTotal('*');
        }
        else if (digitValue === '÷') {
            firstDigit = total;
            document.querySelector('#input-area').textContent = 0
            total = '';
            equalTotal('/');
        }
        else if (digitValue === '%') {
            buttonAnimation('percent');
            total = total / 100;
            document.querySelector('#input-area').textContent = total;
        }
    })
}


function equalTotal(sign) {
    function handleEqualEvent() {
        if (total === '' && firstDigit === '') {
            document.querySelector('#input-area').textContent = 0;
        } else {
            var result = calculator(parseFloat(firstDigit), parseFloat(total), sign);
            document.querySelector('#input-area').textContent = result;
            console.log(result);
            total = result;
        }

        // Remove both event listeners after they are executed once
        document.removeEventListener('keydown', handleKeydownEvent);
        document.querySelector('.equal').removeEventListener('click', handleEqualEvent);
    }

    function handleKeydownEvent(event) {
        var keyPressed = event.key;
        if (keyPressed === 'Enter') {
            handleEqualEvent();
        }
    }

    // Add the keydown event listener
    document.addEventListener('keydown', handleKeydownEvent);

    // Add the click event listener
    document.querySelector('.equal').addEventListener('click', handleEqualEvent);
}





document.querySelector('.clear').addEventListener('click', function() {
    console.clear(); // Clear the console
    buttonAnimation(document.querySelector('.clear').classList[0]);
    total = '';
    firstDigit = '';
    document.querySelector('#input-area').textContent = 0;

    // Reload the entire page
    location.reload();
});




function buttonAnimation (key) {
    var activeButton = document.querySelector('.' + key);
    activeButton.classList.add('pressed');
    setTimeout(function () {
        activeButton.classList.remove('pressed'); 
    }, 150);
}

function calculator(num1, num2, operator) {
    switch (operator) {
        case '+':
            var result = num1 + num2;
            return Math.round((result) * 1000) / 1000;
        case '-':
            var result = num1 - num2;
            return Math.round((result) * 1000) / 1000;
        case '*':
            var result = num1 * num2;
            return Math.round((result) * 1000) / 1000;
        case '/':
            var result = num1 / num2;
            return Math.round((result) * 1000) / 1000;
        default:
            console.error('Invalid operator');
            return NaN;
    }
}





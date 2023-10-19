const currentDisplay = document.querySelector('#current-display')
const pastDisplay = document.querySelector('#past-display')
const buttons = Array.from(document.querySelectorAll('button'))

pastDisplay.style['font-size'] = "24px"
let firstValue = ''
let secondValue = ''
let operator = ''
currentDisplay.textContent = null

buttons.forEach(item => {
    item.addEventListener('click', (e) => {
        if (item.id === 'clear') {
            currentDisplay.textContent = ''
            pastDisplay.textContent = ''
            firstValue = ''
            operator = ''
            secondValue = ''
        }
        else if (item.id === 'back') {
            currentDisplay.textContent = ''
            operator = ''
        }
        else if (item.id === 'percent') {
            currentDisplay.textContent = currentDisplay.textContent / 100
            firstValue = currentDisplay.textContent
        }
        else if (item.id === 'equal') {
            secondValue = currentDisplay.textContent
            if (firstValue !== '' && secondValue !== '' && operator !== '') {
                pastDisplay.textContent += secondValue
                currentDisplay.textContent = evaluate(firstValue, secondValue, operator)
                firstValue = currentDisplay.textContent
                secondValue = ''
                operator = ''
            }
            else {
            }
        }
        else if (item.id === 'operator') {
            if (currentDisplay.textContent === operator) {
                operator = item.getAttribute('data-value')
                currentDisplay.textContent = operator
            }
            else if (firstValue === '' && operator === '') {
                firstValue = currentDisplay.textContent
                operator = item.getAttribute('data-value')
                pastDisplay.textContent = firstValue
                currentDisplay.textContent = operator
            }
            else if (firstValue !== '' && operator === '') {
                operator = item.getAttribute('data-value')
                pastDisplay.textContent = firstValue
                currentDisplay.textContent = operator
            }
            else if (operator !== '' && firstValue !== '') {
                secondValue = currentDisplay.textContent
                pastDisplay.textContent = evaluate(firstValue, secondValue, operator)
                operator = item.getAttribute('data-value')
                firstValue = pastDisplay.textContent
                currentDisplay.textContent = operator
                secondValue = ''
            }
            else if (firstValue !== '' && secondValue !== '' && operator !== '') {
                currentDisplay.textContent = evaluate(firstValue, secondValue, operator)
                firstValue = currentDisplay.textContent
                operator = item.getAttribute('data-value')
                secondValue = ''
            }
        }
        else {
            if (item.id === 'period') {
                if (!String(currentDisplay.textContent).includes('.') && operator === '') {
                    currentDisplay.textContent += item.textContent
                }
                else if (!String(currentDisplay.textContent).includes('.') && operator !== '') {
                    if (currentDisplay.textContent === operator) {
                        currentDisplay.textContent = ''
                        pastDisplay.textContent = pastDisplay.textContent + " " + operator
                        currentDisplay.textContent += item.textContent
                    }
                    else {
                        currentDisplay.textContent += item.textContent
                    }
                    //Do nothing
                }
            }
            else if (operator === '' && firstValue === '') {
                currentDisplay.textContent += item.textContent
            }
            else if (operator === '' && firstValue !== '') {
                firstValue = ''
                operator = ''
                secondValue = ''
                pastDisplay.textContent = ''
                currentDisplay.textContent += item.textContent
            }
            else if (operator !== '') {
                if (currentDisplay.textContent === operator) {
                    pastDisplay.textContent = pastDisplay.textContent + " " + operator
                    currentDisplay.textContent = ''
                }

                currentDisplay.textContent += item.textContent
            }
        }
    })
})

function evaluate(a, b, operation) {
    if (operation === '+') {
        return trimTrailingZeros(Number(a) + Number(b))
    }
    else if (operation === '-') {
        return trimTrailingZeros(Number(a) - Number(b))
    }
    else if (operation === '*') {
        return trimTrailingZeros(Number(a) * Number(b))
    }
    else if (operation === '/') {
        if (b == 0) {
            return "Undefined"
        }
        else {
            return trimTrailingZeros(Number(a) / Number(b))
        }
    }
}

function trimTrailingZeros(input) {
    const number = parseFloat(input);
    if (!isNaN(number)) {
        const trimmed = number.toFixed(3);
        return trimmed.replace(/\.?0*$/, '');
    }
    return input;
}
const root = document.querySelector(':root');
const switches = document.querySelectorAll('[data-switch]');
const buttonsNumbers = document.querySelectorAll('[data-btn-number]');
const buttonsAction = document.querySelectorAll('[data-btn-action]');
const setStore = document.querySelector('[data-store]');
const del = document.querySelector('[data-btn-del]');
const reset = document.querySelector('[data-btn-reset]');

//change colors

const firstTheme = () => {
    root.style.setProperty('--background', 'hsl(222, 26%, 31%)');
    root.style.setProperty('--keypad-background', 'hsl(223, 31%, 20%)');
    root.style.setProperty('--screen-background', 'hsl(224, 36%, 15%)');
    root.style.setProperty('--key-background', 'hsl(225, 21%, 49%)');
    root.style.setProperty('--key-shadow', 'hsl(224, 28%, 35%)');
    root.style.setProperty('--key-background-red', 'hsl(6, 63%, 50%)');
    root.style.setProperty('--key-shadow-red', 'hsl(6, 70%, 34%)');
    root.style.setProperty('--key-background-light', 'hsl(30, 25%, 89%)');
    root.style.setProperty('--key-shadow-light', 'hsl(28, 16%, 65%)');
    root.style.setProperty('--text-dark', 'hsl(221, 14%, 31%)');
    root.style.setProperty('--text-light', 'hsl(0, 0%, 100%)');
    root.style.setProperty('--text-special', 'hsl(0, 0%, 100%)');
};

const secondTheme = () => {
    root.style.setProperty('--background', 'hsl(0, 0%, 90%)');
    root.style.setProperty('--keypad-background', 'hsl(0, 5%, 81%)');
    root.style.setProperty('--screen-background', 'hsl(0, 0%, 93%)');
    root.style.setProperty('--key-background', 'hsl(185, 42%, 37%)');
    root.style.setProperty('--key-shadow', 'hsl(185, 58%, 25%)');
    root.style.setProperty('--key-background-red', 'hsl(25, 98%, 40%)');
    root.style.setProperty('--key-shadow-red', 'hsl(25, 99%, 27%)');
    root.style.setProperty('--key-background-light', 'hsl(45, 7%, 89%)');
    root.style.setProperty('--key-shadow-light', 'hsl(35, 11%, 61%)');
    root.style.setProperty('--text-dark', 'hsl(60, 10%, 19%)');
    root.style.setProperty('--text-light', 'hsl(0, 0%, 100%)');
    root.style.setProperty('--text-special', 'hsl(60, 10%, 19%)');
};

const thirdTheme = () => {
    root.style.setProperty('--background', 'hsl(268, 75%, 9%)');
    root.style.setProperty('--keypad-background', 'hsl(268, 71%, 12%)');
    root.style.setProperty('--screen-background', 'hsl(268, 71%, 12%)');
    root.style.setProperty('--key-background', 'hsl(281, 89%, 26%)');
    root.style.setProperty('--key-shadow', 'hsl(285, 91%, 52%)');
    root.style.setProperty('--key-background-red', 'hsl(176, 100%, 44%)');
    root.style.setProperty('--key-shadow-red', 'hsl(177, 92%, 70%)');
    root.style.setProperty('--key-background-light', 'hsl(268, 47%, 21%)');
    root.style.setProperty('--key-shadow-light', 'hsl(290, 70%, 36%)');
    root.style.setProperty('--text-dark', 'hsl(52, 100%, 62%)');
    root.style.setProperty('--text-light', 'hsl(0, 0%, 100%)');
    root.style.setProperty('--text-special', 'hsl(52, 100%, 62%)');
};

const changeTheme = (e, item) => {
    switches.forEach(removeActive => removeActive.classList.remove('active'));
    item.classList.add('active');
    if (e.target.dataset.switch === 's1') firstTheme();
    if (e.target.dataset.switch === 's2') secondTheme();
    if (e.target.dataset.switch === 's3') thirdTheme();
};

switches.forEach(item => {
    item.addEventListener('click', (e) => changeTheme(e, item));
});

//action calculator
// key Number Clicked

const calculate = {firstNumber: '', secondNumber: '', action: '', equal: false, store: ''};

const updateScreen = () => {
    if ((calculate.store[calculate.store.length - 1] === '+' || calculate.store[calculate.store.length - 1] === '-' || calculate.store[calculate.store.length - 1] === 'x' || calculate.store[calculate.store.length - 1] === '/' || calculate.store[calculate.store.length - 1] === '=') && calculate.store > 0) {
        setStore.textContent = calculate.store.slice(0, calculate.store.length - 1);
    } else {
        setStore.textContent = calculate.store;
    }
};

const clickedKeyNumber = (e) => {
    if (calculate.equal) {
        calculate.firstNumber = '';
        calculate.secondNumber = '';
        calculate.action = '';
        calculate.equal = false;
        calculate.store = 0;
        updateScreen();
    }

    if (calculate.action === '') {
        if (e.target.dataset.btnNumber === '.') {
            if (calculate.firstNumber === '') {
                calculate.store = '0';
                updateScreen();
            }
            if (calculate.firstNumber.includes('.')) return;
        }
        calculate.firstNumber += e.target.dataset.btnNumber;
        calculate.store = calculate.store === 0 ? e.target.dataset.btnNumber : calculate.store + e.target.dataset.btnNumber;
    } else {
        if (e.target.dataset.btnNumber === '.') {
            if (calculate.secondNumber === '') {
                calculate.store = calculate.store + '0';
                console.log('ok');
                updateScreen();
            }
            if (calculate.secondNumber.includes('.')) return;
        }
        calculate.secondNumber += e.target.dataset.btnNumber;
        calculate.store = calculate.store + e.target.dataset.btnNumber;
    }
    updateScreen();
};

buttonsNumbers.forEach(button => {
    button.addEventListener('click', (e) => clickedKeyNumber(e));
});

// key Action clicked

const addition = () => {
    calculate.store = Number(calculate.firstNumber) + Number(calculate.secondNumber);
    calculate.firstNumber = Number(calculate.firstNumber) + Number(calculate.secondNumber);
    if (!calculate.equal) {
        calculate.secondNumber = '';
    }
    updateScreen();
};
const subtraction = () => {
    calculate.store = Number(calculate.firstNumber) - Number(calculate.secondNumber);
    calculate.firstNumber = Number(calculate.firstNumber) - Number(calculate.secondNumber);
    if (!calculate.equal) {
        calculate.secondNumber = '';
    }
    updateScreen();
};
const multiplication = () => {
    calculate.store = Number(calculate.firstNumber) * Number(calculate.secondNumber);
    calculate.firstNumber = Number(calculate.firstNumber) * Number(calculate.secondNumber);
    if (!calculate.equal) {
        calculate.secondNumber = '';
    }
    updateScreen();
};
const division = () => {
    calculate.store = Number(calculate.firstNumber) / Number(calculate.secondNumber);
    calculate.firstNumber = Number(calculate.firstNumber) / Number(calculate.secondNumber);
    if (!calculate.equal) {
        calculate.secondNumber = '';
    }
    updateScreen();
};

const clickedKeyAction = () => {
    switch (calculate.action) {
        case '+':
            addition();
            break;
        case '-':
            subtraction();
            break;
        case 'x':
            multiplication();
            break;
        case '/':
            division();
    }
};

const clickKeyAction = (e) => {
    if (e.target.dataset.btnAction === '-' && calculate.action === '' && calculate.firstNumber === '') {
        calculate.firstNumber = '-';
        calculate.store = '-';
    } else if (calculate.action === '' && calculate.firstNumber !== '') {
        calculate.action = e.target.dataset.btnAction;
        calculate.store = calculate.store + e.target.dataset.btnAction;
    } else if (e.target.dataset.btnAction === '-' && calculate.action !== '' && calculate.secondNumber === '') {
        calculate.secondNumber = '-';
        calculate.store += '-';
    } else if (calculate.action !== '' && calculate.secondNumber === '-') {
        return;
    } else if (e.target.dataset.btnAction === '=') {
        calculate.equal = true;
        clickedKeyAction();
    } else {
        if (!calculate.equal) {
            clickedKeyAction();
        }
        calculate.action = e.target.dataset.btnAction;
        if (calculate.action !== '=') {
            calculate.secondNumber = '';
            calculate.store = calculate.store + e.target.dataset.btnAction;
            calculate.equal = false;
        }
    }
    updateScreen();
};

buttonsAction.forEach(button => {
    button.addEventListener('click', (e) => clickKeyAction(e));
});

// key Del Clicked

const delNumber = () => {
    if (calculate.action !== '') {
        calculate.action = '';
        calculate.store = calculate.store.slice(0, calculate.store.length - 1);
    } else if (calculate.secondNumber !== '') {
        calculate.secondNumber = calculate.secondNumber.slice(0, calculate.secondNumber.length - 1);
        calculate.store = calculate.store.slice(0, calculate.store.length - 1);
    } else if (calculate.firstNumber !== '') {
        calculate.firstNumber = calculate.firstNumber.slice(0, calculate.firstNumber.length - 1);
        calculate.store = calculate.store.slice(0, calculate.store.length - 1);
    }
    updateScreen();
};

del.addEventListener('click', delNumber);

//key Reset Clicked

const resetCalculator = () => {
    calculate.firstNumber = '';
    calculate.secondNumber = '';
    calculate.action = '';
    calculate.store = '';
    updateScreen();
};

reset.addEventListener('click', resetCalculator);


updateScreen();
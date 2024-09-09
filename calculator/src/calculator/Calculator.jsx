import React, { useState } from 'react';
import './Calculator.css'; // Import the CSS file

const Calculator = () => {
    const [display, setDisplay] = useState(''); // State to hold the display value
    const [firstInput, setFirstInput] = useState(null); // Store the first input number
    const [operator, setOperator] = useState(null); // Store the operator
    const [waitingForSecondInput, setWaitingForSecondInput] = useState(false); // Flag to indicate if waiting for the second input

    const handleButtonClick = (value) => {
        // If waiting for the second input, start a new display
        if (waitingForSecondInput) {
            setDisplay(value);
            setWaitingForSecondInput(false);
        } else {
            setDisplay(display + value);
        }
    };

    const handleOperatorClick = (op) => {
        if (firstInput === null) {
            setFirstInput(parseFloat(display));
        } else if (operator) {
            const result = calculate(firstInput, parseFloat(display), operator);
            setDisplay(String(result));
            setFirstInput(result);
        }
        setOperator(op);
        setWaitingForSecondInput(true);
    };

    const calculate = (first, second, op) => {
        switch (op) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    };

    const handleEqualClick = () => {
        if (operator && firstInput !== null) {
            const result = calculate(firstInput, parseFloat(display), operator);
            setDisplay(String(result));
            setFirstInput(null);
            setOperator(null);
            setWaitingForSecondInput(false);
        }
    };

    const handleClear = () => {
        setDisplay('');
        setFirstInput(null);
        setOperator(null);
        setWaitingForSecondInput(false);
    };

    return (
        <>
        <h1>Calcletor </h1>
            <div className="calculator">
                <p className="calculator-display">{display}</p> {/* Display section */}
                <div className="calculator-grid">
                    <div className="row">
                        <p onClick={() => handleButtonClick('%')}>%</p>
                        <p onClick={() => handleButtonClick('CE')}>CE</p>
                        <p onClick={() => handleButtonClick('C')}>C</p>
                        <p onClick={handleClear}>clear</p>
                    </div>
                    <div className="row">
                        <p onClick={() => handleButtonClick('7')}>7</p>
                        <p onClick={() => handleButtonClick('8')}>8</p>
                        <p onClick={() => handleButtonClick('9')}>9</p>
                    </div>
                    <div className="row">
                        <p onClick={() => handleButtonClick('4')}>4</p>
                        <p onClick={() => handleButtonClick('5')}>5</p>
                        <p onClick={() => handleButtonClick('6')}>6</p>
                    </div>
                    <div className="row">
                        <p onClick={() => handleButtonClick('1')}>1</p>
                        <p onClick={() => handleButtonClick('2')}>2</p>
                        <p onClick={() => handleButtonClick('3')}>3</p>
                    </div>
                    <div className="row">
                        <p className="zero" onClick={() => handleButtonClick('0')}>0</p>
                        <p onClick={handleEqualClick}>=</p>
                    </div>
                    <div className="row operators">
                        <p onClick={() => handleOperatorClick('+')}>+</p>
                        <p onClick={() => handleOperatorClick('-')}>-</p>
                        <p onClick={() => handleOperatorClick('*')}>*</p>
                        <p onClick={() => handleOperatorClick('/')}>/</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calculator;

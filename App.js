import React, { useState } from 'react';
import { Button } from './components/Button';
import { Display } from './components/Display';
import { calculate, formatOperand } from './calculator';
import './App.css';

function App() {
  const [currentOperand, setCurrentOperand] = useState("0");
  const [previousOperand, setPreviousOperand] = useState(null);
  const [operation, setOperation] = useState(null);
  const [overwrite, setOverwrite] = useState(true);

  const clear = () => {
    setCurrentOperand("0");
    setPreviousOperand(null);
    setOperation(null);
    setOverwrite(true);
  };

  const deleteNumber = () => {
    if (overwrite) return;
    if (currentOperand.length === 1) {
      setCurrentOperand("0");
      setOverwrite(true);
    } else {
      setCurrentOperand(currentOperand.slice(0, -1));
    }
  };

  const addDigit = (digit) => {
    if (overwrite) {
      setCurrentOperand(digit);
      setOverwrite(false);
    } else {
      setCurrentOperand(currentOperand === "0" ? digit : currentOperand + digit);
    }
  };

  const addDecimal = () => {
    if (overwrite) {
      setCurrentOperand("0.");
      setOverwrite(false);
      return;
    }

    if (currentOperand.includes(".")) return;
    setCurrentOperand(currentOperand + ".");
  };

  const selectOperation = (op) => {
    if (currentOperand === "0" && op === "-") {
      setCurrentOperand("-");
      setOverwrite(false);
      return;
    }

    if (currentOperand === "-" && op === "-") return;

    if (previousOperand == null) {
      setPreviousOperand(currentOperand);
      setCurrentOperand("0");
      setOperation(op);
      setOverwrite(true);
    } else {
      const result = calculate(previousOperand, currentOperand, operation);
      setPreviousOperand(result);
      setCurrentOperand("0");
      setOperation(op);
      setOverwrite(true);
    }
  };

  const evaluate = () => {
    if (operation == null || previousOperand == null) return;

    const result = calculate(previousOperand, currentOperand, operation);
    setCurrentOperand(result);
    setPreviousOperand(null);
    setOperation(null);
    setOverwrite(true);
  };

  return (
    <div className="calculator">
      <Display
        previousOperand={previousOperand}
        currentOperand={currentOperand}
        operation={operation}
      />
      <div className="buttons">
        <Button className="span-two" value="AC" onClick={clear} />
        <Button value="DEL" onClick={deleteNumber} />
        <Button value="÷" onClick={() => selectOperation("÷")} operation />
        
        <Button value="1" onClick={() => addDigit("1")} />
        <Button value="2" onClick={() => addDigit("2")} />
        <Button value="3" onClick={() => addDigit("3")} />
        <Button value="×" onClick={() => selectOperation("×")} operation />
        
        <Button value="4" onClick={() => addDigit("4")} />
        <Button value="5" onClick={() => addDigit("5")} />
        <Button value="6" onClick={() => addDigit("6")} />
        <Button value="-" onClick={() => selectOperation("-")} operation />
        
        <Button value="7" onClick={() => addDigit("7")} />
        <Button value="8" onClick={() => addDigit("8")} />
        <Button value="9" onClick={() => addDigit("9")} />
        <Button value="+" onClick={() => selectOperation("+")} operation />
        
        <Button value="0" onClick={() => addDigit("0")} />
        <Button value="." onClick={addDecimal} />
        <Button className="span-two" value="=" onClick={evaluate} />
      </div>
    </div>
  );
}

export default App;
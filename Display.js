import React from 'react';
import { formatOperand } from '../calculator';

export function Display({ previousOperand, currentOperand, operation }) {
  return (
    <div className="display">
      <div className="previous-operand">
        {formatOperand(previousOperand)} {operation}
      </div>
      <div className="current-operand">{formatOperand(currentOperand)}</div>
    </div>
  );
}
import React from 'react';

export function Button({ value, onClick, className = "" }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {value}
    </button>
  );
}
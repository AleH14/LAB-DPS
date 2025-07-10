"use client"
import React, { useState } from 'react';

const ConvertCF = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);
    if (value !== '') {
      setFahrenheit((value * 9/5 + 32).toFixed(2));
    } else {
      setFahrenheit('');
    }
  };

  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);
    if (value !== '') {
      setCelsius(((value - 32) * 5/9).toFixed(2));
    } else {
      setCelsius('');
    }
  };

  return (
    <div>
      <h1>Convert Celsius to Fahrenheit</h1>
      <input
        type="number"
        value={celsius}
        onChange={handleCelsiusChange}
        placeholder="Celsius"
      />
      <span> °C </span>
      <input
        type="number"
        value={fahrenheit}
        onChange={handleFahrenheitChange}
        placeholder="Fahrenheit"
      />
      <span> °F </span>
    </div>
  );
}

export default ConvertCF;
import React, { useState } from 'react';
import "./UnitConverter.css";
const UnitConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('millimeters');

  // Conversion factors relative to meters
  const units = [
    { name: 'millimeters', factor: 0.001 },
    { name: 'centimeters', factor: 0.01 },
    { name: 'meters', factor: 1 },
    { name: 'kilometers', factor: 1000 },
    { name: 'inches', factor: 0.0254 },    // 1 inch = 0.0254 meters
    { name: 'feet', factor: 0.3048 },      // 1 foot = 0.3048 meters
    { name: 'miles', factor: 1609.34 },    // 1 mile = 1609.34 meters
  ];

  const convertValue = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return 0;

    // Convert to meters first
    const meters = value * units.find(u => u.name === fromUnit).factor;
    
    // Convert from meters to target unit
    return meters / units.find(u => u.name === toUnit).factor;
  };

  return (
    <div className="converter">
      <h2>Length Unit Converter</h2>
      <div className="converter-container">
        <div className="form-group">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
          />
        </div>
        
        <div className="form-group">
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {units.map(unit => (
              <option key={unit.name} value={unit.name}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        <span>to</span>

        <div className="form-group">
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {units.map(unit => (
              <option key={unit.name} value={unit.name}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        <div className="result">
          <p>
            Result: <strong>{convertValue().toFixed(4)} {toUnit}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
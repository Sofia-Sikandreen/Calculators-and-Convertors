import React from 'react';
import { Link } from 'react-router-dom';
import "./PageStyles.css"

const ConvertersPage = () => {
  return (
    <div className="page-container">
      <h2>Converters</h2>
      <div className="tools-grid">
        <Link to="/converters/unit" className="tool-card">
          <h3>Unit Converter</h3>
        </Link>
        <Link to="/converters/currency" className="tool-card">
          <h3>Currency Converter</h3>
        </Link>
      </div>
    </div>
  );
};

export default ConvertersPage;
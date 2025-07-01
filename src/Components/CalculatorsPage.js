import React from 'react';
import { Link } from 'react-router-dom';
import "./PageStyles.css"

const CalculatorsPage = () => {
  return (
    <div className="page-container">
      <h2>Calculators</h2>
      <div className="tools-grid">
        <Link to="/calculators/loan" className="tool-card">
          <h3>Loan Calculator</h3>
        </Link>
        <Link to="/calculators/saletax" className="tool-card">
          <h3>Sales Tax Calculator</h3>
        </Link>
      </div>
    </div>
  );
};

export default CalculatorsPage;
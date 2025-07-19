import React, { useState } from 'react';
import './SalesTaxcalculator.css'; // Import the CSS file

function SalesTaxCalculator() {
  // State variables
  const [beforeTaxPrice, setBeforeTaxPrice] = useState(0);
  const [salesTaxPercentage, setSalesTaxPercentage] = useState(0);
  const [salesTaxAmount, setSalesTaxAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Handle form submission
  const handleCalculate = (e) => {
    e.preventDefault();

    // Convert inputs to numbers
    const price = parseFloat(beforeTaxPrice);
    const taxPercentage = parseFloat(salesTaxPercentage);

    // Calculate sales tax and total price
    const taxAmount = (price * taxPercentage) / 100;
    const total = price + taxAmount;

    // Update state
    setSalesTaxAmount(taxAmount.toFixed(2));
    setTotalPrice(total.toFixed(2));
  };

  return (
    <div className="sales-tax-calculator">
      <h2>Sales Tax Calculator</h2>
      <form onSubmit={handleCalculate}>
        {/* Before Tax Price */}
        <div className="form-group">
          <label>Before Tax Price (PKR):</label>
          <input
            type="number"
            value={beforeTaxPrice}
            onChange={(e) => setBeforeTaxPrice(e.target.value)}
            min="0"
            required
          />
        </div>

        {/* Sales Tax Percentage */}
        <div className="form-group">
          <label>Sales Tax Percentage (%):</label>
          <input
            type="number"
            step="0.01"
            value={salesTaxPercentage}
            onChange={(e) => setSalesTaxPercentage(e.target.value)}
            min="0"
            required
          />
        </div>

        {/* Calculate Button */}
        <button type="submit">Calculate</button>
      </form>

      {/* Results */}
      {salesTaxAmount > 0 && (
        <div className="results">
          <h3>Results:</h3>
          <p><strong>Sales Tax Amount:</strong> PKR {salesTaxAmount}</p>
          <p><strong>Total Price:</strong> PKR {totalPrice}</p>
        </div>
      )}
    </div>
  );
}

export default SalesTaxCalculator;
import React, { useState } from 'react';
import './LoanCalculator.css'; // Import the CSS file

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const handleCalculate = (e) => {
    e.preventDefault();

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100;
    const term = parseFloat(loanTerm);

    let paymentsPerYear;
    switch (paymentFrequency) {
      case 'monthly':
        paymentsPerYear = 12;
        break;
      case 'bi-weekly':
        paymentsPerYear = 26;
        break;
      case 'weekly':
        paymentsPerYear = 52;
        break;
      default:
        paymentsPerYear = 12;
    }

    const numberOfPayments = term * paymentsPerYear;
    const monthlyRate = rate / paymentsPerYear;

    if (monthlyRate === 0) {
      const payment = principal / numberOfPayments;
      setMonthlyPayment(payment.toFixed(2));
      setTotalInterest(0);
    } else {
      const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
      const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
      const payment = numerator / denominator;
      setMonthlyPayment(payment.toFixed(2));
      setTotalInterest((payment * numberOfPayments - principal).toFixed(2));
    }
  };

  return (
    <div className="loan-calculator">
      <h2>Loan Calculator (PKR)</h2>
      <form onSubmit={handleCalculate}>
        <div className="form-group">
          <label>Loan Amount (PKR):</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Interest Rate (%):</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Loan Term (years):</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Payment Frequency:</label>
          <select
            value={paymentFrequency}
            onChange={(e) => setPaymentFrequency(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <button type="submit">Calculate</button>
      </form>

      {monthlyPayment > 0 && (
        <div className="results">
          <h3>Results:</h3>
          <p><strong>Monthly Payment:</strong> PKR {monthlyPayment}</p>
          <p><strong>Total Interest:</strong> PKR {totalInterest}</p>
        </div>
      )}
    </div>
  );
}

export default LoanCalculator;
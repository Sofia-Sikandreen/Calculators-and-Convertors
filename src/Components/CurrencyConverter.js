import React, { useState, useEffect } from 'react';
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PKR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'cur_live_o0s8rP7b6cwT04Ud2R4tCnbZYphNv9KMy200JJR4';
  const API_URL = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCurrencies(Object.keys(data.data));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      const response = await fetch(`${API_URL}&base_currency=${fromCurrency}`);
      const data = await response.json();
      
      const fromRate = data.data[fromCurrency]?.value;
      const toRate = data.data[toCurrency]?.value;

      if (!fromRate || !toRate) throw new Error('Invalid currency conversion');
      
      const result = (amount * toRate) / fromRate;
      setConvertedAmount(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setConvertedAmount(0);
    }
  };

  if (loading) return <div className="converter">Loading currencies...</div>;
  if (error) return <div className="converter">Error: {error}</div>;

  return (
    <div className="converter">
      <h2>Currency Converter</h2>
      <div className="converter-container">
        <div className="form-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
          />
        </div>

        <div className="form-group">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <span>to</span>

        <div className="form-group">
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleConvert}>Convert</button>

        <div className="result">
          {convertedAmount > 0 && (
            <p>
              {amount} {fromCurrency} = {" "}
              <strong>
                {convertedAmount.toFixed(2)} {toCurrency}
              </strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
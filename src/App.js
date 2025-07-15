import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import CalculatorsPage from './Components/CalculatorsPage';
import ConvertersPage from './Components/ConvertersPage';
import LoanCalculator from './Components/LoanCalculator';
import SalesTaxCalculator from "./Components/SalesTaxcalculator"
import UnitConverter from './Components/UnitConverter';
import CurrencyConverter from './Components/CurrencyConverter';
import MathCalculator from './Components/MathCalculator';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<MathCalculator />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/converters" element={<ConvertersPage />} />
          
          {/* Calculator tools */}
          <Route path="/calculators/loan" element={<LoanCalculator />} />
          <Route path="/calculators/saletax" element={<SalesTaxCalculator />} />
          
          {/* Converter tools */}
          <Route path="/converters/unit" element={<UnitConverter />} />
          <Route path="/converters/currency" element={<CurrencyConverter />} />

          {/* MathCalculator */}
          <Route path="/mathCalculator" element={<MathCalculator/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
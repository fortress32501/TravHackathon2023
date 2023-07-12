import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Home from './Home';
import EmployeePage from './EmployeePage';
import SalaryPrediction from './SalaryPrediction';

function App() {
  return (
    <div className="App">
      <nav>
          <div>
            <Link to="/">Search</Link>
            <Link to="/SalaryPrediction">Salary Predictor</Link>
          </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/:id" element={<EmployeePage />} />
        <Route path="/SalaryPrediction" element={<SalaryPrediction />} />
      </Routes>
    </div>
  );
}

export default App;

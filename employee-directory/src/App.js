import logo from './logo.svg';
import './App.css';
import {Routes, Route, Link, Navigate, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Home from './Home';
import EmployeePage from './EmployeePage';
import SalaryPrediction from './SalaryPrediction';
import LogIn from './LogIn';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem('loggedIn')) || false
  )
  const [user, setUser] = useState( {} )
  
  const setLogIn = (value, user_obj) => {
    setIsLoggedIn(value)
    setUser(user_obj)
  }

  const logOut = () => {
    setIsLoggedIn(false)
    setUser( {} )
  }

  useEffect(()=>{
    localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isLoggedIn]);

  return (
    <div className="App">
      <nav>
          <div>
            <Link to="/">Search</Link>
            <Link to="/SalaryPrediction">Salary Predictor</Link>
            <button onClick={e => logOut()}>LogOut</button>
          </div>
      </nav>
      
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home user={user}/> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<LogIn setLogIn={setLogIn}/>} />
        <Route path="/employees/:id" element={isLoggedIn ? <EmployeePage user={user}/>: <Navigate to="/login" replace />} />
        <Route path="/SalaryPrediction" element={isLoggedIn ? <SalaryPrediction user={user}/> : <Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;

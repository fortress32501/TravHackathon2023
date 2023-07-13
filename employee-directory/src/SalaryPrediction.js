import React, { useState } from 'react'

const SalaryPrediction = () => {
  const [location, setLocation] = useState("");
  const [job_role, setJobRole] = useState("");
  const [years_of_experience, setYearsOfExp] = useState(0);
  const [result, setResult] = useState("");

 

  const sendData = () => {
    setResult("")
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ location: location, job_role: job_role, years_of_experience: years_of_experience})
    };
    fetch(`http://localhost:4000/predict`, requestOptions)
        .then((res) => res.json())
        .then(result => setResult(result));
  };

  return (
    <>
    <label>
      Location:
    </label>
    <input type="text" value={location} onChange={e => setLocation(e.target.value)}/>
    <label>
      Job Role:
    </label>
    <input type="text" value={job_role} onChange={e => setJobRole(e.target.value)}/>
    <label>  
      Years of Experience:
    </label>
    <input type="text" value={years_of_experience} onChange={e => setYearsOfExp(e.target.value)}/>
    <button onClick={e => sendData()}>Submit</button>     
    <p>Result: {result}</p>
    </>
  );
}

export default SalaryPrediction
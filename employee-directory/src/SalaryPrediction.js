import React, { useState } from 'react'

const SalaryPrediction = () => {
  const [location, setLocation] = useState("");
  const [job_role, setJobRole] = useState("");
  const [years_of_experience, setYearsOfExp] = useState(1);
  const [result, setResult] = useState("");

  let myformat = new Intl.NumberFormat('en-US', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  });
 
  const sendData = (e) => {
    e.preventDefault()
    setResult("-1")
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
    <h3>Salary Predictor</h3>
    <form className="row g-3 justify-content-center" onSubmit={e => sendData(e)}>
    <div className="col-md-4"></div>
    <div className="col-md-3">
      <label htmlFor='locations' className="form-label"> Location: </label>
      <select name="locations" className="form-select" id="locations" value = {location} onChange={(e)=>setLocation(e.target.value)}> 
            <option value="Des Moines, IA">Des Moines, IA</option> 
            <option value="Houston, TX">Houston, TX</option> 
            <option value="Los Angeles, CA">Los Angeles, CA</option> 
            <option value="Miami, FL">Miami, FL</option>
            <option value="Minneapolis, MN">Minneapolis, MN</option>
            <option value="Nashville, TN">Nashville, TN</option>
            <option value="New York, NY">New York, NY</option>
            <option value="Seattle, WA">Seattle, WA</option>
            <option value="Miami, FL">Miami, FL</option> 
        </select>
    </div>
    <div className="col-md-4"></div>
    <div className="col-md-4"></div>
    <div className="col-md-3">
      <label htmlFor="jobs" className="form-label"> Job Role: </label>
      <select name="jobs" id="jobs" className="form-select" value = {job_role} onChange={e => setJobRole(e.target.value)}> 
        <option value="accounting">Accounting</option> 
        <option value="cybersecurity">Cybersecurity</option> 
        <option value="data_engineer">Data Engineer</option> 
        <option value="human_resources">Human Resources</option>
        <option value="manager">Manager</option>
        <option value="sales">Sales</option>
        <option value="software_engineer">Software Engineer</option>
      </select>
    </div>
    <div className="col-md-4"></div>
    <div className="col-md-4"></div>
    <div className="col-md-3">
      <label htmlFor="years" className="form-label"> Years of Experience: </label>
      <input type="number" min="1" id="years" value={years_of_experience}  className="form-control" onChange={e => setYearsOfExp(e.target.value)}/><br/>
    </div>
    <div className="col-md-4"></div>
    <button className="btn btn-primary" style={{"width": "125px"}} type="submit">Submit</button>     
    <div>{result==="-1" ? <div className="spinner-border m-5" role="status"><span className="visually-hidden">Loading...</span></div>: <h5>Result: ${myformat.format(result)}</h5>}</div>
    </form>
    </>
  );
}

export default SalaryPrediction
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import Employee from './Employee';

const Home = (props) => {
  const [employees, setEmployees] = useState([]);
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [location, setLocation] = useState("")
  const [job, setJob] = useState("")
  const [salaryComp, setSalaryComp] = useState("")
  const [salary, setSalary] = useState(0)
  const [yearsComp, setYearsComp] = useState("")
  const [years, setYears] = useState(0)

  const navigate = useNavigate()

  const getAllEmployees = ()  => {
    fetch(`http://localhost:4000/api/employees`)
      .then((res) => { 
        if(res.ok) {
          return res.json() 
        } else if(res.status === 404) {
          return Promise.reject('error 404')
        } else {
          return Promise.reject('some other error: ' + res.status)
        }   
      })
      .then(result => setEmployees(result))
      .catch(err => console.log(err));
  }

  useEffect(()=>{
    getAllEmployees()
  }, []);

  const handleClickPerson = (employee) => {
    navigate(`/employees/${employee.employee_id}`, { replace: true });
  }

  return (
    <>
    <div>Home</div>
    <div>
      <input
        type="text"
        placeholder="Enter first name"
        value = {first_name}
        onChange={(e)=>setFirstName(e.target.value)}
      />
    </div>
    <div>
      <input
        type="text"
        placeholder="Enter last name"
        value = {last_name}
        onChange={(e)=>setLastName(e.target.value)}
      />
    </div>
    <div>
      <select name="locations" id="locations" value = {location} onChange={(e)=>setLocation(e.target.value)}> 
          <option value="">-</option> 
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
    <div>
      <select name="jobs" id="jobs" value = {job} onChange={(e)=>setJob(e.target.value)}> 
          <option value="">-</option> 
          <option value="accounting">Accounting</option> 
          <option value="cybersecurity">Cybersecurity</option> 
          <option value="data_engineer">Data Engineer</option> 
          <option value="human_resources">Human Resources</option>
          <option value="manager">Manager</option>
          <option value="sales">Sales</option>
          <option value="software_engineer">Software Engineer</option>
      </select>
    </div>
    <div>
      <select name="yearsComp" id="yearsComp" value = {yearsComp} onChange={(e)=>setYearsComp(e.target.value)}> 
            <option value="">-</option> 
            <option value="eq">=</option>
            <option value="gt">&gt;</option> 
            <option value="lt">&lt;</option> 
        </select>
        <input
          type="text"
          placeholder="Enter years"
          value = {years}
          onChange={(e)=>setYears(e.target.value)}
        />
    </div>
    {props.user.job_role==="human_resources" ? <div>
      <select name="salaryComp" id="salaryComp" value = {salaryComp} onChange={(e)=>setSalaryComp(e.target.value)}> 
          <option value="">-</option> 
          <option value="gt">&gt;</option> 
          <option value="lt">&lt;</option> 
      </select>
      <input
        type="text"
        placeholder="Enter salary"
        value = {salary}
        onChange={(e)=>setSalary(e.target.value)}
      />
    </div> : <></>}
    <div>{
      employees.filter(
        employee => 
        employee.first_name.toLowerCase().includes(first_name.toLowerCase()) 
        && employee.last_name.toLowerCase().includes(last_name.toLowerCase())
        && employee.location.toLowerCase().includes(location.toLowerCase())
        && employee.job_role.toLowerCase().includes(job.toLowerCase())
      ).filter(
        employee => {
          if (yearsComp===""){
            return true
          } else if (yearsComp==="gt"){
            return employee.years_of_experience > years
          } else if (yearsComp==="lt"){
            return employee.years_of_experience < years
          } else {
            return +employee.years_of_experience === +years
          }
        }
      ).filter(
        employee => {
          if (salaryComp===""){
            return true
          } else if (salaryComp==="gt"){
            return employee.salary > salary
          } else {
            return employee.salary < salary
          }
        }
      ).map(
        fil_emp => {return <Employee first_name={fil_emp.first_name} last_name={fil_emp.last_name} key={fil_emp.employee_id} id={fil_emp.employee_id} />}
      )}
    </div>
    </>
  )
}

export default Home
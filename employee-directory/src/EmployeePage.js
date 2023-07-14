import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import Employee from './Employee';

const EmployeePage = (props) => {
  const [employee, setEmployee] = useState({})
  const [manager, setManager] = useState({})
  const [underlings, setUnderlings] = useState([])
  const [canViewSalary, setCanViewSalary] = useState(false)
  let params = useParams();

  const getEmployee = ()  => {
    fetch(`http://localhost:4000/api/employees/${params.id}`)
      .then((res) => { 
        if(res.ok) {
          return res.json() 
        } else if(res.status === 404) {
          return Promise.reject('error 404')
        } else {
          return Promise.reject('some other error: ' + res.status)
        }   
      })
      .then(result => setEmployee(result))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (employee.manager) {
      if (employee.manager != "NA") {
        setUnderlings([])
        fetch(`http://localhost:4000/api/employees/${employee.manager}`)
        .then((res) => { 
          if(res.ok) {
            return res.json() 
          } else if(res.status === 404) {
            return Promise.reject('error 404')
          } else {
            return Promise.reject('some other error: ' + res.status)
          }   
        })
        .then(result => setManager(result))
        .catch(err => console.log(err))
      } else {
        setManager({})
        fetch(`http://localhost:4000/api/managers/${employee.employee_id}`)
        .then((res) => { 
          if(res.ok) {
            return res.json() 
          } else if(res.status === 404) {
            return Promise.reject('error 404')
          } else {
            return Promise.reject('some other error: ' + res.status)
          }   
        })
        .then(result => setUnderlings(result))
        .catch(err => console.log(err))
      }
    } 
  }, [employee]);

  useEffect(()=>{
    getEmployee()
  }, [params]);

  useEffect(()=>{
    if (employee.manager && employee.employee_id) {
      if (props.user.job_role === "human_resources") {
        setCanViewSalary(true)
      } else if (props.user.job_role === "manager" && props.user.employee_id === employee.manager) {
        setCanViewSalary(true)
      } else if (props.user.employee_id === employee.employee_id){
        setCanViewSalary(true)
      } else {
        setCanViewSalary(false)
      }
    }
  }, [employee]);

  function toTitleCase(str) {
    if (str) {
      str = str.replace("_", " ")
      return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    }
  }

  return (
    <>
    <div className="row justify-content-center">
      <div className="card" style={{"width": "18rem", "margin": "20px"}}>
        <div className="card-body">
          <h5 className="card-title">{employee.first_name} {employee.last_name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Phone: {employee.phone}</li>
          <li className="list-group-item">Location: {employee.location}</li>
          <li className="list-group-item">Role: {toTitleCase(employee.job_role)}</li>
          <li className="list-group-item">Years of Experience: {employee.years_of_experience}</li>
          {canViewSalary ? <li className="list-group-item">Salary: {employee.salary}</li> : <></>}
        </ul>
      </div>
    </div>
    <div> Manager: </div> <div className="row justify-content-center g-1">{employee.manager!="NA" ? <Employee first_name={manager.first_name} last_name={manager.last_name} location={manager.location} key={manager.employee_id} id={manager.employee_id} /> : <div>None</div>}</div>
    <div> Employees: </div> <div className="row justify-content-center g-1">{employee.job_role!="manager" ? <div>None</div> : underlings.map(underling => {return <Employee first_name={underling.first_name} last_name={underling.last_name} location={underling.location} key={underling.employee_id} id={underling.employee_id} />})}</div>
    
    </>
  )
}

export default EmployeePage
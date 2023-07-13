import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import Employee from './Employee';

const EmployeePage = () => {
  const [employee, setEmployee] = useState({})
  const [manager, setManager] = useState({})
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
        console.log("check")
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
        .catch(err => console.log(err));
      } else {
        console.log("check2")
        setManager({})
      }
    } 
  }, [employee]);

  useEffect(()=>{
    getEmployee()
  }, [params]);

  return (
    <>
    <div>EmployeePage</div>
    <div>{employee.first_name} {employee.last_name}</div>
    <div>Phone: {employee.phone}</div>
    <div>Location: {employee.location}</div>
    <div>Role: {employee.job_role}</div>
    <div> Manager: {employee.manager!="NA" ? <Employee first_name={manager.first_name} last_name={manager.last_name} key={manager.employee_id} id={manager.employee_id} /> : <div>None</div>}</div>
    </>
  )
}

export default EmployeePage
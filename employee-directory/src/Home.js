import React, { useState, useEffect } from 'react'

const Home = (props) => {
  const [employees, setEmployees] = useState([]);
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")

  const getAllEmployees = ()  => {
    fetch(`http://localhost:4000/employees`)
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
    <div>{
      employees.filter(
        employee => 
        employee.first_name.toLowerCase().includes(first_name.toLowerCase()) 
        && employee.last_name.toLowerCase().includes(last_name.toLowerCase())
      ).map(
        filteredEmployee => <div>{filteredEmployee.first_name} {filteredEmployee.last_name}</div>
      )}
    </div>
    </>
  )
}

export default Home
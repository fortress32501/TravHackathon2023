import React from 'react'
import {useState} from 'react';
import { useNavigate } from 'react-router';

const LogIn = (props) => {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [badLogin, setbadLogin] = useState(false)
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: first_name, last_name: last_name, password: password })
         };
        fetch(`http://localhost:4000/api/login`, requestOptions)
            .then((res) => { 
                if(res.ok) {
                  setbadLogin(false)
                    return res.json() 
                } else if(res.status === 404) {
                    setbadLogin(true)
                    return Promise.reject('error 404')
                } else {
                    return Promise.reject('some other error: ' + res.status)
                }   
            })
            .then(result => {
                props.setLogIn(true, result)
                navigate("/", { replace: true });
            })
            .catch(err => console.log(err));
    }
    
    const login = () => {
        props.setLogIn(true)
        navigate("/", { replace: true });
    }

    return (
    <div>
      <h3>Sign In</h3>
      {badLogin ? <div className="row justify-content-center"><div class="alert alert-danger" role="alert" style={{"width": "400px"}}>Wrong Name or Password! Try Again.</div></div> : <></>}
      <form onSubmit={e=>handleSubmit(e)} className="row g-3">  
          <div className="col-md-3"></div>  
          <div className="col-md-3">
            <label htmlFor="first_name" className="form-label">First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              id="first_name"
              className="form-control"
              value = {first_name}
              onChange={(e)=>setFirstName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              id="last_name"
              className="form-control"
              value = {last_name}
              onChange={(e)=>setLastName(e.target.value)}
            />
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              className="form-control"
              value = {password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-3"></div>
          <div>
            <button className="btn btn-primary" type="submit" >
              Submit
            </button>
          </div>
      </form>
    </div>
  )
}

export default LogIn
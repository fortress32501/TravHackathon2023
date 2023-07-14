import React from 'react'
import { useNavigate } from 'react-router-dom';

const Employee = (props) => {
    const navigate = useNavigate();

    function handleClick(id) {
        navigate(`/employees/${id}`);
    }

  return (
    
    <div className="card" style={{'width': '18rem', 'margin': '10px'}}>
        <div className="card-body">
            <h5 className="card-title">{props.first_name} {props.last_name}</h5>
            <p className="card-text">{props.location}</p>
            <div className="btn btn-primary" onClick={(e) => handleClick(props.id)}>View Employee</div>
        </div>
    </div>
    
  )
}

export default Employee;
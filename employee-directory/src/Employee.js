import React from 'react'
import { useNavigate } from 'react-router-dom';

const Employee = (props) => {
    const navigate = useNavigate();

    function handleClick(id) {
        navigate(`/employees/${id}`);
    }

  return (
    <div onClick={(e) => handleClick(props.id)}>{props.first_name} {props.last_name}</div>
  )
}

export default Employee;
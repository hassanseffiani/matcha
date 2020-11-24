import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {
  return (
    <header>
      {/* <h1>Matcha</h1> */}
      <Link  to="/">Home</Link> | <Link  to="/Sign-up">Sign-up</Link> | <Link to="/Login">Login</Link>
    </header>
  )
}

export default header;
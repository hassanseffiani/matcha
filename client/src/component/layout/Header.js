import React from 'react';
import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button'

const header = () => {
  return (
    <header>
      {/* <h1>Matcha</h1> */}
      <Link  to="/">Home</Link> | <Link  to="/Sign-up">Sign-up</Link> | <Link to="/Login">Login</Link> | <Link to="/logout">logout</Link>
      {/* <Button variant="contained" color="primary">
      test
      </Button> */}
    </header>
  )
}

export default header;
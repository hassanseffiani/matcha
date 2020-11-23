import React, { Component } from 'react';
// import Axios from 'axios';
import {BrowserRouter as Route}from 'react-router-dom';

// import imgMatcha from '../../assets/images/img1.png';

class Users extends Component {
    render(){
        return(
            <div>
                <p>Test</p>         
                <Route exact path="/" render={props => (
                    <React.Fragment>
                        <h1>Home Page</h1>
                    </React.Fragment>
                )} />
                {/* <Route path="/Sign-in" component={Signin} /> */}
                    {/* <Signin/> */}
                {/* </Route> */}
                {/* <Route path="/Login">
                    <Login/>
                </Route> */}
            </div>
        )
    };
}

export default Users;
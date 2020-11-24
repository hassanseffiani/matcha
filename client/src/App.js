import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';
import Users from "./containers/Users/Users";
import Login from './component/Login/Login';
import Signup from "./component/Sign-in/Sign-in";
import Header from "./component/layout/Header";
import {BrowserRouter as Router, Route}from 'react-router-dom';
import { Redirect } from "react-router-dom";

class App extends Component {
  state = {
    errMsg: '',
    redirect: null
  }
  componentDidMount = () => {
    Axios.get("http://localhost:3001/").then(response => {
      
    }); 
  }
  render() {
    if (this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    return (
      <Router>
        <div className="container">
          <div className="rows">
            <div className="py-3 text-center">
              <div className="col-md-6 mx-auto">
                <Header />
                  <Route exact path="/" render={props => (
                    <React.Fragment>
                        <h1>Home Page</h1>
                    </React.Fragment>
                )} />
                <Route path="/Users" component={Users}/>
                {/* missing sending  email confirmation ++ confirm verify */}
                <Route path="/Sign-up" component={Signup} />
                {/* missing session outil */}
                <Route path="/Login" component={Login} />
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

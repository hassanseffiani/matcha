import React, { Component } from 'react';
import './App.css';
import Users from "./containers/Users/Users";
// import Login from './component/Login/Login';
// import Signup from "./component/Sign-in/Sign-in";
import Header from "./component/layout/Header";
import {BrowserRouter as Router, Route}from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="rows">
            <div className="py-3 text-center">
              <div className="col-md-6 mx-auto">
                <Header />
                  {/* <Route exact path="/" render={props => (
                    <React.Fragment>
                        <h1>Home Page</h1>
                    </React.Fragment>
                )} /> */}
                <Route path="/Users" component={Users}/>
                {/* <Route path="/Sign-up" component={Signup} />
                <Route path="/Login" component={Login} /> */}
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

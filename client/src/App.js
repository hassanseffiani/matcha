import React, { Component } from 'react';
import './App.css';
import Init from './start/init'



// check if aleready loggin


class App extends Component {
  // state = {
  //   loggenin: ''
  // }
  // login = () => this.setState({loggenin: true})
  // logout = () => this.setState({loggenin: false})

  render() {
    return (
      <React.Fragment>
        <Init />
      </React.Fragment>   
    )
  }
}

export default App;

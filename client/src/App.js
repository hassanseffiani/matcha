import React, { Component } from 'react';
// import Axios from 'axios';
import './App.css';
import Init from './start/init'

class App extends Component {
  // state = {
  //   userName: '',
  //   errMsg: '',
  // }
  // componentDidMount = () => {
  //   Axios.get("http://localhost:3001/").then(response => {
  //     // console.log(response);
  //     this.setState({userName : response.data});
  //   }); 
  // }
  render() {
    return (
      <React.Fragment>
        <Init />
      </React.Fragment>   
    )
  }
}

export default App;

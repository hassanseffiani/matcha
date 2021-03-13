import React, { Component } from 'react';
import './App.css';
import Init from './start/init'

// const noop = () => {
//   if (process.env.NODE_ENV !== 'development') {
//       console.log = noop
//       console.warn = noop
//       console.error = noop
//   }
// }
// noop()

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Init />
      </React.Fragment>
    )
  }
}

export default App;
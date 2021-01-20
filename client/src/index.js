import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Axios from 'axios'
import { Router }from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './start/theme'
import history from './history/history'


Axios.defaults.baseURL = "http://localhost:3001/"

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router history={history}>
            <App />
        </Router>
    </ThemeProvider>
, document.getElementById('root'));
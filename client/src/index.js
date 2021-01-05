import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter as Router }from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from "./start/theme"

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router>
            <App />
        </Router>
    </ThemeProvider>
, document.getElementById('root'));
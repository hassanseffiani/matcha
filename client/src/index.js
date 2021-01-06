import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// we should use route instead of using BrowserRoute.
import { Router }from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './start/theme'
import history from './history/history'

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Router history={history}>
            <App />
        </Router>
    </ThemeProvider>
, document.getElementById('root'));
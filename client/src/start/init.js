import React, { useState }from 'react'
import Login from '../component/auth/Login';
import Signup from "../component/auth/Sign-in";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
import { Route }from 'react-router-dom';
import { Typography, Grid } from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'


const Init = () => {
    const [darkMode, setDarkMode] = useState(false)

    const darkTheme = createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light'
        },
      });
      return (
        <ThemeProvider theme={darkTheme}>
            <Grid container direction="column">
                <Grid item>
                    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                </Grid>
                <Grid item container>
                    {/* remove xs={0} for error google ghrome */}
                    <Grid item sm={2} /> 
                        <Grid item xs={12} sm={8}>
                            <Route exact path="/" render={props => (
                                <React.Fragment>
                                    <Typography variant="h1">Home Page</Typography>
                                </React.Fragment>
                            )} />
                            <Route path="/Sign-up" component={Signup} />
                        </Grid>
                    <Grid item sm={2} />
                </Grid>
                <Grid item container>
                    <Route path="/Login" component={Login} />
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </ThemeProvider>

        

    )
}

export default Init
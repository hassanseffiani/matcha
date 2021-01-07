import React, { useState }from 'react'
import Home from '../component/Home';
import Login from '../component/auth/Login';
import Signup from "../component/auth/Sign-in";
import Valid from "../component/auth/Valid";
import Header from "../component/layout/Header";
// import Footer from "../component/layout/Footer";
import { Route }from 'react-router-dom';
import { Grid } from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import E404 from '../component/helpers/404';
// import auth from '../containers/auth'

/////////////////////// TO UPDATE //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// add another variable to init rfac call loggendin
// initialize two func login , lougout with variable loggenid: true & 2 false
// change this method :               {this.state.loggedin === true &&  <HeaderLoggedin />}
//                                    {this.state.loggedin === false && <HeaderLoggedout />}
// pass 2 func to a component with help of render method.....
// Add this in postLogin
//res.status(201).json({status : "success", user: el.id});
// if redner is sussecss redirect 
//

const Init = () => {
    // const [isAuthed, isLoggenin] = useState(false)

    // useEffect(() => {
    //     if (localStorage.getItem('token') !== null)
    //         isLoggenin(!isAuthed)
        // Axios.get("user/checkLogin").then(response => {
        //     // const token = response.config.headers.Authorization.replace('Bearer ','')
        //     // console.log(+"         ")
        //     // if (token === localStorage.getItem('token'))
        //     console.log(localStorage.getItem('token'))
        //     // isLoggenin(!loggenin)
        //     // this.setState({data : response.data[0]});
        // });
    // });
    // if (localStorage.getItem('token') === null)
    //     isLoggenin(!isAuthed)

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
                    {/* Add another props for header logging */}
                    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                </Grid>
                <Grid item container>
                    {/* remove xs={0} for error google ghrome */}
                    <Grid item sm={2} /> 
                        <Grid item xs={12} sm={8}>
                            <Route exact path="/" component={Home} />
                            <Route path="/confirm/:cnfId" component={Valid} />
                            <Route path="/Sign-up" component={Signup} />
                        </Grid>
                    <Grid item sm={2} />
                </Grid>
                <Grid item container>
                    <Route path="/Login" component={Login} />
                </Grid>
                {/* <Route component={E404} /> */}
                <Grid item xs={12}>
                    {/* <Footer /> */}
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default Init
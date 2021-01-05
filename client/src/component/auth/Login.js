import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import Axios from 'axios'
import { Paper, FormControlLabel , Checkbox, Button, Grid, TextField, Typography, Avatar, CssBaseline } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { LockOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'

// import imgMatcha from '../../assets/images/img.png';

const useStyles = theme => ({
    root: {
        height: '87vh',
    },
    image: {
        backgroundImage: 'url(https://raw.githubusercontent.com/hassanreus/img/master/taboo-2017-005-tom-hardy-006-in-water.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})

class Login extends Component {
    state = {
        errMsg: '',
        userName: '',
        password: '',
        redirect: null,
        data: []
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    // componentDidMount = () => {
    //     Axios.get("http://localhost:3001/users/login").then(response => {
    //         // console.log(response);
    //     }); 
    // }

    login = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3001/users/login",{
            userName: this.state.userName,
            password: this.state.password
        }).then((response) => {
            console.log(response.data);
            // if (response)
            this.setState({errMsg: response.data})
            // else
            //     this.setState({errMsg: ''})
            // //redirection to home page after sending a session user
            // if (this.state.errMsg === "You're In Now!!")
            //     this.setState({redirect: "/"})
        })
    }
    render() {
        if (this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        const { classes } = this.props
        return (
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form method="POST" className={classes.form} onSubmit={this.login}>
                      {/* <p>{this.state.password}</p> */} 
                  <TextField
                    variant="outlined" margin="normal" required fullWidth id="inputUserName"
                    label="User Name" name="userName" autoComplete="userName" autoFocus
                    onChange={this.onChange.bind(this)} value={this.state.userName}
                  />
                  <TextField
                    variant="outlined" margin="normal" required fullWidth name="password"
                    label="Password" type="password" id="inputPassword" autoComplete="current-password"
                    onChange={this.onChange.bind(this)} value={this.state.password}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="\Sign-up" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
                    {/* <p className="text-danger">{this.state.errMsg}</p> */}
            </Grid>
          </Grid>
    )
  }
}

export default withStyles(useStyles)(Login);
import React, { Component } from "react";
import Axios from "axios";
import { Button, TextField, Avatar, Grid, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
const instance = Axios.create({ withCredentials: true });


/// profil part :

/// Warning: A component is changing an uncontrolled input to be controlled

/// initial value with empt string to handel onChange event

/// email firstName lastName


const useStyles = (theme) => ({
  root: {
    height: "100vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Home extends Component {
  state = {
    data : {},
    userName: '',
    redirect: null,
    isAuth: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // still an error of login page redirection

  componentDidMount = () => {
    instance.get("http://localhost:3001/base").then((response) => {
      if (response.data === "login") this.setState({ redirect: "/Login" });
      else {
        this.setState({ data: response.data[0] });
        // response.data[0].map(el => {
          // return ;
        // })
      }
    });
    // if (this.state.userName !== "")
      // this.setState({ userName: this.state.data.userName})
  };

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <Grid item container>
          <Grid item sm={2} />
          <Grid item xs={12} sm={8}>
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profil
            </Typography>
            <form method="POST" className={classes.form} onSubmit={this.login}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="inputUserName"
                    label="User Name"
                    name="userName"
                    autoComplete="userName"
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    value={this.state.data.userName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    value={this.state.data.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='fname'
                    name='firstName'
                    variant='outlined'
                    required
                    fullWidth
                    id='inputFirstName'
                    label='First Name'
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    value={this.state.data.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='inputLastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='lname'
                    autoFocus
                    onChange={this.onChange.bind(this)}
                    value={this.state.data.lastName}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Edit
              </Button>
            </form>
          </Grid>
          <Grid item sm={2} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Home);

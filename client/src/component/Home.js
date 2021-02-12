import React, { Component } from "react";
import Axios from "axios";
import { 
  // Button, TextField, 
  Avatar, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import history from "../history/history";
import Steps from "./helpers/stepper"
import AddImg from '../component/profil/myAddImages'
import FillProfil from '../component/profil/fillProfil'


const instance = Axios.create({ withCredentials: true });

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
    // id: 0,
    // data: { userName: "", email: "", firstName: "", lastName: "" },
    redirect: null,
    fillProfil: null,
    isAuth: false,
    // errMsg: {},
  };

  // handelInput = (e) => {
  //   this.setState({
  //     data: { ...this.state.data, [e.target.name]: e.target.value },
  //   });
  // };

  // still an error of login page redirection

  // componentDidMount() {
  //   instance
  //     .get("http://localhost:3001/base")
  //     .then((res) => {
  //       if (res.data === "login") this.setState({ redirect: "/Login" });
  //       else this.setState({ data: res.data[0], id: res.data[0].id });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  componentDidUpdate() {
    if (this.state.redirect) history.push("/Login");
    if (this.state.fillProfil) history.push(this.state.fillProfil);
  }

  // validEmailErr validFirstNameErr validLastNameErr validUserNameErr
  render() {
    const { classes } = this.props;
    return (
      <Grid container component='main' className={classes.root}>
        <Grid item container>
          <Grid item sm={2} />
          <Grid item xs={12} sm={8}>
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Profil
            </Typography>
            <Steps img={AddImg} fill={FillProfil} id={this.state.id} />
          </Grid>
          <Grid item sm={2} />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(useStyles)(Home);
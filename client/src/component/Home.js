import React, { Component } from "react";
import Axios from "axios";
import { TextField, Avatar, Grid, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
const instance = Axios.create({ withCredentials: true });

const useStyles = (theme) => ({
  root: {
    height: "100vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
});

class Home extends Component {
  state = {
    data: {},
    redirect: null,
    isAuth: false,
  };

  // still an error of login page redirection

  componentDidMount = () => {
    instance.get("http://localhost:3001/base").then((response) => {
      if (response.data === "login") this.setState({ redirect: "/Login" });
      else this.setState({ data: response.data[0] });
    });
  };

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        {/* <Typography variant="h1">{this.state.data.userName}</Typography> */}
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
                // onChange={this.onChange.bind(this)}
                value={this.state.data.userName}
              />
            </form>
          </Grid>
          <Grid item sm={2} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(useStyles)(Home);

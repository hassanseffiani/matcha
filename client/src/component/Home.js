import React, { Component } from "react"
import Axios from 'axios'
import { Typography } from "@material-ui/core"
import { Redirect }from 'react-router-dom';

class Home extends Component{
    state = {
        data: {},
        redirect: null,
        isAuth: false
    }

    // still an error of login page redirection
    
    componentDidMount = () => {
        if (localStorage.getItem('token') === null)
            this.setState({redirect: '/Login'})
        Axios.get("base").then(response => {
            console.log(response)
            this.setState({data : response.data[0]});
        });
    }

    render(){
        if (this.state.redirect)
          return <Redirect to={this.state.redirect} />
        return (
            <React.Fragment>
                <Typography variant="h1">{this.state.data.userName}</Typography>
            </React.Fragment>
        )
    }
}

export default Home
import React, { Component } from "react"
import Axios from 'axios'
import { Typography } from "@material-ui/core"
import { Redirect } from 'react-router-dom'
const instance = Axios.create({ withCredentials : true})

class Home extends Component{
    state = {
        data: {},
        redirect: null,
        isAuth: false
    }

    // still an error of login page redirection
    
    componentDidMount = () => {
        instance.get("http://localhost:3001/base").then(response => {
            if (response.data === 'login')
                this.setState({redirect: '/Login'})
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
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Axios from 'axios';

class Login extends Component {
    state = {
        errMsg: '',
        userName: '',
        password: '',
        redirect: null,
        data: []
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    componentDidMount = () => {
        Axios.get("http://localhost:3001/users/login").then(response => {
            // console.log(response);
        }); 
    }
    login = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/users/login",{
            userName: this.state.userName,
            password: this.state.password
        }).then((response) => {
            // console.log(response);
            if (response)
                this.setState({errMsg: response.data})
            else
                this.setState({errMsg: ''})
            //redirection to home page after sending a session user
            if (this.state.errMsg === "You're In Now!!")
                this.setState({redirect: "/"})
        })
        
    }
    render() {
        if (this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (
            <form method="POST" className="form-signin" onSubmit={this.login}>
                {/* <h1 className="h3 mb-3 font-weight-normal">Login</h1> */}
                <p>{this.state.userName}</p>
                <div className="form-group">
                    <label htmlFor="inputUserName" className="sr-only">Username</label>
                    <input type="text" name="userName" onChange={this.onChange.bind(this)} value={this.state.userName} id="inputUserName" className="form-control" placeholder="Username" required autoFocus />
                </div>
                
                <p>{this.state.password}</p>
                <div className="form-group">
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" name="password" onChange={this.onChange.bind(this)} value={this.state.password} id="inputPassword" className="form-control" placeholder="Password" required />
                </div>
                {/* <div className="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div> */}
                <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                {/* Error handler */}
                <p className="text-danger">{this.state.errMsg}</p>
                <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
                {/* {
                    // console.log(this.state.data)
                    this.state.data.map((val, iKey) => {
                        return <h1 key={iKey}>UserName: {val.userName} | Password: {val.password}</h1>;})
                } */}
            </form>
            // {moviesLitstsName.map((val, iKey) => {
                // return <h1 key={iKey}>Movies Name: {val.moviesTitle} | Review: {val.moviesReview}</h1>;
            // })} */}
        )
    }
}

export default Login;
import React, { Component } from 'react'
import Axios from 'axios'
import { Button } from '@material-ui/core'
import history from "../../history/history";

// contu nue to with button valid

class Valid extends Component{
    state = {
        verify: false,
    }
    preventDefault = event => event.preventDefault()

    handelConfirm = (e,id) => {
        // console.log("users/confirm/"+id);
        Axios.get(`users/confirm/${id}`).then(response => {
            console.log(response.data.status)
            if (response.data.status === "succes")
                this.setState({verify: true})
        });
    }

    componentDidUpdate() {
        // if (this.state.redirect) {
        //     history.push("/Login");
        // }
    }

    render(){
        return (
            <React.Fragment>
                <form>
                    <Button type="submit" fullWidth variant="contained" color="primary" onClick={() => this.handelConfirm(this.props.match.params.cnfId), preventDefault}> Valid </Button>
                </form>
            </React.Fragment>
        )
    }
}

export default Valid
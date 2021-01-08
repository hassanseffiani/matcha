import React, { Component } from 'react'
import Axios from 'axios'
import { Button } from '@material-ui/core'
import { Redirect }from 'react-router-dom';

// contu nue to with button valid

class Valid extends Component{
    state = {
        verify: false,
    }

    // valid = (e) => {
    // }
            handelConfirm = (id) => {
                // e.preventDefault()
                // console.log("users/confirm/"+id);
                Axios.get("users/confirm/"+id).then(response => {
                    console.log(response.data.status)
                    if (response.data.status === "succes")
                        this.setState({verify: true})
                });
            }

    render(){
        if (this.state.verify)
          return <Redirect to="/Login" />
        return (
            <React.Fragment>
                <form>
                    <Button type="submit" fullWidth variant="contained" color="primary" onClick={() => this.handelConfirm(this.props.match.params.cnfId)}> Valid </Button>
                </form>
            </React.Fragment>
        )
    }
}

export default Valid
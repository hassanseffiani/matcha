import React, { Component } from 'react'
import Axios from 'axios'
import { Button } from '@material-ui/core'

// contu nue to with button valid

class Valid extends Component{
    handelConfirm = (id) => {
        console.log("users/confirm/"+id);
        Axios.post("users/confirm/"
        ).then(response => {
            console.log(response)
        });
    }
    render(){
        return <Button type="submit" fullWidth variant="contained" color="primary" onClick={this.handelConfirm(this.props.match.params.cnfId)}> Valid </Button>
    }
}

export default Valid
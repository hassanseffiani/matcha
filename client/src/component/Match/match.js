import React from 'react'
import Axios from 'axios'
import { Button } from '@material-ui/core'

const Match = (props) => {
    const [lat, setLat] = React.useState(false)
    const [long, setLong] = React.useState(false)
    
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
      })
    }

    // React.useEffect(() => {
      // Execute the created function directly
      // console.log("lat : " + lat)
        // if (isNaN(lat) || isNaN(long)){
          // console.log("test")
            // Axios.get('https://api.ipify.org?format=json').then(res => {
            //     Axios.get(
            //       `https://cors-anywhere.herokuapp.com/https://tools.keycdn.com/geo.json?host=${res.data.ip}`
            //     ).then(res => {
            //       setLat(res.data.data.geo.latitude)
            //       setLong(res.data.data.geo.longitude)
            //     })
            // });
        // }
    // }, [lat, long])

    // console.log(lat)


    const getlocalisation = async (e, id) => {
        e.preventDefault()

        await getLocation()
        console.log(lat)
        if (!lat && !long){
          console.log("test")
        }
        // Axios.post(`base/localisation/${id}`, {
        //   lat: lat,
        //   long: long
        // }).then(res => {
        //   console.log(res.data)
        // }).catch(err => console.log(err))

    }

    return (
      <div>
        <form
          method='POST'
          onSubmit={(event) => getlocalisation(event, props.match.params.id)}
        >
          <Button
          type='submit'
            variant='contained'
            color='primary'
          >
            Get Localisation
          </Button>
        </form>
      </div>
    )

}


export default Match
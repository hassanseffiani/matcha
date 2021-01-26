import React from 'react'
import Axios from 'axios'
import { Button } from '@material-ui/core'

const Match = (props) => {
    // const [city, setCity] = React.useState('')
    const [lat, setLat] = React.useState(false)
    const [long, setLong] = React.useState(false)

    navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude)
    })

    React.useEffect(() => {
        // if (lat !== false || long !== false){
        //     Axios.get('https://api.ipify.org?format=json').then(res => {
        //         Axios.get(
        //           `https://cors-anywhere.herokuapp.com/https://tools.keycdn.com/geo.json?host=${res.data.ip}`
        //         ).then(res => console.log(res.data))
        //     });
            
        // }
    }, [lat, long])

    // console.log(lat)


    const getlocalisation = (e, id) => {
        e.preventDefault()
        // if (lat !== false || long !== false) {
        //     Axios.get('https://api.ipify.org?format=json').then((res) => {
        //         Axios.get(
        //         `https://cors-anywhere.herokuapp.com/https://tools.keycdn.com/geo.json?host=${res.data.ip}`
        //         ).then((res) => console.log(res.data))
        //     })
        // }

        Axios.post(`base/localisation/${id}`, {
          lat: lat,
          long: long
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))

        // work with in back end after sending data with axios in react
    //   const nodeGeocoder = require('node-geocoder')


    //   //geoCoder.geocode('Casablanca')
    //   //  .then((res)=> {
    //   //    console.log(res);
    //   //  })
    //   //  .catch((err)=> {
    //   //    console.log(err);
    //   //  });

    //   geoCoder.reverse({ lat: 32.8822213, lon: -6.8979075 }).then((res) => {
    //     console.log(res)
    //   })

    //   // another option enter geocode ... (latitude, longtitude)
    //   // with help of geocode.reverse
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
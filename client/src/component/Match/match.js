import React from 'react'
import Axios from 'axios'

const Match = () => {
    const [city, setCity] = React.useState('')
    const [lat, setLat] = React.useState(false)
    const [long, setLong] = React.useState(false)

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)

        setLat(position.coords.latitude);
        setLong(position.coords.longitude)
    })

    // React.useEffect(() => {
    //     if (lat !== false || long !== false){
    //         Axios.get('https://api.ipify.org?format=json').then(res => {
    //             Axios.get(`https://cors-anywhere.herokuapp.com/https://tools.keycdn.com/geo.json?host=${res.data.ip}`)
    //           .then((res) => {console.log(res.data.data.geo)})
    //         });
    //     }
    // }, [lat, long])

    // console.log(lat)
    return (
        <div>
            test
        </div>
    )

}


export default Match
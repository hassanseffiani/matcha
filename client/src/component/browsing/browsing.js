import React from 'react'
import Axios from 'axios'

const Browsing = (props) => {
    const [cord, setCord] = React.useState([])

    React.useEffect(() => {
      getLocalisation()
    //   Axios.post('/browsing')
      ////////////////////////////////////////////////////////////////
      // pass into node js back end to work with table location

      // const calculate = require('calculate-coordinates')
      // const geolib = require('geolib')

      // let centerCoordinates = [32.8822, -6.8979]
      // let extremeCoordinates = [32.84893, -6.92947]

      // let result = geolib.getDistance(centerCoordinates, extremeCoordinates)

      // console.log(geolib.convertDistance(result, 'km').toFixed(2))
      ////////////////////////////////////////////////////////////////
    }, [])

    const getLocalisation = () => {
        Axios.post(`/base/geo/${props.match.params.id}`).then(res => {
            setCord(res.data)
        })
    }
  return (
    <div>
        test
    </div>
  )
}

export default Browsing

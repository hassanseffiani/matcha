import React from 'react'
import Axios from 'axios'

const Browsing = (props) => {
  const [cord, setCord] = React.useState([])

  const getLocalisation = async () => {
    await Axios.post(`/browsing/geo/${props.match.params.id}`).then((res) => {
      // console.log(Object.values(res.data))
      // console.log(res.data)
      setCord(res.data)
    })
  }

  React.useEffect(() => {
    getLocalisation()
      const interval = setInterval(() => {
        Axios.post('/browsing', {
          cord: cord,
        })
      }, 100)
      return () => clearInterval(interval)
  }, [])

  return (
    <div>
      test
      {/* {console.log(cord)} */}
    </div>
  )
}

export default Browsing

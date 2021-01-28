import React from 'react'
import Axios from 'axios'

const Browsing = (props) => {
  const [cord, setCord] = React.useState([])


  const getLocalisation = React.useCallback(async () => {
    await Axios.post(`/browsing/geo/${props.match.params.id}`).then((res) => {
      setCord(res.data)
    })
  }, [props.match.params.id])

  React.useEffect(() => {
    if (cord.length) {
      Axios.post('/browsing', {
        cord: cord,
      })
    } else getLocalisation()
  }, [cord, getLocalisation])

  return (
    <div>
      test
    </div>
  )
}

export default Browsing
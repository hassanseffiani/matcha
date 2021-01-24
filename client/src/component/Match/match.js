import React from 'react'
import Axios from 'axios'



const Match = () => {
    React.useEffect(() => {
        const result = Axios.get('https://api.ipify.org?format=json').then(res => {
            return res.data.ip
        });
            const last = result.then(res => {return (res)})
            console.log(last)
                // Axios.get(`https://tools.keycdn.com/geo.json?host=${res.data.ip}`).then(res => {
                //     console.log(res)
                // })
    })
    return (
        <div>
            take a user location ---force
        </div>
    )

}


export default Match
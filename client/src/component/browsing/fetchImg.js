import React from 'react';
import Axios from 'axios';

const FetchImg = (props) => {


    const [listImg, setListImg] = React.useState()

    React.useEffect(() => {
        // interact with back end to get  all images
        Axios.post(`/browsing/fetchAllImg/${props.id}`).then(res => {
            // console.log(res.data)
            setListImg(res.data)
        })
    }, [props])


    return (

        <React.Fragment>

            {/* fetch all image saveed  in path public/upload */}
            test
            {/* src="data:image/png;base64,  */}
            {listImg && listImg.map((el, iKey) => {
                console.log(iKey)
                <im
            })}
        </React.Fragment>
    )
}

export default FetchImg;
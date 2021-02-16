import React from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'
import { CardMedia } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  media: {
    height: 0,
    paddingTop: '15.25%',
    marginTop: '1%',
    width: '15vw',
  },
}))

const FetchImg = (props) => {
    const classes = useStyles()
    const [listImg, setListImg] = React.useState([])

    React.useEffect(() => {
        console.log(listImg)
            // console.log('test')
        // } else {
        if (listImg.length === 0) {
            Axios.post(`/browsing/fetchAllImg/${props.id}`).then(res => {
                setListImg(res.data)
            })
        }
    }, [props, listImg])

    const handelNext = (e, k) => {
    //   console.log(e)
    //   console.log(k)
    //   var items = [1, 2, 3]
    //   let foundIndex = listImg.findIndex((el) => el.id === k);
        const newList = listImg.filter((el, key) => key !== k)
        setListImg(newList)

    //   listImg.splice(foundIndex, 1, listImg);
    //   console.log(listImg)
      // slice(0 , 0)
    }

    return (
      <React.Fragment>
        {/* fetch all image saveed  in path public/upload */}
        Displaying all images
        
        {/* src="data:image/png;base64,  */}
        {listImg &&
          listImg.map((el, iKey) => {
            let srcImg = `data:image/png;base64,${el}`
            let altImg = `display all image loop${iKey}`
            return (
              <div className={classes.root}>
                <CardMedia
                  key={iKey}
                  className={classes.media}
                  image={srcImg}
                  title={altImg}
                  onClick={(event) => handelNext(event, iKey)}
                />
              </div>
            )
          }).splice(0, 1)}
      </React.Fragment>
    )
}

export default FetchImg;
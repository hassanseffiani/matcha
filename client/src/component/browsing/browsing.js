import React from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Filter from './filter'
import clsx from 'clsx'
import Profil from './profil'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Container,
} from '@material-ui/core'
import {
  Favorite,
  NotInterested,
  ExpandMore,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  copy: {
    marginBottom: theme.spacing(8),
    textAlign: 'center',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  media1: {
    height: 0,
    paddingTop: '15.25%',
    marginTop: '1%',
    width: '15vw',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    width: '120%',
    marginRight: '100%', // 16:9
  },
}))

const Browsing = (props) => {
  const [cord, setCord] = React.useState([])
  const [gender, setGender] = React.useState('')
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const [list, setList] = React.useState([])
  const [list1, setList1] = React.useState([])
  const [listImg, setListImg] = React.useState([])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }


  const getLocalisation = React.useCallback(async () => {
    await Axios.post(`/browsing/geo/${props.match.params.id}`).then((res) => {
      setGender(res.data.type)
      setCord(res.data.geo)
    })
  }, [props.match.params.id])

  React.useEffect(() => {
    if (cord.length) {
      Axios.post(`/browsing/${props.match.params.id}`, {
        cord: cord,
        gender: gender,
      }).then((res) => {
        // console.log(res.data)
        // http://localhost:3001/RcluVQIR4R9HzbW6xS5w5file-1613494261054.jpeg
        setList(res.data)
        setList1(res.data)
        // res.data.map(el => {
        //   if (el.id === pro)
        // })
      })
    } else getLocalisation()
  }, [cord, gender, getLocalisation, props.match.params.id])

  // React.useEffect(() => {
  //       console.log(listImg)
  //       if (listImg.length === 0) {
  //           // Axios.post(`/browsing/fetchAllImg/${props.match.params.id}`).then(res => {
  //           //     setListImg(res.data)
  //           // })
  //       }
  //   }, [props.match.params.id, listImg, list1])

  React.useEffect(() => {
    // console.log(listImg)
    if (listImg.length === 0){
      list1.map(el => {
        // console.log(el)
        setListImg(img => ([...img, {"id": el.id, "images": el.images}]))
      })
    }
  }, [list1, listImg])

  const handelLike = (event, idLiker, idLiked) => {
    event.preventDefault()
    Axios.post(`/browsing/likes/${idLiker}`, {idLiked: idLiked}).then(res => {
      if (res.data.status) {
        const newList = list.filter((item) => item.id !== idLiked)
        setList1(newList)
      }
    })
  }

  const handelDeslike = (event, idLiker, idLiked) => {
    event.preventDefault()
    Axios.post(`/browsing/deslike/${idLiker}`, {idLiked: idLiked}).then(res => {
      if (res.data.status) {
        const newList = list.filter((item) => item.id !== idLiked)
        setList1(newList)
      }
    })
  }

  // const handelNext = (e, k) => {
    // console.log(k)
        // const newList = listImg.filter((el, key) => key !== k)
        // setListImg(newList)
  // }

  return (
    <Container className={classes.copy} component='main' maxWidth='xs'>
      <Filter setList1={setList1} list={list}/>
      {list1 && list1.map((el, key) => {
            return (
              <Card key={key} className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label='recipe' className={classes.avatar}>
                      profil
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label='settings'>
                      <Profil visitor={props.match.params.id} visited={el.id} element={el}/>
                    </IconButton>
                    // add the ppop up component here so show profil and added to history table databse
                  }
                  title={el.userName}
                  subheader={el.firstName + ' ' + el.lastName}
                />
                {
                  // console.log(listImg.id)
                  // listImg.map(el1 => {
                    // console.log("el : " + el.id)
                    // if (el1.id === el.id){
                      // console.log(el1.images)
                      //  el1.images.split(',').map((el2, iKey) => {
                        // let srcImg = `http://localhost:3001/${el2}`
                        //  console.log(iKey)
                        // let altImg = `display all image loop${iKey}`
                        // return (
                      //     <CardMedia
                      //       key={iKey}
                      //       className={classes.media1}
                      //       image={srcImg}
                      //       title={altImg}
                      //       // onClick={(event) => {
                      //       //   console.log(iKey)
                      //       // }}
                      //       // handelNext(event, iKey)
                      //     />
                      //   )
                      // }).splice(0, 20)
                    // }
                      // console.log("el1 : " + el1.id)
                    //   console.log(el1)
                  // })
                  // const explode = el.images.split(',');
                  // console.log()
                  el.images.split(',').map((el, iKey) => {
                    let srcImg = `http://localhost:3001/${el}`
                    let altImg = `display all image loop${iKey}`
                    return (
                      <CardMedia
                        key={iKey}
                        className={classes.media1}
                        image={srcImg}
                        title={altImg}
                        onClick={(event) => {
                          console.log(iKey)
                        }}
                        // handelNext(event, iKey)
                      />
                    )
                  }).splice(0, 2)
                }
                {/* {listImg &&
                  listImg.map((el, iKey) => {
                    let srcImg = `data:image/png;base64,${el}`
                    let altImg = `display all image loop${iKey}`
                    return (
                      <CardMedia
                        key={iKey}
                        className={classes.media1}
                        image={srcImg}
                        title={altImg}
                        onClick={(event) => handelNext(event, iKey)}
                      />
                    )
                  }).splice(0, 1)} */}

                <CardContent>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    {el.bio}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label='add to favorites'
                    onClick={(event) =>
                      handelLike(event, props.match.params.id, el.id)
                    }
                  >
                    <Favorite />
                  </IconButton>
                  <IconButton
                    aria-label='NotInterested'
                    onClick={(event) =>
                      handelDeslike(event, props.match.params.id, el.id)
                    }
                  >
                    <NotInterested />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                  >
                    <ExpandMore />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                  <CardContent>
                    <Typography paragraph>More :</Typography>
                    {'Age: ' +
                      el.age +
                      ' distance: ' +
                      el.km.toFixed(2) +
                      'km  gender :' +
                      el.gender +
                      ' CITY : ' +
                      el.city}
                  </CardContent>
                </Collapse>
              </Card>
            )
          })
          .splice(0, 20)}
    </Container>
  )
}

export default Browsing
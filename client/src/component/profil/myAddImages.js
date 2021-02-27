import React from 'react'
import Axios from 'axios'
import Size from '../helpers/size'
import { Grid, Card, CardMedia } from '@material-ui/core'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { makeStyles } from '@material-ui/core/styles'
import { IoMdAddCircle, IoIosRemoveCircleOutline } from 'react-icons/io'
import { useEffect } from 'react'

const intialItems = [
  {
    id: '0',
    value: '',
    isDragDisabled: true,
    // isDropDisabled: true,
    disabled: false,
  },
  {
    id: '1',
    value: '',
    isDragDisabled: true,
    // isDropDisabled: true,
    disabled: false,
  },
  {
    id: '2',
    value: '',
    isDragDisabled: true,
    // isDropDisabled: true,
    disabled: false,
  },
  {
    id: '3',
    value: '',
    isDragDisabled: true,
    // isDropDisabled: true,
    disabled: false,
  },
  {
    id: '4',
    value: '',
    isDragDisabled: true,
    // isDropDisabled: true,
    disabled: false,
  },
]
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 600,
    width: 400,
  },
  big: {
    position: 'relative',
    backgroundColor: '#E0E4E9',
    width: '200px',
    height: '300px',
    borderRadius: '10px',
    border: '2px solid white',
  },
  addCircle: {
    position: 'absolute',
    right: '4px',
    top: '4px',
    color: 'pink',
    width: '40px',
    height: '40px',
  },
  media1: {
    width: '200px',
    height: '300px',
  },
}))

const MyAddImages = (props) => {
  const classes = useStyles()
  const [Items, UpdateItems] = React.useState(intialItems)
  const imageRefs = React.useRef([])
  const [ProfileImg, SetProfileImg] = React.useState(null)
  const ProfImgRef = React.useRef(null)
  const [effect, triggerEffect] = React.useState(false)
  const [printImages, setprintImages] = React.useState('')
  // const [isDD, SetIsDD] = useState(true);
  // const [disabled, SetDisabled] = useState(true);

  imageRefs.current = []

  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el)
    }
  }

  // display images inside dragar
  React.useEffect(() => {
    Axios.post(`/base/displayIndrager/${props.id}`).then((res) => {
      // console.log(res.data.images[0])
      if (res.data.images[0]) setprintImages(res.data.images[0])
    })
  }, [props, effect])

  // display of images

  const displayProfileImg = React.useCallback(() => {
    if (ProfileImg != null) {
      var ProfileImgDiv = ProfImgRef.current
      ProfileImgDiv.style.background = 'url(' + ProfileImg + ')'
      ProfileImgDiv.style.backgroundSize = '400px 600px'
    }
  }, [ProfileImg])

  useEffect(() => {
    displayProfileImg()
  }, [displayProfileImg])

  //////////////////////////

  // count of images

  const fetchImgs = React.useCallback(async () => {
    let s = await Axios.post(`/base/img/fetch/${props.id}`, {
      userId: props.id,
    }).then((res) => {
      if (res.data.s === 1) return true
      else return false
    })
    return s
  })

  useEffect(() => {
    fetchImgs().then((res) => {
      if (res) props.checkTotalImg()
    })
  }, [fetchImgs, props])

  ////////////////////////////

  const triggerInput = (index) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index].click()
    }
  }

  const handleChange = async (event, id, index) => {
    if (event.target.files[0]) {
      var value = URL.createObjectURL(event.target.files[0])
      if (index === 0) {
        SetProfileImg(value)
      }
      triggerEffect(!effect)
      if (value != null) {
        var tmp = Items
        tmp[index].value = value
        UpdateItems(tmp)
        const gridId = imageRefs.current[index].id + 'img'
        const grid = document.getElementById(gridId)
        grid.style.background = 'url(' + value + ')'
        grid.style.backgroundSize = '200px 300px'
      }
    }

    event.preventDefault()
    var formData = new FormData()
    formData.set('index', index)
    formData.set('userId', props.id)
    formData.set('file', event.target.files[0])
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    await Axios.post(`base/img/${props.id}`, formData, config)
  }

  async function handleOnDragEnd(result) {
    if (!result.destination) return
    const items = Array.from(Items)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    UpdateItems(items)
    items.map((el, index) => {
      if (index === 0 && el.value !== '') {
        SetProfileImg(el.value)
      }
      return null
    })
    await Axios.post(`base/img/dnd/${props.id}`, {
      index: result.source.index,
      id: result.destination.index,
    })
  }

  const handelRemoveImg = (e, key) => {
    const newString = printImages.split(',')
    const newString1 = newString.filter((item, iKey) => iKey !== key)
    console.log(newString[key])
    setprintImages(newString1.join(', '))
    console.log(props.id)
    Axios.post(`base/dltImgUser/${props.id}`, {image: newString[key]})
  }

  return (
    <Size>
      <Grid container>
        {printImages !== "" && printImages.split(',').length >= 0
          ? printImages.split(',').map((el, iKey) => {
              let srcImg = `http://localhost:3001/${el}`
              let altImg = `display all image loop${iKey}`
              return (
                <div key={iKey} className={classes.big}>
                  <CardMedia
                    className={classes.media1}
                    image={srcImg}
                    title={altImg}
                  />
                  <IoIosRemoveCircleOutline className={classes.addCircle} onClick={(event) => handelRemoveImg(event, iKey)}/>
                </div>
              )
            })
          : ''}
        <div style={{ overflowY: 'scroll', height: '600px' }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='items'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {Items.map(({ id }, index) => {
                    return (
                      <Draggable
                        // isDragDisabled={isDD}
                        key={id}
                        draggableId={id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            id={id + 'img'}
                            className={classes.big}
                            onClick={() => {
                              triggerInput(index)
                            }}
                          >
                            <input
                              name='file'
                              // accept=".gif,.jpg,.jpeg,.png"
                              ref={addToRefs}
                              onChange={(e) => {
                                handleChange(e, id, index)
                              }}
                              hidden
                              id={id}
                              type='file'
                            />
                            {provided.placeholder}
                            <IoMdAddCircle className={classes.addCircle} />
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        {/* <div
          ref={ProfImgRef}
          style={{ width: "400px", height: "600px", border: "1px black solid" }}
          >
        </div> */}
        <Card className={classes.root}>
          <CardMedia
            image='https://raw.githubusercontent.com/hassanreus/img/master/profilImageManWomen.jpg'
            title='Contemplative Reptile'
            // style={{ width: "400px", height: "600px" }}
            ref={ProfImgRef}
            className={classes.media}
          />
        </Card>
      </Grid>
    </Size>
  )
}

export default MyAddImages

import React from 'react'
import Axios from 'axios'
import {
  Button,
  Grid,
  TextField,
  Typography,
  Container,
} from '@material-ui/core'

const Test = (props) => {
  const [images, setImages] = React.useState([])
  // const [previewSource, setpreviewSource] = React.useState();
  const [photos, setPhotos] = React.useState([])
  const [selectedFiles, setSelectedFiles] = React.useState([])

  const test = async (e, id) => {
    e.preventDefault()
// /upload/:filename

    await Axios.post(`base/profil/${id}`, formData, config)
      .then((res) => {
        // photos: [res.data, ...this.state.photos]
        // to display all image with nedd help of function map
        // const { path } = res.data
        res.data.map((el, ikey) =>
          setPhotos([...photos, { id: ikey, path: el.path }])
        )
      })
      .catch((error) => {})

  }

  return (
      <Container component='main' maxWidth='xs'>
        <Typography component='h1' variant='h5'>
          Test get all image
        </Typography>
          <form
            method='POST'
            onSubmit={(event) => fill(event, props.match.params.id)}
          >
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              className={classes.submit}
            >
              Images
            </Button>
          </form>
      </Container>
  )
}

export default FillProfil

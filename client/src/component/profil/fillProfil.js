import React, { useEffect } from "react";
import Axios from "axios";
import {
  Fab,
  Chip,
  Paper,
  Collapse,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
// import { Autocomplete }from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Size from "../helpers/size";
// import history from "../../history/history";

const useStyles = makeStyles((theme) => ({
  copy: {
    marginBottom: theme.spacing(8),
    textAlign: "center",
  },
  typo: {
    margin: theme.spacing(7),
  },
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "green",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const FillProfil = (props) => {
  const [value, setValue] = React.useState("male");
  const [biography, setBio] = React.useState("...");
  const [tag, setTag] = React.useState("");
  const [errTag, setErrTag] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(true);
  const [chipData, setChipData] = React.useState([]);
  const [dsbl, setDsbl] = React.useState(true);
  const [images, setImages] = React.useState([]);
  // const [previewSource, setpreviewSource] = React.useState();
  const [photos, setPhotos] = React.useState([]);
  const classes = useStyles(props);

  useEffect(() => {
    // Axios.post("base/tag").then((res) => {
    //   setChipData(res.data);
    // });
  }, []);

  const fill = async (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key of Object.keys(images)) {
      formData.append("myImage", images[key]);
    }
    console.log(images);
    console.log(formData);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post(`base/profil/${id}`, formData, config)
      .then((res) => {
        // after geting data from node js req.files ... we will bind res.dara wtih photo hooks...
        // photos: [res.data, ...this.state.photos]
        // to display all image with nedd help of function map
        
        // console.log(res.data)
        setPhotos([...photos, ...res.data])
        console.log("all photos content :")
        console.log(photos)
      })
      .catch((error) => {});

    // await Axios.post(`base/tag/${id}`).then((res) => {
    //   for (var i = chipData.length - 1; i >= 0; i--) {
    //     for (var j = 0; j < res.data.length; j++) {
    //       if (chipData[i] && chipData[i].name === res.data[j].name)
    //         chipData.splice(i, 1);
    //     }
    //   }
    // });

    // Axios.post(`base/profil/${id}`, {
    //   gender: value,
    //   bio: biography,
    //   tag: chipData,
    // }).then((res) => {
    //   console.log(res.data);

    //   // let data = { ...res.data.dataErr.msg, ...res.data.dataErr.msgTag };
    //   // if (res.data.dataErr.status) setErr(data);
    //   //   else if (res.data.status === "success") setValid(!valid);
    // });
  };

  const handelTag = (e) => {
    setTag(e.target.value);
    if (tag.match(/^#([A-Za-z0-9_]){3,25}$/) === null) {
      setErrTag("Enter a valid tag");
      setDsbl(true);
    } else {
      setErrTag("");
      setDsbl(false);
    }
  };

  const addToOption = (tag) => {
    if (errTag === "") {
      var id;
      Object.keys(chipData).length === 0
        ? (id = 1)
        : (id = chipData.slice(-1)[0].key + 1);
      chipData.push({ key: id, name: tag });
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const setImage = (e) => {
    const filesToAdd = e.target.files;
    setImages([...images, ...filesToAdd]);
    // previewFile(e.target.files[0]);
    // setImages(e.target.files[0]);
    // setImages(e.target.files);
  };

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setpreviewSource(reader.result);
  //   };
  // };

  return (
    <Size>
      <Container className={classes.copy} component='main' maxWidth='xs'>
        <Typography className={classes.typo} component='h1' variant='h5'>
          Fill profil
        </Typography>
        <div className={classes.paper}>
          <form
            method='POST'
            onSubmit={(event) => fill(event, props.match.params.id)}
          >
            <Grid container spacing={2}>
              <Typography variant='subtitle2' gutterBottom color='secondary'>
                {/* {errMsg} */}
              </Typography>
              <Grid item xs={12}>
                <label htmlFor='upload-photo'>
                  <input
                    style={{ display: 'none' }}
                    multiple
                    id='upload-photo'
                    name='myImage'
                    type='file'
                    onChange={(e) => setImage(e)}
                  />
                  <Fab
                    color='secondary'
                    size='small'
                    component='span'
                    aria-label='add'
                    variant='extended'
                  >
                    <Add /> Upload photo
                  </Fab>
                </label>
                {photos.map((photo, iKey) => {
                  console.log(photo.filename)
                  return (
                    <img
                      key={iKey}
                      src={`http://localhost:3001/${photo.filename}`}
                      alt='previewTst'
                    />
                  )
                })}
                {/* preview with help of reader can be usfull after */}
                {/* {previewSource && (
                  <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: "300px" }}
                  />
                )} */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Biography'
                  multiline
                  rows={3}
                  variant='outlined'
                  value={biography}
                  onChange={(e) => setBio(e.target.value)}
                  error={biography === ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Collapse in={open}>
                  <TextField
                    label='Add New Tag'
                    multiline
                    variant='outlined'
                    value={tag}
                    onChange={(e) => handelTag(e)}
                    helperText={errTag}
                    error={errTag !== ''}
                  />
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => {
                      setOpen(false)
                      setOpen1(true)
                      addToOption(tag)
                    }}
                    disabled={dsbl}
                  >
                    Add
                  </Button>
                </Collapse>
                <Collapse in={open1}>
                  <Button
                    disabled={open}
                    variant='outlined'
                    color='secondary'
                    onClick={() => {
                      setOpen(true)
                      setOpen1(false)
                    }}
                  >
                    New Tag
                  </Button>
                </Collapse>
                <Paper component='ul' className={classes.root}>
                  {chipData.map((data) => {
                    return (
                      <li key={data.key}>
                        <Chip
                          label={data.name}
                          onDelete={handleDelete(data)}
                          className={classes.chip}
                        />
                      </li>
                    )
                  })}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label='gender'
                    name='gender1'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  >
                    <FormControlLabel
                      value='women'
                      control={<Radio />}
                      label='Women'
                    />
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                      label='Male'
                    />
                    <FormControlLabel
                      value='both'
                      control={<Radio />}
                      label='Both'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              className={classes.submit}
            >
              Fill Profil
            </Button>
          </form>
        </div>
      </Container>
    </Size>
  )
};

export default FillProfil;

import React from 'react'
import PropTypes from "prop-types";
import Axios from 'axios'
import {Tab, AppBar, Box, Tabs, Grid, Button, TextField } from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import history from '../../history/history'
import Geo from "./geo"
import EditImages from "./myAddImages"
import EditPassword from "../forget/editPassword"
const instance = Axios.create({ withCredentials: true })

const useStyles = makeStyles((theme) => ({
  diva: {
    height: '100vh',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const EditProfil = (props) => {
  const classes = useStyles(props);
  const [data, setData] = React.useState({
    id: '',
    oauth_id: '',
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: ''
  })
  const [errMsg, setErrMsg] = React.useState("")
  const [status, setStatus] = React.useState()
  const [f, setF] = React.useState(false)
  const [check, setCheck] = React.useState(false)
  const [value, setValue] = React.useState(0);

  const edit = (e, id) => {
    e.preventDefault()
    Axios.post(`base/editprofil/${id}`, {
      userName: data.userName,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      bio: data.bio
    })
      .then((res) => {
        if (res.data.input) {
          setErrMsg(res.data.input)
          setF(true)
        }
        else setErrMsg({ validUserNameErr: undefined, validEmailErr: undefined, validFirstNameErr: undefined, validLastNameErr: undefined, validBio: undefined})
        if (res.data.status) {
          setStatus(!status)
          setF(false)
          // history.push('/about')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handelInput = (e) => {
    // syntac to onchange all value in object  
    // setValues(old => { ...old, [name]: value })
    setData(data => ({ ...data ,[e.target.name]: e.target.value}))
  };

  React.useEffect(() => {
    Axios.post(`/base/check/${props.id}`).then(async (res) => {
      if (res.data.status) await setCheck(true)
    })
    if (check) history.push('/')
    else{
      instance
        .get('http://localhost:3001/base')
        .then((res) => {
          setData(res.data.user)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [props.id, check])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.diva}>
      
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs edit profil"
          >
            <Tab label="Images" {...a11yProps(0)} />
            <Tab label="Profil" {...a11yProps(1)} />
            <Tab label="Password" {...a11yProps(2)} />
            <Tab label="Localization" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <EditImages id={props.id}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid
            container
            justify='center'
            alignItems='center'
            // direction='column'
          >
            <form
              method='POST'
              onSubmit={(event) => edit(event, data.id)}
            >
              <Grid item xs={12} sm={8}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='inputUserName'
                  label='User Name'
                  name='userName'
                  autoComplete='userName'
                  autoFocus
                  onChange={handelInput}
                  value={data.userName}
                  helperText={errMsg.validUserNameErr}
                  error={errMsg.validUserNameErr !== undefined}
                />
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  onChange={handelInput}
                  value={data.email}
                  helperText={errMsg.validEmailErr}
                  error={errMsg.validEmailErr !== undefined}
                />
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  variant='outlined'
                  required
                  fullWidth
                  id='inputFirstName'
                  label='First Name'
                  autoFocus
                  onChange={handelInput}
                  value={data.firstName}
                  helperText={errMsg.validFirstNameErr}
                  error={errMsg.validFirstNameErr !== undefined}
                />
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='inputLastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lname'
                  autoFocus
                  onChange={handelInput}
                  value={data.lastName}
                  helperText={errMsg.validLastNameErr}
                  error={errMsg.validLastNameErr !== undefined}
                />
                <TextField
                  label='Biography'
                  name='bio'
                  multiline
                  rows={3}
                  variant='outlined'
                  onChange={handelInput}
                  value={data.bio}
                  helperText={errMsg.validBio}
                  error={errMsg.validBio !== undefined}
                />
                {status ? (
                          <Alert severity='success'>Update Complet</Alert>
                        ) : (
                          f && <Alert severity='error'>Solve Error</Alert>
                        )}
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Edit
                </Button>
              </Grid>
            </form>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EditPassword id={props.id}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Geo id={data.id} />
        </TabPanel>
      </div>
    </div>
  )
}

export default EditProfil

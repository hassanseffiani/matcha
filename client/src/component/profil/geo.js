import React from 'react'
import Axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import { Button, Dialog, Typography, IconButton } from '@material-ui/core'
import { useMapEvents, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import { Icon } from 'leaflet'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

const Geo = (props) => {
    const [open, setOpen] = React.useState(false)
    const  zoom = 8
    const location = [33.562, -7.36126]
    const handleClickOpen = (e) => {
      setOpen(true)
    }

    const handleClose = (e) => {
      setOpen(false)
    }

    function LocationMarker() {
      const [position, setPosition] = React.useState(null)
      const [city, setCity] = React.useState(null)
      const map = useMapEvents({
        click: (e) => {
          // initialaza variable state
          setCity(null)
          // const { lat, lng } = e.latlng
          // console.log(lat)
          // L.marker([lat, lng]).addTo(map)
          setPosition(e.latlng)
        },
        // click() {
        //   map.locate()
        // },
        // locationfound(e) {
        //   setPosition(e.latlng)
        //   map.flyTo(e.latlng, map.getZoom())
        // },
      })

      React.useEffect(() => {
        if (position !== null) {
          Axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.lat}+${position.lng}&key=292b5efd6196403abb6bc01c3a2c0f8a`
          ).then((res) => {
            res.data.results[0].components.city
              ? setCity(res.data.results[0].components.city)
              : setCity(res.data.results[0].components.village)
          })
        }
        if (city !== null && city !== undefined) {
            console.log(city)
            // axios to edit geolocalization of the user connected
            // console.log(props.id)
        }else
            setCity(null)
      }, [position, city])
      return position === null ? null : (
        <Marker position={position}>
          <Popup>{city && city}</Popup>
        </Marker>
      )
    }

    return (
      <React.Fragment>
        <Button variant='outlined' color='primary' onClick={handleClickOpen}>
          Edit Geolicalization
        </Button>
        <Dialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
        >
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            Maps
          </DialogTitle>
          <DialogContent dividers>
            {/* add map here */}
            <MapContainer center={location} zoom={zoom} Icon={Icon}>
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color='primary'>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
}


export default Geo;
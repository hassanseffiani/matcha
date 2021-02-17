import React from 'react';
import Axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  CardMedia,
  GridList,
  GridListTile
} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Img from '../../../../server/models/imgData';

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
    gridList: {
        width: 500,
        height: 450,
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const CustomizedDialogs = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e, visitor, visited) => {
        setOpen(true);
        Axios.post(`/browsing/history/${visited}`, {visitor: visitor})
    };
    const handleClose = () => {
        setOpen(false);
    };

    // React.useEffect(() => {
    //     console.log(props.element.images)
    // }, [props.element])
    return (
      <React.Fragment>
        <Button
          variant='outlined'
          color='primary'
          onClick={(event) =>
            handleClickOpen(event, props.visitor, props.visited)
          }
        >
          Show profil
        </Button>
        <Dialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
        >
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            {props.element.userName}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Full Name :{' '}
              {' ' + props.element.firstName + ' ' + props.element.lastName}
            </Typography>
            <Typography>Biography : {props.element.bio}</Typography>
            <Typography>Age : {props.element.age}</Typography>
            <Typography>
              Distance : {props.element.km.toFixed(2) + '  km'}
            </Typography>
            <Typography>Gender : {props.element.gender}</Typography>
            <Typography>City : {props.element.city}</Typography>
            <Typography>
              Fame Rating : {props.element.fameRating + '  exp'}
            </Typography>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {
                    props.element.images.split(',').map((el, iKey) => {
                        let srcImg = `http://localhost:3001/${el}`
                        let altImg = `display all image loop${iKey}`
                        // return (
                        //     <CardMedia />
                        // )
                    })
                }
            </GridList>
            {/* // .splice(0, 1) */}
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

export default CustomizedDialogs
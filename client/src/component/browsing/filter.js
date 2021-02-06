import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Typography , Slider} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: 300,
  },
})

function valuetext(value) {
  return `${value} - Old`
}

function fametext(rating) {
  return `${rating} - Fame`
}

function geoText(geo) {
  return `${geo} - Localisation`
}

const RangeSlider = (props) =>  {
  const classes = useStyles()
  const [value, setValue] = React.useState([18, 60])
  const [rating, setRating] = React.useState([0, 1000])
  const [geo, setGeo] = React.useState([0, 300])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    const newList = props.list.filter(
      (item) => item.age >= value[0] && item.age <= value[1]
    )
    props.setList1(newList)
  }

  const handleChange1 = (event, newValue) => {
    setRating(newValue)
    const newList = props.list.filter(
      (item) => item.age >= value[0] && item.age <= value[1]
    )
    const newList1 = newList.filter(
      (item) => item.fameRating >= rating[0] && item.fameRating <= rating[1]
    )
    props.setList1(newList1)
  }

// complet this task localisation

  const handleChange2 = (event, newValue) => {
    setGeo(newValue)
    const newList = props.list.filter(
      (item) => item.age >= value[0] && item.age <= value[1]
    )
    // const newList1 = newList.filter(
    //   (item) => item.fameRating >= rating[0] && item.fameRating <= rating[1]
    // )
    // props.setList1(newList1)
  }

  return (
    <div className={classes.root}>
      <Typography id='range-slider' gutterBottom>
        Age Filter :
      </Typography>
      <Slider
        min={18}
        max={60}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
        getAriaValueText={valuetext}
      />

      <Typography id='range-slider1' gutterBottom>
        Fame Filter :
      </Typography>
      <Slider
        min={0}
        max={1000}
        value={rating}
        onChange={handleChange1}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider1'
        getAriaValueText={fametext}
      />

      <Typography id='range-slider2' gutterBottom>
        Location :
      </Typography>
      <Slider
        min={0}
        max={300}
        value={geo}
        onChange={handleChange2}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider2'
        getAriaValueText={geoText}
      />
    </div>
  )
}


export default RangeSlider
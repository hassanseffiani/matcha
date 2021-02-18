import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, MenuItem } from '@material-ui/core'

const useStyles = makeStyles({
})

// function valuetext(value) {
//   return `${value} - Old`
// }

// function fametext(rating) {
//   return `${rating} - Fame`
// }

// function geoText(geo) {
//   return `${geo} - Localisation`
// }

// function tagText(tag) {
//   return `${tag} - Tag`
// }

const SortComponent = (props) => {
  const classes = useStyles()
  const [sort, setSort] =  React.useState('')
    const handelChangeofAge = (e) => {
        const value = e.target.value
        let newList = props.list, index
        setSort(value)
        if (value === 'Age') index = newList.sort((a, b) => {return a.age - b.age})
        else if (value === 'Location') index = newList.sort((a, b) => a.km - b.km)
        //     props.setList1(newList1)}
        //   else if (value === 'FameRating') newList = props.list.sort((a, b) => a.fameRating - b.fameRating)
        //   else if (value === 'Tag') newList = props.list.sort((a, b) => a.tag - b.tag)
        //   console.log(newList)
        //   props.setList1(newList)
        // value === 'Age' ? newList.sort((a, b) => a.age - b.age) : props.list
        // const newList1 = (value === 'Location' ? newList.sort((a, b) => a.age - b.age) : newList)
        console.log(newList)
        console.log(index)
        props.setList1(index)
    }

  return (
    <React.Fragment>
      <TextField
        id='select'
        fullWidth
        label='Sort'
        value={sort}
        select
        onClick={handelChangeofAge}
      >
        <MenuItem value='Age'>Age</MenuItem>
        <MenuItem value='Location'>Location</MenuItem>
        <MenuItem value='FameRating'>Fame Rating</MenuItem>
        <MenuItem value='Tag'>Tag</MenuItem>
      </TextField>
    </React.Fragment>
  )
}

export default SortComponent

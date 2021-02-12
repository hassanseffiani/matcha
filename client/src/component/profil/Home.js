import React from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'

import { Typography } from '@material-ui/core'
import MyAddImages from './myAddImages'
import FillProfil from './fillProfil'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function getSteps() {
  return ['Add Images', 'Fill Profile Informations']
}

function getStepContent(step, props, checkTI) {
  // if (step === 0 || step === 1) {
  //   if (step === 0)
  //     return <MyAddImages id={props.id} checkTotalImg={checkTI} />
  //   if (step === 1) return <FillProfil id={props.id}/>
  // } else return 'Uknown step'

  switch (step) {
      case 0:
        return <FillProfil id={props.id}/>
      case 1:
        return <MyAddImages id={props.id} checkTotalImg={checkTI} />
      default:
        return 'Unknown step'
    }
}

const HorizontalLinearStepper = (props) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()
  const [stepOneFilled, setStepOneFilled] = React.useState('no')

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1)
  // }

  const handleReset = (e, id) => {
    Axios.post(`/base/dltImg/${id}`).then(res => {
      if (res.data.status)
        setActiveStep(0)
    })
  }

  const checkTotalImg = () => {
    setStepOneFilled('yes')
  }

  const reloadFunc = React.useCallback(() => {
    if (activeStep === 0 && props.id){
      Axios.post(`/base/onlyImg/${props.id}`)
    }
  },[activeStep, props])

  React.useEffect(() => {
    reloadFunc()
  }, [reloadFunc])

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography
              component={'span'}
              variant={'body2'}
              className={classes.instructions}
            >
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={(event) => handleReset(event, props.id)} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography
              component={'span'}
              variant={'body2'}
              className={classes.instructions}
            >
              {getStepContent(activeStep, props, checkTotalImg)}
            </Typography>
            <div>
              {/* <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button> */}
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Skip' : 'Skip'}
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
                disabled={stepOneFilled === 'no' ? true : false}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HorizontalLinearStepper
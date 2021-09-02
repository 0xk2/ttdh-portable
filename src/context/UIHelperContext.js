import { createContext, useContext, useState } from "react";
import { Snackbar, Backdrop, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const UIHelperContext = createContext()

export function useUIHelper(){
  return useContext(UIHelperContext)
}

export function UIHelperProvider ({children}){
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [backdropState, setBackdropState] = useState(false)
  const classes = useStyles();

  const value = {
    setErrorMessage,
    setSuccessMessage,
    setBackdropState
  }
  console.log('uihelper.backdropState :' ,backdropState)
  return (
    <UIHelperContext.Provider value={value}>
      {children}
      <Snackbar open={errorMessage !== ''} autoHideDuration={6000} onClose={() => setErrorMessage('')} anchorOrigin={{ vertical:'top', horizontal:'center'}}>
        <Alert onClose={()=>setErrorMessage('')} severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Snackbar open={successMessage !== ''} autoHideDuration={6000} onClose={() => setSuccessMessage('')} anchorOrigin={{ vertical:'top', horizontal:'center'}}>
        <Alert onClose={()=>setSuccessMessage('')} severity="success">{successMessage}</Alert>
      </Snackbar>
      <Backdrop key={backdropState} className={classes.backdrop} open={backdropState} onClick={() => {
        // setBackdropState(false)
      }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </UIHelperContext.Provider>
  )
}
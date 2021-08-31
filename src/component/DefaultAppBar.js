import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from "@material-ui/icons";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "right"
  },
}));


const DefaultAppBar = function(props){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Fragment>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton+" appbar-menu-button"} color="inherit" aria-label="menu"
              onClick={props.menuHandler} >
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title}>{props.title}</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar>
        </Toolbar>
      </Fragment>
      
    </div>
  )
}

export default DefaultAppBar;
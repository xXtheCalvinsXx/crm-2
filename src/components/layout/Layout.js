import React from 'react';
import { Drawer, AppBar, Toolbar, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router';

const drawerWidth = 40;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    width: '100%',
    padding: theme.spacing(10),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.palette.primary,
  },
  drawerPaper: {
    width: 60,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Layout() {
  const classes = useStyles();
  const history = useHistory()

  return (
    <div className={classes.root}>
      <AppBar position="fixed"
      className={classes.appBar}
      style={{
        backgroundColor: "transparent",
        color: "black",
        boxShadow: "0px 0px 0px 0px"
      }}>
        <Toolbar>
          <Grid
            justifyContent ="space-between" // Add it here :)
            container spacing={10}
          >
            <Grid item>
            </Grid>
            <Grid item>
              <div>
                <IconButton disableRipple={true}>
                  <MoreHorizIcon fontSize="medium" />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left">
        <div className={classes.toolbar} />
        <IconButton 
        onClick={() => history.push('/')}
        >
          <HomeOutlinedIcon 
            style={{ fontSize: 35, color: 'black' }} />
        </IconButton>
        <IconButton 
        onClick={() => history.push('/databaselist')}
        >
          <ContactsOutlinedIcon 
            style={{ fontSize: 35, color: 'black' }} />
        </IconButton>
      </Drawer>
    </div>
    )
}
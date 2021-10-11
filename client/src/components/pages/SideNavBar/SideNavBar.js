import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { useHistory, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
//import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 60;

const useStyles = makeStyles((theme) => ({
  page: {
    background: '#f9f9f9',
    width: '100vw',
    height: '100vh',
    //width: '100%',
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 60,
    overflow: "auto",
    overflowX: 'hidden',
    height: "100%"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  active : {
    background : "#f4f4f4"
  }
}));

export default function SideNavBar({ children }) {
  const classes = useStyles();

  const menuItems = [
    { 
        icon: <AccountCircleIcon style={{ fontSize: 30 }} />, 
        path: '/MyAccount' 
    },
    { 
        icon: <HomeIcon style={{ fontSize: 30 }} />, 
        path: '/' 
    },
    { 
        icon: <ContactsIcon style={{ fontSize: 30 }} />, 
        path: '/Contacts' 
    }
  ];

  const history = useHistory()
  const location = useLocation()

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
            justifyContent ="space-between" 
            container spacing={24}
          >
            <Grid item>
              <IconButton>
                <ArrowLeftIcon fontSize="small"/>
              </IconButton>
              <IconButton>
                <ArrowRightIcon fontSize="small"/>
              </IconButton>
            </Grid>
            <Grid item>
              <div>
                <IconButton>
                  <MoreHorizIcon fontSize="small"/>
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

            <List>
                {menuItems.map((item) => (
                    <ListItem 
                    button 
                    key={item.icon}
                    onClick={() => history.push(item.path)}
                    className={location.pathname === item.path ? classes.active : null}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                    </ListItem>
                ))}
            </List>
        
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  )
}
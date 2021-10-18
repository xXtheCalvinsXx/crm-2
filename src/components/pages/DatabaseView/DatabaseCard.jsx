import React, { useState, useEffect } from 'react';

// firebase
import { useAuthState } from 'react-firebase-hooks/auth';

// axios
import axios from 'axios';

// context
import { useContext } from 'react';
import { userContext } from '../../../appContext/userContext';

import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Button,
  Divider,
  Menu,
  MenuItem,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ContactCard from '../../card/ContactCard';
import AddContact from '../AddContact/AddContact';
import Layout from '../../layout/Layout';

// firebase
import { auth } from '../../../firebase/firebaseUtils';

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
  title: {
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function DatabaseCard(props) {
  const classes = useStyles();

  // const [user, loading, error] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [events, setEvents] = useState([]);

  const currentDate = new Date();

  const user = useContext(userContext);

  console.log('user = ', user);

  useEffect(() => {
    const getDataContacts = async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const headers = await {
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        };
        setLoading(true);

        await axios
          .get('contacts', { headers })
          .then((response) => {
            setLoading(false);
            setContacts(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    const getDataEvents = async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const headers = await {
          'Content-Type': 'application/json',
          Authorization: `Bearer ` + token,
        };
        setLoading(true);

        await axios
          .get('events', { headers })
          .then((response) => {
            setLoading(false);
            setEvents(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    getDataContacts(user);
    getDataEvents(user);
  }, [user]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const moreMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const moreMenuClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      return 'sign out success';
    } catch (error) {
      return 'sign out failure';
    }
  };

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (!loading)
    return (
      <div className={classes.root}>
        <Layout />
        <AppBar
          position='fixed'
          className={classes.appBar}
          style={{
            backgroundColor: 'transparent',
            color: 'black',
            boxShadow: '0px 0px 0px 0px',
          }}
        >
          <Toolbar>
            <Grid
              justifyContent='space-between' // Add it here :)
              container
              spacing={10}
            >
              <Grid item></Grid>
              <Grid item>
                <div>
                  <IconButton onClick={moreMenuClick} disableRipple={true}>
                    <MoreHorizIcon fontSize='medium' />
                  </IconButton>
                  <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={moreMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem
                      onClick={() => {
                        signOut();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.page}>
          <Grid justifyContent='space-between' container spacing={24}>
            <Grid item>
              <AddContact />
            </Grid>
            <Grid item>
              <div>
                <Button
                  style={{ textTransform: 'none' }}
                  endIcon={<ListAltIcon />}
                  raised
                  color='accent'
                >
                  Change View
                </Button>
              </div>
            </Grid>
          </Grid>
          <Divider />
          <br />
          <br />
          <Grid container spacing={3}>
            {contacts.map((contacts) => (
              <Grid item xs={12} sm={6} md={4}>
                <ContactCard contacts={contacts} events={events} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
}

export default DatabaseCard;

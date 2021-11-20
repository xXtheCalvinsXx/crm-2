import React, { useState } from 'react';

// firebase
import { auth } from '../../../firebase/firebaseUtils';
import createContactData from '../../../util/createContactData';

import Layout from '../../layout/Layout';
import DatabaseCard from './DatabaseCard';
import DatabaseList from './DatabaseList';

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
import AddContact from '../AddContact/AddContact';

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

function Database(props) {
  const classes = useStyles();

  // const [user, loading, error] = useAuthState(auth);
  const [cardView, setCardView] = useState(false);
  const [contacts, setContacts] = useState([]);
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
      window.location.reload();
      await auth.signOut();
      return 'sign out success';
    } catch (error) {
      return 'sign out failure';
    }
  };

  const handleAddContact = (newContact) => {
    const arr = [...contacts];
    arr.push(newContact);
    setContacts(arr);
    props.props.contactEventData.current = arr;
  };

  const removeContact = (contactId) => {
    const arr = contacts.filter(function (e) {
      return e.contactId !== contactId;
    });
    setContacts(arr);

    props.props.contactEventData.current = arr;
  };

  const loading = props.props.queryLoading;

  // if (
  //   loading ||
  //   !props.props.contacts?.length >= 0 ||
  //   !props.props.events?.length >= 0
  // ) {
  if (loading) {
    return (
      <React.Fragment>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
        >
          <CircularProgress size={100} />
        </Box>
      </React.Fragment>
    );
  } else {
    if (!(props.props.contactEventData.current.length > 0)) {
      const events = props.props.events;
      const contacts_ = props.props.contacts;
      const data = createContactData(contacts_, events);
      props.props.contactEventData.current = data;
    }

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
                        localStorage.clear();
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
              <AddContact handleAddContact={handleAddContact} />
            </Grid>
            <Grid item>
              <div>
                <Button
                  style={{ textTransform: 'none' }}
                  endIcon={<ListAltIcon />}
                  raised
                  color='accent'
                  onClick={() => setCardView(!cardView)}
                >
                  Change View
                </Button>
              </div>
            </Grid>
          </Grid>
          <Divider />
          <br />
          <br />
          {cardView ? (
            <DatabaseCard
              props={props}
              addContact={handleAddContact}
              contacts={contacts}
              initialData={props.props.contactEventData.current}
              setContacts={setContacts}
              removeContact={removeContact}
            />
          ) : (
            <DatabaseList
              props={props}
              addContact={handleAddContact}
              contacts={contacts}
              initialData={props.props.contactEventData.current}
              setContacts={setContacts}
              removeContact={removeContact}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Database;

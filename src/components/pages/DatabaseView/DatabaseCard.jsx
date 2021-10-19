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
  Card,
  Avatar,
  Typography,
  IconButton,
  Button,
  Divider,
  Menu,
  MenuItem,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddContact from '../AddContact/AddContact';
import Layout from '../../layout/Layout';
import ContactView from '../ContactView/ContactView';

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
  card: {
    display: 'flex',
    padding: 25,
  },
  sizeAvatar: {
    height: theme.spacing(21),
    width: theme.spacing(21),
  },
  typography: {
    color: '#b0bec5',
    marginLeft: 30,
    marginRight: 30,
  },
  typographyInfo: {
    marginLeft: 30,
    marginBottom: 10,
  },
}));

function DatabaseCard(props) {
  const classes = useStyles();

  // Dialog Open and Close
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [clickedContact, setClickedContact] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    console.log('yay');
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditOpen = () => {
    setOpen(true);
  };
  const handleEditClose = () => {
    setOpen(false);
  };

  const contactEventData =
    props.props.props.contactEventData.contactEventData.current;
  return (
    <div>
      <Grid container spacing={3}>
        {contactEventData.map((contacts) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card} onClick={handleClickOpen}>
              <Grid justifyContent='space-between' container>
                <Grid item>
                  <Avatar className={classes.sizeAvatar} variant='square' />
                </Grid>
                <Grid item>
                  <Typography className={classes.typography}>Name</Typography>
                  <Typography className={classes.typographyInfo}>
                    {contacts.contact.Name}
                  </Typography>
                  <Typography className={classes.typography}>
                    Company
                  </Typography>
                  <Typography className={classes.typographyInfo}>
                    {contacts.contact.Company}
                  </Typography>
                  <Typography className={classes.typography}>Last</Typography>
                  <Typography className={classes.typographyInfo}>
                    {contacts.pastEvents.length > 1
                      ? contacts.pastEvents[0].Date
                      : 'Empty'}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.typography}>
                    Location
                  </Typography>
                  <Typography className={classes.typographyInfo}>
                    {contacts.contact.Location}
                  </Typography>
                  <Typography className={classes.typography}>
                    Position
                  </Typography>
                  <Typography className={classes.typographyInfo}>
                    {contacts.contact.Position}
                  </Typography>
                  <Typography className={classes.typography}>Next</Typography>
                  <Typography className={classes.typographyInfo}>
                    {contacts.upcomingEvents.length > 1
                      ? contacts.upcomingEvents[0].Date
                      : 'Empty'}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={open}
        onClose={handleClose}
      >
        <Grid justifyContent='space-between' container spacing={12}>
          <Grid item></Grid>
          <Grid item>
            <div>
              <DialogActions>
                <Button onClick={handleClose}>Edit</Button>

                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

export default DatabaseCard;

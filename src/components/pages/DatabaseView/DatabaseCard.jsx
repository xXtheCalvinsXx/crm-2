import React, { useState, useEffect } from 'react';

import ContactViewDialogue from '../ContactView/ContactViewDialogue';

import {
  Grid,
  Card,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  dialogCustomizedWidth: {
    'max-width': '90%',
    minHeight: '90vh',
    maxHeight: '90vh',
  },
}));

function DatabaseCard(props) {
  const classes = useStyles();

  // Dialog Open and Close
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [clickedContact, setClickedContact] = useState([]);

  const handleClickOpen = (contact) => {
    setOpen(true);
    setClickedContact(contact);
    console.log('yay');
  };

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
  };
  const handleEditOpen = () => {
    setEditOpen(true);
  };

  console.log('props -= ', props);
  const contacts = props.props.props.contactEventData.contactEventData.current;
  return (
    <div>
      <Grid container spacing={3}>
        {contacts.map((contact) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card
              className={classes.card}
              onClick={() => {
                handleClickOpen(contact);
                console.log('contact is  = ', contact);
              }}
            >
              <Grid justifyContent='space-between' container>
                <Grid item>
                  <Avatar className={classes.sizeAvatar} variant='square' />
                </Grid>
                <Grid item>
                  <Typography className={classes.typography}>Name</Typography>
                  <Typography className={classes.typographyInfo}>
                    {contact.Name}
                  </Typography>
                  <Typography className={classes.typography}>
                    Company
                  </Typography>
                  <Typography className={classes.typographyInfo}>
                    {contact.Company}
                  </Typography>
                  <Typography className={classes.typography}>Last</Typography>
                  <Typography className={classes.typographyInfo}>
                    {contact.pastEvents.length > 1
                      ? contact.pastEvents[0].Date
                      : '-'}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.typography}>
                    Location
                  </Typography>
                  <Typography className={classes.typographyInfo}>
                    {contact.Location}
                  </Typography>
                  <Typography className={classes.typography}>
                    Position
                  </Typography>
                  <Typography className={classes.typographyInfo}>
                    {contact.Position}
                  </Typography>
                  <Typography className={classes.typography}>Next</Typography>
                  <Typography className={classes.typographyInfo}>
                    {contact.upcomingEvents.length > 1
                      ? contact.upcomingEvents[0].Date
                      : '-'}
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
            <ContactViewDialogue
              classes={classes}
              handleEditOpen={handleEditOpen}
              editOpen={editOpen}
              open={open}
              contact={clickedContact}
              handleClose={handleClose}
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

export default DatabaseCard;

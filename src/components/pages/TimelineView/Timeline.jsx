import React, { useState, useEffect } from 'react';

// firebase
import { auth } from '../../../firebase/firebaseUtils';
import { useAuthState } from 'react-firebase-hooks/auth';

// axios
import axios from 'axios';
import deleteContact from '../../../axios/deleteContact';

// context
import { useContext } from 'react';
import { userContext } from '../../../appContext/userContext';
import ContactsContext from '../../../appContext/contactsContext';

// layout
import { useHistory } from 'react-router';
import Layout from '../../layout/Layout';
import createContactData from '../../../util/createContactData';
import ContactViewDialogue from '../ContactView/ContactViewDialogue';

// styling
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Menu,
  Dialog,
  MenuItem,
} from '@material-ui/core';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { date } from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    width: '100%',
    padding: theme.spacing(10),
  },
  title: {
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
    padding: theme.spacing(4),
    border: 0,
  },
  row: {
    '&:hover': {
      backgroundColor: '#cfd8dc',
    },
  },
  cell: {
    borderBottom: 'none',
  },
  typography: {
    color: '#b0bec5',
  },
  heading: {
    marginLeft: theme.spacing(1.7)
  },
}));

function getContactName(value, contacts) {
  for (const contact of contacts) {
    if (value == contact.Email) {
      console.log('function called and worked');
      return contact.Email;
    }
    console.log(contact.Email);
    console.log('function called and did not work');
  }
}

function Timeline(props) {
  const classes = useStyles();
  var date = new Date();
  const { contacts, setContacts, removeContact } = props;

  // Dialog Open and Close
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [clickedContact, setClickedContact] = useState([]);
  const [searched, setSearched] = useState('');
  const [deleteContactModal, setDeleteContactModal] = useState(false);

  const handleDelete = async (user, contact) => {
    const success = await deleteContact(user, contact.contactId);
    if (success) removeContact(contact.contactId);
    setDeleteContactModal(false);
    setOpen(false);
  };

  const handleClickOpen = (contact) => {
    setOpen(true);
    setClickedContact(contact);
  };

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
  };
  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      return 'sign out success';
    } catch (error) {
      return 'sign out failure';
    }
  };
  // const { contactData, setNewContacts } = useContext(ContactsContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const moreMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const moreMenuClose = () => {
    setAnchorEl(null);
  };

  const loading = props.props.queryLoading;
  if (
    loading ||
    !props.props.contacts?.length > 0 ||
    !props.props.events?.length > 0
  ) {
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
    const events = props.props.events;
    const contacts = props.props.contacts;
    const data = createContactData(contacts, events);
    if (!(props.props.contactEventData.current.length > 0)) {
      console.log('timeline reset');
      props.props.contactEventData.current = data;
    }

    console.log(events);
    console.log(contacts);

    return (
      <React.Fragment>
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
              <Grid justifyContent='space-between' container spacing={10}>
                <Grid item></Grid>
                <Grid item>
                  <div>
                    <IconButton onClick={moreMenuClick} disableRipple={true}>
                      <MoreHorizIcon fontSize='medium' />
                    </IconButton>
                    <Menu
                      id='basic-menu'
                      anchorEl={anchorEl}
                      open={openMenu}
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
            <Typography gutterBottom variant='h4' className={classes.heading}>
              Upcoming this Week
            </Typography>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.cell}>
                      <Typography className={classes.typography}>
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align='left'>
                      <Typography className={classes.typography}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align='left'>
                      <Typography className={classes.typography}>
                        Description
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align='left'>
                      <Typography className={classes.typography}>
                        Notes
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events
                    .filter(
                      (value) =>
                        Date.parse(value.Date) <
                          Date.parse(date) + 7 * (1000 * 60 * 60 * 24) &&
                        Date.parse(value.Date) > Date.parse(date)
                    )
                    .map((value, index) => (
                      <TableRow 
                        className={classes.row}
                      >
                        <TableCell
                          className={classes.cell}
                          style={{ width: 250 }}
                          component='th'
                          scope='row'
                        >
                          <Typography> {value.Date} </Typography>
                        </TableCell>
                        <TableCell
                          className={classes.cell}
                          style={{ width: 300 }}
                          component='th'
                          scope='row'
                        >
                          {contacts
                            .filter(
                              (contactValue) =>
                                value.RelevantContact == contactValue.Email
                            )
                            .map((matchingContact) => (
                              <Typography> {matchingContact.Name} </Typography>
                            ))}
                        </TableCell>
                        <TableCell
                          className={classes.cell}
                          style={{ width: 350 }}
                          align='left'
                        >
                          <Typography> {value.Occasion} </Typography>
                        </TableCell>
                        <TableCell className={classes.cell} align='left'>
                          <Typography> {value.Description} </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Typography gutterBottom variant='h4' className={classes.heading}>
              Happening later
            </Typography>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.cell}>
                      <Typography className={classes.typography}>
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align='left'>
                      <Typography className={classes.typography}>
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align='left'>
                      <Typography className={classes.typography}>
                        Description
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align='left'>
                      <Typography className={classes.typography}>
                        Notes
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events
                    .filter(
                      (value) =>
                        Date.parse(value.Date) >
                        Date.parse(date) + 7 * (1000 * 60 * 60 * 24)
                    )
                    .map((value, index) => (
                      <TableRow className={classes.row}>
                        <TableCell
                          className={classes.cell}
                          style={{ width: 250 }}
                          component='th'
                          scope='row'
                        >
                          <Typography> {value.Date} </Typography>
                        </TableCell>
                        <TableCell
                          className={classes.cell}
                          style={{ width: 300 }}
                          component='th'
                          scope='row'
                        >
                          {contacts
                            .filter(
                              (contactValue) =>
                                value.RelevantContact == contactValue.Email
                            )
                            .map((matchingContact) => (
                              <Typography> {matchingContact.Name} </Typography>
                            ))}
                        </TableCell>
                        <TableCell
                          className={classes.cell}
                          style={{ width: 350 }}
                          align='left'
                        >
                          <Typography> {value.Occasion} </Typography>
                        </TableCell>
                        <TableCell className={classes.cell} align='left'>
                          <Typography> {value.Description} </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                    deleteContactModal={deleteContactModal}
                    setDeleteContactModal={setDeleteContactModal}
                    handleDelete={handleDelete}
                  />
                </Grid>
              </Grid>
            </Dialog>
          </div>
          
        </div>
      </React.Fragment>
    );
  }
}

export default Timeline;

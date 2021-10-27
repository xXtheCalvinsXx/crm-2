import React, { useState, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar';

// Styling
import { Grid, Card, Avatar, Typography, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import ContactViewDialogue from '../ContactView/ContactViewDialogue';

// Axios
import deleteContact from '../../../axios/deleteContact';

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const drawerWidth = 40;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  textField: {
    margin: 0,
    outline: 'none',
    border: 0,
    borderBottom: 'none',
    '&.MuiPaper-root .ForwardRef-root-43 .makeStyles-textField-30 .MuiPaper-elevation1 .MuiPaper-rounded':
      {
        outline: 'none',
        border: 0,
        borderBottom: 'none',
      },
    '&.MuiButtonBase-root MuiIconButton-root ForwardRef-iconButton-44 ForwardRef-iconButtonHidden-45':
      {
        outline: 'none',
        border: 0,
        borderBottom: 'none',
      },
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

  const requestSearch = (searchValue) => {
    setSearched(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = props.props.props.contactEventData.current.filter(
      (row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      }
    );
    setContacts(filteredRows);
  };

  useEffect(() => {
    setContacts(contacts);
  }, [contacts]);

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  return (
    <div>
      <SearchBar
        className={classes.textField}
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <br />
      <Grid container spacing={3}>
        {contacts.map((contact) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card
              className={classes.card}
              onClick={() => {
                handleClickOpen(contact);
              }}
            >
              <Grid justifyContent='space-between' container>
                <Grid item>
                  <Avatar
                    src={contact.imageUrl}
                    className={classes.sizeAvatar}
                    variant='square'
                  />
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
              deleteContactModal={deleteContactModal}
              setDeleteContactModal={setDeleteContactModal}
              handleDelete={handleDelete}
            />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

export default DatabaseCard;

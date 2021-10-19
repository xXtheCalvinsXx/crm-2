import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Button,
  Divider,
  IconButton,
  TextField,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { DataGrid, GridToolbarFilterButton } from '@mui/x-data-grid';
import { createTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Dialog, DialogActions } from '@material-ui/core';

// Icons
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';

// Components
import Layout from '../../layout/Layout';
import AddContactDialogue from '../AddContact/AddContactDialogue';
import ContactView from '../ContactView/ContactView';
import AddContactDialogueContent from '../AddContact/AddContactDialogueContent';

// axios
import axios from 'axios';

// context
import { useContext } from 'react';
import { userContext } from '../../../appContext/userContext';

// firebase
import { auth } from '../../../firebase/firebaseUtils';

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      main: {
        display: 'flex',
      },
      page: {
        width: '100%',
      },
      field: {
        margin: theme.spacing(3.5),
      },
      typography: {
        marginLeft: theme.spacing(3.3),
        marginRight: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
        color: '#b0bec5',
      },
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
      grid: {
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-cell':
          {
            outline: 'none',
            border: 0,
            borderBottom: 'none',
          },
        border: 0,
        overflow: 'auto',
        overflowX: 'hidden',
        '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
          color: '#808080',
        },
      },
      textField: {
        width: '90%',
        borderBottom: 'none',
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
      dialogCustomizedWidth: {
        'max-width': '90%',
        minHeight: '90vh',
        maxHeight: '90vh',
      },
    }),
  { defaultTheme }
);

const heading = [
  { field: 'Name', headerName: 'Name', width: 300 },
  { field: 'Position', headerName: 'Position', width: 250 },
  { field: 'Company', headerName: 'Company', width: 300 },
  { field: 'Email', headerName: 'Email', width: 400 },
  { field: 'Phone_Number', headerName: 'Phone Number', width: 300 },
  { field: 'Education', headerName: 'Education', width: 250 },
  { field: 'Location', headerName: 'Location', width: 300 },
];

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        variant='standard'
        value={props.value}
        onChange={props.onChange}
        placeholder='Search'
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize='small' />,
          endAdornment: (
            <IconButton
              title='Clear'
              aria-label='Clear'
              size='small'
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize='small' />
            </IconButton>
          ),
        }}
      />

      <div>
        <GridToolbarFilterButton />
      </div>
    </div>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function DatabaseList(props) {
  console.log('list props = ', props);
  const classes = useStyles();

  const [selectionModel, setSelectionModel] = React.useState([]);
  const [contacts, setContacts] = useState(props.props.props.contacts.data);
  const [contactEventData, setContactEventData] = useState(
    props.props.props.contactEventData.contactEventData.current
  );
  const [contact, setContact] = useState({});

  // Search Functionality
  const [searchText, setSearchText] = React.useState('');

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = contacts.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setContacts(filteredRows);
  };

  useEffect(() => {
    setContacts(contacts);
  }, [contacts]);

  // Dialog Open and Close
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
    setOpen(false);
  };

  // Gets particular contact and it's events
  useEffect(() => {
    const getContact = (selectionModel) => {
      for (const contact of contactEventData) {
        if (contact.contact.Email == selectionModel[0]) {
          setContact(contact);
        }
      }
    };

    getContact(selectionModel);
  }, [selectionModel]);

  const contactData = props.contactEventData.contactEventData.current;
  console.log('contact data = ', contactData);

  console.log('contacts  = ', contacts);

  return (
    <div className={classes.main}>
      <div className={classes.page} style={{ height: '85vh', width: '100%' }}>
        <DataGrid
          className={classes.grid}
          rowHeight={45}
          rowsPerPageOptions={[]}
          components={{ Toolbar: QuickSearchToolbar }}
          rows={contacts}
          columns={heading}
          getRowId={(row) => row.contactId}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          onCellClick={handleClickOpen}
          autoHeight={true}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(''),
            },
          }}
        />
      </div>
      <div className={classes.root}>
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
                  {!editOpen && <Button onClick={handleEditOpen}>Edit</Button>}

                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </div>
            </Grid>
          </Grid>
          {!editOpen && open && <ContactView contact={contact} />}
          {editOpen && (
            <AddContactDialogueContent contact={contact} editContact={true} />
          )}
        </Dialog>
      </div>
    </div>
  );
}

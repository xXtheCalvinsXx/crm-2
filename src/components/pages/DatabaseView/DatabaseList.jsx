import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@material-ui/core';
import { DataGrid, GridToolbarFilterButton } from '@material-ui/data-grid';
import { createTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';

// Icons
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

// Components
import ContactViewDialogue from '../ContactView/ContactViewDialogue';

// Axios
import deleteContact from '../../../axios/deleteContact';

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
  { field: 'Company', headerName: 'Company', width: 250 },
  { field: 'Email', headerName: 'Email', width: 350 },
  { field: 'Phone_Number', headerName: 'Phone Number', width: 300 },
  { field: 'Education', headerName: 'Education', width: 225 },
  { field: 'Location', headerName: 'Location', width: 150 },
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
  const { contacts, setContacts, removeContact } = props;
  const classes = useStyles();
  const [selectionModel, setSelectionModel] = useState([]);
  const [contact, setContact] = useState({});

  // Search Functionality
  const [searchText, setSearchText] = React.useState('');

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
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

  useEffect(() => {
    setContacts(props.props.props.contactEventData.current);
  }, []);

  // Dialog Open and Close
  const [open, setOpen] = useState(false);
  const [deleteContactModal, setDeleteContactModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async (user, contact) => {
    const success = await deleteContact(user, contact.contactId);
    if (success) removeContact(contact.contactId);
    setDeleteContactModal(false);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
    setOpen(false);
    setDeleteContactModal(false);
  };

  // Gets particular contact and it's events
  useEffect(() => {
    const getContact = (selectionModel) => {
      for (const contact of contacts) {
        if (contact.contactId === selectionModel[0]) {
          setContact(contact);
        }
      }
    };

    getContact(selectionModel);
  }, [selectionModel]);

  return (
    <div className={classes.main}>
      <div className={classes.page} style={{ height: '90vh', width: '100%' }}>
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
      <ContactViewDialogue
        classes={classes}
        handleEditOpen={handleEditOpen}
        editOpen={editOpen}
        open={open}
        contact={contact}
        handleClose={handleClose}
        deleteContactModal={deleteContactModal}
        setDeleteContactModal={setDeleteContactModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}

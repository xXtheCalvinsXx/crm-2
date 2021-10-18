import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Grid, Button, Divider, IconButton, TextField,
   AppBar, Toolbar, Menu, MenuItem }
   from '@material-ui/core';
import {
  DataGrid,
  GridToolbarFilterButton
} from '@mui/x-data-grid';
import { createTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogActions
} from "@material-ui/core";

// Icons
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';

// Components
import Layout from '../../layout/Layout';
import AddContact from '../AddContact/AddContact';
import ContactView from '../ContactView/ContactView';

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
        display: 'flex'
      },
      page: {
        width: '100%',
        padding: theme.spacing(10),
      },
      field: {
        margin: theme.spacing(3.5)
      },
      typography: {
        marginLeft: theme.spacing(3.3),
        marginRight: theme.spacing(.5),
        marginTop: theme.spacing(.5),
        marginBottom: theme.spacing(.5),
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
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-cell': {
          outline: 'none',
          border: 0,
          borderBottom: 'none'
        },
        border: 0,
        overflow: "auto",
        overflowX: 'hidden',
        '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle' : {
          color: '#808080'
        }
      },
      textField: {
        width : "90%",
        borderBottom : "none",
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
      dialogCustomizedWidth: {
        "max-width": "90%",
        minHeight: '90vh',
        maxHeight: '90vh',
      }
    }),
  { defaultTheme },
);

const heading = [
  { field: "Name", headerName: "Name", width: 300 },
  { field: "Position", headerName: "Position", width: 200 },
  { field: "Company", headerName: "Company", width: 200 },
  { field: "Email", headerName: "Email", width: 300 },
  { field: "Phone_Number", headerName: "Phone Number", width: 250 },
]

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search"
        className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? 'visible' : 'hidden' }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
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

export default function DatabaseList() {
  const classes = useStyles();
  const history = useHistory()

  const [loading, setLoading] = useState(false);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [contacts, setContacts] = useState([]);
  const [events, setEvents] = useState([]);
  const [currEvents, setEvent] = useState([]);
  const [contact, setContact] = useState({});
  //const [fetched, setFetched] = useState(false);

  // Gets the user contacts and events
  const user = useContext(userContext);  
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
            setContacts(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
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
            setEvents(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
      }
    };
  getDataContacts(user);
  getDataEvents(user);
  }, [user])

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

  React.useEffect(() => {
    setContacts(contacts);
  }, [contacts]);

  // Dialog Open and Close
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  // Sign Out Functionality (with Open and Close)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openLog = Boolean(anchorEl);
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

  // Gets particular contact and it's events
  useEffect(() => {
    const getContact = (selectionModel) => {
      const currContact = contacts.filter(contact => contact.Email == selectionModel)
      setContact(currContact)
    };

    const getEvent = (selectionModel) => {
      const currEvent = events.filter(event => event.RelevantContact == selectionModel)
      setEvent(currEvent)
    };
    getContact(selectionModel);
    getEvent(selectionModel);
  }, [selectionModel])

  return (
    <div className={classes.main}>
      <Layout />
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
            container spacing={10}
          >
            <Grid item>
            </Grid>
            <Grid item>
              <div>
                <IconButton onClick={moreMenuClick} disableRipple={true}>
                  <MoreHorizIcon fontSize="medium"/>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openLog}
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
                    <MenuItem onClick={() => {signOut();}}>
                      Logout
                    </MenuItem>
                  </Menu>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    
      <div className={classes.page} style={{ height: '85vh', width: '100%' }}>
        <Grid
          justifyContent="space-between"
          container 
          spacing={24}
          >
          <Grid item>
            <AddContact />
          </Grid>
          <Grid item>
            <div>
              <Button startIcon={
                <AppsOutlinedIcon /> } raised color="accent" onClick={() => history.push('/databasecard')}
                >
                Change View
              </Button>
            </div>
          </Grid>
        </Grid>

        <Divider/>
        <br/>
        <br/>
        
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
          onCellClick= {handleClickOpen}
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
        <Grid
          justifyContent="space-between"
          container 
          spacing={12}
        >
          <Grid item>
          </Grid>
          <Grid item>
            <div>
              <DialogActions>
                <Button onClick={handleClose}>Edit</Button>
          
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </div>
          </Grid>
        </Grid>
            <ContactView contact={contact} currEvents={currEvents} />
        </Dialog>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Grid, Button, Divider, IconButton, TextField, Typography,
   AppBar, Toolbar, Menu, MenuItem, Box, CircularProgress }
   from '@material-ui/core';
import {
  DataGrid,
  GridToolbarFilterButton
  //GridApi,
  //GridCellValue,
  //GridCellParams
} from '@material-ui/data-grid';
import { createTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } 
  from '@material-ui/core';

// Icons
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import AddSharpIcon from '@material-ui/icons/AddSharp';

// Componenta
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
import { useAuthState } from 'react-firebase-hooks/auth';

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
        //"MuiToolbar-root MuiToolbar-regular MuiTablePagination-toolbar MuiToolbar-gutters" : {color: 'white'},
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-cell': {
          outline: 'none',
          border: 0,
          borderBottom: 'none'
        },
        border: 0,
        overflow: "auto",
        overflowX: 'hidden',
        '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle' : {
          //color: '#b0bec5'
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
        "max-width": "80%",
        minHeight: '80vh',
        maxHeight: '80vh',
      },
      table: {
        minWidth: 500,
        border: 0,
      },
      cell: {
        borderBottom: 'none'
      }
    }),
  { defaultTheme },
);

const heading = [
  //{ field: "contactId", headerName: 'ID', width: 200 },
  //{ field: "DateAdded", headerName: "DateAdded", width: 100 },
  { field: "Name", headerName: "Name", width: 300 },
  //{ field: "Location", headerName: "Location", width: 100 },
  { field: "Position", headerName: "Position", width: 200 },
  { field: "Company", headerName: "Company", width: 200 },
  //{ field: "Birthday", headerName: "Birthday", width: 100 },
  //{ field: "Industry", headerName: "Industry", width: 100 },
  { field: "Email", headerName: "Email", width: 300 },
  //{ field: "Education", headerName: "Education", width: 100 },
  { field: "Phone_Number", headerName: "Phone Number", width: 250 },
  //{ field: "imageUrl", headerName: "imageUrl", width: 100 }
  //{ field: "RelevantUser", headerName: "RelevantUser", width: 100 }
]

function QuickSearchToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        variant="standard"
        //fullWidth 
        //id="fullWidth"
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
  const [contacts, setContacts] = useState([]);
  //const [fetched, setFetched] = useState(false);
  // const [user, loading, error] = useAuthState(auth);
  const [contact, setContact] = useState({});

  //let contact;

  const [selectionModel, setSelectionModel] = React.useState([]);
  console.log(selectionModel);
  
  const user = useContext(userContext);  
  //console.log('user = ', user);
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
  getDataContacts(user);
  }, [user])

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    const getContact = (selectionModel) => {
      const currContact = contacts.filter(contact => contact.Email == selectionModel)
      //console.log(currContact)
      setContact(currContact)
      //console.log(contact)
    };
    getContact(selectionModel);
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
            //console.log(selectionModel);
          }}
          //selectionModel={selectionModel}
          onCellClick= {handleClickOpen}//{() => history.push('/view')} 
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
        {console.log(contact)}
            <ContactView contact={contact} />
        </Dialog>
      </div>
    </div>
  );
}

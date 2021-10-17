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
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddSharpIcon from '@material-ui/icons/AddSharp';
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
import Layout from '../../layout/Layout';
import AddContact from '../AddContact/AddContact';
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
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        border: 0,
        overflow: "auto",
        overflowX: 'hidden',
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
  //{ field: "contactId", headerName: 'ID', width: 100 },
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

const initialContactValues = {
  id: 0,
  fullName: '',
  location: '',
  company: '',
  position: '',
  birthday: '',
  education: '',
  industry: '',
  email: '',
  phoneNumber: '',
}

function createData(date, name, description, notes) {
  return { date, name, description, notes };
}

const rows1 = [
  createData('Mon 13 Aug', 'Calvin Shen', 'Coffee Catchup', '...'),
  createData('Thurs 16 Aug', 'Nimit Agrawal', 'Coffee Catchup', '...'),
];

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
};

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

  const [values, setValues] = useState(initialContactValues);
  // const [user, loading, error] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  //const [fetched, setFetched] = useState(false);
  
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
            setContacts(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
      }
    };
  getDataContacts(user);
  }, [user])

  const handleInputChangeContact = e => {
    const {name, value} = e.target
    setValues({
      ...values,
      [name]:value
    })
  }

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

  //if (loading) {
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
              justifyContent ="space-between" // Add it here :)
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
                <Button startIcon={<ListAltIcon /> } raised color="accent" onClick={() => history.push('/databasecard')}>
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
            rowHeight={70}
            rowsPerPageOptions={[]}
            components={{ Toolbar: QuickSearchToolbar }}
            rows={contacts}
            columns= {heading}
            getRowId={(row) => row.contactId}
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

              <Divider/>

              <DialogTitle>
                  <PersonOutlineIcon style={{ fontSize: 90 }} />
                  <Typography gutterBottom variant='h4'>
                    Leanne Graham
                  </Typography>
              </DialogTitle>
              
              <DialogContent>
                
                <Typography gutterBottom variant='h5'>
                  Future Interactions
                </Typography>
              
                <DialogContentText>
                  <TableContainer>
                    <Table className={classes.table}>
                      <TableHead> 
                        <TableRow>
                          <TableCell className={classes.cell}>
                            <Typography> Date </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                            <Typography> Name </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                            <Typography> Description </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                            <Typography> Notes </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody onClick={() => history.push('/view')}>
                        {rows1.map((row) => (
                          <TableRow className={classes.row} key={row.date}>
                            <TableCell className={classes.cell} component="th" scope="row">
                              <Typography> {row.date} </Typography>
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                              <Typography> {row.name} </Typography>
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                            <Typography> {row.description} </Typography>
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                            <Typography> {row.notes} </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContentText>

                <br/>
              
                <Typography gutterBottom variant='h5'>
                  Details
                </Typography>

                <DialogContentText>
                  <br/>
                  <Grid container>
                    <Grid item xs={2}>
                      <br/>
                      <Typography 
                      variant='h6' 
                      className={classes.typography}
                      >
                        Name
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField 
                      name='fullName'
                      placeholder='e.g. John Smith'
                      value={values.fullName}
                      onChange={handleInputChangeContact}
                      variant='standard'
                      className={classes.field}
                      />
                      
                    </Grid>
                    <Grid item xs={2}>
                      <br/>
                      <Typography 
                      variant='h6' 
                      className={classes.typography}
                      >
                        Email
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField 
                      name='email'
                      placeholder='e.g. johnsmith@gmail.com'
                      value={values.email}
                      fullWidth
                      onChange={handleInputChangeContact}
                      variant='standard'
                      className={classes.field}/>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2}>
                      <br/>
                      <Typography 
                      variant='h6' 
                      className={classes.typography}
                      >
                        Birthday
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField 
                      name='birthday'
                      placeholder='YYYY/MM/DD'
                      value={values.birthday}
                      onChange={handleInputChangeContact}
                      variant='standard'
                      className={classes.field}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <br/>
                      <Typography 
                      variant='h6' 
                      className={classes.typography}
                      >
                        Phone Number
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField 
                      name='phoneNumber'
                      placeholder='e.g. 1234567890'
                      value={values.phoneNumber}
                      onChange={handleInputChangeContact}
                      variant='standard'
                      fullWidth
                      className={classes.field}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2}>
                      <br/>
                      <Typography 
                      variant='h6' 
                      className={classes.typography}
                      >
                        Location
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField 
                      name='location'
                      placeholder='e.g. Melbourne'
                      value={values.location}
                      onChange={handleInputChangeContact}
                      variant='standard'
                      className={classes.field}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <br/>
                      <Typography 
                      variant='h6' 
                      className={classes.typography}
                      >
                        Education
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField 
                      name='education'
                      placeholder='e.g. University of Melbourne'
                      value={values.education}
                      onChange={handleInputChangeContact}
                      variant='standard'
                      fullWidth
                      className={classes.field}
                      />
                    </Grid>
                    
                  </Grid>
                  <Grid container>
                    <Grid item xs={2}>
                      <br/>
                      <Typography 
                      variant='h6' 
                      className={classes.typography}
                      >
                        Industry
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField 
                      name='industry'
                      placeholder='e.g. Tech'
                      value={values.industry}
                      onChange={handleInputChangeContact}
                      variant='standard'
                      className={classes.field}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2}>
                      <br/>
                      <Typography 
                      variant='h6' 
                      className={classes.typography}
                      >
                        Company
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField 
                      name='company'
                      placeholder='e.g. Google'
                      value={values.company}
                      onChange={handleInputChangeContact}
                      variant='standard'
                      className={classes.field}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <br/>
                      <Typography 
                      variant='h6' 
                      className={classes.typography}
                      >
                        Position
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField 
                      name='position'
                      placeholder='e.g. CEO'
                      value={values.position}
                      onChange={handleInputChangeContact}
                      variant='standard'
                      fullWidth
                      className={classes.field}
                      />
                    </Grid>
                  </Grid>
                </DialogContentText>
              
                <br/>
          
                <Typography gutterBottom variant='h5'>
                  Notes
                </Typography>

                <DialogContentText>
                  Api
                </DialogContentText>
              
                <br/>
              
                <Typography gutterBottom variant='h5'>
                  Past Interactions
                </Typography>

                <DialogContentText>
                  <TableContainer>
                    <Table className={classes.table}>
                      <TableHead> 
                        <TableRow>
                          <TableCell className={classes.cell}>
                            <Typography> Date </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                            <Typography> Name </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                            <Typography> Description </Typography>
                          </TableCell>
                          <TableCell className={classes.cell} align="left">
                            <Typography> Notes </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody onClick={() => history.push('/view')}>
                        {rows1.map((row) => (
                          <TableRow className={classes.row} key={row.date}>
                            <TableCell className={classes.cell} component="th" scope="row">
                              <Typography> {row.date} </Typography>
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                              <Typography> {row.name} </Typography>
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                            <Typography> {row.description} </Typography>
                            </TableCell>
                            <TableCell className={classes.cell} align="left">
                            <Typography> {row.notes} </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContentText>
              </DialogContent>

                <br/>

            </Dialog>
          
        </div>
      </div>
    
    );
  //}
}

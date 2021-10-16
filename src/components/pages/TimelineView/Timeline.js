import React, { useState } from 'react';

// firebase
import { auth } from '../../../firebase/firebaseUtils';
import { useAuthState } from 'react-firebase-hooks/auth';

// axios
import axios from 'axios';

// context
import { useContext } from 'react';
import { userContext } from '../../../appContext/userContext';

// layout
import { useHistory } from 'react-router';
import Layout from '../../layout/Layout';

// styling
import { AppBar, Toolbar, Grid, IconButton, Typography, Box, CircularProgress, Menu, MenuItem } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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
      backgroundColor: '#cfd8dc'
    }
  },
  cell: {
    borderBottom: 'none'
  },
  typography: {
    color: '#b0bec5'
  },
}));

function createData(date, name, description, notes) {
  return { date, name, description, notes };
}

const rows1 = [
  createData('Mon 13 Aug', 'Calvin Shen', 'Coffee Catchup', '...'),
  createData('Tues 14 Aug', 'Andrew Zhang', 'Birthday', '...'),
  createData('Tues 14 Aug', 'Joe Chen ', 'Meeting', '...'),
  createData('Wed 15 Aug', 'Johnny Qian', 'Casual', '...'),
  createData('Thurs 16 Aug', 'Nimit Agrawal', 'Coffee Catchup', '...'),
];

const rows2 = [
  createData('Mon 20 Aug', 'Calvin Shen', 'Coffee Catchup', '...'),
  createData('Mon 20 Aug', 'Andrew Zhang', 'Birthday', '...'),
  createData('Mon 20 Aug', 'Joe Chen ', 'Meeting', '...'),
  createData('Mon 20 Aug', 'Johnny Qian', 'Casual', '...'),
  createData('Thurs 16 Aug', 'Nimit Agrawal', 'Coffee Catchup', '...'),
];

function Timeline() {
  const classes = useStyles();
  const history = useHistory();
  console.log('timeline');
  // const [user, loading, error] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  
  const user = useContext(userContext);

  console.log('user = ', user);

  const getData = async (user) => {
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
          setFetched(true);
          setAllEvents(response.data)
          console.log(allEvents);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      return 'sign out success';
    } catch (error) {
      return 'sign out failure';
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const moreMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const moreMenuClose = () => {
    setAnchorEl(null);
  }

  // if (!fetched) getData(user);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (!loading)
    return (
      <React.Fragment>
        <div className={classes.root}>
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
                    <IconButton onClick={moreMenuClick} disableRipple={true}
                    >
                      <MoreHorizIcon fontSize="medium"/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
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
                        <MenuItem onClick={() => {signOut();}}>
                          Logout
                        </MenuItem>
                      </Menu>
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.page}>  
            <Typography gutterBottom variant='h4'>
              Upcoming this Week
            </Typography>
            <TableContainer>
            <Table className={classes.table}>
              <TableHead> 
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography className={classes.typography}> Date </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography className={classes.typography}> Name </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography className={classes.typography}> Description </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography className={classes.typography}> Notes </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody onClick={() => history.push('/timeline')}>
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
            <br/>
            <Typography gutterBottom variant='h4'>
              Happening later
            </Typography>
            <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography className={classes.typography}> Date </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography className={classes.typography}> Name </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography className={classes.typography}> Description </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography className={classes.typography}> Notes </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows2.map((row) => (
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
          </div>
        </div>
      </React.Fragment>
    );
}

export default Timeline;
import React from 'react';
import { Drawer, AppBar, Toolbar, Grid, IconButton, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from 'react-router';
import Layout from '../../layout/Layout';

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
  const history = useHistory()
  return (
    <div className={classes.root}>
      <Layout />
      
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
  )
}

export default Timeline;
import React from 'react';
import { Drawer, AppBar, Toolbar, Grid, Button, IconButton, Divider, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TuneIcon from '@material-ui/icons/Tune';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useHistory } from 'react-router';

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
  }
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
                <IconButton>
                  <MoreHorizIcon fontSize="small"/>
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left">
        <div className={classes.toolbar} />
        <IconButton>
          <HomeIcon style={{ fontSize: 30 }} />
        </IconButton>
        <IconButton>
            <ContactsIcon style={{ fontSize: 30 }} />
        </IconButton>
      </Drawer>
      
      <div className={classes.page}>
        <Grid
        justifyContent="space-between"
        container 
        spacing={24}
        >
          <Grid item>
          </Grid>
          <Grid item>
            <div>
              <Button endIcon={<CalendarTodayIcon /> } raised color="accent">
                Change View
              </Button>
            </div>
          </Grid>
        </Grid>
        <Divider/>
        <br/>
        <br/>
        <Typography gutterBottom variant='h4'>
          Upcoming this Week
        </Typography>
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
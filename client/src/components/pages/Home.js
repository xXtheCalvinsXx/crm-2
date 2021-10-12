import React from 'react';
import { Grid, Button, Divider, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useHistory } from 'react-router';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    width: '100%',
    padding: theme.spacing(1),
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

function Home() {
  const classes = useStyles();
  const history = useHistory()
  return (
    <Container>
      <div className={classes.root}>
        
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
    </Container>
  )
}

export default Home;
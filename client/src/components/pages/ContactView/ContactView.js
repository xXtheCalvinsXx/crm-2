import React from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
  createData('Thurs 16 Aug', 'Nimit Agrawal', 'Coffee Catchup', '...'),
];


function ContactView() {
  const classes = useStyles();
  const history = useHistory()
  return (
    <Container>
      <div className={classes.root}>
        
        <div className={classes.page}>
        <Typography gutterBottom variant='h4'>
                  Jane Doe
                </Typography>
          <Grid
          justifyContent="space-between"
          container 
          spacing={12}
          >
            <Grid item>
            </Grid>
            <Grid item>
              <div>
                
              </div>
            </Grid>
          </Grid>
          <Divider/>
          <br/>
          <br/>
          <Typography gutterBottom variant='h5'>
            Future Interactions
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
          <Typography gutterBottom variant='h5'>
            Details
          </Typography>
         
        </div>
      </div>
    </Container>
  )
}

export default ContactView;

import React, { useState, useEffect } from 'react';
import { 
  Grid, Button, Divider, TextField, Typography,
    } from '@material-ui/core';
import {
  //Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow } 
  from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
// Icons
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

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
      fieldnew: {
        margin: theme.spacing(4)
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
);

function createData(date, name, description, notes) {
  return { date, name, description, notes };
}

const rows1 = [
  createData('Mon 13 Aug', 'Calvin Shen', 'Coffee Catchup', '...'),
  createData('Thurs 16 Aug', 'Nimit Agrawal', 'Coffee Catchup', '...'),
];

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

export default function ContactView({ contact }) {
  const classes = useStyles();
  const history = useHistory()

  const [values, setValues] = useState(initialContactValues);

  const handleInputChangeContact = e => {
    const {name, value} = e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  return (
    <div>
        
      <Divider/>

      <DialogTitle>
          <PersonOutlineIcon style={{ fontSize: 100 }} />
          <Typography gutterBottom variant='h3'>
            { contact[0].Name }
          </Typography>
      </DialogTitle>
      
      <DialogContent>
        
        <Typography gutterBottom variant='h4'>
          Future Interactions
        </Typography>
      
        <DialogContentText>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead> 
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography variant='h6'  className={classes.typography}> Date </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography variant='h6' className={classes.typography}> Name </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography variant='h6' className={classes.typography}> Description </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography variant='h6' className={classes.typography}> Notes </Typography>
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
      
        <Typography gutterBottom variant='h4'>
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
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Name }
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
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Email }
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
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Birthday }
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
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Phone_Number }
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
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Location }
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
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Education }
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
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Industry }
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
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Company }
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
            <Grid item xs={3} className={classes.fieldnew}>
              { contact[0].Position }
            </Grid>
          </Grid>
        </DialogContentText>
      
        <br/>

        <Typography gutterBottom variant='h4'>
          Notes
        </Typography>

        <DialogContentText>
          Api
        </DialogContentText>
      
        <br/>
      
        <Typography gutterBottom variant='h4'>
          Past Interactions
        </Typography>

        <DialogContentText>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead> 
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography variant='h6'  className={classes.typography}> Date </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography variant='h6' className={classes.typography}> Name </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography variant='h6' className={classes.typography}> Description </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align="left">
                    <Typography variant='h6' className={classes.typography}> Notes </Typography>
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
       
    </div>
  );
}

import React from 'react';
import { Grid, Divider, Typography, Avatar } from '@material-ui/core';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      display: 'flex',
    },
    page: {
      width: '100%',
      padding: theme.spacing(10),
    },
    field: {
      margin: theme.spacing(3.5),
    },
    fieldnew: {
      margin: theme.spacing(4),
      color: 'black',
    },
    typography: {
      marginLeft: theme.spacing(3.5),
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      color: 'gray',
    },
    typographyTable: {
      marginLeft: theme.spacing(1.3),
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      color: 'gray',
    },
    typographyTableData: {
      marginLeft: theme.spacing(1.3),
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
    title: {
      marginLeft: theme.spacing(3.3),
    },
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
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
    sizeAvatar: {
      height: theme.spacing(23),
      width: theme.spacing(23),
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(6),
    },
    table: {
      minWidth: 500,
      border: 0,
    },
    cell: {
      borderBottom: 'none',
    },
  })
);

export default function ContactView(props) {
  const classes = useStyles();
  const contact = props.contact;
  const currDate = new Date();

  console.log('upcoming : ', contact.upcomingEvents);
  console.log('props = ', props);
  return (
    <div>
      <Divider />

      <DialogTitle>
        <Avatar src={contact.imageUrl} className={classes.sizeAvatar} />
        <Typography gutterBottom variant='h3' className={classes.title}>
          {contact.Name}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography gutterBottom variant='h4' className={classes.title}>
          Future Interactions
        </Typography>

        <DialogContentText>
          <TableContainer>
            <Table className={classes.table}>
            <colgroup>
              <col style={{width:'17%'}}/>
              <col style={{width:'27.7%'}}/>
              <col style={{width:'65%'}}/>
            </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography variant='h6' className={classes.typographyTable}>
                      {' '}
                      Date{' '}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align='left'>
                    <Typography variant='h6' className={classes.typographyTable}>
                      {' '}
                      Description{' '}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align='left'>
                    <Typography variant='h6' className={classes.typographyTable}>
                      {' '}
                      Notes{' '}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contact.upcomingEvents.map((row) => (
                  <TableRow className={classes.row} key={row.date}>
                    <TableCell
                      className={classes.cell}
                      component='th'
                      scope='row'
                    >
                      <Typography className={classes.typographyTableData}> {row.Date} </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align='left'>
                      <Typography className={classes.typographyTableData}> {row.Occasion} </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align='left'>
                      <Typography className={classes.typographyTableData}> {row.Description} </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>

        <br />

        <Typography gutterBottom variant='h4' className={classes.title}>
          Details
        </Typography>

        <DialogContentText>
          <Grid container>
            <Grid item xs={2}>
              <br />
              <Typography variant='h6' className={classes.typography}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              {contact.Name}
            </Grid>
            <Grid item xs={2}>
              <br />
              <Typography variant='h6' className={classes.typography}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              {contact.Email}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <br />
              <Typography variant='h6' className={classes.typography}>
                Birthday
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              {contact.Birthday}
            </Grid>
            <Grid item xs={2}>
              <br />
              <Typography variant='h6' className={classes.typography}>
                Phone Number
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              {contact.Phone_Number}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <br />
              <Typography variant='h6' className={classes.typography}>
                Location
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              {contact.Location}
            </Grid>
            <Grid item xs={2}>
              <br />
              <Typography variant='h6' className={classes.typography}>
                Education
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              {contact.Education}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <br />
              <Typography variant='h6' className={classes.typography}>
                Industry
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              {contact.Industry}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2}>
              <br />
              <Typography variant='h6' className={classes.typography}>
                Company
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              {contact.Company}
            </Grid>
            <Grid item xs={2}>
              <br />
              <Typography variant='h6' className={classes.typography}>
                Position
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.fieldnew}>
              {contact.Position}
            </Grid>
          </Grid>
        </DialogContentText>

        <br />

        <Typography gutterBottom variant='h4' className={classes.title}>
          Past Interactions
        </Typography>

        <DialogContentText>
          <TableContainer>
            <Table className={classes.table}>
              <colgroup>
                <col style={{width:'17%'}}/>
                <col style={{width:'27.7%'}}/>
                <col style={{width:'65%'}}/>
              </colgroup>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.cell}>
                    <Typography variant='h6' className={classes.typographyTable}>
                      {' '}
                      Date{' '}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align='left'>
                    <Typography variant='h6' className={classes.typographyTable}>
                      {' '}
                      Description{' '}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cell} align='left'>
                    <Typography variant='h6' className={classes.typographyTable}>
                      {' '}
                      Notes{' '}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contact.pastEvents.map((row) => (
                  <TableRow className={classes.row} key={row.date}>
                    <TableCell
                      className={classes.cell}
                      component='th'
                      scope='row'
                    >
                      <Typography className={classes.typographyTableData}> {row.Date} </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align='left'>
                      <Typography className={classes.typographyTableData}> {row.Occasion} </Typography>
                    </TableCell>
                    <TableCell className={classes.cell} align='left'>
                      <Typography className={classes.typographyTableData}> {row.Description} </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContentText>
      </DialogContent>
    </div>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Avatar, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        padding: 25
    },
    sizeAvatar: {
        height: theme.spacing(21),
        width: theme.spacing(21),
    },
    typography: {
        color: '#b0bec5',
        marginLeft: 30,
        marginRight: 30,
    },
    typographyInfo: {
        marginLeft: 30,
        marginBottom: 10
    },
}));

export default function ContactCard({ contacts, events }) {
    const classes = useStyles();
    const contactEvents = [];
    var current = new Date();
    var date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    var currentDate = new Date(date);
    var mostRecent = null;
    var closestNext = null;
    for (let i = 0; i < events.length; i++) {
      if (events[i].RelevantContact == contacts.Email) {
        contactEvents.push(events[i])
      }
    }
    for (let j = 0; j < contactEvents.length; j++) {
      var thisDate = new Date(contactEvents[0].Date)
      if (thisDate.getTime() - currentDate.getTime() < 0) {
        if (mostRecent == null) {
          mostRecent = thisDate;
        } else if (mostRecent.getTime < thisDate.getTime) {
          mostRecent = thisDate;
        }
      }
      else {
        if (closestNext == null) {
          closestNext = thisDate;
        } else if (closestNext.getTime < thisDate.getTime) {
          closestNext = thisDate;
        }
      }
    }
  
    return (
      <div>
        <Card className={classes.card} >
          
          <Grid 
          justifyContent="space-between"
          container>
            <Grid item>
              <Avatar className={classes.sizeAvatar} variant='square'/>
              
            </Grid>
            <Grid item>
              <Typography className={classes.typography}>
                Name
              </Typography>
              <Typography className={classes.typographyInfo}>
                {contacts.Name}
              </Typography>
              <Typography className={classes.typography}>
                Company
              </Typography>
              <Typography className={classes.typographyInfo}>
                {contacts.Company}
              </Typography>
              <Typography className={classes.typography}>
                Last
              </Typography>
              <Typography className={classes.typographyInfo}>
                24/09/2021
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.typography}>
                Location
              </Typography>
              <Typography className={classes.typographyInfo}>
                {contacts.Location}
              </Typography>
              <Typography className={classes.typography}>
                Position
              </Typography>
              <Typography className={classes.typographyInfo}>
                {contacts.Position}
              </Typography>
              <Typography className={classes.typography}>
                Next
              </Typography>
              <Typography className={classes.typographyInfo}>
                27/09/2021
              </Typography>
            </Grid>
          </Grid>
            
        </Card>
      </div>
    )
  }
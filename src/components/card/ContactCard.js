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

export default function ContactCard() {
    const classes = useStyles();
  
    return (
      <div>
        <Card className={classes.card}>
          
          <Grid 
          justifyContent="space-evenly"
          container>
            <Grid item>
              <Avatar className={classes.sizeAvatar} variant='square'/>
              
            </Grid>
            <Grid item>
              <Typography className={classes.typography}>
                Name
              </Typography>
              <Typography className={classes.typographyInfo}>
                Calvin Shen
              </Typography>
              <Typography className={classes.typography}>
                Company
              </Typography>
              <Typography className={classes.typographyInfo}>
                Amazon
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
                Melbourne
              </Typography>
              <Typography className={classes.typography}>
                Position
              </Typography>
              <Typography className={classes.typographyInfo}>
                Graduate
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
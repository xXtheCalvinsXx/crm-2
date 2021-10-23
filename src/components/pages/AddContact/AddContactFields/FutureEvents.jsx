import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  IconButton,
} from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';

function FutureEvents(props) {
  const { classes, eventFieldFuture, setEventFieldFuture } = props;

  const handleInputChangeEventFuture = (index, event) => {
    const values = [...eventFieldFuture];
    values[index][event.target.name] = event.target.value;
    setEventFieldFuture(values);
  };

  const handleAddFieldFuture = () => {
    setEventFieldFuture([
      ...eventFieldFuture,
      { Occasion: '', Date: '', Description: '' },
    ]);
  };
  const handleRemoveFieldFuture = (index) => {
    const values = [...eventFieldFuture];
    values.splice(index, 1);
    setEventFieldFuture(values);
  };

  return (
    <React.Fragment>
      <Typography className={classes.typographyTitle} variant='h4'>
        Future Interactions
      </Typography>
      <br />
      <Grid container>
        <Grid item xs={2}>
          <Typography variant='h6' className={classes.typography}>
            Date
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h6' className={classes.typography}>
            Description
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant='h6' className={classes.typography}>
            Notes
          </Typography>
        </Grid>
      </Grid>
      {eventFieldFuture.map((eventFieldFuture, index) => (
        <div key={index}>
          <Grid container>
            <Grid item xs={2}>
              <TextField
                name='Date'
                placeholder='YYYY/MM/DD'
                value={eventFieldFuture.Date}
                onChange={(event) => handleInputChangeEventFuture(index, event)}
                variant='standard'
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name='Occasion'
                placeholder='e.g. Coffee catchup'
                value={eventFieldFuture.Occasion}
                onChange={(event) => handleInputChangeEventFuture(index, event)}
                variant='standard'
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                name='Description'
                placeholder='e.g. Make sure to look presentable'
                value={eventFieldFuture.Description}
                onChange={(event) => handleInputChangeEventFuture(index, event)}
                variant='standard'
                fullWidth
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                className={classes.button}
                onClick={() => handleRemoveFieldFuture(index)}
              >
                <DeleteOutline />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      ))}
      <br />
      <Button
        onClick={() => handleAddFieldFuture()}
        startIcon={<AddIcon />}
        className={classes.addButton}
        style={{ textTransform: 'none' }}
      >
        <Typography>Add New Interaction</Typography>
      </Button>
    </React.Fragment>
  );
}

export default FutureEvents;

import React, { useState } from 'react';
import {
  Button,
  Grid,
  TextField,
  IconButton,
  Typography,
} from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';

function PastEvents(props) {
  const { classes, eventFieldPast, setEventFieldPast } = props;

  const handleInputChangeEventPast = (index, event) => {
    const values = [...eventFieldPast];
    // console.log(event.target.value);
    values[index][event.target.name] = event.target.value;
    setEventFieldPast(values);
  };

  const handleAddFieldPast = () => {
    setEventFieldPast([
      ...eventFieldPast,
      { Occasion: '', Date: '', Description: '' },
    ]);
  };

  const handleRemoveFieldPast = (index) => {
    const values = [...eventFieldPast];
    values.splice(index, 1);
    setEventFieldPast(values);
  };

  return (
    <React.Fragment>
      <Typography className={classes.typographyTitle} variant='h4'>
        Interaction History
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
      {eventFieldPast.map((eventFieldPast, index) => (
        <div key={index}>
          <Grid container justifyContent='space-between'>
            <Grid item xs={2}>
              <TextField
                name='Date'
                placeholder='YYYY/MM/DD'
                value={eventFieldPast.Date}
                onChange={(event) => handleInputChangeEventPast(index, event)}
                variant='standard'
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                name='Occasion'
                placeholder='e.g. Coffee catchup'
                value={eventFieldPast.Occasion}
                onChange={(event) => handleInputChangeEventPast(index, event)}
                variant='standard'
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                name='Description'
                placeholder='e.g. Make sure to look presentable'
                value={eventFieldPast.Description}
                onChange={(event) => handleInputChangeEventPast(index, event)}
                variant='standard'
                fullWidth
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => handleRemoveFieldPast(index)}
                className={classes.button}
              >
                <DeleteOutline />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      ))}
      <br />
      <Button
        onClick={() => handleAddFieldPast()}
        startIcon={<AddIcon />}
        className={classes.addButton}
        style={{ textTransform: 'none' }}
      >
        {' '}
        <Typography>Add New Interaction</Typography>
      </Button>
    </React.Fragment>
  );
}

export default PastEvents;

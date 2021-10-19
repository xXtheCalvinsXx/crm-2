import React from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

function ContactDetails(props) {
  const classes = props.classes;
  const formik = props.formik;
  return (
    <React.Fragment>
      <Typography className={classes.typographyTitle} variant='h4'>
        Basic Details
      </Typography>
      <Grid container>
        <Grid item xs={2}>
          <br />
          <Typography variant='h6' className={classes.typography}>
            Name *
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='Name'
            name='Name'
            type='text'
            placeholder='e.g. John Smith'
            value={formik.values.Name}
            onChange={formik.handleChange}
            error={formik.touched.Name && Boolean(formik.errors.Name)}
            helperText={formik.touched.Name && formik.errors.Name}
            variant='standard'
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={2}>
          <br />
          <Typography variant='h6' className={classes.typography}>
            Email *
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id='Email'
            name='Email'
            type='email'
            placeholder='e.g. johnsmith@gmail.com'
            value={formik.values.Email}
            onChange={formik.handleChange}
            error={formik.touched.Email && Boolean(formik.errors.Email)}
            helperText={formik.touched.Email && formik.errors.Email}
            variant='standard'
            className={classes.textField}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <br />
          <Typography variant='h6' className={classes.typography}>
            Birthday
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='Birthday'
            name='Birthday'
            placeholder='YYYY/MM/DD'
            value={formik.values.Birthday}
            onChange={formik.handleChange}
            error={formik.touched.Birthday && Boolean(formik.errors.Birthday)}
            helperText={formik.touched.Birthday && formik.errors.Birthday}
            variant='standard'
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={2}>
          <br />
          <Typography variant='h6' className={classes.typography}>
            Phone Number
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='PhoneNumber'
            name='PhoneNumber'
            placeholder='e.g. 1234567890'
            value={formik.values.PhoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)
            }
            helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
            variant='standard'
            fullWidth
            className={classes.textField}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <br />
          <Typography variant='h6' className={classes.typography}>
            Location
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='Location'
            name='Location'
            placeholder='e.g. Melbourne'
            value={formik.values.Location}
            onChange={formik.handleChange}
            error={formik.touched.Location && Boolean(formik.errors.Location)}
            helperText={formik.touched.Location && formik.errors.Location}
            variant='standard'
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={2}>
          <br />
          <Typography variant='h6' className={classes.typography}>
            Education
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='Education'
            name='Education'
            placeholder='e.g. University of Melbourne'
            value={formik.values.Education}
            onChange={formik.handleChange}
            error={formik.touched.Education && Boolean(formik.errors.Education)}
            helperText={formik.touched.Education && formik.errors.Education}
            variant='standard'
            fullWidth
            className={classes.textField}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <br />
          <Typography variant='h6' className={classes.typography}>
            Industry
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='Industry'
            name='Industry'
            placeholder='e.g. Tech'
            value={formik.values.Industry}
            onChange={formik.handleChange}
            error={formik.touched.Industry && Boolean(formik.errors.Industry)}
            helperText={formik.touched.Industry && formik.errors.Industry}
            variant='standard'
            className={classes.textField}
          />
        </Grid>
      </Grid>
      <br />
      <Typography className={classes.typographyTitle} variant='h4'>
        Work Details
      </Typography>
      <Grid container>
        <Grid item xs={2}>
          <br />
          <Typography variant='h6' className={classes.typography}>
            Company
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='Company'
            name='Company'
            placeholder='e.g. Google'
            value={formik.values.Company}
            onChange={formik.handleChange}
            error={formik.touched.Company && Boolean(formik.errors.Company)}
            helperText={formik.touched.Company && formik.errors.Company}
            variant='standard'
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={2}>
          <br />
          <Typography variant='h6' className={classes.typography}>
            Position
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='Position'
            name='Position'
            placeholder='e.g. CEO'
            value={formik.values.Position}
            onChange={formik.handleChange}
            error={formik.touched.Position && Boolean(formik.errors.Position)}
            helperText={formik.touched.Position && formik.errors.Position}
            variant='standard'
            fullWidth
            className={classes.textField}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ContactDetails;

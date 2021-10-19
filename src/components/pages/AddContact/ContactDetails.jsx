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
            id='name'
            name='name'
            type='text'
            placeholder='e.g. John Smith'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
            id='email'
            name='email'
            type='email'
            placeholder='e.g. johnsmith@gmail.com'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.nemailame && formik.errors.email}
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
            id='birthday'
            name='birthday'
            placeholder='YYYY/MM/DD'
            value={formik.values.birthday}
            onChange={formik.handleChange}
            error={formik.touched.birthday && Boolean(formik.errors.birthday)}
            helperText={formik.touched.birthday && formik.errors.birthday}
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
            id='phoneNumber'
            name='phoneNumber'
            type='number'
            placeholder='e.g. 1234567890'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
            id='location'
            name='location'
            placeholder='e.g. Melbourne'
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
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
            id='education'
            name='education'
            placeholder='e.g. University of Melbourne'
            value={formik.values.education}
            onChange={formik.handleChange}
            error={formik.touched.education && Boolean(formik.errors.education)}
            helperText={formik.touched.education && formik.errors.education}
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
            id='industry'
            name='industry'
            placeholder='e.g. Tech'
            value={formik.values.industry}
            onChange={formik.handleChange}
            error={formik.touched.industry && Boolean(formik.errors.industry)}
            helperText={formik.touched.industry && formik.errors.industry}
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
            id='company'
            name='company'
            placeholder='e.g. Google'
            value={formik.values.company}
            onChange={formik.handleChange}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
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
            id='position'
            name='position'
            placeholder='e.g. CEO'
            value={formik.values.position}
            onChange={formik.handleChange}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={formik.touched.position && formik.errors.position}
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

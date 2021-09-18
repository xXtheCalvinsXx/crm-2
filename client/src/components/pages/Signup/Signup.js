import React, { useState, useEffect } from 'react';
// import { Formik } from 'formik';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Title } from '../../../styles';

const textWidth = '25ch';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(2),
    // marginTop: 10,
    width: textWidth,
  },
  emailField: {
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(2),
    width: '52ch',
  },
}));

function Signup() {
  const classes = useStyles();
  const validationSchema = Yup.object({
    email: Yup.string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match.')
      .required('Password confirmation is required'),
    firstName: Yup.string('Enter your first name')
      .matches(/[a-zA-Z]/, 'Password can only contain alphabetical letters.')
      .required(),
    lastName: Yup.string('Enter your first name')
      .matches(/[a-zA-Z]/, 'Password can only contain alphabetical letters.')
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <SignupContainer id='Signup Container'>
      <Title>Sign up</Title>

      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            id='firstName'
            name='firstName'
            label='First Name'
            type='text'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            className={classes.textField}
            variant='outlined'
          />
          <TextField
            id='lastName'
            name='lastName'
            label='Last Name'
            type='text'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            className={classes.textField}
            variant='outlined'
          />
        </div>
        <TextField
          id='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          className={classes.emailField}
          variant='outlined'
          // fullWidth
        />

        <div>
          <TextField
            id='password'
            name='password'
            label='Password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            className={classes.textField}
            variant='outlined'
          />
          <TextField
            id='password2'
            name='password2'
            label='Confirm Password'
            type='password'
            value={formik.values.password2}
            onChange={formik.handleChange}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
            className={classes.textField}
            variant='outlined'
          />

          <Button
            id='SubmitButton'
            color='primary'
            variant='outlined'
            type='submit'
          >
            Sign up
          </Button>
        </div>
      </form>
    </SignupContainer>
  );
}

export default Signup;

export const SignupContainer = styled.div`
  width: 480px;
  margin: auto;
  display: flex;
  flex-direction: column;
  #SubmitButton {
    margin-top: 25px;
    align-items: flex-end;
    width: 20%;
    margin-left: auto;
    margin-right: 20px;
  }

  height: 100%;
`;

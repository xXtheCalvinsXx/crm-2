import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
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
  },
}));

function Login() {
  const history = useHistory();
  //   const navigateToSignup = () => history.push('/signup');

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
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <SignupContainer id='Login Container'>
      <Title>Login</Title>

      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <TextField
          id='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant='outlined'
          fullWidth
          className={classes.textField}
        />

        <TextField
          id='password'
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant='outlined'
          fullWidth
          className={classes.textField}
        />
      </form>
      <div>
        <Button
          id='SubmitButton'
          color='primary'
          variant='outlined'
          type='submit'
        >
          Login
        </Button>
        <Button
          type='button'
          id='SignupButton'
          color='primary'
          variant='outlined'
          onClick={() => {
            history.push('/signup');
            console.log('nav');
          }}
        >
          No Account? Click to Signup
        </Button>
      </div>
    </SignupContainer>
  );
}

export default Login;

export const SignupContainer = styled.div`
  width: 47%;
  margin: auto;
  display: flex;
  flex-direction: column;
  #SubmitButton {
    margin-top: 25px;
    align-items: flex-end;
    width: 100%;
    margin-left: auto;
    margin-right: 10px;
  }
  #SignupButton {
    margin-top: 25px;
    align-items: flex-end;
    width: 100%;
    margin-left: 0;
    margin-right: auto;
  }
  height: 100%;
`;

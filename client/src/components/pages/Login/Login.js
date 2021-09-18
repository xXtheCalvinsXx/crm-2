import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { TextField, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Title } from '../../../styles';
import axios from 'axios';

const textWidth = '25ch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10,
  },
}));

const validationSchema = Yup.object({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('Enter your password').required('Password is required'),
});

function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [axiosErrors, setAxiosErrors] = useState({});

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log('yeet!');
      const loginVariables = {
        email: values.email,
        password: values.password,
      };

      // setLoading(true);
      // axios
      //   .post('/login', loginVariables)
      //   .then((res) => {
      //     console.log(res);
      //     setLoading(false);
      //     history.push('/timeline');
      //   })
      //   .catch((err) => {
      //     setAxiosErrors(err);
      //     setLoading(false);
      //     console.log(axiosErrors);
      //   });
    },
  });

  return (
    <LoginContainer id='Login Container'>
      <Title>Login</Title>

      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <TextField
          id='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={
            axiosErrors.email
              ? axiosErrors.email
              : formik.touched.email && Boolean(formik.errors.email)
          }
          helperText={
            axiosErrors.email
              ? axiosErrors.email
              : formik.touched.email && formik.errors.email
          }
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
        <Button
          id='SubmitButton'
          color='primary'
          variant='outlined'
          type='submit'
          onClick={() => {
            loading && (
              <CircularProgress size={30} className={classes.progress} />
            );
          }}
        >
          Login
        </Button>
      </form>

      {axiosErrors.general && (
        <Typography variant='body2' className={classes.customError}>
          {axiosErrors.general}
        </Typography>
      )}
      <div>
        <Button
          type='button'
          id='SubmitButton'
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
    </LoginContainer>
  );
}

export default Login;

export const LoginContainer = styled.div`
  width: 480px;
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

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// styling
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Title } from '../../../styles';
import Alert from '@mui/material/Alert';

// firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseUtils';
import userSignUp from '../../../firebase/userSignUp';

// redux
import { setCurrentUser } from '../../../redux/user/user.actions';
import { connect } from 'react-redux';

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
  alert: {
    marginTop: theme.spacing(10),
  },
}));

function Signup() {
  const [signUpError, setSignUpError] = useState('');

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
    onSubmit: async (values) => {
      console.log(values);
      setSignUpError('');

      // creating user
      try {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        )
          .then(async (userCredentials) => {
            console.log(userCredentials);
            try {
              await userSignUp(userCredentials, values);
              setCurrentUser(userCredentials);
            } catch (error) {
              console.log('Error calling signup user', error);
            }
          })
          .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
              setSignUpError('Email is already is use');
            } else {
              setSignUpError('Something went wrong, please try again');
            }
          });
      } catch (error) {
        console.log(error);
      }
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
          {signUpError ? (
            <Alert severity='error' className={classes.alert}>
              {signUpError}
            </Alert>
          ) : (
            ''
          )}
        </div>
      </form>
    </SignupContainer>
  );
}

// const mapStateToProps = ({ state }) => ({
//   currentUser: state.currentUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

export default connect()(Signup);

// export default connect(mapStateToProps, mapDispatchToProps)(Signup);

export const SignupContainer = styled.div`
  width: 480px;
  margin: auto;
  display: flex;
  flex-direction: column;
  #SubmitButton {
    margin-top: 10px;
    align-items: flex-end;
    width: 20%;
    margin-left: auto;
    margin-right: 20px;
    float: right;
  }

  height: 100%;
`;

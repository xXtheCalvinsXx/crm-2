import React, { useState, useRef, useEffect } from 'react';

// styling
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  TextField,
  makeStyles,
  IconButton,
  Avatar,
} from '@material-ui/core';

// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// axios
import axios from 'axios';

// components
import AddContactImage from './AddContactImage';
import FutureEvents from './FutureEvents';
import PastEvents from './PastEvents';
import ContactDetails from './ContactDetails';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(3.5),
  },
  typography: {
    marginLeft: theme.spacing(3.3),
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    color: '#b0bec5',
  },
  typographyTitle: {
    marginLeft: theme.spacing(3.3),
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  button: {
    marginTop: theme.spacing(2.7),
    marginLeft: theme.spacing(5),
  },
  addButton: {
    marginLeft: theme.spacing(2.5),
  },
  upload: {
    marginLeft: theme.spacing(9),
  },
  sizeAvatar: {
    height: theme.spacing(23),
    width: theme.spacing(23),
    margin: theme.spacing(3),
  },
}));

function AddContactDialogue(props) {
  const classes = useStyle();
  const [eventFieldFuture, setEventFieldFuture] = useState([
    { date: '', description: '', notes: '' },
  ]);
  const [eventFieldPast, setEventFieldPast] = useState([
    { date: '', description: '', notes: '' },
  ]);

  const validationSchema = Yup.object({
    name: Yup.string('Please enter contact name').required(),
    location: Yup.string('Enter location'),
    company: Yup.string('Enter company name'),
    position: Yup.string('Enter position'),
    birthday: Yup.date('Enter birthday'),
    education: Yup.string('Enter education'),
    industry: Yup.string('Enter industry'),
    email: Yup.string('Enter email').email('Enter a valid email').required(),
    phoneNumber: Yup.number('Enter phone number')
      .min(10, 'Please enter a valid phone number')
      .max(10, 'Please enter a valid phone number'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      location: '',
      company: '',
      position: '',
      birthday: '',
      education: '',
      industry: '',
      email: '',
      phoneNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const descriptionElementRef = useRef(null);
  const { open, handleClose, scroll } = props;
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth='false'
        maxWidth='lg'
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id='scroll-dialog-description'
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {' '}
              <AddContactImage classes={classes} />
              <ContactDetails classes={classes} formik={formik} />
              <FutureEvents
                classes={classes}
                formik={formik}
                eventFieldFuture={eventFieldFuture}
                setEventFieldFuture={setEventFieldFuture}
              />
              <PastEvents
                classes={classes}
                formik={formik}
                eventFieldPast={eventFieldPast}
                setEventFieldPast={setEventFieldPast}
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              style={{ textTransform: 'none' }}
              type='submit'
              id='SubmitButton'
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default AddContactDialogue;

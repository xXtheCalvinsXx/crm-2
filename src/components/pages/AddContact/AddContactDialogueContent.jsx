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

function AddContactDialogueContent(props) {
  const { editContact, avatar, futureEvents, pastEvents } = props;
  const contact = props?.contact?.contact;

  console.log('edit contact = ', editContact);
  const classes = useStyle();
  const [eventFieldFuture, setEventFieldFuture] = useState([
    { Date: '', Occasion: '', Description: '' },
  ]);

  const [eventFieldPast, setEventFieldPast] = useState([
    { Date: '', Occasion: '', Description: '' },
  ]);
  const { descriptionElementRef, scroll } = props;

  useEffect(() => {
    if (editContact) {
      initialiseEvents(setEventFieldFuture, futureEvents, contact.contactId);
      initialiseEvents(setEventFieldPast, pastEvents, contact.contactId);
    }

    console.log('fe = ', eventFieldFuture);
  }, [futureEvents]);

  //   const initialFutureEvents = futureEvents.length > 0 ? :

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    Name: Yup.string('Please enter contact name').required(),
    Location: Yup.string('Enter location'),
    Company: Yup.string('Enter company name'),
    Position: Yup.string('Enter position'),
    Birthday: Yup.date('Enter birthday'),
    Education: Yup.string('Enter education'),
    Industry: Yup.string('Enter industry'),
    Email: Yup.string('Enter email').email('Enter a valid email').required(),
    PhoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  });

  const formik = useFormik({
    initialValues: {
      Name: editContact ? contact.Name : '',
      Location: editContact ? contact.Location : '',
      Company: editContact ? contact.Company : '',
      Position: editContact ? contact.Position : '',
      Birthday: editContact ? contact.Birthday : '',
      Education: editContact ? contact.Education : '',
      Industry: editContact ? contact.Industry : '',
      Email: editContact ? contact.Email : '',
      PhoneNumber: editContact ? contact.Phone_Number : '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('hihihi', values);
      console.log(eventFieldFuture);
    },
  });
  console.log(formik.initialValues);

  return (
    <form onSubmit={formik.handleSubmit}>
      <DialogContent dividers={scroll === 'paper'}>
        {' '}
        <AddContactImage classes={classes} avatar={avatar} />
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
  );
}

function initialiseEvents(setEvents, data, contactID) {
  var arr = [];
  for (var event in data) {
    arr.push({
      Date: event.Date,
      Occasion: event.Occasion,
      Description: event.Description,
      RelevantContact: contactID,
    });
  }

  console.log('data = ', data);

  setEvents(arr);
}
export default AddContactDialogueContent;

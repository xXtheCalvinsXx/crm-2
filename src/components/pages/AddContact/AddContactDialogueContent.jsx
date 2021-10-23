import React, { useState, useContext, useEffect } from 'react';
import { userContext } from '../../../appContext/userContext';

// styling
import {
  Button,
  DialogActions,
  DialogContent,
  makeStyles,
} from '@material-ui/core';

// formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

// components
import AddContactImage from './AddContactFields/AddContactImage';
import FutureEvents from './AddContactFields/FutureEvents';
import PastEvents from './AddContactFields/PastEvents';
import ContactDetails from './AddContactFields/ContactDetails';

// Axios
import postAddContact from '../../../axios/postAddContact';
import putUpdateContact from '../../../axios/putUpdateContact';
import postAddNewEvent from '../../../axios/postAddNewEvent';

// util
import addContactIdToEvent from '../../../util/addContactIdToEvent';
import addNewEvents from '../../../util/addNewEvents';

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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function AddContactDialogueContent(props) {
  const { editContact } = props;
  const contact = props?.contact;
  const user = useContext(userContext);
  const futureEvents = contact?.upcomingEvents;
  const pastEvents = contact?.pastEvents;
  const avatar = contact?.imageUrl;
  const classes = useStyle();

  const [eventFieldFuture, setEventFieldFuture] = useState(
    futureEvents ? futureEvents : [{ Date: '', Occasion: '', Description: '' }]
  );

  const [eventFieldPast, setEventFieldPast] = useState(
    pastEvents ? pastEvents : [{ Date: '', Occasion: '', Description: '' }]
  );
  const { scroll } = props;

  // useEffect(() => {
  //   if (editContact) {
  //     initialiseEvents(setEventFieldFuture, futureEvents, contact.contactId);
  //     initialiseEvents(setEventFieldPast, pastEvents, contact.contactId);
  //   }
  // }, []);

  //   const initialFutureEvents = futureEvents.length > 0 ? :

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
      const {
        Name,
        Location,
        Company,
        Position,
        Birthday,
        Education,
        Industry,
        Email,
      } = formik.values;

      const requestBody = {
        Name: Name,
        Location: Location,
        Company: Company,
        Position: Position,
        Birthday: Birthday,
        Education: Education,
        Industry: Industry,
        Email: Email,
        Phone_Number: formik.values.PhoneNumber,
      };
      if (editContact) {
        contact.Name = Name;
        contact.Location = Location;
        contact.Company = Company;
        contact.Position = Position;
        contact.Birthday = Birthday;
        contact.Education = Education;
        contact.Industry = Industry;
        contact.Email = Email;
        contact.Phone_Number = formik.values.PhoneNumber;
        putUpdateContact(user, contact.contactId, requestBody);
      } else {
        postAddContact(user, requestBody);
      }

      addNewEvents(
        user,
        Email,
        eventFieldPast,
        addContactIdToEvent,
        postAddNewEvent
      );
      addNewEvents(
        user,
        Email,
        eventFieldFuture,
        addContactIdToEvent,
        postAddNewEvent
      );
    },
  });

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
  const n = data.length;
  for (var i = 0; i < n; i++) {
    arr.push({
      Date: data[i].Date,
      Occasion: data[i].Occasion,
      Description: data[i].Description,
      RelevantContact: contactID,
      eventId: data[i].eventId,
    });
  }
  setEvents(arr);
}
export default AddContactDialogueContent;

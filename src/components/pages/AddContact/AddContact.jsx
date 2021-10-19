import { useState, useRef, useEffect } from 'react';
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
import AddIcon from '@material-ui/icons/Add';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { styled } from '@mui/material/styles';

// axios
import axios from 'axios';

// context
import { useContext } from 'react';
import { userContext } from '../../../appContext/userContext';

const initialContactValues = {
  Name: '',
  Location: '',
  Company: '',
  Position: '',
  Birthday: '',
  Education: '',
  Industry: '',
  Email: '',
  Phone_Number: '',
};

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

const Input = styled('input')({
  display: 'none',
});

export default function AddContact() {
  const user = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [values, setValues] = useState(initialContactValues);
  const [myImage, setMyImage] = useState(
    'https://commons.wikimedia.org/wiki/File:Breezeicons-actions-22-im-user.svg'
  );
  const [eventFieldPast, setEventFieldPast] = useState([
    { date: '', description: '', notes: '' },
  ]);
  const [eventFieldFuture, setEventFieldFuture] = useState([
    { date: '', description: '', notes: '' },
  ]);
  const classes = useStyle();

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setMyImage(
      'https://commons.wikimedia.org/wiki/File:Breezeicons-actions-22-im-user.svg'
    );
    setValues(initialContactValues);
    setEventFieldPast([
      { Occasion: '', Date: '', Description: '', RelevantContact: '' },
    ]);
    setEventFieldFuture([
      { Occasion: '', Date: '', Description: '', RelevantContact: '' },
    ]);
  };

  const handleInputChangeContact = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputChangeEventPast = (index, event) => {
    const values = [...eventFieldPast];
    values[index][event.target.name] = event.target.value;
    setEventFieldPast(values);
  };

  const handleInputChangeEventFuture = (index, event) => {
    const values = [...eventFieldFuture];
    values[index][event.target.name] = event.target.value;
    setEventFieldFuture(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(myImage);
    console.log(values);
    console.log(eventFieldPast);
    console.log(eventFieldFuture);
    if (user) {
      const token = user.getIdToken();
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      };

      axios
        .post('contact', { headers }, values)
        .then((response) => {
          console.log('yay contact posted');
        })
        .catch((error) => {
          console.log(error);
        });
    }
    handleClose();
  };

  const handleAddFieldPast = () => {
    setEventFieldPast([
      ...eventFieldPast,
      { Occasion: '', Date: '', Description: '' },
    ]);
  };
  const handleAddFieldFuture = () => {
    setEventFieldFuture([
      ...eventFieldFuture,
      { Occasion: '', Date: '', Description: '' },
    ]);
  };

  const handleRemoveFieldPast = (index) => {
    const values = [...eventFieldPast];
    values.splice(index, 1);
    setEventFieldPast(values);
  };
  const handleRemoveFieldFuture = (index) => {
    const values = [...eventFieldFuture];
    values.splice(index, 1);
    setEventFieldFuture(values);
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setMyImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button
        startIcon={<AddIcon />}
        raised
        color='accent'
        style={{ textTransform: 'none' }}
        onClick={handleClickOpen('paper')}
      >
        Add Contact
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth='false'
        maxWidth='lg'
      >
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Avatar className={classes.sizeAvatar} src={myImage} />
            <label htmlFor='input'>
              <Input
                accept='image/*'
                id='input'
                multiple
                type='file'
                onChange={imageHandler}
              />
              <Button
                className={classes.upload}
                variant='contained'
                component='span'
                style={{ textTransform: 'none' }}
              >
                <Typography>Upload</Typography>
              </Button>
            </label>
            <br />
            <br />
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
                  name='Name'
                  placeholder='e.g. John Smith'
                  value={values.Name}
                  onChange={handleInputChangeContact}
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
                  name='Email'
                  placeholder='e.g. johnsmith@gmail.com'
                  value={values.Email}
                  fullWidth
                  onChange={handleInputChangeContact}
                  variant='standard'
                  className={classes.textField}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <br />
                <Typography variant='h6' className={classes.typography}>
                  Birthday *
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='Birthday'
                  placeholder='YYYY/MM/DD'
                  value={values.Birthday}
                  onChange={handleInputChangeContact}
                  variant='standard'
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={2}>
                <br />
                <Typography variant='h6' className={classes.typography}>
                  Phone Number *
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='Phone_Number'
                  placeholder='e.g. 1234567890'
                  value={values.Phone_Number}
                  onChange={handleInputChangeContact}
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
                  Location *
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='Location'
                  placeholder='e.g. Melbourne'
                  value={values.Location}
                  onChange={handleInputChangeContact}
                  variant='standard'
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={2}>
                <br />
                <Typography variant='h6' className={classes.typography}>
                  Education *
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='Education'
                  placeholder='e.g. University of Melbourne'
                  value={values.Education}
                  onChange={handleInputChangeContact}
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
                  Industry *
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='Industry'
                  placeholder='e.g. Tech'
                  value={values.Industry}
                  onChange={handleInputChangeContact}
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
                  Company *
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='Company'
                  placeholder='e.g. Google'
                  value={values.Company}
                  onChange={handleInputChangeContact}
                  variant='standard'
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={2}>
                <br />
                <Typography variant='h6' className={classes.typography}>
                  Position *
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name='Position'
                  placeholder='e.g. CEO'
                  value={values.Position}
                  onChange={handleInputChangeContact}
                  variant='standard'
                  fullWidth
                  className={classes.textField}
                />
              </Grid>
            </Grid>
            <br />
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
                      onChange={(event) =>
                        handleInputChangeEventPast(index, event)
                      }
                      variant='standard'
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      name='Occasion'
                      placeholder='e.g. Coffee catchup'
                      value={eventFieldPast.Occasion}
                      onChange={(event) =>
                        handleInputChangeEventPast(index, event)
                      }
                      variant='standard'
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      name='Description'
                      placeholder='e.g. Make sure to look presentable'
                      value={eventFieldPast.Description}
                      onChange={(event) =>
                        handleInputChangeEventPast(index, event)
                      }
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
              <Typography>Add New Interaction</Typography>
            </Button>
            <br />
            <br />
            <Typography className={classes.typographyTitle} variant='h4'>
              Future Interactions
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
            {eventFieldFuture.map((eventFieldFuture, index) => (
              <div key={index}>
                <Grid container>
                  <Grid item xs={2}>
                    <TextField
                      name='Date'
                      placeholder='YYYY/MM/DD'
                      value={eventFieldFuture.Date}
                      onChange={(event) =>
                        handleInputChangeEventFuture(index, event)
                      }
                      variant='standard'
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      name='Occasion'
                      placeholder='e.g. Coffee catchup'
                      value={eventFieldFuture.Occasion}
                      onChange={(event) =>
                        handleInputChangeEventFuture(index, event)
                      }
                      variant='standard'
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      name='Description'
                      placeholder='e.g. Make sure to look presentable'
                      value={eventFieldFuture.Description}
                      onChange={(event) =>
                        handleInputChangeEventFuture(index, event)
                      }
                      variant='standard'
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      className={classes.button}
                      onClick={() => handleRemoveFieldFuture(index)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ))}
            <br />
            <Button
              onClick={() => handleAddFieldFuture()}
              startIcon={<AddIcon />}
              className={classes.addButton}
              style={{ textTransform: 'none' }}
            >
              <Typography>Add New Interaction</Typography>
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ textTransform: 'none' }} onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

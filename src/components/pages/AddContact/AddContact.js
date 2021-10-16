import {useState, useRef, useEffect } from 'react';
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, Typography, TextField, makeStyles, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const initialContactValues = {
  id: 0,
  fullName: '',
  location: '',
  company: '',
  position: '',
  birthday: '',
  education: '',
  industry: '',
  email: '',
  phoneNumber: '',
}

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(3.5)
  },
  typography: {
    marginLeft: theme.spacing(3.3),
    marginRight: theme.spacing(.5),
    marginTop: theme.spacing(.5),
    marginBottom: theme.spacing(.5),
    color: '#b0bec5',
  },
  typographyTitle: {
    marginLeft: theme.spacing(3.3),
    marginRight: theme.spacing(.5),
    marginTop: theme.spacing(.5),
    marginBottom: theme.spacing(.5),
  },
  button: {
    marginTop: theme.spacing(2.7),
    marginLeft: theme.spacing(5)
  },
  addButton: {
    marginLeft: theme.spacing(2.5)
  }
}))

export default function AddContact() {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [values, setValues] = useState(initialContactValues);
  const [eventFieldPast, setEventFieldPast] = useState([
    {date: '', description: '', notes: ''},
  ])
  const [eventFieldFuture, setEventFieldFuture] = useState([
    {date: '', description: '', notes: ''},
  ])
  const classes = useStyle();

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChangeContact = e => {
    const {name, value} = e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  const handleInputChangeEventPast = (index, event) => {
    const values = [...eventFieldPast]
    values[index][event.target.name] = event.target.value
    setEventFieldPast(values)
  }

  const handleInputChangeEventFuture = (index, event) => {
    const values = [...eventFieldFuture]
    values[index][event.target.name] = event.target.value
    setEventFieldFuture(values)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values)
    console.log(eventFieldPast)
    console.log(eventFieldFuture)
  }

  const handleAddFieldPast = () => {
    setEventFieldPast([...eventFieldPast, {date: '', description: '', notes: ''}])
  }
  const handleAddFieldFuture = () => {
    setEventFieldFuture([...eventFieldFuture, {date: '', description: '', notes: ''}])
  }

  const handleRemoveFieldPast = (index) => {
    const values = [...eventFieldPast]
    values.splice(index, 1)
    setEventFieldPast(values)
  }
  const handleRemoveFieldFuture = (index) => {
    const values = [...eventFieldFuture]
    values.splice(index, 1)
    setEventFieldFuture(values)
  }

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
      raised color="accent" 
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
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            
            <Typography className={classes.typographyTitle} variant='h4'>
              Basic Details
            </Typography>
            <br/>
            <Grid container>
              <Grid item xs={2}>
                <br/>
                <Typography 
                variant='h6' 
                className={classes.typography}
                >
                  Name
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField 
                name='fullName'
                placeholder='e.g. John Smith'
                value={values.fullName}
                onChange={handleInputChangeContact}
                variant='standard'
                className={classes.textField}
                />
                
              </Grid>
              <Grid item xs={2}>
                <br/>
                <Typography 
                variant='h6' 
                className={classes.typography}
                >
                  Email
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField 
                name='email'
                placeholder='e.g. johnsmith@gmail.com'
                value={values.email}
                fullWidth
                onChange={handleInputChangeContact}
                variant='standard'
                className={classes.textField}/>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <br/>
                <Typography 
                variant='h6' 
                className={classes.typography}
                >
                  Birthday
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField 
                name='birthday'
                placeholder='YYYY/MM/DD'
                value={values.birthday}
                onChange={handleInputChangeContact}
                variant='standard'
                className={classes.textField}
                />
              </Grid>
              <Grid item xs={2}>
                <br/>
                <Typography 
                variant='h6' 
                className={classes.typography}
                >
                  Phone Number
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField 
                name='phoneNumber'
                placeholder='e.g. 1234567890'
                value={values.phoneNumber}
                onChange={handleInputChangeContact}
                variant='standard'
                fullWidth
                className={classes.textField}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <br/>
                <Typography 
                variant='h6' 
                className={classes.typography}
                >
                  Location
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField 
                name='location'
                placeholder='e.g. Melbourne'
                value={values.location}
                onChange={handleInputChangeContact}
                variant='standard'
                className={classes.textField}
                />
              </Grid>
              <Grid item xs={2}>
                <br/>
                <Typography 
                variant='h6' 
                className={classes.typography}
                >
                  Education
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField 
                name='education'
                placeholder='e.g. University of Melbourne'
                value={values.education}
                onChange={handleInputChangeContact}
                variant='standard'
                fullWidth
                className={classes.textField}
                />
              </Grid>
              
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <br/>
                <Typography 
                variant='h6' 
                className={classes.typography}
                >
                  Industry
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField 
                name='industry'
                placeholder='e.g. Tech'
                value={values.industry}
                onChange={handleInputChangeContact}
                variant='standard'
                className={classes.textField}
                />
              </Grid>
            </Grid>
            <br/>
            <Typography className={classes.typographyTitle} variant='h4'>
              Work Details
            </Typography>
            <br/>
            <Grid container>
              
              <Grid item xs={2}>
                <br/>
                <Typography 
                variant='h6' 
                className={classes.typography}
                >
                  Company
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField 
                name='company'
                placeholder='e.g. Google'
                value={values.company}
                onChange={handleInputChangeContact}
                variant='standard'
                className={classes.textField}
                />
              </Grid>
              <Grid item xs={2}>
                <br/>
                <Typography 
                variant='h6' 
                className={classes.typography}
                >
                  Position
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField 
                name='position'
                placeholder='e.g. CEO'
                value={values.position}
                onChange={handleInputChangeContact}
                variant='standard'
                fullWidth
                className={classes.textField}
                />
              </Grid>
            </Grid>
            <br/>
            <Typography className={classes.typographyTitle} variant='h4'>
              Interaction History
            </Typography>
            <br/>
            <Grid container>
              <Grid item xs={2}>
              <Typography 
                variant='h6' 
                className={classes.typography}
                >Date</Typography>
              </Grid>
              <Grid item xs={3}>
              <Typography 
                variant='h6' 
                className={classes.typography}
                >Description</Typography>
              </Grid>
              <Grid item xs={7}>
              <Typography 
                variant='h6' 
                className={classes.typography}
                >Notes</Typography>
              </Grid>
            </Grid>
            { eventFieldPast.map((eventFieldPast, index) => (
              <div key={index}>
                <Grid container justifyContent='space-between'>
                  <Grid item xs={2}>
                  <TextField 
                    name='date'
                    placeholder='YYYY/MM/DD'
                    value={eventFieldPast.date}
                    onChange={event => handleInputChangeEventPast(index, event)}
                    variant='standard'
                    className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={3}>
                  <TextField 
                    name='description'
                    placeholder='e.g. Coffee catchup'
                    value={eventFieldPast.description}
                    onChange={event => handleInputChangeEventPast(index, event)}
                    variant='standard'
                    className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={5}>
                  <TextField 
                    name='notes'
                    placeholder='e.g. Make sure to look presentable'
                    value={eventFieldPast.notes}
                    onChange={event => handleInputChangeEventPast(index, event)}
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
                      <DeleteOutline/>
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ))}
            <Button
              onClick={() => handleAddFieldPast()}
              startIcon={<AddIcon/>}
              className={classes.addButton}
              style={{textTransform: 'none'}}
            >
              <Typography>Add New Interaction</Typography>
            </Button>
            <br/>
            <br/>
            <Typography className={classes.typographyTitle} variant='h4'>
              Future Interactions
            </Typography>
            <br/>
            <Grid container>
              <Grid item xs={2}>
              <Typography 
                variant='h6' 
                className={classes.typography}
                >Date</Typography>
              </Grid>
              <Grid item xs={3}>
              <Typography 
                variant='h6' 
                className={classes.typography}
                >Description</Typography>
              </Grid>
              <Grid item xs={7}>
              <Typography 
                variant='h6' 
                className={classes.typography}
                >Notes</Typography>
              </Grid>
            </Grid>
            { eventFieldFuture.map((eventFieldFuture, index) => (
              <div key={index}>
                <Grid container>
                  <Grid item xs={2}>
                  <TextField 
                    name='date'
                    placeholder='YYYY/MM/DD'
                    value={eventFieldFuture.date}
                    onChange={event => handleInputChangeEventFuture(index, event)}
                    variant='standard'
                    className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={3}>
                  <TextField 
                    name='description'
                    placeholder='e.g. Coffee catchup'
                    value={eventFieldFuture.description}
                    onChange={event => handleInputChangeEventFuture(index, event)}
                    variant='standard'
                    className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={5}>
                  <TextField 
                    name='notes'
                    placeholder='e.g. Make sure to look presentable'
                    value={eventFieldFuture.notes}
                    onChange={event => handleInputChangeEventFuture(index, event)}
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
                      <DeleteOutline/>
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ))}
            <Button
              onClick={() => handleAddFieldFuture()}
              startIcon={<AddIcon/>}
              className={classes.addButton}
              style={{textTransform: 'none'}}
            >
              <Typography>Add New Interaction</Typography>
            </Button>
            
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit, handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
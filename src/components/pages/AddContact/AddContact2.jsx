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
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

//context
import { useContext } from 'react';
import { userContext } from '../../../appContext/userContext';

// components
import AddContactDialogue from './AddContactDialogue';

function AddContact2(props) {
  const user = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const { contact, pastEvents, upcomingEvents } = props;

  const handleClickOpen = (scrollType) => {
    console.log('handled!');
    console.log('open = ', open);
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
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
    <React.Fragment>
      <Button
        startIcon={<AddIcon />}
        raised
        color='accent'
        style={{ textTransform: 'none' }}
        onClick={() => {
          handleClickOpen('paper');
          console.log('clicked!');
          console.log('open  =', open);
        }}
      >
        Add Contact
      </Button>

      <AddContactDialogue
        open={open}
        handleClose={handleClose}
        scroll={scroll}
      ></AddContactDialogue>
    </React.Fragment>
  );
}

export default AddContact2;

import React, { useState, useRef, useEffect } from 'react';

// styling
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

//context
import { useContext } from 'react';
import { userContext } from '../../../appContext/userContext';

// components
import AddContactDialogue from './AddContactDialogue';

function AddContact(props) {
  const user = useContext(userContext);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  // const { contactData, editContact } = props;
  // const { contactDetails, pastEvents, futureEvents } = contactData;

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
        }}
      >
        Add Contact
      </Button>

      <AddContactDialogue
        open={open}
        handleClose={handleClose}
        scroll={scroll}
        handleAddContact={props.handleAddContact}
      ></AddContactDialogue>
    </React.Fragment>
  );
}

export default AddContact;

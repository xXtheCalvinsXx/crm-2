import React, { useState, useRef, useEffect } from 'react';

// styling
import { Dialog } from '@material-ui/core';
import AddContactDialogueContent from './AddContactDialogueContent';

function AddContactDialogue(props) {
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
        <AddContactDialogueContent
          scroll={scroll}
          descriptionElementRef={descriptionElementRef}
          editContact={false}
        />
      </Dialog>
    </React.Fragment>
  );
}

export default AddContactDialogue;

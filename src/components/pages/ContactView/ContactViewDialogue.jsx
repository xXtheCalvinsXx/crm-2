import React from 'react';

// Styling
import { Grid, Button, Dialog, DialogActions } from '@material-ui/core';

// Components
import AddContactDialogueContent from '../AddContact/AddContactDialogueContent';
import ContactView from './ContactView';

function ContactViewDialogue(props) {
  const { classes, handleClose, handleEditOpen, editOpen, open, contact } =
    props;
  return (
    <React.Fragment>
      <Dialog
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={open}
        onClose={handleClose}
      >
        <Grid justifyContent='space-between' container spacing={12}>
          <Grid item></Grid>
          <Grid item>
            {/* <div> */}
            <DialogActions>
              {!editOpen && <Button onClick={handleEditOpen}>Edit</Button>}

              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
            {/* </div> */}
          </Grid>
        </Grid>
        {!editOpen && open && <ContactView contact={contact} />}
        {editOpen && (
          <AddContactDialogueContent
            contact={contact}
            editContact={true}
            avatar={contact.imageUrl}
          />
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default ContactViewDialogue;

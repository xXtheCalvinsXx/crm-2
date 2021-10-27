import React, { useContext } from 'react';
// Styling
import { Grid, Button, Dialog, DialogActions } from '@material-ui/core';

// Components
import AddContactDialogueContent from '../AddContact/AddContactDialogueContent';
import ContactView from './ContactView';
import DeleteContactModal from './DeleteContactModal';

function ContactViewDialogue(props) {
  const {
    classes,
    handleClose,
    handleEditOpen,
    editOpen,
    open,
    contact,
    deleteContactModal,
    setDeleteContactModal,
    handleDelete,
  } = props;

  const handleDeleteModalOpen = () => {
    setDeleteContactModal(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteContactModal(false);
  };

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
            <DialogActions>
              {!editOpen && <Button onClick={handleEditOpen}>Edit</Button>}

              <Button onClick={handleClose}>Close</Button>
              <Button onClick={handleDeleteModalOpen}>Delete</Button>
            </DialogActions>
          </Grid>
        </Grid>
        {!editOpen && open && <ContactView contact={contact} />}
        {editOpen && (
          <AddContactDialogueContent
            contact={contact}
            editContact={true}
            avatar={contact.imageUrl}
            onClose={handleClose}
          />
        )}
        {deleteContactModal && (
          <DeleteContactModal
            classes={classes}
            open={deleteContactModal}
            contact={contact}
            handleClose={handleDeleteModalClose}
            handleDelete={handleDelete}
          />
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default ContactViewDialogue;

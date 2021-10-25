import React, { useContext } from 'react';
import { userContext } from '../../../appContext/userContext';
import { Grid, Button, Dialog, DialogActions } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';

function DeleteContactModal(props) {
  const { handleClose, open, contact, handleDelete } = props;
  const user = useContext(userContext);

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        // classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText>
            Are you sure you would like to delete this contact?
          </DialogContentText>
          <Grid justifyContent='space-between' container spacing={12}>
            <Grid item></Grid>
            <Grid item>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  color='red'
                  onClick={() => {
                    console.log('contact = ', contact);
                    handleDelete(user, contact);
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteContactModal;

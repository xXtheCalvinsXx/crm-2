import * as React from 'react';
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

export default function AddContact() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
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
            <Typography>
              Basic Details
            </Typography>
            <Grid 
            container
            justifyContent="space-evenly" 
            >
              <Grid item>
                Happy
              </Grid>
              <Grid item>
                Name
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
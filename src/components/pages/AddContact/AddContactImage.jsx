import React, { useState } from 'react';
import { Button, Typography, Avatar } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import defaultAvatar from '../../../public/images/defaultAvatar.png';

const Input = styled('input')({
  display: 'none',
});

function AddContactImage(props) {
  const { classes, avatar } = props;
  const [myImage, setMyImage] = useState(avatar ? avatar : defaultAvatar);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setMyImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default AddContactImage;

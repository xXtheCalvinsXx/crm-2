import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { auth } from '../../firebase/firebaseUtils';
import createContactData from '../../util/createContactData';

// stylinh
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function temp(props) {
  const signOut = async () => {
    try {
      await auth.signOut();
      return 'sign out success';
    } catch (error) {
      return 'sign out failure';
    }
  };

  const loading = props.props.queryLoading.queryLoading;
  if (loading || !props.props.contacts.data || !props.props.events.data) {
    return (
      <React.Fragment>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
        >
          <CircularProgress size={100} />
        </Box>
      </React.Fragment>
    );
  } else {
    const data = createContactData(
      props.props.contacts.data,
      props.props.events.data
    );

    props.props.contactEventData.contactEventData.current = data;
    console.log(props.props.contactEventData.contactEventData.current);

    return (
      <div>
        <h1>Hello</h1>
        <Button
          type='button'
          id='SubmitButton'
          color='primary'
          variant='outlined'
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </Button>
      </div>
    );
  }
}

export default temp;

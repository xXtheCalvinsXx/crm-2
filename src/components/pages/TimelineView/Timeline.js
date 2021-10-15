import React, { useState } from 'react';

// firebase
import { auth } from '../../../firebase/firebaseUtils';
import { useAuthState } from 'react-firebase-hooks/auth';

// axios
import axios from 'axios';

// context
import { useContext } from 'react';
import { userContext } from '../../../appContext/userContext';

// styling
import Button from '@material-ui/core/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Timeline() {
  console.log('timeline');
  // const [user, loading, error] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const user = useContext(userContext);

  console.log('user = ', user);

  const getData = async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const headers = await {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      };
      setLoading(true);

      await axios
        .get('events', { headers })
        .then((response) => {
          console.log(response);
          setLoading(false);
          setFetched(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      return 'sign out success';
    } catch (error) {
      return 'sign out failure';
    }
  };

  // if (!fetched) getData(user);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (!loading)
    return (
      <React.Fragment>
        <p>I am a page</p>;<h1>I AM A PAGE!</h1>
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
      </React.Fragment>
    );
}

export default Timeline;
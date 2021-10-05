import React from 'react';

// firebase
import { auth } from '../../../firebase/firebaseUtils';
import { useAuthState } from 'react-firebase-hooks/auth';

// axios
import axios from 'axios';

// context
import { useContext } from 'react';
import { userContext } from '../../../appContext/userContext';

function Timeline() {
  // const [user, loading, error] = useAuthState(auth);

  const user = useContext(userContext);

  console.log('user = ', user);

  const getData = async (user) => {
    if (user) {
      await axios({
        method: 'get',
        url: 'events',
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  getData(user);

  return (
    <div>
      <p>I am a page</p>;<h1>I AM A PAGE!</h1>
    </div>
  );
}

export default Timeline;

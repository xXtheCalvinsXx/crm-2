import React from 'react';
import axios from 'axios';

async function postAddNewEvent(user, requestBody) {
  if (user) {
    const token = await user.getIdToken();
    const headers = await {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    };

    await axios
      .post(`/event`, requestBody, { headers })
      .then((response) => {
        console.log('created event', response);
      })
      .catch((error) => {
        console.log(error);
        error = true;
      });
  }

  return;
}

export default postAddNewEvent;

import React from 'react';
import axios from 'axios';

async function putUpdateEvent(user, eventId, requestBody) {
  if (user) {
    const token = await user.getIdToken();
    const headers = await {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    };

    console.log('rq body = ', requestBody);
    await axios
      .put(`/event/${eventId}`, requestBody, { headers })
      .then((response) => {
        console.log('updated event!', response);
      })
      .catch((error) => {
        console.log(error);
        error = true;
      });
  }

  return;
}

export default putUpdateEvent;

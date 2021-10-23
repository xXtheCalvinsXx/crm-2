import React from 'react';
import axios from 'axios';

async function postAddContact(user, requestBody) {
  if (user) {
    const token = await user.getIdToken();
    const headers = await {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    };

    console.log('rq body = ', requestBody);
    await axios
      .post(`/contact`, requestBody, { headers })
      .then((response) => {
        console.log('added contact', response);
      })
      .catch((error) => {
        console.log(error);
        error = true;
      });
  }

  return;
}

export default postAddContact;

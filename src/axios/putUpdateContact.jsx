import React from 'react';
import axios from 'axios';

async function putUpdateContact(user, contactId, requestBody) {
  if (user) {
    const token = await user.getIdToken();
    const headers = await {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    };

    await axios
      .put(`/contact/${contactId}`, requestBody, { headers })
      .then((response) => {
        console.log('updated contact', response);
      })
      .catch((error) => {
        console.log(error);
        error = true;
      });
  }

  return;
}

export default putUpdateContact;

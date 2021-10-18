import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

async function getEvents(user) {
  let data;
  let error = false;

  if (user) {
    const token = await user.getIdToken();
    const headers = await {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    };

    await axios
      .get('events', { headers })
      .then((response) => {
        data = response;
      })
      .catch((error) => {
        console.log(error);
        error = true;
      });
  }

  return data;
}

export default getEvents;

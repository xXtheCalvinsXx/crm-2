import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { userContext } from '../../../appContext/userContext';
import getContacts from '../../../axios/getContacts';
import getEvents from '../../../axios/getEvents';

function Database(props) {
  const user = useContext(userContext);
}

export default Database;

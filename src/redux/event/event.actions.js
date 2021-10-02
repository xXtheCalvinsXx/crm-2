import {
    SET_EVENTS,
    ADD_EVENT,
    LOADING_DATA,
    DELETE_EVENT,
    UPDATE_EVENT,
  } from '/event.types';
import axios from 'axios';

// Get all events
export const getAllEvents = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/events')
      .then((res) => {
        dispatch({
          type: SET_EVENTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_EVENTS,
          payload: []
        });
      });
  };
  export const getEventsByContact = (contactId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/events/${contactId}`)
      .then((res) => {
        dispatch({
          type: SET_EVENTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_EVENTS,
          payload: []
        });
      });
  };
  // add an event
  export const addNewEvent = (newEvent) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/event', newEvent)
      .then((res) => {
        dispatch({
          type: ADD_EVENT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

  // update an event
  export const updateEvent = (updatedEvent) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .put(`/event/${eventId}`, updatedEvent)
      .then((res) => {
        dispatch({
          type: UPDATE_EVENT,
          payload: {
              updatedData: res.data

          }    
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };

  export const deleteEvent = (eventId) => (dispatch) => {
    axios
      .delete(`/event/${eventId}`)
      .then(() => {
        dispatch({ type: DELETE_EVENT, payload: eventId });
      })
      .catch((err) => console.log(err));
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
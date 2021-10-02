import {
    SET_EVENTS,
    ADD_EVENT,
    LOADING_DATA,
    DELETE_EVENT,
    UPDATE_EVENT,
  } from '/event.types';
  
  const initialState = {
    events: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_EVENTS:
        return {
          ...state,
          events: action.payload,
          loading: false
        };
      case DELETE_EVENT:
        index = state.events.findIndex(
          (event) => event.eventId === action.payload
        );
        state.events.splice(index, 1);
        return {
          ...state
        };
      case ADD_EVENT:
        return {
          ...state,
          events: [action.payload, ...state.events]
        };
      case UPDATE_EVENT:
        return {
          ...state,
        };
      default:
        return state;
    }
  }
  
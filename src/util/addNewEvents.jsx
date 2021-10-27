import postAddNewEvent from '../axios/postAddNewEvent';
import putUpdateEvent from '../axios/putUpdateEvent';

function addNewEvents(user, contactId, events, createBody) {
  const n = events.length;

  if (n < 1) {
    return;
  }

  for (var i = 0; i < events.length; i++) {
    if (events[i].Date.length > 0) {
      const event = createBody(contactId, events[i]);
      event.eventId
        ? putUpdateEvent(user, event.eventId, event)
        : postAddNewEvent(user, event);
    }
  }

  return;
}

export default addNewEvents;

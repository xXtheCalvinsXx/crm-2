function addContactIdToEvent(contactId, event) {
  return {
    RelevantContact: contactId,
    ...event,
  };
}

export default addContactIdToEvent;

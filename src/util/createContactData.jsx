function createContactData(contacts, events) {
  let data = [];
  const n = contacts.length;
  for (var i = 0; i < n; i++) {
    let contactData = {
      ...contacts[i],
      pastEvents: [],
      upcomingEvents: [],
      eventCount: 0,
    };
    // contactData.contact = contacts[i];
    [
      contactData.pastEvents,
      contactData.upcomingEvents,
      contactData.eventCount,
    ] = assignEvents(contacts[i].contactId, events);

    data.push(contactData);
  }
  return data;
}

function assignEvents(contactId, events) {
  let pastEvents = [];
  let upcomingEvents = [];
  const today = new Date();
  const n = events.length;
  var eventCount = 0;

  // console.log(events[0]);
  for (var i = 0; i < n; i++) {
    if (events[i].RelevantContact === contactId) {
      const eventDate = convertDate(events[i]);
      if (eventDate < today) {
        pastEvents.push(events[i]);
      } else {
        upcomingEvents.unshift(events[i]);
      }
      eventCount++;
    }
  }

  return [pastEvents, upcomingEvents, eventCount];
}

function convertDate(event) {
  var parts = event.Date.split('/');
  var myDate = new Date(parts[0], parts[1] - 1, parts[2]);
  return myDate;
}

export default createContactData;

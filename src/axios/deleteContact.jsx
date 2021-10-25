import axios from 'axios';

async function deleteContact(user, contactId) {
  var success = false;
  if (user) {
    const token = await user.getIdToken();
    const headers = await {
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    };

    console.log('contactId = ', contactId);
    await axios
      .delete(`/contact/${contactId}`, { headers })
      .then((response) => {
        console.log('deleted contact', response);
        success = true;
      })
      .catch((error) => {
        console.log(error);
        error = true;
      });
  }

  return success;
}

export default deleteContact;

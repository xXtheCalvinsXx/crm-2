import React, { useRef, useState } from 'react';

const ContactsContext = React.createContext({});

export const ContactsProvider = ({ children }) => {
  const [contactEventData, setContactEventData] = useState([]);

  const addNewContact = (contact) => {
    let arr = [...contactEventData.current].push(contact);
    console.log('adding new contact', contactEventData.current.length);
    setContactEventData(arr);
    console.log('new contact data inside = ', contactEventData.current);
  };

  //   const setContactEventData = (data) => {
  //     // console.log('inside', data);
  //     contactEventData.current = data;
  //     // console.log('post-set = ', contactEventData.current);
  //   };

  return (
    <ContactsContext.Provider
      value={{
        contactEventData: contactEventData,
        addNewContact,
        setContactEventData,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const ContactsConsumer = ContactsContext.Consumer;

export default ContactsContext;

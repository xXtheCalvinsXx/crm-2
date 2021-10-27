import { useContext } from 'react';
import ContactsContext from '../appContext/contactsContext';

export default () => {
  const context = useContext(ContactsContext);
  console.log('inside', context);

  return context;
};

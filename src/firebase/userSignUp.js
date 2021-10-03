import { db } from './firebaseUtils';
import { doc, getDoc, setDoc } from 'firebase/firestore';

async function userSignUp(userAuth, additionalData) {
  const docRef = doc(db, `users/${userAuth.uid}`);
  const snapshot = await getDoc(docRef);

  console.log('inside signup');
  if (!snapshot.exists()) {
    const newUserCredentials = {
      email: additionalData.email,
      firstName: additionalData.firstName,
      lastName: additionalData.lastName,
      createdAt: new Date(),
    };

    try {
      await setDoc(
        doc(db, `users/${newUserCredentials.email}`),
        newUserCredentials
      );

      console.log('user created!');
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
}

export default userSignUp;

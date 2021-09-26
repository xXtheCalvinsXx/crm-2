import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAK_aT474x6OfkvtYsPgwHTOIFC7ZM7G3c',
  authDomain: 'xxthecalvinsxx.firebaseapp.com',
  projectId: 'xxthecalvinsxx',
  storageBucket: 'xxthecalvinsxx.appspot.com',
  messagingSenderId: '499087288068',
  appId: '1:499087288068:web:bff61ab7b5f29a81619251',
  measurementId: 'G-GPSZ6V9868',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

export default app;

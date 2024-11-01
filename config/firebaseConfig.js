import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'ia-room-redesign.firebaseapp.com',
  projectId: 'ia-room-redesign',
  storageBucket: 'ia-room-redesign.appspot.com',
  messagingSenderId: '430706145108',
  appId: '1:430706145108:web:25f5b127604696a242fac1',
  measurementId: 'G-0QQBX2LN2T',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

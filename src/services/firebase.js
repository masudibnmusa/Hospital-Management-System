import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqnAmxing5sXxWhmcdVPlLtS9eWC9UAjU",
  authDomain: "hospital-management-8c6d5.firebaseapp.com",
  projectId: "hospital-management-8c6d5",
  storageBucket: "hospital-management-8c6d5.firebasestorage.app",
  messagingSenderId: "985715239213",
  appId: "1:985715239213:web:6cec3c4c4a315103804ba4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

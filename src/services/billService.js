import { 
  collection, addDoc, getDocs, getDoc, doc, 
  updateDoc, deleteDoc, query, orderBy 
} from 'firebase/firestore';
import { db } from './firebase.js';

const COLLECTION = 'bills';
const ref = () => collection(db, COLLECTION);

export const addBill = (data) => addDoc(ref(), { ...data, createdAt: new Date().toISOString() });
export const getBills = async () => {
  const q = query(ref(), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const updateBill = (id, data) => updateDoc(doc(db, COLLECTION, id), data);
export const deleteBill = (id) => deleteDoc(doc(db, COLLECTION, id));

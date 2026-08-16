import { 
  collection, addDoc, getDocs, getDoc, doc, 
  updateDoc, deleteDoc, query, orderBy 
} from 'firebase/firestore';
import { db } from './firebase.js';

const COLLECTION = 'medicines';
const ref = () => collection(db, COLLECTION);

export const addMedicine = (data) => addDoc(ref(), { ...data, createdAt: new Date().toISOString() });
export const getMedicines = async () => {
  const q = query(ref(), orderBy('name'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const updateMedicine = (id, data) => updateDoc(doc(db, COLLECTION, id), data);
export const deleteMedicine = (id) => deleteDoc(doc(db, COLLECTION, id));

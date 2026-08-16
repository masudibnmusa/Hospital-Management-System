import { 
  collection, addDoc, getDocs, getDoc, doc, 
  updateDoc, deleteDoc, query, orderBy 
} from 'firebase/firestore';
import { db } from './firebase.js';

const COLLECTION = 'staff';
const ref = () => collection(db, COLLECTION);

export const addStaff = (data) => addDoc(ref(), { ...data, createdAt: new Date().toISOString() });
export const getStaff = async () => {
  const q = query(ref(), orderBy('name'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const updateStaff = (id, data) => updateDoc(doc(db, COLLECTION, id), data);
export const deleteStaff = (id) => deleteDoc(doc(db, COLLECTION, id));
export const searchStaff = async (term, field = 'name') => {
  const snap = await getDocs(ref());
  const lower = term.toLowerCase();
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(s => s[field]?.toLowerCase().includes(lower));
};

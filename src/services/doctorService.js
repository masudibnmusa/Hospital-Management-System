import { 
  collection, addDoc, getDocs, getDoc, doc, 
  updateDoc, deleteDoc, query, orderBy 
} from 'firebase/firestore';
import { db } from './firebase.js';

const COLLECTION = 'doctors';
const ref = () => collection(db, COLLECTION);

export const addDoctor = (data) => addDoc(ref(), { ...data, createdAt: new Date().toISOString() });
export const getDoctors = async () => {
  const q = query(ref(), orderBy('name'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const getDoctor = (id) => getDoc(doc(db, COLLECTION, id));
export const updateDoctor = (id, data) => updateDoc(doc(db, COLLECTION, id), data);
export const deleteDoctor = (id) => deleteDoc(doc(db, COLLECTION, id));
export const searchDoctors = async (term) => {
  const snap = await getDocs(ref());
  const lower = term.toLowerCase();
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(d => d.name?.toLowerCase().includes(lower) || d.specialization?.toLowerCase().includes(lower));
};

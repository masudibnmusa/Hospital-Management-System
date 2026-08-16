import { 
  collection, addDoc, getDocs, getDoc, doc, 
  updateDoc, deleteDoc, query, orderBy, where 
} from 'firebase/firestore';
import { db } from './firebase.js';

const COLLECTION = 'patients';
const ref = () => collection(db, COLLECTION);

export const addPatient = (data) => addDoc(ref(), { ...data, createdAt: new Date().toISOString() });
export const getPatients = async () => {
  const q = query(ref(), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const getPatient = (id) => getDoc(doc(db, COLLECTION, id));
export const updatePatient = (id, data) => updateDoc(doc(db, COLLECTION, id), data);
export const deletePatient = (id) => deleteDoc(doc(db, COLLECTION, id));
export const searchPatients = async (term) => {
  const snap = await getDocs(ref());
  const lower = term.toLowerCase();
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(p => p.name?.toLowerCase().includes(lower) || p.contact?.includes(term));
};

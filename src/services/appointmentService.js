import { 
  collection, addDoc, getDocs, getDoc, doc, 
  updateDoc, deleteDoc, query, orderBy, where 
} from 'firebase/firestore';
import { db } from './firebase.js';

const COLLECTION = 'appointments';
const ref = () => collection(db, COLLECTION);

export const addAppointment = (data) => addDoc(ref(), { ...data, createdAt: new Date().toISOString() });
export const getAppointments = async () => {
  const q = query(ref(), orderBy('date'), orderBy('time'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const getAppointmentsByDoctor = async (doctorId) => {
  const q = query(ref(), where('doctorId', '==', doctorId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const getAppointmentsByPatient = async (patientId) => {
  const q = query(ref(), where('patientId', '==', patientId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};
export const updateAppointment = (id, data) => updateDoc(doc(db, COLLECTION, id), data);
export const deleteAppointment = (id) => deleteDoc(doc(db, COLLECTION, id));

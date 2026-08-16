import { useState, useEffect } from 'react';
import * as patientService from '../services/patientService.js';

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    setLoading(true);
    const data = await patientService.getPatients();
    setPatients(data);
    setLoading(false);
  };

  useEffect(() => { fetchPatients(); }, []);

  const addPatient = async (data) => {
    await patientService.addPatient(data);
    await fetchPatients();
  };

  const updatePatient = async (id, data) => {
    await patientService.updatePatient(id, data);
    await fetchPatients();
  };

  const deletePatient = async (id) => {
    await patientService.deletePatient(id);
    await fetchPatients();
  };

  const searchPatients = async (term) => {
    if (!term) return fetchPatients();
    setLoading(true);
    const data = await patientService.searchPatients(term);
    setPatients(data);
    setLoading(false);
  };

  return { patients, loading, fetchPatients, addPatient, updatePatient, deletePatient, searchPatients };
};

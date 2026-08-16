import { useState, useEffect } from 'react';
import * as doctorService from '../services/doctorService.js';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    setLoading(true);
    const data = await doctorService.getDoctors();
    setDoctors(data);
    setLoading(false);
  };

  useEffect(() => { fetchDoctors(); }, []);

  const addDoctor = async (data) => {
    await doctorService.addDoctor(data);
    await fetchDoctors();
  };

  const updateDoctor = async (id, data) => {
    await doctorService.updateDoctor(id, data);
    await fetchDoctors();
  };

  const deleteDoctor = async (id) => {
    await doctorService.deleteDoctor(id);
    await fetchDoctors();
  };

  const searchDoctors = async (term) => {
    if (!term) return fetchDoctors();
    setLoading(true);
    const data = await doctorService.searchDoctors(term);
    setDoctors(data);
    setLoading(false);
  };

  return { doctors, loading, fetchDoctors, addDoctor, updateDoctor, deleteDoctor, searchDoctors };
};

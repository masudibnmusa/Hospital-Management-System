import { useState, useEffect } from 'react';
import * as medicineService from '../services/medicineService.js';

export const useMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicines = async () => {
    setLoading(true);
    const data = await medicineService.getMedicines();
    setMedicines(data);
    setLoading(false);
  };

  useEffect(() => { fetchMedicines(); }, []);

  const addMedicine = async (data) => {
    await medicineService.addMedicine(data);
    await fetchMedicines();
  };

  const updateMedicine = async (id, data) => {
    await medicineService.updateMedicine(id, data);
    await fetchMedicines();
  };

  const deleteMedicine = async (id) => {
    await medicineService.deleteMedicine(id);
    await fetchMedicines();
  };

  return { medicines, loading, fetchMedicines, addMedicine, updateMedicine, deleteMedicine };
};

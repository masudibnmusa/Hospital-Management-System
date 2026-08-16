import { useState, useEffect } from 'react';
import * as staffService from '../services/staffService.js';

export const useStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    setLoading(true);
    const data = await staffService.getStaff();
    setStaff(data);
    setLoading(false);
  };

  useEffect(() => { fetchStaff(); }, []);

  const addStaff = async (data) => {
    await staffService.addStaff(data);
    await fetchStaff();
  };

  const updateStaff = async (id, data) => {
    await staffService.updateStaff(id, data);
    await fetchStaff();
  };

  const deleteStaff = async (id) => {
    await staffService.deleteStaff(id);
    await fetchStaff();
  };

  return { staff, loading, fetchStaff, addStaff, updateStaff, deleteStaff };
};

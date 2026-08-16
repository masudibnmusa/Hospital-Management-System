import { useState, useEffect } from 'react';
import * as billService from '../services/billService.js';

export const useBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    setLoading(true);
    const data = await billService.getBills();
    setBills(data);
    setLoading(false);
  };

  useEffect(() => { fetchBills(); }, []);

  const addBill = async (data) => {
    await billService.addBill(data);
    await fetchBills();
  };

  const updateBill = async (id, data) => {
    await billService.updateBill(id, data);
    await fetchBills();
  };

  const deleteBill = async (id) => {
    await billService.deleteBill(id);
    await fetchBills();
  };

  return { bills, loading, fetchBills, addBill, updateBill, deleteBill };
};

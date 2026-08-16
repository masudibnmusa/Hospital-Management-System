import { useState, useEffect } from 'react';
import * as appointmentService from '../services/appointmentService.js';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    const data = await appointmentService.getAppointments();
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => { fetchAppointments(); }, []);

  const addAppointment = async (data) => {
    await appointmentService.addAppointment(data);
    await fetchAppointments();
  };

  const updateAppointment = async (id, data) => {
    await appointmentService.updateAppointment(id, data);
    await fetchAppointments();
  };

  const deleteAppointment = async (id) => {
    await appointmentService.deleteAppointment(id);
    await fetchAppointments();
  };

  return { appointments, loading, fetchAppointments, addAppointment, updateAppointment, deleteAppointment };
};

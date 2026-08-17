import { useState, useEffect } from 'react';
import * as appointmentService from '../services/appointmentService.js';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    
    try {
      const data = await appointmentService.getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setError(err.message || "An error occurred while fetching appointments.");
    } finally {
      // THIS IS THE FIX: This runs NO MATTER WHAT (success or failure)
      setLoading(false); 
    }
  };

  useEffect(() => { 
    fetchAppointments(); 
  }, []);

  const addAppointment = async (data) => {
    try {
      setLoading(true);
      await appointmentService.addAppointment(data);
      await fetchAppointments();
    } catch (err) {
      console.error("Failed to add appointment:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id, data) => {
    try {
      setLoading(true);
      await appointmentService.updateAppointment(id, data);
      await fetchAppointments();
    } catch (err) {
      console.error("Failed to update appointment:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      setLoading(true);
      await appointmentService.deleteAppointment(id);
      await fetchAppointments();
    } catch (err) {
      console.error("Failed to delete appointment:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { 
    appointments, 
    loading, 
    error, // Return error so your UI can show it if needed
    fetchAppointments, 
    addAppointment, 
    updateAppointment, 
    deleteAppointment 
  };
};
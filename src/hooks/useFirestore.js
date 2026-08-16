import { useState, useCallback } from 'react';
import { useNotification } from '../contexts/NotificationContext.jsx';

export const useFirestore = (service) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const notify = useNotification();

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const result = await service.getAll?.() || await service.getPatients?.() || await service.getDoctors?.() || await service.getStaff?.() || await service.getMedicines?.() || await service.getAppointments?.() || await service.getBills?.();
      setData(result || []);
      return result || [];
    } catch (error) {
      notify.error('Failed to fetch data: ' + error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [service]);

  const add = async (item) => {
    try {
      await service.add(item);
      notify.success('Added successfully');
      await fetchAll();
      return true;
    } catch (error) {
      notify.error('Failed to add: ' + error.message);
      return false;
    }
  };

  const update = async (id, item) => {
    try {
      await service.update(id, item);
      notify.success('Updated successfully');
      await fetchAll();
      return true;
    } catch (error) {
      notify.error('Failed to update: ' + error.message);
      return false;
    }
  };

  const remove = async (id) => {
    try {
      await service.delete(id);
      notify.success('Deleted successfully');
      await fetchAll();
      return true;
    } catch (error) {
      notify.error('Failed to delete: ' + error.message);
      return false;
    }
  };

  return { data, loading, fetchAll, add, update, remove, setData };
};

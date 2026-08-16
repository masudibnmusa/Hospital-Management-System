import { useState } from 'react';
import { loginUser, logoutUser } from '../services/authService.js';
import { useNotification } from '../contexts/NotificationContext.jsx';

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const notify = useNotification();

  const login = async (email, password) => {
    setLoading(true);
    try {
      await loginUser(email, password);
      notify.success('Welcome back, Admin!');
      return true;
    } catch (error) {
      notify.error(error.message || 'Invalid credentials');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      notify.success('Logged out successfully');
    } catch (error) {
      notify.error(error.message);
    }
  };

  return { login, logout, loading };
};

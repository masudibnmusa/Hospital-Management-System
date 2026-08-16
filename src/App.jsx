import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import Layout from './components/common/Layout.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients.jsx';
import Doctors from './pages/Doctors.jsx';
import Appointments from './pages/Appointments.jsx';
import Billing from './pages/Billing.jsx';
import Staff from './pages/Staff.jsx';
import Medicines from './pages/Medicines.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="patients" element={<Patients />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="billing" element={<Billing />} />
                <Route path="staff" element={<Staff />} />
                <Route path="medicines" element={<Medicines />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
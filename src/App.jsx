import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { Toaster } from 'react-hot-toast';
import Layout from './components/common/Layout.jsx';

// Pages
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx'; // Acts as Admin Dashboard (and Patient if you kept the conditional logic)
import DoctorDashboard from './pages/DoctorDashboard.jsx'; // <-- Import the new Doctor Dashboard

// Admin/Staff Pages
import Patients from './pages/Patients.jsx';
import Doctors from './pages/Doctors.jsx';
import Appointments from './pages/Appointments.jsx';
import Billing from './pages/Billing.jsx';
import Staff from './pages/Staff.jsx';
import Medicines from './pages/Medicines.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';

// 1. Updated PrivateRoute to handle Role-Based Access Control (RBAC)
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // If not logged in, go to login
  if (!user) return <Navigate to="/login" replace />;
  
  // If logged in but role is not allowed, redirect to their correct dashboard
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === 'admin') return <Navigate to="/" replace />;
    if (role === 'doctor') return <Navigate to="/doctor" replace />;
    if (role === 'patient') return <Navigate to="/patient" replace />;
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <Toaster position="top-right" />
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login />} />

              {/* ================= ADMIN ROUTES ================= */}
              {/* Only 'admin' can access these. Others are redirected to /doctor or /patient */}
              <Route path="/" element={<PrivateRoute allowedRoles={['admin']}><Layout /></PrivateRoute>}>
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

              {/* ================= DOCTOR ROUTES ================= */}
              {/* Only 'doctor' can access these */}
              <Route path="/doctor" element={<PrivateRoute allowedRoles={['doctor']}><Layout /></PrivateRoute>}>
                <Route index element={<DoctorDashboard />} />
                {/* Doctors can also view the appointments page, which should ideally filter by doctor */}
                <Route path="appointments" element={<Appointments />} /> 
              </Route>

              {/* ================= PATIENT ROUTES ================= */}
              {/* Only 'patient' can access these */}
              <Route path="/patient" element={<PrivateRoute allowedRoles={['patient']}><Layout /></PrivateRoute>}>
                {/* You can create a PatientDashboard.jsx later, or use the conditional Dashboard we made earlier */}
                <Route index element={<Dashboard />} /> 
                <Route path="appointments" element={<Appointments />} />
                <Route path="billing" element={<Billing />} />
              </Route>

              {/* Catch-all: Redirect unknown routes to the correct dashboard based on role */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
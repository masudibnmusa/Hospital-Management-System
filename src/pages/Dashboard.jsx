import { useEffect } from 'react';
import StatCard from '../components/common/StatCard.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import { useAuth } from '../contexts/AuthContext'; // Import your Auth hook
import { usePatients } from '../hooks/usePatients.js';
import { useDoctors } from '../hooks/useDoctors.js';
import { useAppointments } from '../hooks/useAppointments.js';
import { useBills } from '../hooks/useBills.js';
import { useStaff } from '../hooks/useStaff.js';
import { useMedicines } from '../hooks/useMedicines.js';
import { useReports } from '../hooks/useReports.js';
import { Users, Stethoscope, Calendar, Receipt, UserCog, Pill, TrendingUp, AlertCircle, Clock } from 'lucide-react';
import { formatCurrency } from '../utils/formatters.js';

const Dashboard = () => {
  // 1. Get user role and ID from Auth Context
  const { user, role, isAdmin, isDoctor, isPatient } = useAuth();

  const { patients, loading: pLoading } = usePatients();
  const { doctors, loading: dLoading } = useDoctors();
  const { appointments, loading: aLoading } = useAppointments();
  const { bills, loading: bLoading } = useBills();
  const { staff, loading: sLoading } = useStaff();
  const { medicines, loading: mLoading } = useMedicines();

  // 2. Filter data based on user role
  let displayAppointments = appointments;
  let displayBills = bills;

  if (isDoctor && user) {
    // Doctors only see their own appointments
    // Note: Change 'doctorId' to whatever field name you use in your appointments collection (e.g., doctorUid)
    displayAppointments = appointments.filter(a => a.doctorId === user.uid); 
  } else if (isPatient && user) {
    // Patients only see their own appointments and bills
    // Note: Change 'patientId' to whatever field name you use (e.g., patientUid)
    displayAppointments = appointments.filter(a => a.patientId === user.uid);
    displayBills = bills.filter(b => b.patientId === user.uid);
  }

  // Calculate reports (only really needed for Admin, but safe to run)
  const { dailyRevenue, monthlyRevenue, unpaidTotal } = useReports(bills, appointments, doctors);

  const isLoading = pLoading || dLoading || aLoading || bLoading || sLoading || mLoading;

  if (isLoading) return <LoadingSpinner fullScreen />;

  const todayAppointments = displayAppointments.filter(a => {
    const today = new Date().toLocaleDateString('en-GB');
    return a.date === today;
  }).length;

  const lowStockCount = medicines.filter(m => m.quantity < 50).length;

  // 3. Dynamic Titles based on Role
  const dashboardTitle = isAdmin ? 'Admin Dashboard' : isDoctor ? `Dr. ${user?.displayName || 'Dashboard'}` : 'Patient Portal';
  const dashboardSubtitle = isAdmin ? 'Overview of hospital operations' : isDoctor ? 'Manage your schedule and patients' : 'View your appointments and medical bills';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{dashboardTitle}</h1>
        <p className="text-gray-500 dark:text-gray-400">{dashboardSubtitle}</p>
      </div>

      {/* ================= ADMIN STATS ================= */}
      {isAdmin && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Patients" value={patients.length} icon={Users} color="blue" subtitle="Registered patients" />
            <StatCard title="Doctors" value={doctors.length} icon={Stethoscope} color="green" subtitle="Active doctors" />
            <StatCard title="Today's Appointments" value={todayAppointments} icon={Calendar} color="purple" subtitle="Scheduled today" />
            <StatCard title="Total Staff" value={staff.length} icon={UserCog} color="yellow" subtitle="All departments" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Daily Revenue" value={formatCurrency(dailyRevenue)} icon={Receipt} color="green" subtitle="Today's earnings" />
            <StatCard title="Monthly Revenue" value={formatCurrency(monthlyRevenue)} icon={TrendingUp} color="blue" subtitle="This month" />
            <StatCard title="Unpaid Bills" value={formatCurrency(unpaidTotal)} icon={AlertCircle} color="red" subtitle="Outstanding payments" />
            <StatCard title="Low Stock Items" value={lowStockCount} icon={Pill} color="yellow" subtitle="Medicines < 50 units" />
          </div>
        </>
      )}

      {/* ================= DOCTOR STATS ================= */}
      {isDoctor && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="Today's Appointments" value={todayAppointments} icon={Calendar} color="purple" subtitle="Your schedule today" />
          <StatCard title="Total Appointments" value={displayAppointments.length} icon={Clock} color="blue" subtitle="All time" />
          <StatCard title="Active Patients" value={patients.length} icon={Users} color="green" subtitle="Hospital wide" /> 
        </div>
      )}

      {/* ================= PATIENT STATS ================= */}
      {isPatient && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="Upcoming Appointments" value={todayAppointments} icon={Calendar} color="purple" subtitle="Scheduled today" />
          <StatCard title="Total Bills" value={displayBills.length} icon={Receipt} color="blue" subtitle="All time" />
          <StatCard title="Unpaid Bills" value={formatCurrency(displayBills.filter(b => b.status !== 'Paid').reduce((sum, b) => sum + (b.totalAmount || 0), 0))} icon={AlertCircle} color="red" subtitle="Action needed" />
        </div>
      )}

      {/* ================= RECENT APPOINTMENTS (All Roles) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {isAdmin ? 'Recent Appointments' : 'Your Recent Appointments'}
          </h3>
          {displayAppointments.slice(0, 5).length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No appointments yet.</p>
          ) : (
            <div className="space-y-3">
              {displayAppointments.slice(0, 5).map(appt => (
                <div key={appt.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{appt.purpose}</p>
                    <p className="text-xs text-gray-500">{appt.date} at {appt.time}</p>
                    {/* Show Doctor Name for Admin and Patient */}
                    {(isAdmin || isPatient) && appt.doctorName && (
                      <p className="text-xs text-gray-500 mt-1">Dr. {appt.doctorName}</p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appt.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {appt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= RECENT BILLS (Admin & Patient Only) ================= */}
        {(isAdmin || isPatient) && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {isAdmin ? 'Recent Bills' : 'Your Recent Bills'}
            </h3>
            {displayBills.slice(0, 5).length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No bills generated yet.</p>
            ) : (
              <div className="space-y-3">
                {displayBills.slice(0, 5).map(bill => (
                  <div key={bill.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Bill #{bill.id?.slice(-6).toUpperCase()}</p>
                      <p className="text-xs text-gray-500">{bill.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(bill.totalAmount)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        bill.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {bill.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
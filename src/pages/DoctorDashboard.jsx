import { useState, useEffect } from 'react';
import StatCard from '../components/common/StatCard.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import { useAuth } from '../contexts/AuthContext';
import { useAppointments } from '../hooks/useAppointments.js';
import { usePatients } from '../hooks/usePatients.js';
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';

const DoctorDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { appointments, loading: apptLoading } = useAppointments();
  const { patients, loading: patientsLoading } = usePatients();

  const isLoading = authLoading || apptLoading || patientsLoading;

  if (isLoading) return <LoadingSpinner fullScreen />;

  // 1. Filter appointments to ONLY show those assigned to this specific doctor
  // IMPORTANT: Ensure 'doctorId' matches the exact field name in your Firestore appointments collection
  const myAppointments = appointments.filter(appt => appt.doctorId === user?.uid);

  // 2. Sort appointments by date and time (upcoming first)
  const sortedAppointments = [...myAppointments].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA - dateB;
  });

  // 3. Calculate Stats
  const today = new Date().toLocaleDateString('en-GB');
  const todaysAppointments = sortedAppointments.filter(a => a.date === today);
  
  const completedAppointments = myAppointments.filter(a => a.status === 'Completed').length;
  const scheduledAppointments = myAppointments.filter(a => a.status === 'Scheduled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome, Dr. {user?.displayName || 'Doctor'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Here is your schedule and patient overview.</p>
        </div>
        {/* Optional: Add a button here later, e.g., "Add Availability" */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Today's Schedule" 
          value={todaysAppointments.length} 
          icon={Calendar} 
          color="purple" 
          subtitle="Appointments today" 
        />
        <StatCard 
          title="Upcoming" 
          value={scheduledAppointments} 
          icon={Clock} 
          color="blue" 
          subtitle="Pending appointments" 
        />
        <StatCard 
          title="Completed" 
          value={completedAppointments} 
          icon={CheckCircle} 
          color="green" 
          subtitle="Total seen patients" 
        />
      </div>

      {/* Main Content: Today's Schedule & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Appointments (Takes up 2 columns on large screens) */}
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Today's Appointments
          </h3>
          
          {todaysAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No appointments scheduled for today.</p>
              <p className="text-sm">Enjoy your day off!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todaysAppointments.map(appt => (
                <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-purple-500">
                  <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {appt.patientName || 'Unknown Patient'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{appt.purpose}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {appt.time}
                      </span>
                      <span>•</span>
                      <span>{appt.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appt.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 
                      appt.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appt.status}
                    </span>
                    {/* Future: Add an "Action" button here like "View Details" or "Add Prescription" */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming / Recent History (Takes up 1 column) */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Upcoming Schedule
          </h3>
          
          {sortedAppointments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">No upcoming appointments.</p>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {sortedAppointments.slice(0, 6).map(appt => (
                <div key={appt.id} className="p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {appt.patientName || 'Patient'}
                    </p>
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                      {appt.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {appt.time} - {appt.purpose}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;
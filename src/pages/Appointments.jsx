import { useState } from 'react';
import { useAppointments } from '../hooks/useAppointments.js';
import { usePatients } from '../hooks/usePatients.js';
import { useDoctors } from '../hooks/useDoctors.js';
import AppointmentForm from '../components/appointments/AppointmentForm.jsx';
import AppointmentList from '../components/appointments/AppointmentList.jsx';
import AppointmentCalendar from '../components/appointments/AppointmentCalendar.jsx';
import Modal from '../components/common/Modal.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { Plus, Calendar } from 'lucide-react';

const Appointments = () => {
  const { appointments, loading, addAppointment, updateAppointment, deleteAppointment } = useAppointments();
  const { patients } = usePatients();
  const { doctors } = useDoctors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppt, setEditingAppt] = useState(null);
  const [deletingAppt, setDeletingAppt] = useState(null);
  const [view, setView] = useState('list');

  const handleAdd = async (data) => { await addAppointment(data); setIsModalOpen(false); };
  const handleEdit = async (data) => { await updateAppointment(editingAppt.id, data); setEditingAppt(null); setIsModalOpen(false); };
  const handleDelete = async () => { await deleteAppointment(deletingAppt.id); setDeletingAppt(null); };

  const openAdd = () => { setEditingAppt(null); setIsModalOpen(true); };
  const openEdit = (appt) => { setEditingAppt(appt); setIsModalOpen(true); };

  if (loading && appointments.length === 0) return <LoadingSpinner fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar size={28} className="text-hospital-600" />
            Appointments
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Schedule and manage appointments</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button onClick={() => setView('list')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>List</button>
            <button onClick={() => setView('calendar')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'calendar' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>Calendar</button>
          </div>
          <button onClick={openAdd} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Schedule
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <AppointmentCalendar appointments={appointments} />
      ) : appointments.length === 0 && !loading ? (
        <EmptyState title="No appointments" description="Schedule your first appointment." />
      ) : (
        <AppointmentList appointments={appointments} patients={patients} doctors={doctors} onEdit={openEdit} onDelete={setDeletingAppt} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingAppt ? 'Edit Appointment' : 'Schedule Appointment'}>
        <AppointmentForm initialData={editingAppt} patients={patients} doctors={doctors} onSubmit={editingAppt ? handleEdit : handleAdd} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingAppt}
        onClose={() => setDeletingAppt(null)}
        onConfirm={handleDelete}
        title="Cancel Appointment"
        message="Are you sure you want to cancel this appointment?"
        danger
      />
    </div>
  );
};

export default Appointments;

import { useState } from 'react';
import { useDoctors } from '../hooks/useDoctors.js';
import { useAppointments } from '../hooks/useAppointments.js';
import DoctorForm from '../components/doctors/DoctorForm.jsx';
import DoctorList from '../components/doctors/DoctorList.jsx';
import DoctorStats from '../components/doctors/DoctorStats.jsx';
import DoctorDetailModal from '../components/doctors/DoctorDetailModal.jsx';
import Modal from '../components/common/Modal.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { Plus, Stethoscope } from 'lucide-react';

const Doctors = () => {
  const { doctors, loading, addDoctor, updateDoctor, deleteDoctor } = useDoctors();
  const { appointments } = useAppointments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [viewingDoctor, setViewingDoctor] = useState(null);
  const [deletingDoctor, setDeletingDoctor] = useState(null);

  const handleAdd = async (data) => { await addDoctor(data); setIsModalOpen(false); };
  const handleEdit = async (data) => { await updateDoctor(editingDoctor.id, data); setEditingDoctor(null); setIsModalOpen(false); };
  const handleDelete = async () => { await deleteDoctor(deletingDoctor.id); setDeletingDoctor(null); };

  const openAdd = () => { setEditingDoctor(null); setIsModalOpen(true); };
  const openEdit = (doc) => { setEditingDoctor(doc); setIsModalOpen(true); };

  if (loading && doctors.length === 0) return <LoadingSpinner fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Stethoscope size={28} className="text-hospital-600" />
            Doctors
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Manage doctor profiles and schedules</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Doctor
        </button>
      </div>

      {doctors.length > 0 && <DoctorStats doctors={doctors} appointments={appointments} />}

      {doctors.length === 0 && !loading ? (
        <EmptyState title="No doctors yet" description="Add doctors to enable appointments." />
      ) : (
        <DoctorList doctors={doctors} onEdit={openEdit} onDelete={setDeletingDoctor} onView={setViewingDoctor} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}>
        <DoctorForm initialData={editingDoctor} onSubmit={editingDoctor ? handleEdit : handleAdd} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <DoctorDetailModal doctor={viewingDoctor} appointments={appointments} isOpen={!!viewingDoctor} onClose={() => setViewingDoctor(null)} />

      <ConfirmDialog
        isOpen={!!deletingDoctor}
        onClose={() => setDeletingDoctor(null)}
        onConfirm={handleDelete}
        title="Remove Doctor"
        message={`Remove Dr. ${deletingDoctor?.name}? Existing appointments will remain.`}
        danger
      />
    </div>
  );
};

export default Doctors;

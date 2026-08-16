import { useState } from 'react';
import { usePatients } from '../hooks/usePatients.js';
import PatientForm from '../components/patients/PatientForm.jsx';
import PatientList from '../components/patients/PatientList.jsx';
import PatientFilters from '../components/patients/PatientFilters.jsx';
import Modal from '../components/common/Modal.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { Plus, Users } from 'lucide-react';

const Patients = () => {
  const { patients, loading, addPatient, updatePatient, deletePatient, searchPatients } = usePatients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingPatient, setDeletingPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = async (data) => {
    await addPatient(data);
    setIsModalOpen(false);
  };

  const handleEdit = async (data) => {
    await updatePatient(editingPatient.id, data);
    setEditingPatient(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    await deletePatient(deletingPatient.id);
    setDeletingPatient(null);
  };

  const openAdd = () => { setEditingPatient(null); setIsModalOpen(true); };
  const openEdit = (patient) => { setEditingPatient(patient); setIsModalOpen(true); };

  if (loading && patients.length === 0) return <LoadingSpinner fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users size={28} className="text-hospital-600" />
            Patients
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Manage patient records</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Patient
        </button>
      </div>

      <PatientFilters searchTerm={searchTerm} onSearchChange={(term) => { setSearchTerm(term); searchPatients(term); }} />

      {patients.length === 0 && !loading ? (
        <EmptyState title="No patients yet" description="Add your first patient to get started." />
      ) : (
        <PatientList patients={patients} onEdit={openEdit} onDelete={setDeletingPatient} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPatient ? 'Edit Patient' : 'Add New Patient'}>
        <PatientForm initialData={editingPatient} onSubmit={editingPatient ? handleEdit : handleAdd} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingPatient}
        onClose={() => setDeletingPatient(null)}
        onConfirm={handleDelete}
        title="Delete Patient"
        message={`Are you sure you want to delete ${deletingPatient?.name}? This action cannot be undone.`}
        danger
      />
    </div>
  );
};

export default Patients;

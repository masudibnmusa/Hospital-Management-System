import { useState } from 'react';
import { useMedicines } from '../hooks/useMedicines.js';
import MedicineForm from '../components/medicines/MedicineForm.jsx';
import MedicineStock from '../components/medicines/MedicineStock.jsx';
import StockUpdateModal from '../components/medicines/StockUpdateModal.jsx';
import ExpiryAlert from '../components/medicines/ExpiryAlert.jsx';
import Modal from '../components/common/Modal.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { Plus, Pill } from 'lucide-react';

const Medicines = () => {
  const { medicines, loading, addMedicine, updateMedicine, deleteMedicine } = useMedicines();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [stockMedicine, setStockMedicine] = useState(null);
  const [deletingMedicine, setDeletingMedicine] = useState(null);

  const handleAdd = async (data) => { await addMedicine(data); setIsModalOpen(false); };
  const handleEdit = async (data) => { await updateMedicine(editingMedicine.id, data); setEditingMedicine(null); setIsModalOpen(false); };
  const handleDelete = async () => { await deleteMedicine(deletingMedicine.id); setDeletingMedicine(null); };
  const handleStockUpdate = async (id, data) => { await updateMedicine(id, data); setStockMedicine(null); setIsStockModalOpen(false); };

  const openAdd = () => { setEditingMedicine(null); setIsModalOpen(true); };
  const openEdit = (med) => { setEditingMedicine(med); setIsModalOpen(true); };
  const openStock = (med) => { setStockMedicine(med); setIsStockModalOpen(true); };

  if (loading && medicines.length === 0) return <LoadingSpinner fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Pill size={28} className="text-hospital-600" />
            Medicine & Equipment
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Manage inventory and stock levels</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Medicine
        </button>
      </div>

      <ExpiryAlert medicines={medicines} />

      {medicines.length === 0 && !loading ? (
        <EmptyState title="No medicines in stock" description="Add medicines to the inventory." />
      ) : (
        <MedicineStock medicines={medicines} onEdit={openEdit} onDelete={setDeletingMedicine} onUpdateStock={openStock} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}>
        <MedicineForm initialData={editingMedicine} onSubmit={editingMedicine ? handleEdit : handleAdd} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <StockUpdateModal medicine={stockMedicine} isOpen={isStockModalOpen} onClose={() => setIsStockModalOpen(false)} onUpdate={handleStockUpdate} />

      <ConfirmDialog
        isOpen={!!deletingMedicine}
        onClose={() => setDeletingMedicine(null)}
        onConfirm={handleDelete}
        title="Delete Medicine"
        message={`Remove ${deletingMedicine?.name} from inventory?`}
        danger
      />
    </div>
  );
};

export default Medicines;

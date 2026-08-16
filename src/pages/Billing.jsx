import { useState } from 'react';
import { useBills } from '../hooks/useBills.js';
import { usePatients } from '../hooks/usePatients.js';
import BillForm from '../components/billing/BillForm.jsx';
import BillList from '../components/billing/BillList.jsx';
import BillReceipt from '../components/billing/BillReceipt.jsx';
import Modal from '../components/common/Modal.jsx';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { Plus, Receipt } from 'lucide-react';

const Billing = () => {
  const { bills, loading, addBill, updateBill, deleteBill } = useBills();
  const { patients } = usePatients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [viewingBill, setViewingBill] = useState(null);
  const [deletingBill, setDeletingBill] = useState(null);

  const handleAdd = async (data) => { await addBill(data); setIsModalOpen(false); };
  const handleEdit = async (data) => { await updateBill(editingBill.id, data); setEditingBill(null); setIsModalOpen(false); };
  const handleDelete = async () => { await deleteBill(deletingBill.id); setDeletingBill(null); };

  const openAdd = () => { setEditingBill(null); setIsModalOpen(true); };
  const openEdit = (bill) => { setEditingBill(bill); setIsModalOpen(true); };
  const openReceipt = (bill) => { setViewingBill(bill); setIsReceiptOpen(true); };

  const getPatient = (id) => patients.find(p => p.id === id);

  if (loading && bills.length === 0) return <LoadingSpinner fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Receipt size={28} className="text-hospital-600" />
            Billing
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Generate and manage patient bills</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Generate Bill
        </button>
      </div>

      {bills.length === 0 && !loading ? (
        <EmptyState title="No bills generated" description="Create your first patient bill." />
      ) : (
        <BillList bills={bills} patients={patients} onEdit={openEdit} onDelete={setDeletingBill} onPrint={openReceipt} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingBill ? 'Edit Bill' : 'Generate Bill'}>
        <BillForm initialData={editingBill} patients={patients} onSubmit={editingBill ? handleEdit : handleAdd} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <Modal isOpen={isReceiptOpen} onClose={() => setIsReceiptOpen(false)} title="Bill Receipt" size="lg">
        <BillReceipt bill={viewingBill} patient={getPatient(viewingBill?.patientId)} onClose={() => setIsReceiptOpen(false)} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingBill}
        onClose={() => setDeletingBill(null)}
        onConfirm={handleDelete}
        title="Delete Bill"
        message="Are you sure you want to delete this bill?"
        danger
      />
    </div>
  );
};

export default Billing;

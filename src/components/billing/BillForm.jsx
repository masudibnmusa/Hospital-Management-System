import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { validateRequired, validateDate } from '../../utils/validators';
import { formatCurrency } from '../../utils/formatters';

const BillForm = ({ isOpen, onClose, onSubmit, patients }) => {
  const [form, setForm] = useState({
    patientId: '',
    consultationFee: '',
    medicineCharges: '',
    roomCharges: '',
    labCharges: '',
    date: '',
    status: 'Generated',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm({ patientId: '', consultationFee: '', medicineCharges: '', roomCharges: '', labCharges: '', date: '', status: 'Generated' });
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const errs = {};
    if (!validateRequired(form.patientId)) errs.patientId = 'Select a patient';
    if (!validateDate(form.date)) errs.date = 'Invalid date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const total = (parseFloat(form.consultationFee || 0) + parseFloat(form.medicineCharges || 0) + parseFloat(form.roomCharges || 0) + parseFloat(form.labCharges || 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    onClose();
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-hospital-500 focus:border-transparent ${
      errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    }`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate Bill" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Patient</label>
          <select value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} className={inputClass('patientId')}>
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.patientId}>{p.name} (ID: {p.patientId})</option>
            ))}
          </select>
          {errors.patientId && <p className="text-xs text-red-500 mt-1">{errors.patientId}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Consultation Fee</label>
            <input type="number" step="0.01" value={form.consultationFee} onChange={(e) => setForm({ ...form, consultationFee: e.target.value })} className={inputClass('consultationFee')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Medicine Charges</label>
            <input type="number" step="0.01" value={form.medicineCharges} onChange={(e) => setForm({ ...form, medicineCharges: e.target.value })} className={inputClass('medicineCharges')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room Charges</label>
            <input type="number" step="0.01" value={form.roomCharges} onChange={(e) => setForm({ ...form, roomCharges: e.target.value })} className={inputClass('roomCharges')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lab Charges</label>
            <input type="number" step="0.01" value={form.labCharges} onChange={(e) => setForm({ ...form, labCharges: e.target.value })} className={inputClass('labCharges')} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date (DD/MM/YYYY)</label>
          <input type="text" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass('date')} placeholder="01/01/2025" />
          {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Amount: <span className="text-lg font-bold text-hospital-600">{formatCurrency(total)}</span></p>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg transition-colors">Generate Bill</button>
        </div>
      </form>
    </Modal>
  );
};

export default BillForm;
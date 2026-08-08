import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { validateRequired, validateDate } from '../../utils/validators';
import { MEDICINE_CATEGORIES } from '../../utils/constants';

const MedicineForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [form, setForm] = useState({
    name: '', category: '', manufacturer: '', price: '', quantity: '', expiryDate: '', description: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '', category: initialData.category || '', manufacturer: initialData.manufacturer || '',
        price: initialData.price || '', quantity: initialData.quantity || '', expiryDate: initialData.expiryDate || '',
        description: initialData.description || '',
      });
    } else {
      setForm({ name: '', category: '', manufacturer: '', price: '', quantity: '', expiryDate: '', description: '' });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!validateRequired(form.name)) errs.name = 'Name is required';
    if (!validateRequired(form.category)) errs.category = 'Category is required';
    if (!validateDate(form.expiryDate)) errs.expiryDate = 'Invalid date (DD/MM/YYYY)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, price: parseFloat(form.price) || 0, quantity: parseInt(form.quantity) || 0 });
    onClose();
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-hospital-500 focus:border-transparent ${
      errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    }`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Medicine' : 'Add New Medicine'} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Medicine Name</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass('name')} />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass('category')}>
              <option value="">Select</option>
              {MEDICINE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Manufacturer</label>
            <input type="text" value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} className={inputClass('manufacturer')} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
            <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass('price')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
            <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className={inputClass('quantity')} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date (DD/MM/YYYY)</label>
          <input type="text" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} className={inputClass('expiryDate')} placeholder="01/01/2026" />
          {errors.expiryDate && <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className={inputClass('description')} />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg transition-colors">{initialData ? 'Update' : 'Save'} Medicine</button>
        </div>
      </form>
    </Modal>
  );
};

export default MedicineForm;
import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { validateRequired, validateEmail } from '../../utils/validators';
import { STAFF_ROLES, SHIFT_OPTIONS } from '../../utils/constants';

const StaffForm = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [form, setForm] = useState({
    name: '', role: '', department: '', contact: '', email: '', address: '', qualification: '', salary: '', joinDate: '', shift: '', status: 'Active',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '', role: initialData.role || '', department: initialData.department || '',
        contact: initialData.contact || '', email: initialData.email || '', address: initialData.address || '',
        qualification: initialData.qualification || '', salary: initialData.salary || '', joinDate: initialData.joinDate || '',
        shift: initialData.shift || '', status: initialData.status || 'Active',
      });
    } else {
      setForm({ name: '', role: '', department: '', contact: '', email: '', address: '', qualification: '', salary: '', joinDate: '', shift: '', status: 'Active' });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!validateRequired(form.name)) errs.name = 'Name is required';
    if (!validateRequired(form.role)) errs.role = 'Role is required';
    if (!validateRequired(form.contact)) errs.contact = 'Contact is required';
    if (form.email && !validateEmail(form.email)) errs.email = 'Invalid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, salary: parseFloat(form.salary) || 0 });
    onClose();
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-hospital-500 focus:border-transparent ${
      errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    }`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Staff' : 'Add New Staff'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass('name')} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass('role')}>
              <option value="">Select Role</option>
              {STAFF_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
            <input type="text" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={inputClass('department')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact</label>
            <input type="text" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className={inputClass('contact')} />
            {errors.contact && <p className="text-xs text-red-500 mt-1">{errors.contact}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass('email')} />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salary</label>
            <input type="number" step="0.01" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} className={inputClass('salary')} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Join Date (DD/MM/YYYY)</label>
            <input type="text" value={form.joinDate} onChange={(e) => setForm({ ...form, joinDate: e.target.value })} className={inputClass('joinDate')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shift</label>
            <select value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })} className={inputClass('shift')}>
              <option value="">Select Shift</option>
              {SHIFT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
          <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} className={inputClass('address')} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Qualification</label>
          <textarea value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} rows={2} className={inputClass('qualification')} />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg transition-colors">{initialData ? 'Update' : 'Save'} Staff</button>
        </div>
      </form>
    </Modal>
  );
};

export default StaffForm;
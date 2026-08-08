import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { validateRequired, validateDate, validateTime12 } from '../../utils/validators';
import { APPOINTMENT_STATUS } from '../../utils/constants';

const AppointmentForm = ({ isOpen, onClose, onSubmit, initialData = null, patients, doctors }) => {
  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    purpose: '',
    status: 'Scheduled',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        patientId: initialData.patientId || '',
        doctorId: initialData.doctorId || '',
        date: initialData.date || '',
        time: initialData.time || '',
        purpose: initialData.purpose || '',
        status: initialData.status || 'Scheduled',
      });
    } else {
      setForm({ patientId: '', doctorId: '', date: '', time: '', purpose: '', status: 'Scheduled' });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!validateRequired(form.patientId)) errs.patientId = 'Select a patient';
    if (!validateRequired(form.doctorId)) errs.doctorId = 'Select a doctor';
    if (!validateDate(form.date)) errs.date = 'Invalid date (DD/MM/YYYY)';
    if (!validateTime12(form.time)) errs.time = 'Invalid time (HH:MM AM/PM)';
    if (!validateRequired(form.purpose)) errs.purpose = 'Purpose is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Appointment' : 'Schedule Appointment'} size="md">
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
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Doctor</label>
          <select value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })} className={inputClass('doctorId')}>
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.doctorId}>{d.name} — {d.specialization}</option>
            ))}
          </select>
          {errors.doctorId && <p className="text-xs text-red-500 mt-1">{errors.doctorId}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date (DD/MM/YYYY)</label>
            <input type="text" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass('date')} placeholder="01/01/2025" />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
            <input type="text" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass('time')} placeholder="10:00 AM" />
            {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Purpose</label>
          <input type="text" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className={inputClass('purpose')} />
          {errors.purpose && <p className="text-xs text-red-500 mt-1">{errors.purpose}</p>}
        </div>
        {initialData && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass('status')}>
              {APPOINTMENT_STATUS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg transition-colors">{initialData ? 'Update' : 'Schedule'}</button>
        </div>
      </form>
    </Modal>
  );
};

export default AppointmentForm;
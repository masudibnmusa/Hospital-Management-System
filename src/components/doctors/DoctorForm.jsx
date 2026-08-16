import { useState, useEffect } from 'react';
import { validateRequired, validatePhone } from '../../utils/validators.js';

const DoctorForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: '', specialization: '', contact: '', availability: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        specialization: initialData.specialization || '',
        contact: initialData.contact || '',
        availability: initialData.availability || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!validateRequired(form.name)) newErrors.name = 'Name is required';
    if (!validateRequired(form.specialization)) newErrors.specialization = 'Specialization is required';
    if (!validatePhone(form.contact)) newErrors.contact = 'Valid contact required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Doctor Name *</label>
        <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Dr. Jane Smith" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="label">Specialization *</label>
        <input name="specialization" value={form.specialization} onChange={handleChange} className="input-field" placeholder="Cardiology, Neurology, etc." />
        {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>}
      </div>
      <div>
        <label className="label">Contact Number *</label>
        <input name="contact" value={form.contact} onChange={handleChange} className="input-field" placeholder="+1 234-567-8900" />
        {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
      </div>
      <div>
        <label className="label">Availability</label>
        <input name="availability" value={form.availability} onChange={handleChange} className="input-field" placeholder="Mon-Fri 9AM-5PM" />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 btn-secondary">Cancel</button>
        <button type="submit" className="flex-1 btn-primary">{initialData ? 'Update Doctor' : 'Add Doctor'}</button>
      </div>
    </form>
  );
};

export default DoctorForm;

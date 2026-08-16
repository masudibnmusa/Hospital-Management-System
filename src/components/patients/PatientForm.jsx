import { useState, useEffect } from 'react';
import { validateRequired, validatePhone } from '../../utils/validators.js';
import { GENDER_OPTIONS } from '../../utils/constants.js';

const PatientForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: '', age: '', gender: 'Male', contact: '', address: '', medicalHistory: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        age: initialData.age || '',
        gender: initialData.gender || 'Male',
        contact: initialData.contact || '',
        address: initialData.address || '',
        medicalHistory: initialData.medicalHistory || '',
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
    if (!validateRequired(form.age) || isNaN(form.age) || form.age < 0 || form.age > 150) {
      newErrors.age = 'Valid age is required';
    }
    if (!validatePhone(form.contact)) newErrors.contact = 'Valid contact number required';
    if (!validateRequired(form.address)) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...form, age: parseInt(form.age) });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Full Name *</label>
          <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="John Doe" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="label">Age *</label>
          <input name="age" type="number" value={form.age} onChange={handleChange} className="input-field" placeholder="25" />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>
        <div>
          <label className="label">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
            {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Contact Number *</label>
          <input name="contact" value={form.contact} onChange={handleChange} className="input-field" placeholder="+1 234-567-8900" />
          {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
        </div>
      </div>
      <div>
        <label className="label">Address *</label>
        <input name="address" value={form.address} onChange={handleChange} className="input-field" placeholder="123 Main St, City" />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>
      <div>
        <label className="label">Medical History</label>
        <textarea name="medicalHistory" value={form.medicalHistory} onChange={handleChange} rows={3} className="input-field" placeholder="Previous conditions, allergies, etc." />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 btn-secondary">Cancel</button>
        <button type="submit" className="flex-1 btn-primary">{initialData ? 'Update Patient' : 'Add Patient'}</button>
      </div>
    </form>
  );
};

export default PatientForm;

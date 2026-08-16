import { useState } from 'react';
import { usePatients } from '../hooks/usePatients.js';
import { useDoctors } from '../hooks/useDoctors.js';
import { useAppointments } from '../hooks/useAppointments.js';
import { useBills } from '../hooks/useBills.js';
import { useStaff } from '../hooks/useStaff.js';
import { useMedicines } from '../hooks/useMedicines.js';
import { exportToCSV } from '../services/exportService.js';
import { useNotification } from '../contexts/NotificationContext.jsx';
import { Download, Database, Trash2, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext.jsx';

const Settings = () => {
  const { patients } = usePatients();
  const { doctors } = useDoctors();
  const { appointments } = useAppointments();
  const { bills } = useBills();
  const { staff } = useStaff();
  const { medicines } = useMedicines();
  const notify = useNotification();
  const { darkMode, toggleTheme } = useTheme();
  const [exporting, setExporting] = useState(false);

  const handleExportAll = () => {
    setExporting(true);
    const timestamp = new Date().toISOString().slice(0, 10);
    exportToCSV(patients, `patients_${timestamp}.csv`);
    exportToCSV(doctors, `doctors_${timestamp}.csv`);
    exportToCSV(appointments, `appointments_${timestamp}.csv`);
    exportToCSV(bills, `bills_${timestamp}.csv`);
    exportToCSV(staff, `staff_${timestamp}.csv`);
    exportToCSV(medicines, `medicines_${timestamp}.csv`);
    notify.success('All data exported to CSV');
    setExporting(false);
  };

  const handleExportSingle = (data, name) => {
    const timestamp = new Date().toISOString().slice(0, 10);
    exportToCSV(data, `${name}_${timestamp}.csv`);
    notify.success(`${name} exported successfully`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">System configuration and data management</p>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Moon size={20} />
          Appearance
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Dark Mode</p>
            <p className="text-sm text-gray-500">Toggle between light and dark themes</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${darkMode ? 'bg-hospital-600' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Download size={20} />
          Export Data
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Download your data as CSV files for backup or analysis.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: 'patients', label: 'Patients', data: patients },
            { name: 'doctors', label: 'Doctors', data: doctors },
            { name: 'appointments', label: 'Appointments', data: appointments },
            { name: 'bills', label: 'Bills', data: bills },
            { name: 'staff', label: 'Staff', data: staff },
            { name: 'medicines', label: 'Medicines', data: medicines },
          ].map(({ name, label, data }) => (
            <button
              key={name}
              onClick={() => handleExportSingle(data, name)}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <Download size={16} />
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={handleExportAll}
          disabled={exporting}
          className="mt-4 w-full btn-primary flex items-center justify-center gap-2"
        >
          <Database size={18} />
          {exporting ? 'Exporting...' : 'Export All Data'}
        </button>
      </div>

      <div className="card border-red-200 dark:border-red-800">
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
          <Trash2 size={20} />
          Danger Zone
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-300">
            Data deletion must be performed directly in Firebase Console for security reasons.
            Please visit your Firebase Console to manage or delete collections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

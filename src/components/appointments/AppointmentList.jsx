import DataTable from '../common/DataTable';
import { STATUS_COLORS } from '../../utils/constants';

const AppointmentList = ({ appointments, patients, doctors, onEdit, onDelete }) => {
  const getPatientName = (pid) => patients.find((p) => p.patientId === pid)?.name || 'Unknown';
  const getDoctorName = (did) => doctors.find((d) => d.doctorId === did)?.name || 'Unknown';

  const columns = [
    { key: 'appointmentId', label: 'ID', sortable: true },
    { key: 'patientId', label: 'Patient', sortable: true, render: (_, row) => getPatientName(row.patientId) },
    { key: 'doctorId', label: 'Doctor', sortable: true, render: (_, row) => getDoctorName(row.doctorId) },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'time', label: 'Time' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[val] || 'bg-gray-100 text-gray-800'}`}>
          {val}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={appointments}
      actions={(row) => (
        <>
          <button onClick={() => onEdit(row)} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors">Edit</button>
          <button onClick={() => onDelete(row)} className="text-xs px-2 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors">Delete</button>
        </>
      )}
    />
  );
};

export default AppointmentList;
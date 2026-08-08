import DataTable from '../common/DataTable';
import { formatCurrency } from '../../utils/formatters';
import { STATUS_COLORS } from '../../utils/constants';

const StaffList = ({ staff, onEdit, onDelete }) => {
  const columns = [
    { key: 'staffId', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
    { key: 'contact', label: 'Contact' },
    { key: 'salary', label: 'Salary', render: (val) => formatCurrency(val) },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[val] || 'bg-gray-100 text-gray-800'}`}>{val}</span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={staff}
      actions={(row) => (
        <>
          <button onClick={() => onEdit(row)} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors">Edit</button>
          <button onClick={() => onDelete(row)} className="text-xs px-2 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors">Delete</button>
        </>
      )}
    />
  );
};

export default StaffList;
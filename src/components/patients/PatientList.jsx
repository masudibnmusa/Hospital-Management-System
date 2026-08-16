import DataTable from '../common/DataTable.jsx';
import { formatDate } from '../../utils/formatters.js';
import { Edit, Trash2 } from 'lucide-react';

const PatientList = ({ patients, onEdit, onDelete }) => {
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'gender', label: 'Gender' },
    { key: 'contact', label: 'Contact' },
    { key: 'address', label: 'Address' },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); onEdit(row); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Edit size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(row); }} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={patients} />;
};

export default PatientList;

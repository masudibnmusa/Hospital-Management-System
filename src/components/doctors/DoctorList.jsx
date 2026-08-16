import DataTable from '../common/DataTable.jsx';
import { Edit, Trash2, Eye } from 'lucide-react';

const DoctorList = ({ doctors, onEdit, onDelete, onView }) => {
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'specialization', label: 'Specialization', sortable: true },
    { key: 'contact', label: 'Contact' },
    { key: 'availability', label: 'Availability' },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); onView(row); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Eye size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onEdit(row); }} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            <Edit size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(row); }} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={doctors} />;
};

export default DoctorList;

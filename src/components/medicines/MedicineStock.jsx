import DataTable from '../common/DataTable.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { isExpired, isLowStock } from '../../utils/helpers.js';
import { Edit, Trash2, Package } from 'lucide-react';

const MedicineStock = ({ medicines, onEdit, onDelete, onUpdateStock }) => {
  const columns = [
    {
      key: 'name',
      label: 'Medicine',
      render: (v, row) => (
        <div className="flex items-center gap-2">
          <Package size={16} className={isExpired(row.expiryDate) ? 'text-red-500' : isLowStock(row.quantity) ? 'text-yellow-500' : 'text-green-500'} />
          <span>{v}</span>
        </div>
      ),
    },
    { key: 'category', label: 'Category' },
    { key: 'manufacturer', label: 'Manufacturer' },
    { key: 'price', label: 'Price', render: (v) => formatCurrency(v) },
    {
      key: 'quantity',
      label: 'Stock',
      render: (v) => (
        <span className={`font-medium ${v === 0 ? 'text-red-600' : isLowStock(v) ? 'text-yellow-600' : 'text-green-600'}`}>
          {v} units
        </span>
      ),
    },
    {
      key: 'expiryDate',
      label: 'Expiry',
      render: (v) => (
        <span className={isExpired(v) ? 'text-red-600 font-medium' : ''}>
          {v} {isExpired(v) && '(EXPIRED)'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); onUpdateStock(row); }} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Update Stock">
            <Package size={16} />
          </button>
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

  return <DataTable columns={columns} data={medicines} />;
};

export default MedicineStock;
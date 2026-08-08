import DataTable from '../common/DataTable';
import { formatCurrency } from '../../utils/formatters';
import { isExpired, isLowStock } from '../../utils/helpers';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

const MedicineStock = ({ medicines, onEdit, onDelete, onUpdateStock }) => {
  const columns = [
    { key: 'medicineId', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'category', label: 'Category' },
    { key: 'manufacturer', label: 'Manufacturer' },
    { key: 'quantity', label: 'Qty', sortable: true, render: (val, row) => (
      <span className={`font-medium ${val === 0 ? 'text-red-600' : isLowStock(val) ? 'text-yellow-600' : 'text-green-600'}`}>
        {val}
      </span>
    )},
    { key: 'price', label: 'Price', render: (val) => formatCurrency(val) },
    { key: 'expiryDate', label: 'Expiry', render: (val) => (
      <span className={isExpired(val) ? 'text-red-600 font-medium' : 'text-gray-700 dark:text-gray-300'}>
        {val} {isExpired(val) && '(EXPIRED)'}
      </span>
    )},
  ];

  const statusIcon = (qty, expiry) => {
    if (isExpired(expiry)) return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (qty === 0) return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (isLowStock(qty)) return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  return (
    <DataTable
      columns={columns}
      data={medicines}
      actions={(row) => (
        <>
          <button onClick={() => onUpdateStock(row)} className="text-xs px-2 py-1 bg-green-50 text-green-700 hover:bg-green-100 rounded-md transition-colors">Stock</button>
          <button onClick={() => onEdit(row)} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md transition-colors">Edit</button>
          <button onClick={() => onDelete(row)} className="text-xs px-2 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-md transition-colors">Delete</button>
        </>
      )}
    />
  );
};

export default MedicineStock;
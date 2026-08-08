import DataTable from '../common/DataTable';
import { formatCurrency } from '../../utils/formatters';
import { STATUS_COLORS } from '../../utils/constants';
import { FileDown, Trash2 } from 'lucide-react';

const BillList = ({ bills, patients, onDelete, onExportPDF }) => {
  const getPatientName = (pid) => patients.find((p) => p.patientId === pid)?.name || 'Unknown';

  const columns = [
    { key: 'billNo', label: 'Bill No', sortable: true },
    { key: 'patientId', label: 'Patient', sortable: true, render: (_, row) => getPatientName(row.patientId) },
    { key: 'totalAmount', label: 'Total', sortable: true, render: (val) => formatCurrency(val) },
    { key: 'date', label: 'Date', sortable: true },
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
      data={bills}
      actions={(row) => (
        <>
          <button onClick={() => onExportPDF(row)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Download PDF">
            <FileDown className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(row)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </>
      )}
    />
  );
};

export default BillList;
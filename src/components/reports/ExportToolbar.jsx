import { Download, FileSpreadsheet } from 'lucide-react';
import { exportToCSV } from '../../services/exportService';

const ExportToolbar = ({ data, filename, columns }) => {
  const handleExport = () => {
    const exportData = data.map((row) => {
      const obj = {};
      columns.forEach((col) => {
        obj[col.label] = row[col.key];
      });
      return obj;
    });
    exportToCSV(exportData, filename);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
    >
      <FileSpreadsheet className="w-4 h-4" />
      Export CSV
    </button>
  );
};

export default ExportToolbar;
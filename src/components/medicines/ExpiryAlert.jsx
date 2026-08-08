import { AlertTriangle } from 'lucide-react';
import { isExpired, isLowStock } from '../../utils/helpers';

const ExpiryAlert = ({ medicines }) => {
  const expired = medicines.filter((m) => isExpired(m.expiryDate));
  const lowStock = medicines.filter((m) => isLowStock(m.quantity) && !isExpired(m.expiryDate));

  if (expired.length === 0 && lowStock.length === 0) return null;

  return (
    <div className="space-y-3 mb-6">
      {expired.length > 0 && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">Expired Medicines ({expired.length})</h4>
            <p className="text-xs text-red-700 dark:text-red-400 mt-1">{expired.map((m) => m.name).join(', ')}</p>
          </div>
        </div>
      )}
      {lowStock.length > 0 && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">Low Stock Alert ({lowStock.length})</h4>
            <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">{lowStock.map((m) => `${m.name} (${m.quantity})`).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpiryAlert;
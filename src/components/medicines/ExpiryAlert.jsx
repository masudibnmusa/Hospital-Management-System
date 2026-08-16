import { AlertTriangle } from 'lucide-react';
import { isExpired, isLowStock } from '../../utils/helpers.js';

const ExpiryAlert = ({ medicines }) => {
  const expired = medicines.filter(m => isExpired(m.expiryDate));
  const lowStock = medicines.filter(m => isLowStock(m.quantity) && m.quantity > 0);
  const outOfStock = medicines.filter(m => m.quantity === 0);

  if (expired.length === 0 && lowStock.length === 0 && outOfStock.length === 0) return null;

  return (
    <div className="space-y-3">
      {expired.length > 0 && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-800 dark:text-red-200">Expired Medicines ({expired.length})</p>
            <p className="text-sm text-red-600 dark:text-red-300">{expired.map(m => m.name).join(', ')}</p>
          </div>
        </div>
      )}
      {outOfStock.length > 0 && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-800 dark:text-red-200">Out of Stock ({outOfStock.length})</p>
            <p className="text-sm text-red-600 dark:text-red-300">{outOfStock.map(m => m.name).join(', ')}</p>
          </div>
        </div>
      )}
      {lowStock.length > 0 && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-3">
          <AlertTriangle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-800 dark:text-yellow-200">Low Stock Alert ({lowStock.length})</p>
            <p className="text-sm text-yellow-600 dark:text-yellow-300">{lowStock.map(m => `${m.name} (${m.quantity})`).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpiryAlert;
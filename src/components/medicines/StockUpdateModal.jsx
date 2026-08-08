import { useState } from 'react';
import Modal from '../common/Modal';

const StockUpdateModal = ({ isOpen, onClose, medicine, onUpdate }) => {
  const [action, setAction] = useState('add');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(amount) || 0;
    if (val <= 0) return;
    let newQty = medicine.quantity;
    if (action === 'add') newQty += val;
    else if (action === 'reduce') newQty = Math.max(0, newQty - val);
    else if (action === 'set') newQty = val;
    onUpdate(medicine.id, { quantity: newQty });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Update Stock: ${medicine?.name}`} size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">Current Stock: <span className="font-bold text-gray-900 dark:text-white">{medicine?.quantity || 0}</span></p>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action</label>
          <select value={action} onChange={(e) => setAction(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="add">Add Stock</option>
            <option value="reduce">Reduce Stock</option>
            <option value="set">Set New Stock</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
          <input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-hospital-500" />
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-hospital-600 hover:bg-hospital-700 rounded-lg transition-colors">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default StockUpdateModal;
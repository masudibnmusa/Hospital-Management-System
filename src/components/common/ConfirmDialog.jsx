import Modal from './Modal.jsx';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', danger = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${danger ? 'bg-red-100 dark:bg-red-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'}`}>
          <AlertTriangle size={24} className={danger ? 'text-red-600' : 'text-yellow-600'} />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex gap-3 w-full">
          <button onClick={onClose} className="flex-1 btn-secondary">
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 ${danger ? 'btn-danger' : 'btn-primary'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;

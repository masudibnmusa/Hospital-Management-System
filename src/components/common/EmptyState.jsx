import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'No data found', description = 'Get started by adding a new record.' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
        <Inbox size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
    </div>
  );
};

export default EmptyState;

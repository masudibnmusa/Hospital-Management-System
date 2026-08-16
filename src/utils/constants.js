export const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

export const SHIFT_OPTIONS = [
  'Morning (7AM-3PM)',
  'Evening (3PM-11PM)',
  'Night (11PM-7AM)',
];

export const STAFF_ROLES = [
  'Nurse',
  'Receptionist',
  'Technician',
  'Pharmacist',
  'Cleaner',
  'Security',
  'Other',
];

export const MEDICINE_CATEGORIES = [
  'Tablet',
  'Syrup',
  'Injection',
  'Capsule',
  'Cream',
  'Drops',
  'Inhaler',
  'Other',
];

export const APPOINTMENT_STATUS = ['Scheduled', 'Completed', 'Cancelled', 'No Show'];
export const BILL_STATUS = ['Generated', 'Paid', 'Pending', 'Overdue'];
export const STAFF_STATUS = ['Active', 'Inactive'];

export const STATUS_COLORS = {
  Scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'No Show': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  Generated: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Pending: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

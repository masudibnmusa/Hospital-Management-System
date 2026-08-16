import { User, Phone, MapPin, Calendar } from 'lucide-react';

const PatientCard = ({ patient }) => {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-hospital-100 dark:bg-hospital-900/30 rounded-full flex items-center justify-center">
          <User size={24} className="text-hospital-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{patient.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{patient.gender}, {patient.age} years</p>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Phone size={14} className="text-gray-400" />
              {patient.contact}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <MapPin size={14} className="text-gray-400" />
              {patient.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;

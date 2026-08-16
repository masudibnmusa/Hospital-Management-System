import Modal from '../common/Modal.jsx';
import { Stethoscope, Phone, Clock, Calendar } from 'lucide-react';

const DoctorDetailModal = ({ doctor, appointments, isOpen, onClose }) => {
  if (!doctor) return null;

  const doctorAppointments = appointments.filter(a => a.doctorId === doctor.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Doctor Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-hospital-100 dark:bg-hospital-900/30 rounded-full flex items-center justify-center">
            <Stethoscope size={32} className="text-hospital-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{doctor.name}</h3>
            <p className="text-hospital-600 font-medium">{doctor.specialization}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1"><Phone size={14} /> {doctor.contact}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {doctor.availability}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Calendar size={18} />
            Appointments ({doctorAppointments.length})
          </h4>
          {doctorAppointments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No appointments scheduled.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {doctorAppointments.map(appt => (
                <div key={appt.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">Patient ID: {appt.patientId}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${appt.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {appt.status}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{appt.date} at {appt.time}</p>
                  <p className="text-gray-500 dark:text-gray-400">{appt.purpose}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DoctorDetailModal;

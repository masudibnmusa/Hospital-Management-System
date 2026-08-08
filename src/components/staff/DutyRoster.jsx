import { SHIFT_OPTIONS } from '../../utils/constants';

const DutyRoster = ({ staff, onUpdateShift }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Duty Roster</h3>
      <div className="space-y-3">
        {staff.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{member.role} — {member.department}</p>
            </div>
            <select
              value={member.shift || ''}
              onChange={(e) => onUpdateShift(member.id, { shift: e.target.value })}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 focus:ring-2 focus:ring-hospital-500"
            >
              <option value="">Assign Shift</option>
              {SHIFT_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DutyRoster;
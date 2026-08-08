const AppointmentCalendar = ({ appointments }) => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const getAppointmentsForDay = (day) => {
    const dayStr = `${String(day).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    return appointments.filter((a) => a.date === dayStr);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayApps = getAppointmentsForDay(day);
          return (
            <div key={day} className={`min-h-[60px] p-1 rounded-lg border text-sm ${dayApps.length > 0 ? 'bg-hospital-50 border-hospital-200 dark:bg-hospital-900/20 dark:border-hospital-800' : 'bg-gray-50 border-gray-100 dark:bg-gray-700/30 dark:border-gray-700'}`}>
              <span className="font-medium text-gray-700 dark:text-gray-300">{day}</span>
              {dayApps.length > 0 && (
                <div className="mt-1">
                  <span className="text-[10px] px-1.5 py-0.5 bg-hospital-500 text-white rounded-full">{dayApps.length}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
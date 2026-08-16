import { useMemo } from 'react';

export const useReports = (bills, appointments, doctors) => {
  const today = new Date().toLocaleDateString('en-GB');

  const dailyRevenue = useMemo(() => {
    return bills
      .filter(b => b.date === today)
      .reduce((sum, b) => sum + (parseFloat(b.totalAmount) || 0), 0);
  }, [bills, today]);

  const monthlyRevenue = useMemo(() => {
    const currentMonth = today.slice(3);
    return bills
      .filter(b => b.date?.slice(3) === currentMonth)
      .reduce((sum, b) => sum + (parseFloat(b.totalAmount) || 0), 0);
  }, [bills, today]);

  const unpaidTotal = useMemo(() => {
    return bills
      .filter(b => b.status === 'Generated' || b.status === 'Pending')
      .reduce((sum, b) => sum + (parseFloat(b.totalAmount) || 0), 0);
  }, [bills]);

  const departmentRevenue = useMemo(() => {
    const deptMap = {};
    bills.forEach(bill => {
      const dept = bill.department || 'General';
      deptMap[dept] = (deptMap[dept] || 0) + (parseFloat(bill.totalAmount) || 0);
    });
    return Object.entries(deptMap).map(([name, value]) => ({ name, value }));
  }, [bills]);

  const doctorStats = useMemo(() => {
    return doctors.map(doc => ({
      name: doc.name,
      appointments: appointments.filter(a => a.doctorId === doc.id).length,
    }));
  }, [doctors, appointments]);

  return { dailyRevenue, monthlyRevenue, unpaidTotal, departmentRevenue, doctorStats };
};

import { useState, useMemo } from 'react';
import { useBills } from '../hooks/useBills.js';
import { useAppointments } from '../hooks/useAppointments.js';
import { useDoctors } from '../hooks/useDoctors.js';
import { useReports } from '../hooks/useReports.js';
import RevenueChart from '../components/reports/RevenueChart.jsx';
import DepartmentChart from '../components/reports/DepartmentChart.jsx';
import DateRangeFilter from '../components/reports/DateRangeFilter.jsx';
import ExportToolbar from '../components/reports/ExportToolbar.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import { BarChart3, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/formatters.js';

const Reports = () => {
  const { bills, loading: bLoading } = useBills();
  const { appointments } = useAppointments();
  const { doctors } = useDoctors();
  const { dailyRevenue, monthlyRevenue, unpaidTotal, departmentRevenue, doctorStats } = useReports(bills, appointments, doctors);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredBills = useMemo(() => {
    if (!startDate && !endDate) return bills;
    return bills.filter(b => {
      const [d, m, y] = (b.date || '').split('/').map(Number);
      if (!y) return false;
      const billDate = new Date(y, m - 1, d);
      const s = startDate ? new Date(startDate) : null;
      const e = endDate ? new Date(endDate) : null;
      if (s && billDate < s) return false;
      if (e && billDate > e) return false;
      return true;
    });
  }, [bills, startDate, endDate]);

  const totalRevenue = filteredBills.reduce((sum, b) => sum + (parseFloat(b.totalAmount) || 0), 0);
  const totalBills = filteredBills.length;

  if (bLoading && bills.length === 0) return <LoadingSpinner fullScreen />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 size={28} className="text-hospital-600" />
            Reports & Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Financial and operational insights</p>
        </div>
        <ExportToolbar data={filteredBills} filename="bills_report.csv" />
      </div>

      <DateRangeFilter startDate={startDate} endDate={endDate} onStartChange={setStartDate} onEndChange={setEndDate} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <DollarSign size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalRevenue)}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <TrendingUp size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Daily Revenue</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(dailyRevenue)}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Calendar size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Revenue</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(monthlyRevenue)}</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
            <DollarSign size={24} className="text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Unpaid Bills</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(unpaidTotal)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Overview</h3>
          <RevenueChart data={filteredBills.map(b => ({ name: b.date?.slice(0, 5) || 'N/A', value: parseFloat(b.totalAmount) || 0 })).slice(0, 20)} />
        </div>
        <DepartmentChart data={departmentRevenue} />
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Doctor Performance</h3>
        <RevenueChart data={doctorStats} type="bar" />
      </div>
    </div>
  );
};

export default Reports;

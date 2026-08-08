import { forwardRef } from 'react';
import { formatCurrency } from '../../utils/formatters';

const BillReceipt = forwardRef(({ bill, patientName }, ref) => {
  return (
    <div ref={ref} className="bg-white p-8 max-w-2xl mx-auto border border-gray-200 rounded-lg shadow-sm print:shadow-none">
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">HOSPITAL MANAGEMENT SYSTEM</h1>
        <p className="text-sm text-gray-600 uppercase tracking-wider mt-1">Patient Invoice / Bill</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div><span className="font-semibold">Bill Number:</span> {bill.billNo}</div>
        <div><span className="font-semibold">Date:</span> {bill.date}</div>
        <div><span className="font-semibold">Patient ID:</span> {bill.patientId}</div>
        <div><span className="font-semibold">Patient Name:</span> {patientName}</div>
        <div><span className="font-semibold">Status:</span> {bill.status}</div>
      </div>

      <table className="w-full text-sm border-collapse mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border border-gray-300">Description</th>
            <th className="text-right p-2 border border-gray-300">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="p-2 border border-gray-300">Consultation Fee</td><td className="p-2 border border-gray-300 text-right">{formatCurrency(bill.consultationFee)}</td></tr>
          <tr><td className="p-2 border border-gray-300">Medicine Charges</td><td className="p-2 border border-gray-300 text-right">{formatCurrency(bill.medicineCharges)}</td></tr>
          <tr><td className="p-2 border border-gray-300">Room Charges</td><td className="p-2 border border-gray-300 text-right">{formatCurrency(bill.roomCharges)}</td></tr>
          <tr><td className="p-2 border border-gray-300">Lab/Test Charges</td><td className="p-2 border border-gray-300 text-right">{formatCurrency(bill.labCharges)}</td></tr>
        </tbody>
        <tfoot>
          <tr className="bg-gray-50 font-bold">
            <td className="p-2 border border-gray-300">TOTAL AMOUNT</td>
            <td className="p-2 border border-gray-300 text-right text-lg">{formatCurrency(bill.totalAmount)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-200">
        <p>Thank you for choosing our hospital!</p>
        <p>For queries, contact: +123-456-7890</p>
      </div>
    </div>
  );
});

BillReceipt.displayName = 'BillReceipt';
export default BillReceipt;
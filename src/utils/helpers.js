export const generateId = (prefix = 'ID') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};

export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const calculateBillTotal = (bill) => {
  return (
    (parseFloat(bill.consultationFee) || 0) +
    (parseFloat(bill.medicineCharges) || 0) +
    (parseFloat(bill.roomCharges) || 0) +
    (parseFloat(bill.labCharges) || 0)
  );
};

export const filterByDateRange = (items, dateField, startDate, endDate) => {
  if (!startDate && !endDate) return items;
  return items.filter(item => {
    const itemDate = new Date(item[dateField]);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start && itemDate < start) return false;
    if (end && itemDate > end) return false;
    return true;
  });
};

export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) result[groupKey] = [];
    result[groupKey].push(item);
    return result;
  }, {});
};

export const isExpired = (dateStr) => {
  if (!dateStr) return false;
  try {
    const [d, m, y] = dateStr.split('/').map(Number);
    const expiry = new Date(y, m - 1, d);
    return expiry < new Date();
  } catch { return false; }
};

export const isLowStock = (quantity) => {
  return quantity < 50;
};
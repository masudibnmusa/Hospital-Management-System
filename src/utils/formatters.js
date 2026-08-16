import { format, parse } from 'date-fns';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount || 0);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  try {
    const date = parse(dateStr, 'dd/MM/yyyy', new Date());
    return format(date, 'MMM dd, yyyy');
  } catch {
    return dateStr;
  }
};

export const formatDateTime = (isoString) => {
  if (!isoString) return '-';
  try {
    return format(new Date(isoString), 'MMM dd, yyyy HH:mm');
  } catch {
    return isoString;
  }
};

export const toInputDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const [d, m, y] = dateStr.split('/');
    return `${y}-${m}-${d}`;
  } catch {
    return dateStr;
  }
};

export const fromInputDate = (inputDate) => {
  if (!inputDate) return '';
  try {
    const [y, m, d] = inputDate.split('-');
    return `${d}/${m}/${y}`;
  } catch {
    return inputDate;
  }
};

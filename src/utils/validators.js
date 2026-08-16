export const validateDate = (date) => {
  if (!date) return false;
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(date)) return false;
  const [d, m, y] = date.split('/').map(Number);
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  if (isLeap) daysInMonth[2] = 29;
  return d <= daysInMonth[m];
};

export const validateTime12 = (time) => {
  if (!time) return false;
  const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/i;
  return regex.test(time.trim());
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  return /^[\d\s\-+()]{7,20}$/.test(phone);
};

export const validateRequired = (value) => {
  return value !== undefined && value !== null && String(value).trim() !== '';
};

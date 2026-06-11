export const formatCurrencyValue = (val, currencyCode) => {
  const symbols = { INR: '₹', USD: '$', EUR: '€' };
  const formatted = Number(val).toLocaleString(currencyCode === 'INR' ? 'en-IN' : 'en-US');
  return `${symbols[currencyCode] || '₹'} ${formatted}`;
};

export function generateQuotationNumber() {
  const year = new Date().getFullYear();
  let count = localStorage.getItem("qCount") || 111;
  return `GY-EC-${year}-${String(count).padStart(3, '0')}`;
}

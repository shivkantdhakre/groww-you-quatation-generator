export const formatCurrencyValue = (val, currencyCode) => {
  const symbols = { INR: 'Rs.', USD: '$', EUR: '€' };
  const formatted = Number(val).toLocaleString(currencyCode === 'INR' ? 'en-IN' : 'en-US');
  return `${symbols[currencyCode] || 'Rs.'} ${formatted}`;
};

export function generateQuotationNumber() {
  const year = new Date().getFullYear();
  let count = localStorage.getItem("qCount") || 111;
  return `GY-EC-${year}-${String(count).padStart(3, '0')}`;
}

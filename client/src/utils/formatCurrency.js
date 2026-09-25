export function formatCurrency(amount, currency) {
  if (amount === 0) return `Free (${currency})`;
  if (!amount && amount !== 0) return 'Information not available';
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  } catch (_) {
    return `${amount} ${currency}`;
  }
}

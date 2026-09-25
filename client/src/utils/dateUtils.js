export function formatDate(dateStr) {
  if (!dateStr) return 'Information not available';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return 'Information not available';
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

export const statusStyles = {
  OPEN: 'bg-emerald-100 text-emerald-700',
  'CLOSING SOON': 'bg-amber-100 text-amber-700',
  UPCOMING: 'bg-sky-100 text-sky-700',
  CLOSED: 'bg-slate-100 text-slate-500',
  UNKNOWN: 'bg-slate-100 text-slate-500',
};

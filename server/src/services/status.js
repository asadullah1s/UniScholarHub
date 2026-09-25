export function admissionStatus(openDate, closeDate, now = new Date()) {
  if (!openDate || !closeDate) return 'UNKNOWN';
  const open = new Date(openDate);
  const close = new Date(closeDate);
  if (now < open) return 'UPCOMING';
  if (now >= open && now <= close) {
    const daysLeft = Math.ceil((close - now) / (1000 * 60 * 60 * 24));
    return daysLeft <= 21 ? 'CLOSING SOON' : 'OPEN';
  }
  return 'CLOSED';
}

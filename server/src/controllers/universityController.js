import { getUniversities, getScholarships } from '../services/dataStore.js';
import { admissionStatus } from '../services/status.js';

function enrich(u, scholarships) {
  const scholarshipObjs = scholarships.filter((s) => (u.scholarships || []).includes(s.id));
  return {
    ...u,
    admissionStatus: admissionStatus(u.admissionOpenDate, u.admissionCloseDate),
    hasScholarship: scholarshipObjs.length > 0,
    scholarshipCount: scholarshipObjs.length,
    scholarshipSummaries: scholarshipObjs.map((s) => ({ id: s.id, slug: s.slug, name: s.name, type: s.type })),
  };
}

export async function listUniversities(req, res) {
  const [universities, scholarships] = await Promise.all([getUniversities(), getScholarships()]);
  let results = universities.map((u) => enrich(u, scholarships));

  const { country, scholarship, degree, field, admission, page = 1, limit = 20 } = req.query;

  if (country) results = results.filter((u) => u.country === country);
  if (scholarship === 'available') results = results.filter((u) => u.hasScholarship);
  if (scholarship === 'unavailable') results = results.filter((u) => !u.hasScholarship);
  if (degree) results = results.filter((u) => u.programs.some((p) => p.degree.toLowerCase() === String(degree).toLowerCase()));
  if (field) results = results.filter((u) => u.programs.some((p) => p.name.toLowerCase().includes(String(field).toLowerCase())));
  if (admission) results = results.filter((u) => u.admissionStatus.toLowerCase() === String(admission).toLowerCase());

  const total = results.length;
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.max(1, Math.min(60, parseInt(limit, 10) || 20));
  const start = (p - 1) * l;
  const paged = results.slice(start, start + l);

  res.json({
    success: true,
    data: paged,
    pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) },
  });
}

export async function getUniversityBySlug(req, res) {
  const [universities, scholarships] = await Promise.all([getUniversities(), getScholarships()]);
  const uni = universities.find((u) => u.slug === req.params.slug);
  if (!uni) {
    return res.status(404).json({ success: false, message: 'University not found' });
  }
  const full = enrich(uni, scholarships);
  const fullScholarships = scholarships.filter((s) => (uni.scholarships || []).includes(s.id));
  res.json({ success: true, data: { ...full, scholarships: fullScholarships } });
}

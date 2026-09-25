import { getScholarships, getUniversities } from '../services/dataStore.js';

export async function listScholarships(req, res) {
  const scholarships = await getScholarships();
  let results = scholarships;
  const { country, category, degree, page = 1, limit = 20 } = req.query;

  if (country) results = results.filter((s) => (s.countries || []).includes(country));
  if (category) results = results.filter((s) => (s.categories || []).some((c) => c.toLowerCase() === String(category).toLowerCase()));
  if (degree) results = results.filter((s) => (s.degreeLevels || []).some((d) => d.toLowerCase() === String(degree).toLowerCase()));

  const total = results.length;
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.max(1, Math.min(60, parseInt(limit, 10) || 20));
  const start = (p - 1) * l;
  const paged = results.slice(start, start + l);

  res.json({ success: true, data: paged, pagination: { page: p, limit: l, total, totalPages: Math.ceil(total / l) } });
}

export async function getScholarshipBySlug(req, res) {
  const [scholarships, universities] = await Promise.all([getScholarships(), getUniversities()]);
  const sch = scholarships.find((s) => s.slug === req.params.slug);
  if (!sch) {
    return res.status(404).json({ success: false, message: 'Scholarship not found' });
  }
  const relatedUniversities = universities.filter((u) => (sch.universities || []).includes(u.id));
  res.json({ success: true, data: { ...sch, universityDetails: relatedUniversities } });
}

export async function listCategories(req, res) {
  const scholarships = await getScholarships();
  const set = new Set();
  scholarships.forEach((s) => (s.categories || []).forEach((c) => set.add(c)));
  res.json({ success: true, data: Array.from(set).sort() });
}

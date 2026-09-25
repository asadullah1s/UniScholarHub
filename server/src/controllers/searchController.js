import { getUniversities, getScholarships, getCountries } from '../services/dataStore.js';

function norm(v) {
  return String(v || '').toLowerCase();
}

export async function search(req, res) {
  const q = norm(req.query.q);
  if (!q) {
    return res.json({ success: true, data: { universities: [], scholarships: [], countries: [] } });
  }

  const [universities, scholarships, countries] = await Promise.all([
    getUniversities(),
    getScholarships(),
    getCountries(),
  ]);

  const terms = q.split(/\s+/).filter(Boolean);
  const matchesAll = (haystack) => terms.every((t) => haystack.includes(t));

  const uniResults = universities
    .filter((u) => {
      const hay = norm(
        [u.name, u.city, u.countryName, ...(u.programs || []).map((p) => `${p.name} ${p.degree}`)].join(' ')
      );
      return matchesAll(hay);
    })
    .slice(0, 10)
    .map((u) => ({ id: u.id, slug: u.slug, name: u.name, city: u.city, countryName: u.countryName, countryId: u.country }));

  const schResults = scholarships
    .filter((s) => matchesAll(norm([s.name, s.provider, s.type, ...(s.categories || [])].join(' '))))
    .slice(0, 10)
    .map((s) => ({ id: s.id, slug: s.slug, name: s.name, provider: s.provider }));

  const countryResults = countries
    .filter((c) => matchesAll(norm(c.name)))
    .slice(0, 10)
    .map((c) => ({ id: c.id, name: c.name }));

  res.json({
    success: true,
    data: { universities: uniResults, scholarships: schResults, countries: countryResults },
  });
}

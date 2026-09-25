import { getCountries, getUniversities } from '../services/dataStore.js';

export async function listCountries(req, res) {
  const [countries, universities] = await Promise.all([getCountries(), getUniversities()]);
  const withCounts = countries.map((c) => ({
    ...c,
    universityCount: universities.filter((u) => u.country === c.id).length,
  }));
  res.json({ success: true, data: withCounts });
}

export async function getCountryById(req, res) {
  const countries = await getCountries();
  const country = countries.find((c) => c.id === req.params.id);
  if (!country) {
    return res.status(404).json({ success: false, message: 'Country not found' });
  }
  res.json({ success: true, data: country });
}

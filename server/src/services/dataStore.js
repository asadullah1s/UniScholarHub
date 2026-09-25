import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

/**
 * Data access abstraction.
 *
 * MONGODB_URI is intentionally NOT required. If it is set in the future,
 * this is the single place to swap the JSON reads below for MongoDB
 * queries without changing any controller/route/frontend code.
 */
const cache = {};

async function loadJSON(file) {
  if (cache[file]) return cache[file];
  const raw = await readFile(path.join(DATA_DIR, file), 'utf-8');
  const parsed = JSON.parse(raw);
  cache[file] = parsed;
  return parsed;
}

export const getCountries = () => loadJSON('countries.json');
export const getUniversities = () => loadJSON('universities.json');
export const getScholarships = () => loadJSON('scholarships.json');

export const usingMongo = () => Boolean(process.env.MONGODB_URI);

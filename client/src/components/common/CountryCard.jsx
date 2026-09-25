import { Link } from 'react-router-dom';

export default function CountryCard({ country }) {
  return (
    <Link
      to={`/universities/${country.id}`}
      className="card flex flex-col items-center gap-2 p-4 text-center transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <span className="text-3xl">{country.flag}</span>
      <span className="text-sm font-semibold text-ink-900">{country.name}</span>
      <span className="text-xs text-slate-500">{country.universityCount} universities</span>
    </Link>
  );
}

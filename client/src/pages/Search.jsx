import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon, School, Award, Globe2, ArrowRight } from 'lucide-react';
import EmptyState from '../components/common/EmptyState.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import { globalSearch } from '../services/searchService.js';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [input, setInput] = useState(q);
  const [results, setResults] = useState(null);

  useEffect(() => {
    setInput(q);
    if (!q) {
      setResults({ universities: [], scholarships: [], countries: [] });
      return;
    }
    setResults(null);
    const timer = setTimeout(() => {
      globalSearch(q)
        .then((r) => setResults(r.data))
        .catch(() => setResults({ universities: [], scholarships: [], countries: [] }));
    }, 250);
    return () => clearTimeout(timer);
  }, [q]);

  function submit(e) {
    e.preventDefault();
    setSearchParams(input.trim() ? { q: input.trim() } : {});
  }

  const hasAny = results && (results.universities.length || results.scholarships.length || results.countries.length);

  return (
    <div className="container-app py-8">
      <Helmet>
        <title>{q ? `Search results for "${q}"` : 'Search'} — UniScholarHub</title>
      </Helmet>

      <h1 className="mb-6 text-2xl font-extrabold text-ink-900">Search</h1>

      <form onSubmit={submit} className="mb-8 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-card">
        <div className="flex flex-1 items-center gap-2 px-2">
          <SearchIcon size={18} className="text-slate-400" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Try "Computer Science in China" or "CSC Scholarship"'
            className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-slate-400"
            autoFocus
          />
        </div>
        <button type="submit" className="btn-primary shrink-0 !px-4 !py-2.5">Search</button>
      </form>

      {!q && <EmptyState title="Start typing to search" hint="Search universities, scholarships or countries." />}

      {q && !results && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14" />)}
        </div>
      )}

      {q && results && !hasAny && <EmptyState />}

      {q && results && hasAny && (
        <div className="space-y-10">
          {results.universities.length > 0 && (
            <ResultGroup icon={School} title="Universities">
              {results.universities.map((u) => (
                <ResultRowLink
                  key={u.id}
                  to={`/universities/${u.countryId}/${u.slug}`}
                  title={u.name}
                  subtitle={`${u.city}, ${u.countryName}`}
                />
              ))}
            </ResultGroup>
          )}

          {results.scholarships.length > 0 && (
            <ResultGroup icon={Award} title="Scholarships">
              {results.scholarships.map((s) => (
                <ResultRowLink key={s.id} to={`/scholarships/${s.slug}`} title={s.name} subtitle={s.provider} />
              ))}
            </ResultGroup>
          )}

          {results.countries.length > 0 && (
            <ResultGroup icon={Globe2} title="Countries">
              {results.countries.map((c) => (
                <ResultRowLink key={c.id} to={`/universities/${c.id}`} title={c.name} subtitle="Browse universities" />
              ))}
            </ResultGroup>
          )}
        </div>
      )}
    </div>
  );
}

function ResultGroup({ icon: Icon, title, children }) {
  return (
    <div>
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
        <Icon size={16} /> {title}
      </h2>
      <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100">{children}</div>
    </div>
  );
}

function ResultRowLink({ to, title, subtitle }) {
  return (
    <Link to={to} className="flex items-center justify-between gap-3 bg-white p-4 transition hover:bg-slate-50">
      <div>
        <p className="text-sm font-semibold text-ink-900">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <ArrowRight size={16} className="shrink-0 text-slate-300" />
    </Link>
  );
}

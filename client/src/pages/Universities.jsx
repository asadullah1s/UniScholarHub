import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SlidersHorizontal, X } from 'lucide-react';
import UniversityCard from '../components/university/UniversityCard.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { listUniversities } from '../services/universityService.js';
import { listCountries } from '../services/countryService.js';

const degrees = ["Bachelor's", "Master's", 'PhD'];
const admissionStatuses = ['OPEN', 'CLOSING SOON', 'UPCOMING', 'CLOSED'];

export default function Universities() {
  const { country: countryParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const filters = {
    country: countryParam || searchParams.get('country') || '',
    scholarship: searchParams.get('scholarship') || '',
    degree: searchParams.get('degree') || '',
    field: searchParams.get('field') || '',
    admission: searchParams.get('admission') || '',
  };

  useEffect(() => {
    listCountries().then((r) => setCountries(r.data)).catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    setError(null);
    setData(null);
    listUniversities({ ...filters, page, limit: 12 })
      .then((r) => setData(r))
      .catch((e) => setError(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryParam, searchParams.toString(), page]);

  useEffect(() => setPage(1), [countryParam, searchParams.toString()]);

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  const countryName = useMemo(
    () => countries.find((c) => c.id === filters.country)?.name,
    [countries, filters.country]
  );

  const activeFilterCount = ['scholarship', 'degree', 'field', 'admission'].filter((k) => filters[k]).length;

  return (
    <div className="container-app py-8">
      <Helmet>
        <title>{countryName ? `Universities in ${countryName}` : 'Universities'} — UniScholarHub</title>
      </Helmet>

      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Universities', to: '/universities' },
          ...(countryName ? [{ label: countryName }] : []),
        ]}
      />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-ink-900">
          {countryName ? `Universities in ${countryName}` : 'Explore Universities'}
        </h1>
        <button
          onClick={() => setFilterOpen(true)}
          className="btn-secondary lg:hidden"
        >
          <SlidersHorizontal size={16} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Desktop sidebar filters */}
        <aside className="hidden lg:block">
          <FilterPanel
            filters={filters}
            countries={countries}
            onChange={updateFilter}
            hideCountry={Boolean(countryParam)}
          />
        </aside>

        <div>
          {error && <ErrorState onRetry={() => setPage((p) => p)} />}

          {!error && !data && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="h-44" />
              ))}
            </div>
          )}

          {!error && data && data.data.length === 0 && <EmptyState />}

          {!error && data && data.data.length > 0 && (
            <>
              <p className="mb-4 text-sm text-slate-500">{data.pagination.total} universities found</p>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {data.data.map((u) => (
                  <UniversityCard key={u.id} uni={u} />
                ))}
              </div>

              {data.pagination.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  {Array.from({ length: data.pagination.totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`h-9 w-9 rounded-lg text-sm font-semibold ${
                        page === i + 1 ? 'bg-brand-600 text-white' : 'bg-white text-ink-700 hover:bg-slate-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setFilterOpen(false)} />
          <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink-900">Filters</h3>
              <button onClick={() => setFilterOpen(false)} aria-label="Close filters">
                <X size={22} />
              </button>
            </div>
            <FilterPanel
              filters={filters}
              countries={countries}
              onChange={updateFilter}
              hideCountry={Boolean(countryParam)}
            />
            <button className="btn-primary mt-6 w-full" onClick={() => setFilterOpen(false)}>
              Show Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({ filters, countries, onChange, hideCountry }) {
  return (
    <div className="space-y-6">
      {!hideCountry && (
        <FilterGroup label="Country">
          <select
            value={filters.country}
            onChange={(e) => onChange('country', e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </FilterGroup>
      )}

      <FilterGroup label="Scholarship">
        <div className="flex flex-col gap-2 text-sm">
          {[
            { value: '', label: 'All' },
            { value: 'available', label: 'Available' },
            { value: 'unavailable', label: 'Not Available' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="scholarship"
                checked={filters.scholarship === opt.value}
                onChange={() => onChange('scholarship', opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Degree Level">
        <div className="flex flex-col gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="degree" checked={!filters.degree} onChange={() => onChange('degree', '')} />
            All
          </label>
          {degrees.map((d) => (
            <label key={d} className="flex items-center gap-2">
              <input type="radio" name="degree" checked={filters.degree === d} onChange={() => onChange('degree', d)} />
              {d}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Admission Status">
        <div className="flex flex-col gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="admission" checked={!filters.admission} onChange={() => onChange('admission', '')} />
            All
          </label>
          {admissionStatuses.map((s) => (
            <label key={s} className="flex items-center gap-2">
              <input
                type="radio"
                name="admission"
                checked={filters.admission === s}
                onChange={() => onChange('admission', s)}
              />
              {s}
            </label>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      {children}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScholarshipCard from '../components/scholarship/ScholarshipCard.jsx';
import ScholarshipCategory from '../components/scholarship/ScholarshipCategory.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { listScholarships, listScholarshipCategories } from '../services/scholarshipService.js';

export default function Scholarships() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const category = searchParams.get('category') || '';

  useEffect(() => {
    listScholarshipCategories().then((r) => setCategories(r.data)).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setData(null);
    setError(null);
    listScholarships({ category, limit: 30 })
      .then((r) => setData(r))
      .catch((e) => setError(e));
  }, [category]);

  function selectCategory(c) {
    const next = new URLSearchParams(searchParams);
    if (c) next.set('category', c);
    else next.delete('category');
    setSearchParams(next);
  }

  return (
    <div className="container-app py-8">
      <Helmet>
        <title>Scholarships — UniScholarHub</title>
        <meta name="description" content="Browse scholarship categories including government, university, fully-funded and merit-based scholarships." />
      </Helmet>

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Scholarships' }]} />

      <h1 className="mb-2 text-2xl font-extrabold text-ink-900">Scholarships</h1>
      <p className="mb-6 text-sm text-slate-500">Browse scholarship categories and find the right opportunity for you.</p>

      <div className="mb-6">
        <ScholarshipCategory categories={categories} active={category} onSelect={selectCategory} />
      </div>

      {error && <ErrorState />}

      {!error && !data && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      )}

      {!error && data && data.data.length === 0 && <EmptyState />}

      {!error && data && data.data.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((s) => (
            <ScholarshipCard key={s.id} scholarship={s} />
          ))}
        </div>
      )}
    </div>
  );
}

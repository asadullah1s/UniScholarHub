import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CountryCard from '../components/common/CountryCard.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { listCountries } from '../services/countryService.js';

export default function Countries() {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    listCountries().then((r) => setCountries(r.data)).catch(() => setCountries([]));
  }, []);

  return (
    <div className="container-app py-8">
      <Helmet>
        <title>Countries — UniScholarHub</title>
        <meta name="description" content="Browse universities by country from around the world." />
      </Helmet>

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Countries' }]} />
      <h1 className="mb-2 text-2xl font-extrabold text-ink-900">Browse by Country</h1>
      <p className="mb-6 text-sm text-slate-500">Select a country to see universities and scholarships available there.</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {(countries || Array.from({ length: 12 })).map((c, i) =>
          c ? <CountryCard key={c.id} country={c} /> : <Skeleton key={i} className="h-24" />
        )}
      </div>
    </div>
  );
}

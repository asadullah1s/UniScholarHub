import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, GraduationCap, Award, Globe2, FileCheck2, Send } from 'lucide-react';
import SearchBar from '../components/search/SearchBar.jsx';
import CountryCard from '../components/common/CountryCard.jsx';
import UniversityCard from '../components/university/UniversityCard.jsx';
import ScholarshipCard from '../components/scholarship/ScholarshipCard.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import { listCountries } from '../services/countryService.js';
import { listUniversities } from '../services/universityService.js';
import { listScholarships } from '../services/scholarshipService.js';

const degrees = ["Bachelor's", "Master's", 'PhD'];
const fields = ['Medicine', 'Engineering', 'Computer Science', 'Business', 'Education', 'International Relations'];

const howItWorks = [
  { title: 'Choose Country', desc: 'Browse universities by country or region.', icon: Globe2 },
  { title: 'Find Scholarship', desc: 'Filter for universities with scholarships.', icon: Award },
  { title: 'Explore University', desc: 'View programs, fees and requirements.', icon: GraduationCap },
  { title: 'Check Requirements', desc: 'Review eligibility and required documents.', icon: FileCheck2 },
  { title: 'Apply Officially', desc: 'Apply directly on the official website.', icon: Send },
];

export default function Home() {
  const [countries, setCountries] = useState(null);
  const [universities, setUniversities] = useState(null);
  const [scholarships, setScholarships] = useState(null);

  useEffect(() => {
    listCountries().then((r) => setCountries(r.data)).catch(() => setCountries([]));
    listUniversities({ limit: 6 }).then((r) => setUniversities(r.data)).catch(() => setUniversities([]));
    listScholarships({ limit: 3 }).then((r) => setScholarships(r.data)).catch(() => setScholarships([]));
  }, []);

  return (
    <div>
      <Helmet>
        <title>UniScholarHub — Discover Universities. Find Scholarships.</title>
        <meta name="description" content="Explore universities, scholarships, admission requirements, fees and application information from around the world." />
      </Helmet>

      {/* Hero */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container-app py-14 text-center sm:py-20">
          <h1 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
            Find the Right University &amp; Scholarship
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink-700 sm:text-base">
            Explore universities, scholarships, admission requirements, fees and application information from around
            the world.
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Popular countries */}
      <section className="container-app py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink-900">Popular Countries</h2>
          <Link to="/countries" className="flex items-center gap-1 text-sm font-semibold text-brand-600">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {(countries || Array.from({ length: 8 })).map((c, i) =>
            c ? <CountryCard key={c.id} country={c} /> : <Skeleton key={i} className="h-24" />
          )}
        </div>
      </section>

      {/* Featured scholarships */}
      <section className="bg-slate-50 py-12">
        <div className="container-app">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-ink-900">Featured Scholarships</h2>
            <Link to="/scholarships" className="flex items-center gap-1 text-sm font-semibold text-brand-600">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(scholarships || Array.from({ length: 3 })).map((s, i) =>
              s ? <ScholarshipCard key={s.id} scholarship={s} /> : <Skeleton key={i} className="h-40" />
            )}
          </div>
        </div>
      </section>

      {/* Popular universities */}
      <section className="container-app py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink-900">Popular Universities</h2>
          <Link to="/universities" className="flex items-center gap-1 text-sm font-semibold text-brand-600">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(universities || Array.from({ length: 6 })).map((u, i) =>
            u ? <UniversityCard key={u.id} uni={u} /> : <Skeleton key={i} className="h-44" />
          )}
        </div>
      </section>

      {/* Browse by degree / field */}
      <section className="bg-slate-50 py-12">
        <div className="container-app grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-bold text-ink-900">Browse by Degree</h2>
            <div className="flex flex-wrap gap-2">
              {degrees.map((d) => (
                <Link key={d} to={`/universities?degree=${encodeURIComponent(d)}`} className="badge bg-white text-ink-700 shadow-sm hover:text-brand-600">
                  {d}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-ink-900">Browse by Field</h2>
            <div className="flex flex-wrap gap-2">
              {fields.map((f) => (
                <Link key={f} to={`/universities?field=${encodeURIComponent(f)}`} className="badge bg-white text-ink-700 shadow-sm hover:text-brand-600">
                  {f}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container-app py-12">
        <h2 className="mb-6 text-xl font-bold text-ink-900">How It Works</h2>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {howItWorks.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="card p-4 text-center">
                <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={20} />
                </span>
                <p className="text-xs font-semibold text-slate-400">Step {i + 1}</p>
                <p className="mt-1 text-sm font-bold text-ink-900">{step.title}</p>
                <p className="mt-1 text-xs text-slate-500">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

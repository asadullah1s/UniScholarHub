import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, MapPin, CalendarDays, Award, Send } from 'lucide-react';
import UniversityLogo from '../components/university/UniversityLogo.jsx';
import Eligibility from '../components/university/Eligibility.jsx';
import FeeTable from '../components/university/FeeTable.jsx';
import ApplicationSteps from '../components/university/ApplicationSteps.jsx';
import ImportantDates from '../components/university/ImportantDates.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import { getUniversity } from '../services/universityService.js';
import { formatDate, statusStyles } from '../utils/dateUtils.js';

export default function UniversityDetails() {
  const { slug } = useParams();
  const [uni, setUni] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUni(null);
    setError(null);
    getUniversity(slug)
      .then((r) => setUni(r.data))
      .catch((e) => setError(e));
  }, [slug]);

  if (error) {
    return (
      <div className="container-app py-16">
        <ErrorState
          title={error.status === 404 ? 'University Not Found' : 'Something went wrong.'}
          hint={error.status === 404 ? "The university you're looking for could not be found." : 'Please try again.'}
        />
        <div className="mt-6 text-center">
          <Link to="/universities" className="btn-primary">Browse Universities</Link>
        </div>
      </div>
    );
  }

  if (!uni) {
    return (
      <div className="container-app space-y-4 py-8">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-40" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-12">
      <Helmet>
        <title>{uni.name} — Admission, Scholarships, Fees &amp; Application | UniScholarHub</title>
        <meta name="description" content={`Admission requirements, scholarships, fees and application process for ${uni.name} in ${uni.city}, ${uni.countryName}.`} />
      </Helmet>

      <div className="border-b border-slate-100 bg-slate-50">
        <div className="container-app py-6">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Universities', to: '/universities' },
              { label: uni.countryName, to: `/universities/${uni.country}` },
              { label: uni.name },
            ]}
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <UniversityLogo label={uni.logo} size="lg" />
              <div>
                <h1 className="text-xl font-extrabold text-ink-900 sm:text-2xl">{uni.name}</h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={14} /> {uni.city}, {uni.countryName}
                </p>
                <span className={`badge mt-2 ${statusStyles[uni.admissionStatus] || statusStyles.UNKNOWN}`}>
                  {uni.admissionStatus}
                </span>
              </div>
            </div>
            <div className="hidden gap-2 sm:flex">
              <a href={uni.officialWebsite} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Official Website <ExternalLink size={14} />
              </a>
              <a href={uni.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Apply Now <Send size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-app grid gap-10 py-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <Section title="About">
            <p className="text-sm leading-relaxed text-ink-700">{uni.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Fact label="Type" value={uni.type} />
              <Fact label="Founded" value={uni.founded} />
              <Fact label="City" value={uni.city} />
              <Fact label="Country" value={uni.countryName} />
            </div>
          </Section>

          <Section title="Programs">
            <div className="grid gap-3 sm:grid-cols-2">
              {uni.programs.map((p, i) => (
                <div key={i} className="card p-4">
                  <p className="text-sm font-bold text-ink-900">{p.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{p.degree} · {p.duration} · {p.language}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Eligibility Criteria">
            <Eligibility requirements={uni.requirements} />
          </Section>

          {uni.scholarships.length > 0 && (
            <Section title="Available Scholarships" icon={Award}>
              <div className="grid gap-3 sm:grid-cols-2">
                {uni.scholarships.map((s) => (
                  <Link
                    key={s.id}
                    to={`/universities/${uni.country}/${uni.slug}/scholarship/${s.slug}`}
                    className="card flex items-center justify-between p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div>
                      <p className="text-sm font-bold text-ink-900">{s.name}</p>
                      <p className="text-xs text-slate-500">{s.provider}</p>
                    </div>
                    <span className="badge bg-brand-50 text-brand-700">{s.type}</span>
                  </Link>
                ))}
              </div>
            </Section>
          )}

          <Section title="Fee Structure">
            <FeeTable fees={uni.fees} />
          </Section>

          <Section title="Application Process">
            <ApplicationSteps steps={uni.applicationProcess} />
          </Section>

          <Section title="Important Dates" icon={CalendarDays}>
            <ImportantDates openDate={uni.admissionOpenDate} closeDate={uni.admissionCloseDate} />
          </Section>

          <Section title="Official Links">
            <div className="flex flex-wrap gap-3">
              <a href={uni.officialWebsite} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Official Website <ExternalLink size={14} />
              </a>
              {uni.admissionWebsite && (
                <a href={uni.admissionWebsite} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Admissions Page <ExternalLink size={14} />
                </a>
              )}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Source: {uni.source} · Last updated: {formatDate(uni.lastUpdated)}
            </p>
          </Section>
        </div>

        <aside className="hidden lg:block">
          <div className="card sticky top-24 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contact</p>
            <p className="mt-2 text-sm text-ink-800">{uni.contact?.office}</p>
            <p className="text-sm text-brand-600">{uni.contact?.email}</p>
            <a href={uni.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
              Apply Now <Send size={14} />
            </a>
          </div>
        </aside>
      </div>

      {/* Sticky mobile apply button */}
      <div
        className="fixed inset-x-0 bottom-16 z-30 border-t border-slate-100 bg-white/95 p-3 backdrop-blur md:hidden"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <a href={uni.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
          Apply Now <Send size={14} />
        </a>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-bold text-ink-900">{title}</h2>
      {children}
    </section>
  );
}

function Fact({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-ink-900">{value || 'N/A'}</p>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, Award, CheckCircle2, Send } from 'lucide-react';
import UniversityCard from '../components/university/UniversityCard.jsx';
import ApplicationSteps from '../components/university/ApplicationSteps.jsx';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import Skeleton from '../components/common/Skeleton.jsx';
import { getScholarship } from '../services/scholarshipService.js';
import { formatDate } from '../utils/dateUtils.js';

const COVERAGE_LABELS = {
  tuitionFee: 'Tuition Fee',
  accommodation: 'Accommodation',
  monthlyStipend: 'Monthly Stipend',
  medicalInsurance: 'Medical Insurance',
};

export default function ScholarshipDetails() {
  const { slug } = useParams();
  const [sch, setSch] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSch(null);
    setError(null);
    getScholarship(slug)
      .then((r) => setSch(r.data))
      .catch((e) => setError(e));
  }, [slug]);

  if (error) {
    return (
      <div className="container-app py-16">
        <ErrorState
          title={error.status === 404 ? 'Scholarship Not Found' : 'Something went wrong.'}
          hint={error.status === 404 ? "The scholarship you're looking for could not be found." : 'Please try again.'}
        />
        <div className="mt-6 text-center">
          <Link to="/scholarships" className="btn-primary">Browse Scholarships</Link>
        </div>
      </div>
    );
  }

  if (!sch) {
    return (
      <div className="container-app space-y-4 py-8">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  return (
    <div className="pb-16">
      <Helmet>
        <title>{sch.name} — Eligibility, Benefits &amp; Deadline | UniScholarHub</title>
        <meta name="description" content={`${sch.name} offered by ${sch.provider}: eligibility, benefits, deadline and how to apply.`} />
      </Helmet>

      <div className="border-b border-slate-100 bg-slate-50">
        <div className="container-app py-6">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Scholarships', to: '/scholarships' }, { label: sch.name }]} />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Award size={26} />
              </span>
              <div>
                <h1 className="text-xl font-extrabold text-ink-900 sm:text-2xl">{sch.name}</h1>
                <p className="mt-1 text-sm text-slate-500">{sch.provider}</p>
              </div>
            </div>
            {sch.applicationUrl && (
              <a href={sch.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Apply Now <Send size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container-app grid gap-10 py-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          <Section title="Overview">
            <p className="text-sm leading-relaxed text-ink-700">{sch.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(sch.categories || []).map((c) => (
                <span key={c} className="badge bg-slate-100 text-ink-700">{c}</span>
              ))}
            </div>
          </Section>

          <Section title="Coverage">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.entries(COVERAGE_LABELS).map(([key, label]) => (
                <div key={key} className={`card flex flex-col items-center gap-2 p-4 text-center ${sch.coverage?.[key] ? '' : 'opacity-40'}`}>
                  <CheckCircle2 size={20} className={sch.coverage?.[key] ? 'text-emerald-500' : 'text-slate-300'} />
                  <span className="text-xs font-semibold text-ink-800">{label}</span>
                </div>
              ))}
            </div>
            {sch.coverage?.other && <p className="mt-3 text-sm text-slate-500">Also includes: {sch.coverage.other}</p>}
          </Section>

          <Section title="Eligibility">
            <ul className="grid gap-2 sm:grid-cols-2">
              {(sch.eligibility || []).map((e, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-800">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> {e}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Required Documents">
            <ul className="grid gap-2 sm:grid-cols-2">
              {(sch.requirements || []).map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-800">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> {r}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Application Method">
            <ApplicationSteps steps={sch.applicationProcess} />
          </Section>

          {sch.universityDetails?.length > 0 && (
            <Section title="Universities Offering This Scholarship">
              <div className="grid gap-4 sm:grid-cols-2">
                {sch.universityDetails.map((u) => (
                  <UniversityCard
                    key={u.id}
                    uni={{ ...u, hasScholarship: true, admissionStatus: u.admissionStatus || 'UNKNOWN' }}
                  />
                ))}
              </div>
            </Section>
          )}

          <Section title="Official Source">
            {sch.officialWebsite && (
              <a href={sch.officialWebsite} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Official Scholarship Website <ExternalLink size={14} />
              </a>
            )}
            <p className="mt-4 text-xs text-slate-400">
              Source: {sch.source} · Last updated: {formatDate(sch.lastUpdated)}
            </p>
          </Section>
        </div>

        <aside className="hidden lg:block">
          <div className="card sticky top-24 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Deadline</p>
            <p className="mt-1 text-lg font-bold text-ink-900">{formatDate(sch.deadline)}</p>
            {sch.applicationUrl && (
              <a href={sch.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full">
                Apply Now <Send size={14} />
              </a>
            )}
          </div>
        </aside>
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

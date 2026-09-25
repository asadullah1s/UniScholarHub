import { Link } from 'react-router-dom';
import { MapPin, Award, ArrowRight } from 'lucide-react';
import UniversityLogo from './UniversityLogo.jsx';
import { formatDate, statusStyles } from '../../utils/dateUtils.js';

export default function UniversityCard({ uni }) {
  return (
    <Link
      to={`/universities/${uni.country}/${uni.slug}`}
      className="card group flex flex-col gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-lg sm:p-5"
    >
      <div className="flex items-start gap-3">
        <UniversityLogo label={uni.logo} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-ink-900 group-hover:text-brand-700">{uni.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
            <MapPin size={14} /> {uni.city}, {uni.countryName}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {uni.hasScholarship && (
          <span className="badge bg-brand-50 text-brand-700">
            <Award size={12} /> Scholarship Available
          </span>
        )}
        <span className={`badge ${statusStyles[uni.admissionStatus] || statusStyles.UNKNOWN}`}>{uni.admissionStatus}</span>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
        <span className="text-slate-500">Deadline: {formatDate(uni.admissionCloseDate)}</span>
        <span className="flex items-center gap-1 font-semibold text-brand-600">
          View <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

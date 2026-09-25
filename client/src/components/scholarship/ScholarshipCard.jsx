import { Link } from 'react-router-dom';
import { Award, ArrowRight, Globe2 } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils.js';

export default function ScholarshipCard({ scholarship }) {
  return (
    <Link
      to={`/scholarships/${scholarship.slug}`}
      className="card group flex flex-col gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-lg sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <Award size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-ink-900 group-hover:text-brand-700">{scholarship.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
            <Globe2 size={14} /> {scholarship.provider}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(scholarship.categories || []).slice(0, 3).map((c) => (
          <span key={c} className="badge bg-slate-100 text-ink-700">{c}</span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
        <span className="text-slate-500">Deadline: {formatDate(scholarship.deadline)}</span>
        <span className="flex items-center gap-1 font-semibold text-brand-600">
          View <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

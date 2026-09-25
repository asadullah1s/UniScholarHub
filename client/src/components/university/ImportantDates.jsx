import { CalendarClock, CalendarCheck2 } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils.js';

export default function ImportantDates({ openDate, closeDate, extra = [] }) {
  const dates = [
    { label: 'Admission Opens', value: openDate, icon: CalendarClock },
    { label: 'Admission Closes', value: closeDate, icon: CalendarCheck2 },
    ...extra,
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {dates.map((d, i) => {
        const Icon = d.icon || CalendarClock;
        return (
          <div key={i} className="card flex items-center gap-3 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Icon size={18} />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{d.label}</p>
              <p className="text-sm font-semibold text-ink-900">{formatDate(d.value)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

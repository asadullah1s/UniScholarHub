import { SearchX } from 'lucide-react';

export default function EmptyState({ title = 'No results found.', hint = 'Try changing your filters or search terms.' }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
      <SearchX className="mb-3 text-slate-300" size={40} />
      <p className="text-base font-semibold text-ink-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
    </div>
  );
}

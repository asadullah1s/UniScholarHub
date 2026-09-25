import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ title = 'Something went wrong.', hint = 'Please try again.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 py-16 text-center">
      <AlertTriangle className="mb-3 text-red-400" size={40} />
      <p className="text-base font-semibold text-ink-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-4">Try Again</button>
      )}
    </div>
  );
}

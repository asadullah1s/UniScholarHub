import { formatCurrency } from '../../utils/formatCurrency.js';

export default function FeeTable({ fees = [] }) {
  if (!fees.length) {
    return <p className="text-sm text-slate-500">Fee information not available.</p>;
  }

  return (
    <>
      {/* Desktop / tablet: real table, horizontally scrollable if needed */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-100 sm:block">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Fee Type</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Frequency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fees.map((f, i) => (
              <tr key={i}>
                <td className="px-4 py-3 font-medium text-ink-900">{f.type}</td>
                <td className="px-4 py-3 text-ink-700">{formatCurrency(f.amount, f.currency)}</td>
                <td className="px-4 py-3 text-slate-500">{f.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards */}
      <div className="space-y-2 sm:hidden">
        {fees.map((f, i) => (
          <div key={i} className="card flex items-center justify-between p-3">
            <div>
              <p className="text-sm font-semibold text-ink-900">{f.type}</p>
              <p className="text-xs text-slate-500">{f.frequency}</p>
            </div>
            <p className="text-sm font-semibold text-brand-700">{formatCurrency(f.amount, f.currency)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

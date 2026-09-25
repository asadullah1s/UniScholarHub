export default function ApplicationSteps({ steps = [] }) {
  if (!steps.length) {
    return <p className="text-sm text-slate-500">Application process information not available.</p>;
  }

  return (
    <ol className="relative space-y-6 border-l-2 border-brand-100 pl-6">
      {steps.map((step, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
            {i + 1}
          </span>
          <p className="text-sm font-medium text-ink-800">{step}</p>
        </li>
      ))}
    </ol>
  );
}

export default function ScholarshipCategory({ categories = [], active, onSelect }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      <button
        onClick={() => onSelect('')}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
          !active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-ink-700 hover:bg-slate-200'
        }`}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
            active === c ? 'bg-brand-600 text-white' : 'bg-slate-100 text-ink-700 hover:bg-slate-200'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

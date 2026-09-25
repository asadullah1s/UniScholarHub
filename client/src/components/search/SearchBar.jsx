import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar({ placeholder = 'Search universities, countries, scholarships...' }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={submit} className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-card">
      <div className="flex flex-1 items-center gap-2 px-2">
        <Search size={18} className="text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent py-2 text-sm text-ink-900 outline-none placeholder:text-slate-400 sm:text-base"
          aria-label="Search"
        />
      </div>
      <button type="submit" className="btn-primary shrink-0 !px-4 !py-2.5">
        Search
      </button>
    </form>
  );
}

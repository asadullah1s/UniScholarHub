import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { appConfig } from '../../config/appConfig.js';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-100 bg-slate-50 pb-24 pt-12 md:pb-12">
      <div className="container-app grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <GraduationCap size={16} />
            </span>
            <span className="text-base font-extrabold text-ink-900">{appConfig.appName}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-700">{appConfig.tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-900">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li><Link to="/universities" className="hover:text-brand-600">Universities</Link></li>
            <li><Link to="/scholarships" className="hover:text-brand-600">Scholarships</Link></li>
            <li><Link to="/countries" className="hover:text-brand-600">Countries</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-900">Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li><Link to="/contact" className="hover:text-brand-600">Contact</Link></li>
            <li><Link to="/search" className="hover:text-brand-600">Search</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink-900">Important</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li>Information platform only — not affiliated with any university</li>
            <li>Always verify details on the official website before applying</li>
          </ul>
        </div>
      </div>

      <div className="container-app mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500">
        © {appConfig.year} {appConfig.appName}. UniScholarHub is an independent information platform. University
        admission dates, fees, scholarship availability and requirements may change — always verify important
        information on the official university or scholarship provider website before applying.
      </div>
    </footer>
  );
}

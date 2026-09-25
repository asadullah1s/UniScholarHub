import { Helmet } from 'react-helmet-async';
import { Send, Mail } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { appConfig } from '../config/appConfig.js';

export default function Contact() {
  return (
    <div className="container-app py-8">
      <Helmet>
        <title>Contact — UniScholarHub</title>
        <meta name="description" content="Have a question about a university or scholarship? Contact UniScholarHub." />
      </Helmet>

      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

      <div className="mx-auto max-w-lg py-8 text-center">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Mail size={26} />
        </span>
        <h1 className="text-2xl font-extrabold text-ink-900">Contact UniScholarHub</h1>
        <p className="mt-3 text-sm text-ink-700">
          Have a question about a university or scholarship? Reach out and we'll get back to you.
        </p>
        <a href={appConfig.googleFormUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
          Contact Now <Send size={16} />
        </a>
        <p className="mt-6 text-xs text-slate-400">
          UniScholarHub is an independent information platform and is not affiliated with any university or
          scholarship provider. Always verify important information on the official website before applying.
        </p>
      </div>
    </div>
  );
}

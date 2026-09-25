import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-app flex flex-col items-center justify-center py-24 text-center">
      <Helmet>
        <title>Page Not Found — UniScholarHub</title>
      </Helmet>
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Compass size={30} />
      </span>
      <h1 className="text-2xl font-extrabold text-ink-900">Page Not Found</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="btn-primary mt-6">Back to Home</Link>
    </div>
  );
}

const LABELS = {
  academicQualification: 'Academic Qualification',
  minimumGPA: 'Minimum GPA',
  ageRequirement: 'Age Requirement',
  languageRequirement: 'Language Requirement',
  englishProficiency: 'English Proficiency',
  nationalityRequirements: 'Nationality Requirements',
};

export default function Eligibility({ requirements = {} }) {
  const entries = Object.entries(requirements).filter(([key]) => key !== 'requiredDocuments');
  const documents = requirements.requiredDocuments || [];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map(([key, value]) => (
        <div key={key} className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{LABELS[key] || key}</p>
          <p className="mt-1 text-sm text-ink-800">{value || 'Information not available'}</p>
        </div>
      ))}

      {documents.length > 0 && (
        <div className="card p-4 sm:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Required Documents</p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {documents.map((doc, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-800">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {doc}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

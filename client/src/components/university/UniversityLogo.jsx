export default function UniversityLogo({ label, size = 'md' }) {
  const sizes = { sm: 'h-10 w-10 text-xs', md: 'h-14 w-14 text-sm', lg: 'h-20 w-20 text-base' };
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-bold text-white ${sizes[size]}`}
      aria-label={`${label} logo`}
    >
      {label}
    </div>
  );
}

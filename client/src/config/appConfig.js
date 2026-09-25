export const appConfig = {
  appName: 'UniScholarHub',
  tagline: 'Discover Universities. Find Scholarships. Apply with Confidence.',
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  googleFormUrl: import.meta.env.VITE_GOOGLE_FORM_URL || 'https://forms.google.com/your-form-id',
  year: new Date().getFullYear(),
  pageSize: 20,
};

export default appConfig;

// Initialize language system on app load
// This ensures RTL is applied immediately if Arabic is selected

export function initializeLanguage() {
  if (typeof window === 'undefined') return;

  const STORAGE_KEY = 'jmclex_language';
  const stored = localStorage.getItem(STORAGE_KEY);
  const language = (stored === 'EN' || stored === 'FR' || stored === 'AR') ? stored : 'EN';

  const html = document.documentElement;
  if (language === 'AR') {
    html.setAttribute('dir', 'rtl');
    html.classList.add('rtl');
  } else {
    html.setAttribute('dir', 'ltr');
    html.classList.remove('rtl');
  }
}

// Call on page load
if (typeof window !== 'undefined') {
  initializeLanguage();
}

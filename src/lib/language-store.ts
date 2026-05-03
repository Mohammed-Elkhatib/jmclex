// Simple client-side language state management using localStorage
// No external dependencies - pure TypeScript

import { create } from 'zustand';

export type Language = 'EN' | 'FR' | 'AR';

interface LanguageStore {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  getLanguage: () => Language;
}

const STORAGE_KEY = 'jmclex_language';
const DEFAULT_LANGUAGE: Language = 'EN';

// Get initial language from localStorage or default
const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'EN' || stored === 'FR' || stored === 'AR') {
    return stored;
  }
  return DEFAULT_LANGUAGE;
};

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: getInitialLanguage(),
  isRTL: getInitialLanguage() === 'AR',
  
  setLanguage: (lang: Language) => {
    localStorage.setItem(STORAGE_KEY, lang);
    set({ 
      language: lang,
      isRTL: lang === 'AR'
    });
  },
  
  getLanguage: () => get().language,
}));

// Apply RTL to document when language changes
if (typeof window !== 'undefined') {
  useLanguageStore.subscribe((state) => {
    const html = document.documentElement;
    if (state.isRTL) {
      html.setAttribute('dir', 'rtl');
      html.classList.add('rtl');
    } else {
      html.setAttribute('dir', 'ltr');
      html.classList.remove('rtl');
    }
  });
}

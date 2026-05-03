// Hook to use translations in components
import { useLanguageStore } from './language-store';
import { getTranslation } from './translations';

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  
  return {
    language,
    t: (key: string) => getTranslation(language, key),
  };
}

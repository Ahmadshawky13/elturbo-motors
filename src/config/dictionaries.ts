import 'server-only';
import type { Locale } from '@/lib/locale';
import type { Dictionary } from '@/types/dictionary';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ar: () => import('../dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.ar();
};

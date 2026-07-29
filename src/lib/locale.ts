export const locales = ["ar", "en"] as const;
export const defaultLocale = "ar";

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

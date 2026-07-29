import Link from "next/link";
import { getDictionary } from "@/config/dictionaries";
import { defaultLocale } from "@/lib/locale";

/**
 * Rendered for unknown routes under /[lang], including bike slugs that no
 * longer exist. `not-found.tsx` cannot read route params, so it shows both
 * locales rather than guessing which one the visitor wanted.
 */
export default async function NotFound() {
  const ar = await getDictionary("ar");
  const en = await getDictionary("en");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-dark px-6 py-24 text-center">
      <p className="numeric text-7xl font-bold text-primary md:text-9xl">404</p>

      <div className="space-y-2" dir="rtl">
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          {ar.bikes.notFoundTitle}
        </h1>
        <p className="text-light-muted">{ar.bikes.notFoundBody}</p>
      </div>

      <div className="h-px w-24 hairline" />

      <div className="space-y-2" dir="ltr">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          {en.bikes.notFoundTitle}
        </h2>
        <p className="text-light-muted">{en.bikes.notFoundBody}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href={`/${defaultLocale}/bikes`}
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 font-semibold text-white shadow-lg shadow-primary/20 transition-colors duration-300 hover:bg-primary-dark"
        >
          {ar.bikes.viewAll}
        </Link>
        <Link
          href={`/${defaultLocale}`}
          className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 px-8 font-semibold text-white transition-colors duration-300 hover:bg-white/10"
        >
          {ar.nav.home}
        </Link>
      </div>
    </div>
  );
}

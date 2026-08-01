/**
 * Single source of truth for the showroom's contact details.
 * Update the numbers and links here and every page picks them up.
 */
export const site = {
  phoneDisplay: "+20 10 367 02266",
  /** Digits only, international format — used for tel: and wa.me links. */
  phoneRaw: "201036702266",
  whatsappRaw: "201036702266",
  email: "elturbomotors@gmail.com",
  mapsUrl: "https://maps.app.goo.gl/yiGMeZBCs2g1ay9v9",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.9642449590297!2d31.344035100000003!3d30.1238366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815cfa915c3ef%3A0xe6fb8e67b9782a7c!2z2YXYudix2LYg2KfZhNiq2LHYqNmIINmF2YjYqtmI2LHYsg!5e0!3m2!1sen!2seg!4v1785594722391!5m2!1sen!2seg",
  social: {
    facebook: "#",
    instagram: "#",
    tiktok: "#",
  },
} as const;

export const telHref = `tel:+${site.phoneRaw}`;

/** WhatsApp deep link, optionally pre-filled with a message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${site.whatsappRaw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

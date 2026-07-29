/**
 * Single source of truth for the showroom's contact details.
 * Update the numbers and links here and every page picks them up.
 */
export const site = {
  phoneDisplay: "+20 100 000 0000",
  /** Digits only, international format — used for tel: and wa.me links. */
  phoneRaw: "201000000000",
  whatsappRaw: "201000000000",
  email: "info@elturbo.com",
  mapsUrl: "https://maps.google.com/?q=Cairo,Egypt",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.61185043644!2d31.24967!3d30.0444196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg",
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

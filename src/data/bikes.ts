import type { Locale } from "@/lib/locale";

/**
 * Showroom inventory.
 *
 * Everything a bike page renders comes from this file, so the showroom can be
 * updated without touching a component. Text fields carry both locales.
 *
 * NOTE: prices are placeholders (EGP) and the photography is stock imagery from
 * the Unsplash CDN. Replace `price` and `images` with the real values — the
 * pages need no other change.
 */

export type Localized = Record<Locale, string>;

export type BikeCategory =
  | "sport"
  | "naked"
  | "cruiser"
  | "adventure"
  | "scooter";

export interface BikeSpecs {
  /** Displacement in cc, or 0 for electric bikes. */
  engine: Localized;
  power: Localized;
  torque: Localized;
  transmission: Localized;
  fuel: Localized;
  weight: Localized;
  topSpeed: Localized;
  seatHeight: Localized;
  brakes: Localized;
  cooling: Localized;
}

export interface BikeColor {
  name: Localized;
  /** CSS colour used for the swatch. */
  hex: string;
}

export interface Bike {
  slug: string;
  brand: string;
  model: Localized;
  category: BikeCategory;
  /** Model year. */
  year: number;
  /** Price in EGP. */
  price: number;
  /** Short one-liner shown on the card. */
  tagline: Localized;
  description: Localized;
  /** First image is the hero / card image. */
  images: string[];
  specs: BikeSpecs;
  /** Headline numbers rendered as the big stat strip. */
  highlights: {
    displacement: string;
    horsepower: string;
    zeroToHundred: string;
  };
  features: { en: string[]; ar: string[] };
  colors: BikeColor[];
  /** Flags a hand-picked bike for the home page showcase. */
  featured?: boolean;
}

const IMG = "https://images.unsplash.com/photo-";

export const bikes: Bike[] = [
  {
    slug: "ducati-panigale-v4-s",
    brand: "Ducati",
    model: { en: "Panigale V4 S", ar: "بانيجالي V4 S" },
    category: "sport",
    year: 2025,
    price: 1850000,
    tagline: {
      en: "MotoGP technology, road legal",
      ar: "تكنولوجيا الموتو جي بي على الطريق",
    },
    description: {
      en: "The Panigale V4 S is the closest thing to a factory race bike you can legally ride to work. Its 1103cc Desmosedici Stradale V4 revs to 14,500 rpm, while Öhlins semi-active suspension and a full electronics suite keep all 215 horsepower pointed where you want it.",
      ar: "بانيجالي V4 S هي أقرب ما يكون لدراجة سباق مصنعية يمكنك قيادتها بشكل قانوني على الطريق. محرك ديزموسيديتشي سترادالي V4 سعة 1103 سي سي يدور حتى 14,500 لفة، مع نظام تعليق أولينز شبه النشط ومنظومة إلكترونية كاملة تُبقي الـ215 حصاناً تحت السيطرة.",
    },
    images: [
      `${IMG}1615172282427-9a57ef2d142e?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1645818481640-c0be89188521?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1568772585407-9361f9bf3a87?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1606907568152-58fcb0a0a4e5?q=85&w=1600&auto=format&fit=crop`,
    ],
    specs: {
      engine: { en: "1103 cc V4, 4 valves per cylinder", ar: "1103 سي سي V4، ٤ صمامات لكل أسطوانة" },
      power: { en: "215.5 hp @ 13,000 rpm", ar: "215.5 حصان عند 13,000 لفة" },
      torque: { en: "123.6 Nm @ 9,500 rpm", ar: "123.6 نيوتن.متر عند 9,500 لفة" },
      transmission: { en: "6-speed with quickshifter", ar: "٦ سرعات مع كويك شيفتر" },
      fuel: { en: "16 litres", ar: "16 لتر" },
      weight: { en: "195 kg (kerb)", ar: "195 كجم (بالسوائل)" },
      topSpeed: { en: "299 km/h", ar: "299 كم/س" },
      seatHeight: { en: "835 mm", ar: "835 مم" },
      brakes: { en: "Brembo Stylema, cornering ABS", ar: "بريمبو ستايليما مع ABS للمنعطفات" },
      cooling: { en: "Liquid cooled", ar: "تبريد بالسائل" },
    },
    highlights: { displacement: "1103", horsepower: "215", zeroToHundred: "2.8" },
    features: {
      en: [
        "Öhlins NIX-30 semi-active suspension",
        "Six-axis inertial measurement unit",
        "Cornering ABS EVO with slide control",
        "5\" full-TFT racing dashboard",
        "Ducati Quick Shift up/down EVO 2",
        "Three riding modes: Race, Sport, Street",
      ],
      ar: [
        "نظام تعليق أولينز NIX-30 شبه النشط",
        "وحدة قياس بالقصور الذاتي سداسية المحاور",
        "نظام ABS للمنعطفات مع التحكم في الانزلاق",
        "شاشة TFT ملونة ٥ بوصة بنمط السباقات",
        "كويك شيفت دوكاتي صعوداً وهبوطاً EVO 2",
        "ثلاثة أوضاع قيادة: سباق، رياضي، طريق",
      ],
    },
    colors: [
      { name: { en: "Ducati Red", ar: "أحمر دوكاتي" }, hex: "#cc0000" },
      { name: { en: "Winter Test Livery", ar: "طلاء اختبارات الشتاء" }, hex: "#1c1c1c" },
    ],
    featured: true,
  },
  {
    slug: "kawasaki-ninja-zx-6r",
    brand: "Kawasaki",
    model: { en: "Ninja ZX-6R", ar: "نينجا ZX-6R" },
    category: "sport",
    year: 2025,
    price: 890000,
    tagline: {
      en: "The middleweight that owns the track",
      ar: "الوزن المتوسط الذي يسيطر على الحلبة",
    },
    description: {
      en: "A 636cc inline-four that pulls hard from the midrange and screams to redline. The ZX-6R has been the benchmark supersport for two decades because it works everywhere — a Sunday canyon run, a track day, or the commute in between.",
      ar: "محرك رباعي الأسطوانات سعة 636 سي سي يسحب بقوة من الوسط ويصرخ حتى الخط الأحمر. ظلت ZX-6R المعيار في فئة السوبر سبورت لعقدين لأنها تصلح لكل شيء — جولة نهاية الأسبوع، يوم في الحلبة، أو التنقل اليومي.",
    },
    images: [
      `${IMG}1580310614729-ccd69652491d?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1506424482693-1f123321fa53?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1588756681780-9d5859fc2ca0?q=85&w=1600&auto=format&fit=crop`,
    ],
    specs: {
      engine: { en: "636 cc inline-four", ar: "636 سي سي رباعي الأسطوانات" },
      power: { en: "130 hp @ 13,000 rpm", ar: "130 حصان عند 13,000 لفة" },
      torque: { en: "70.8 Nm @ 11,000 rpm", ar: "70.8 نيوتن.متر عند 11,000 لفة" },
      transmission: { en: "6-speed, slipper clutch", ar: "٦ سرعات مع دبرياج انزلاقي" },
      fuel: { en: "17 litres", ar: "17 لتر" },
      weight: { en: "196 kg (kerb)", ar: "196 كجم (بالسوائل)" },
      topSpeed: { en: "250 km/h", ar: "250 كم/س" },
      seatHeight: { en: "830 mm", ar: "830 مم" },
      brakes: { en: "Dual 310 mm discs, ABS", ar: "قرصان أماميان 310 مم مع ABS" },
      cooling: { en: "Liquid cooled", ar: "تبريد بالسائل" },
    },
    highlights: { displacement: "636", horsepower: "130", zeroToHundred: "3.2" },
    features: {
      en: [
        "Kawasaki Traction Control (3 modes)",
        "Showa SFF-BP separate function forks",
        "Kawasaki Quick Shifter",
        "4.3\" TFT colour display with smartphone link",
        "Integrated riding modes",
        "Assist & slipper clutch",
      ],
      ar: [
        "نظام كاواساكي للتحكم في الجر (٣ أوضاع)",
        "مساعدات أمامية شوا SFF-BP",
        "كويك شيفتر كاواساكي",
        "شاشة TFT ملونة 4.3 بوصة مع ربط بالهاتف",
        "أوضاع قيادة متكاملة",
        "دبرياج مساعد وانزلاقي",
      ],
    },
    colors: [
      { name: { en: "Lime Green KRT", ar: "أخضر لايم KRT" }, hex: "#4caf22" },
      { name: { en: "Metallic Graphite", ar: "رمادي جرافيت" }, hex: "#3a3a3c" },
    ],
    featured: true,
  },
  {
    slug: "yamaha-yzf-r6",
    brand: "Yamaha",
    model: { en: "YZF-R6", ar: "YZF-R6" },
    category: "sport",
    year: 2024,
    price: 780000,
    tagline: { en: "Built to chase apexes", ar: "صُنعت لمطاردة المنعطفات" },
    description: {
      en: "The R6 is a scalpel. A 599cc crossplane-inspired inline-four that lives above 10,000 rpm, wrapped in a chassis with genuine R1 DNA. Nothing in the class turns in quite like it.",
      ar: "الـR6 مبضع جراح. محرك رباعي الأسطوانات سعة 599 سي سي يعيش فوق 10,000 لفة، داخل هيكل يحمل جينات R1 الحقيقية. لا شيء في هذه الفئة ينعطف مثلها.",
    },
    images: [
      `${IMG}1609630875171-b1321377ee65?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1547549082-6bc09f2049ae?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1588627541420-fce3f661b779?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1590506995460-d0d9892b54da?q=85&w=1600&auto=format&fit=crop`,
    ],
    specs: {
      engine: { en: "599 cc inline-four", ar: "599 سي سي رباعي الأسطوانات" },
      power: { en: "118 hp @ 14,500 rpm", ar: "118 حصان عند 14,500 لفة" },
      torque: { en: "61.7 Nm @ 10,500 rpm", ar: "61.7 نيوتن.متر عند 10,500 لفة" },
      transmission: { en: "6-speed, quick shifter", ar: "٦ سرعات مع كويك شيفتر" },
      fuel: { en: "17 litres", ar: "17 لتر" },
      weight: { en: "190 kg (kerb)", ar: "190 كجم (بالسوائل)" },
      topSpeed: { en: "260 km/h", ar: "260 كم/س" },
      seatHeight: { en: "850 mm", ar: "850 مم" },
      brakes: { en: "Dual 320 mm discs, ABS", ar: "قرصان أماميان 320 مم مع ABS" },
      cooling: { en: "Liquid cooled", ar: "تبريد بالسائل" },
    },
    highlights: { displacement: "599", horsepower: "118", zeroToHundred: "3.4" },
    features: {
      en: [
        "YCC-T ride-by-wire throttle",
        "Traction control with 6 levels",
        "KYB 43 mm inverted forks",
        "Magnesium subframe",
        "Aerodynamic R1-derived fairing",
        "LCD instrument cluster with lap timer",
      ],
      ar: [
        "دواسة بنزين إلكترونية YCC-T",
        "تحكم في الجر بـ٦ مستويات",
        "مساعدات أمامية مقلوبة KYB 43 مم",
        "هيكل فرعي من المغنيسيوم",
        "هيكل انسيابي مستوحى من R1",
        "لوحة عدادات LCD مع مؤقت اللفات",
      ],
    },
    colors: [
      { name: { en: "Racing Yellow", ar: "أصفر السباقات" }, hex: "#f5c518" },
      { name: { en: "Tech Black", ar: "أسود تِك" }, hex: "#151515" },
      { name: { en: "Team Blue", ar: "أزرق الفريق" }, hex: "#1b4fc4" },
    ],
  },
  {
    slug: "ktm-890-duke-r",
    brand: "KTM",
    model: { en: "890 Duke R", ar: "890 ديوك R" },
    category: "naked",
    year: 2025,
    price: 720000,
    tagline: { en: "The Super Scalpel", ar: "المبضع الخارق" },
    description: {
      en: "889cc of parallel-twin torque in a 166 kg package. The 890 Duke R skips the fairings and the pretence — it is a corner-carving tool with WP Apex suspension and Brembo Stylema brakes as standard.",
      ar: "889 سي سي من عزم المحرك ثنائي الأسطوانات المتوازي في هيكل بوزن 166 كجم. الـ890 ديوك R تتخلى عن الأغطية والتكلف — إنها أداة لنحت المنعطفات مع تعليق WP Apex وفرامل بريمبو ستايليما كتجهيز قياسي.",
    },
    images: [
      `${IMG}1591637333184-19aa84b3e01f?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1572452571879-3d67d5b2a39f?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1449426468159-d96dbf08f19f?q=85&w=1600&auto=format&fit=crop`,
    ],
    specs: {
      engine: { en: "889 cc parallel twin", ar: "889 سي سي ثنائي متوازي" },
      power: { en: "121 hp @ 9,250 rpm", ar: "121 حصان عند 9,250 لفة" },
      torque: { en: "99 Nm @ 7,750 rpm", ar: "99 نيوتن.متر عند 7,750 لفة" },
      transmission: { en: "6-speed, quickshifter+", ar: "٦ سرعات مع كويك شيفتر+" },
      fuel: { en: "14 litres", ar: "14 لتر" },
      weight: { en: "166 kg (dry)", ar: "166 كجم (جاف)" },
      topSpeed: { en: "240 km/h", ar: "240 كم/س" },
      seatHeight: { en: "834 mm", ar: "834 مم" },
      brakes: { en: "Brembo Stylema, cornering ABS", ar: "بريمبو ستايليما مع ABS للمنعطفات" },
      cooling: { en: "Liquid cooled", ar: "تبريد بالسائل" },
    },
    highlights: { displacement: "889", horsepower: "121", zeroToHundred: "3.1" },
    features: {
      en: [
        "WP Apex fully adjustable suspension",
        "Cornering ABS with Supermoto mode",
        "Motor Slip Regulation",
        "Track pack with launch control",
        "Lean-angle sensitive traction control",
        "TFT display with turn-by-turn navigation",
      ],
      ar: [
        "تعليق WP Apex قابل للضبط بالكامل",
        "ABS للمنعطفات مع وضع سوبرموتو",
        "نظام تنظيم انزلاق المحرك",
        "حزمة الحلبة مع التحكم في الانطلاق",
        "تحكم في الجر حساس لزاوية الميل",
        "شاشة TFT مع ملاحة خطوة بخطوة",
      ],
    },
    colors: [
      { name: { en: "Ceramic Black", ar: "أسود سيراميك" }, hex: "#1a1a1a" },
      { name: { en: "KTM Orange", ar: "برتقالي KTM" }, hex: "#ff6600" },
    ],
    featured: true,
  },
  {
    slug: "harley-davidson-livewire",
    brand: "Harley-Davidson",
    model: { en: "LiveWire", ar: "لايف واير" },
    category: "naked",
    year: 2025,
    price: 1450000,
    tagline: { en: "Silent, instant, relentless", ar: "صامتة، فورية، لا تهدأ" },
    description: {
      en: "All 116 Nm available from zero rpm, no gears, no clutch, no noise — just a shove in the back that does not stop until 177 km/h. The LiveWire rewrites what a Harley feels like without losing the presence.",
      ar: "كامل الـ116 نيوتن.متر متاحة من صفر لفة، بلا تروس، بلا دبرياج، بلا ضجيج — مجرد دفعة في الظهر لا تتوقف حتى 177 كم/س. اللايف واير تعيد تعريف إحساس الهارلي دون أن تفقد حضورها.",
    },
    images: [
      `${IMG}1558981403-c5f9899a28bc?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1558980664-10e7170b5df9?q=85&w=1600&auto=format&fit=crop`,
    ],
    specs: {
      engine: { en: "Permanent magnet electric motor", ar: "محرك كهربائي بمغناطيس دائم" },
      power: { en: "105 hp", ar: "105 حصان" },
      torque: { en: "116 Nm from 0 rpm", ar: "116 نيوتن.متر من صفر لفة" },
      transmission: { en: "Single speed, no clutch", ar: "سرعة واحدة بدون دبرياج" },
      fuel: { en: "15.5 kWh battery — 235 km city range", ar: "بطارية 15.5 ك.و.س — مدى 235 كم داخل المدينة" },
      weight: { en: "249 kg (kerb)", ar: "249 كجم (بالسوائل)" },
      topSpeed: { en: "177 km/h", ar: "177 كم/س" },
      seatHeight: { en: "780 mm", ar: "780 مم" },
      brakes: { en: "Brembo monobloc, cornering ABS", ar: "بريمبو مونوبلوك مع ABS للمنعطفات" },
      cooling: { en: "Liquid cooled battery pack", ar: "بطارية مبردة بالسائل" },
    },
    highlights: { displacement: "15.5", horsepower: "105", zeroToHundred: "3.0" },
    features: {
      en: [
        "DC fast charging: 0–80% in 40 minutes",
        "Seven riding modes, four customisable",
        "Showa BFRC-lite rear shock",
        "4.3\" TFT touchscreen",
        "Regenerative braking",
        "Zero scheduled engine maintenance",
      ],
      ar: [
        "شحن سريع DC: من ٠ إلى ٨٠٪ في ٤٠ دقيقة",
        "سبعة أوضاع قيادة، أربعة قابلة للتخصيص",
        "ممتص خلفي شوا BFRC-lite",
        "شاشة تعمل باللمس TFT 4.3 بوصة",
        "فرملة استرجاعية",
        "بدون صيانة دورية للمحرك",
      ],
    },
    colors: [
      { name: { en: "Horizon Orange", ar: "برتقالي الأفق" }, hex: "#d2601a" },
      { name: { en: "Vivid Black", ar: "أسود لامع" }, hex: "#0d0d0d" },
    ],
  },
  {
    slug: "indian-scout-bobber",
    brand: "Indian",
    model: { en: "Scout Bobber", ar: "سكاوت بوبر" },
    category: "cruiser",
    year: 2025,
    price: 1150000,
    tagline: { en: "Stripped down, blacked out", ar: "مجردة من الزوائد، سوداء بالكامل" },
    description: {
      en: "A 1133cc liquid-cooled V-twin with 100 horsepower and a 649 mm seat — low, mean, and far quicker than a cruiser has any right to be. Chopped fenders, bar-end mirrors, and a blacked-out finish throughout.",
      ar: "محرك V-twin سعة 1133 سي سي مبرد بالسائل بقوة 100 حصان وارتفاع مقعد 649 مم — منخفضة، شرسة، وأسرع بكثير مما تسمح به فئة الكروزر. رفارف مقصوصة، مرايا طرفية، وتشطيب أسود بالكامل.",
    },
    images: [
      `${IMG}1559289431-9f12ee08f8b6?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1659465493788-046d031bcd35?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1558981285-6f0c94958bb6?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1558981359-219d6364c9c8?q=85&w=1600&auto=format&fit=crop`,
    ],
    specs: {
      engine: { en: "1133 cc V-twin", ar: "1133 سي سي V-twin" },
      power: { en: "100 hp @ 8,100 rpm", ar: "100 حصان عند 8,100 لفة" },
      torque: { en: "97 Nm @ 5,900 rpm", ar: "97 نيوتن.متر عند 5,900 لفة" },
      transmission: { en: "6-speed", ar: "٦ سرعات" },
      fuel: { en: "12.5 litres", ar: "12.5 لتر" },
      weight: { en: "255 kg (kerb)", ar: "255 كجم (بالسوائل)" },
      topSpeed: { en: "185 km/h", ar: "185 كم/س" },
      seatHeight: { en: "649 mm", ar: "649 مم" },
      brakes: { en: "298 mm single disc, ABS", ar: "قرص أمامي 298 مم مع ABS" },
      cooling: { en: "Liquid cooled", ar: "تبريد بالسائل" },
    },
    highlights: { displacement: "1133", horsepower: "100", zeroToHundred: "4.0" },
    features: {
      en: [
        "Cast aluminium frame",
        "Chopped rear fender and low-rise bars",
        "Bar-end mirrors",
        "Three ride modes",
        "Fully blacked-out finish",
        "LED lighting throughout",
      ],
      ar: [
        "هيكل من الألومنيوم المصبوب",
        "رفرف خلفي مقصوص ومقود منخفض",
        "مرايا طرفية على المقود",
        "ثلاثة أوضاع قيادة",
        "تشطيب أسود بالكامل",
        "إضاءة LED كاملة",
      ],
    },
    colors: [
      { name: { en: "Thunder Black Smoke", ar: "أسود الرعد الدخاني" }, hex: "#191919" },
      { name: { en: "Titanium Smoke", ar: "تيتانيوم دخاني" }, hex: "#71767c" },
    ],
    featured: true,
  },
  {
    slug: "royal-enfield-classic-350",
    brand: "Royal Enfield",
    model: { en: "Classic 350", ar: "كلاسيك 350" },
    category: "cruiser",
    year: 2025,
    price: 295000,
    tagline: { en: "A thump you can feel", ar: "نبضة محرك تشعر بها" },
    description: {
      en: "The long-stroke 349cc single has a rhythm nothing else on the market reproduces. The Classic 350 is not about numbers — it is about riding somewhere slowly and arriving in a better mood than you left.",
      ar: "المحرك الأحادي الأسطوانة طويل المشوار سعة 349 سي سي له إيقاع لا تجده في أي دراجة أخرى. الكلاسيك 350 ليست عن الأرقام — بل عن أن تصل إلى وجهتك على مهل وبمزاج أفضل مما بدأت به.",
    },
    images: [
      `${IMG}1622185135505-2d795003994a?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1531327431456-837da4b1d562?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1596687760372-4c0d266059a7?q=85&w=1600&auto=format&fit=crop`,
    ],
    specs: {
      engine: { en: "349 cc single cylinder", ar: "349 سي سي أحادي الأسطوانة" },
      power: { en: "20.2 hp @ 6,100 rpm", ar: "20.2 حصان عند 6,100 لفة" },
      torque: { en: "27 Nm @ 4,000 rpm", ar: "27 نيوتن.متر عند 4,000 لفة" },
      transmission: { en: "5-speed", ar: "٥ سرعات" },
      fuel: { en: "13 litres", ar: "13 لتر" },
      weight: { en: "195 kg (kerb)", ar: "195 كجم (بالسوائل)" },
      topSpeed: { en: "120 km/h", ar: "120 كم/س" },
      seatHeight: { en: "805 mm", ar: "805 مم" },
      brakes: { en: "300 mm front disc, dual-channel ABS", ar: "قرص أمامي 300 مم مع ABS مزدوج" },
      cooling: { en: "Air-oil cooled", ar: "تبريد بالهواء والزيت" },
    },
    highlights: { displacement: "349", horsepower: "20", zeroToHundred: "7.5" },
    features: {
      en: [
        "Twin downtube spine frame",
        "Tripper turn-by-turn navigation pod",
        "USB charging port",
        "Retro analogue dial with LCD inset",
        "Dual-channel ABS",
        "Low 805 mm seat height",
      ],
      ar: [
        "هيكل بأنبوبين نازلين",
        "وحدة ملاحة Tripper خطوة بخطوة",
        "منفذ شحن USB",
        "عداد تناظري كلاسيكي مع شاشة LCD",
        "نظام ABS مزدوج القنوات",
        "ارتفاع مقعد منخفض 805 مم",
      ],
    },
    colors: [
      { name: { en: "Stealth Black", ar: "أسود ستيلث" }, hex: "#141414" },
      { name: { en: "Chrome Bronze", ar: "برونزي كروم" }, hex: "#8a6b3f" },
      { name: { en: "Commando Sand", ar: "رملي كوماندو" }, hex: "#c2b280" },
    ],
  },
  {
    slug: "honda-africa-twin",
    brand: "Honda",
    model: { en: "CRF1100L Africa Twin", ar: "CRF1100L أفريكا توين" },
    category: "adventure",
    year: 2025,
    price: 1250000,
    tagline: { en: "The road ends. You keep going.", ar: "ينتهي الأسفلت. وأنت تكمل." },
    description: {
      en: "1084cc of parallel-twin adventure with 21-inch front wheel, 230 mm of suspension travel, and a fuel range that clears 400 km. Equally at home crossing the Western Desert or sitting in Cairo traffic.",
      ar: "1084 سي سي من محرك المغامرات ثنائي الأسطوانات، بعجلة أمامية 21 بوصة، ومشوار تعليق 230 مم، ومدى يتجاوز 400 كم بالخزان الواحد. مناسبة تماماً لعبور الصحراء الغربية أو للزحام في القاهرة.",
    },
    images: [
      `${IMG}1575312363468-c8455fb38a76?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1629294148914-678ba902dd49?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1582092722992-b2f960bafbfb?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1666907418714-1b5f85aaf146?q=85&w=1600&auto=format&fit=crop`,
    ],
    specs: {
      engine: { en: "1084 cc parallel twin", ar: "1084 سي سي ثنائي متوازي" },
      power: { en: "101 hp @ 7,500 rpm", ar: "101 حصان عند 7,500 لفة" },
      torque: { en: "105 Nm @ 6,250 rpm", ar: "105 نيوتن.متر عند 6,250 لفة" },
      transmission: { en: "6-speed manual or DCT automatic", ar: "٦ سرعات يدوي أو DCT أوتوماتيك" },
      fuel: { en: "18.8 litres", ar: "18.8 لتر" },
      weight: { en: "226 kg (kerb)", ar: "226 كجم (بالسوائل)" },
      topSpeed: { en: "200 km/h", ar: "200 كم/س" },
      seatHeight: { en: "850–870 mm adjustable", ar: "850–870 مم قابل للتعديل" },
      brakes: { en: "Dual 310 mm discs, switchable ABS", ar: "قرصان 310 مم مع ABS قابل للإيقاف" },
      cooling: { en: "Liquid cooled", ar: "تبريد بالسائل" },
    },
    highlights: { displacement: "1084", horsepower: "101", zeroToHundred: "3.9" },
    features: {
      en: [
        "Six-axis IMU with cornering ABS",
        "Showa 45 mm inverted forks, 230 mm travel",
        "Optional Dual Clutch Transmission",
        "6.5\" touchscreen with Apple CarPlay",
        "Four riding modes plus two user presets",
        "Tubeless spoked wheels, 21\" front",
      ],
      ar: [
        "وحدة IMU سداسية المحاور مع ABS للمنعطفات",
        "مساعدات شوا مقلوبة 45 مم بمشوار 230 مم",
        "ناقل حركة DCT اختياري",
        "شاشة لمس 6.5 بوصة مع Apple CarPlay",
        "أربعة أوضاع قيادة بالإضافة لوضعين مخصصين",
        "عجلات أسلاك بدون أنابيب، أمامية 21 بوصة",
      ],
    },
    colors: [
      { name: { en: "Tricolour", ar: "ثلاثي الألوان" }, hex: "#e8e8e8" },
      { name: { en: "Matte Ballistic Black", ar: "أسود مطفي" }, hex: "#232323" },
    ],
  },
  {
    slug: "vespa-primavera-150",
    brand: "Vespa",
    model: { en: "Primavera 150", ar: "بريمافيرا 150" },
    category: "scooter",
    year: 2025,
    price: 235000,
    tagline: { en: "Seventy years of doing it right", ar: "سبعون عاماً من الإتقان" },
    description: {
      en: "A pressed-steel monocoque body, a 155cc i-get engine, and a shape that has been imitated for seven decades. The Primavera is the easiest, most stylish way through a crowded city.",
      ar: "هيكل مونوكوك من الصلب المكبوس، محرك i-get سعة 155 سي سي، وتصميم ظل يُقلَّد لسبعة عقود. البريمافيرا هي أسهل وأكثر الطرق أناقة للتنقل في مدينة مزدحمة.",
    },
    images: [
      `${IMG}1519750292352-c9fc17322ed7?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1503434396599-58ba8a18d932?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1554223789-df81106a45ed?q=85&w=1600&auto=format&fit=crop`,
      `${IMG}1597755269789-89407cf1a199?q=85&w=1600&auto=format&fit=crop`,
    ],
    specs: {
      engine: { en: "155 cc single, i-get", ar: "155 سي سي أحادي، i-get" },
      power: { en: "12.7 hp @ 7,750 rpm", ar: "12.7 حصان عند 7,750 لفة" },
      torque: { en: "12 Nm @ 6,500 rpm", ar: "12 نيوتن.متر عند 6,500 لفة" },
      transmission: { en: "CVT automatic", ar: "أوتوماتيك CVT" },
      fuel: { en: "8 litres", ar: "8 لتر" },
      weight: { en: "130 kg (kerb)", ar: "130 كجم (بالسوائل)" },
      topSpeed: { en: "93 km/h", ar: "93 كم/س" },
      seatHeight: { en: "780 mm", ar: "780 مم" },
      brakes: { en: "200 mm front disc, ABS", ar: "قرص أمامي 200 مم مع ABS" },
      cooling: { en: "Air cooled", ar: "تبريد بالهواء" },
    },
    highlights: { displacement: "155", horsepower: "13", zeroToHundred: "9.8" },
    features: {
      en: [
        "Pressed-steel monocoque body",
        "Front ABS as standard",
        "LED headlight and tail light",
        "Under-seat storage for a full-face helmet",
        "USB port in the glovebox",
        "Vespa MIA smartphone connectivity",
      ],
      ar: [
        "هيكل مونوكوك من الصلب المكبوس",
        "نظام ABS أمامي قياسي",
        "مصابيح LED أمامية وخلفية",
        "مساحة تخزين تحت المقعد تتسع لخوذة كاملة",
        "منفذ USB داخل صندوق القفازات",
        "نظام Vespa MIA للاتصال بالهاتف",
      ],
    },
    colors: [
      { name: { en: "Rosso Passione", ar: "أحمر باشيوني" }, hex: "#c1272d" },
      { name: { en: "Azzurro Provenza", ar: "أزرق بروفنسا" }, hex: "#5b9bd5" },
      { name: { en: "Arancio Impulsivo", ar: "برتقالي إمبولسيفو" }, hex: "#e2711d" },
    ],
    featured: true,
  },
];

/**
 * Photos for the home-page gallery mosaic. `span` drives the bento layout:
 * "wide" takes two columns, "tall" takes two rows, "big" takes both.
 */
export const showroomGallery: {
  src: string;
  alt: Localized;
  span?: "wide" | "tall" | "big";
}[] = [
  {
    src: `${IMG}1615172282427-9a57ef2d142e?q=85&w=1600&auto=format&fit=crop`,
    alt: { en: "Ducati Panigale V4 in a lit tunnel", ar: "دوكاتي بانيجالي V4 داخل نفق مضاء" },
    span: "big",
  },
  {
    src: `${IMG}1559289431-9f12ee08f8b6?q=85&w=1000&auto=format&fit=crop`,
    alt: { en: "Indian Scout Bobber parked on the street", ar: "إنديان سكاوت بوبر في الشارع" },
    span: "tall",
  },
  {
    src: `${IMG}1609630875171-b1321377ee65?q=85&w=1000&auto=format&fit=crop`,
    alt: { en: "Yamaha YZF-R6 in racing yellow", ar: "ياماها YZF-R6 باللون الأصفر" },
    span: "tall",
  },
  {
    src: `${IMG}1580310614729-ccd69652491d?q=85&w=1200&auto=format&fit=crop`,
    alt: { en: "Kawasaki Ninja in KRT green", ar: "كاواساكي نينجا باللون الأخضر" },
    span: "wide",
  },
  {
    src: `${IMG}1591637333184-19aa84b3e01f?q=85&w=1000&auto=format&fit=crop`,
    alt: { en: "KTM Duke on a forest road", ar: "KTM ديوك على طريق بين الأشجار" },
    span: "tall",
  },
  {
    src: `${IMG}1558981403-c5f9899a28bc?q=85&w=1200&auto=format&fit=crop`,
    alt: { en: "Harley-Davidson LiveWire in Horizon Orange", ar: "هارلي ديفيدسون لايف واير برتقالية" },
    span: "wide",
  },
  {
    src: `${IMG}1519750292352-c9fc17322ed7?q=85&w=1000&auto=format&fit=crop`,
    alt: { en: "Red Vespa scooter by the coast", ar: "سكوتر فيسبا أحمر على الساحل" },
    span: "tall",
  },
  {
    src: `${IMG}1575312363468-c8455fb38a76?q=85&w=1600&auto=format&fit=crop`,
    alt: { en: "Adventure bike under a storm sky", ar: "دراجة مغامرات تحت سماء عاصفة" },
    span: "wide",
  },
  {
    src: `${IMG}1588756681780-9d5859fc2ca0?q=85&w=1200&auto=format&fit=crop`,
    alt: { en: "Rider's view over the handlebars", ar: "منظر الراكب من فوق المقود" },
  },
  {
    src: `${IMG}1531327431456-837da4b1d562?q=85&w=1000&auto=format&fit=crop`,
    alt: { en: "Café racer at sunset", ar: "كافيه ريسر عند الغروب" },
    span: "tall",
  },
  {
    src: `${IMG}1558618666-fcd25c85cd64?q=85&w=1200&auto=format&fit=crop`,
    alt: { en: "Technician working in the workshop", ar: "فني أثناء العمل في الورشة" },
  },
  {
    src: `${IMG}1622185135505-2d795003994a?q=85&w=1200&auto=format&fit=crop`,
    alt: { en: "Royal Enfield Classic under a grey sky", ar: "رويال إنفيلد كلاسيك تحت سماء رمادية" },
    span: "wide",
  },
  {
    src: `${IMG}1606907568152-58fcb0a0a4e5?q=85&w=1000&auto=format&fit=crop`,
    alt: { en: "Rider on a sportbike surrounded by smoke", ar: "راكب على دراجة رياضية وسط الدخان" },
    span: "tall",
  },
  {
    src: `${IMG}1503434396599-58ba8a18d932?q=85&w=1200&auto=format&fit=crop`,
    alt: { en: "Blue Vespa against a yellow wall", ar: "فيسبا زرقاء أمام جدار أصفر" },
  },
];

export const categories: BikeCategory[] = [
  "sport",
  "naked",
  "cruiser",
  "adventure",
  "scooter",
];

export function getBike(slug: string): Bike | undefined {
  return bikes.find((bike) => bike.slug === slug);
}

export function getFeaturedBikes(): Bike[] {
  return bikes.filter((bike) => bike.featured);
}

/** Other bikes to suggest, preferring the same category. */
export function getRelatedBikes(bike: Bike, limit = 3): Bike[] {
  const sameCategory = bikes.filter(
    (candidate) =>
      candidate.slug !== bike.slug && candidate.category === bike.category
  );
  const rest = bikes.filter(
    (candidate) =>
      candidate.slug !== bike.slug && candidate.category !== bike.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatPrice(price: number, lang: Locale): string {
  return new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(price);
}

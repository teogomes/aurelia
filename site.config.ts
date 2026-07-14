/**
 * Aurelia — Κέντρο Άκρων
 * ─────────────────────────────────────────────────────────────
 * EVERYTHING the client can change lives in this one file.
 * No other file needs to be touched to update copy, links,
 * services, testimonials, hours or contact details.
 */

export type Locale = "el" | "en";
export type L10n = Record<Locale, string>;

export const site = {
  /* ── Identity ─────────────────────────────────────────── */
  name: "Aurelia",
  subname: {
    el: "Κέντρο Άκρων",
    en: "Foot & Nail Centre",
  } satisfies L10n,
  practitioner: "Adelma M. Oliveira",
  badge: {
    el: "Ποδολογικό",
    en: "Podology",
  } satisfies L10n,

  /* ── Booking ──────────────────────────────────────────── */
  // ⚠️ REPLACE with the real Setmore booking link.
  bookingUrl: "https://booking.setmore.com/scheduleappointment/REPLACE-ME",

  /* ── Contact ──────────────────────────────────────────── */
  phones: ["2160012467", "6940818680"],
  email: "mariapodologiko@gmail.com",

  address: {
    street: "Κολοκοτρώνη 26",
    postal: "14232",
    area: {
      el: "Περισσός, Νέα Ιωνία",
      en: "Perissos, Nea Ionia",
    } satisfies L10n,
    // Used for the "Get directions" link + the embedded map query.
    mapQuery: "Κολοκοτρώνη 26, Περισσός 142 32, Νέα Ιωνία",
  },

  /* ── Social ───────────────────────────────────────────── */
  social: {
    instagram: {
      handle: "aurelia_kentro_akron",
      url: "https://www.instagram.com/aurelia_kentro_akron/",
    },
    facebook: {
      handle: "Aurelia Kentro Akron",
      url: "https://www.facebook.com/people/Aurelia-Kentro-Akron/",
    },
  },

  /* ── Opening hours ────────────────────────────────────── */
  // ⚠️ CONFIRM these with the client — placeholder values.
  hours: [
    { day: { el: "Δευτέρα – Παρασκευή", en: "Monday – Friday" }, time: "09:00 – 21:00" },
    { day: { el: "Σάββατο", en: "Saturday" }, time: "09:00 – 15:00" },
    { day: { el: "Κυριακή", en: "Sunday" }, time: { el: "Κλειστά", en: "Closed" } },
  ] as { day: L10n; time: string | L10n }[],
} as const;

/* ── Services (taken from the price list — NO prices shown) ── */
export type Service = {
  id: string;
  title: L10n;
  blurb: L10n;
};

export const services: Service[] = [
  {
    id: "therapeutic-pedicure",
    title: { el: "Θεραπευτικό πεντικιούρ", en: "Therapeutic pedicure" },
    blurb: {
      el: "Ολοκληρωμένη κλινική περιποίηση του πέλματος και των νυχιών, με αποστειρωμένα εργαλεία και ιατρική προσέγγιση.",
      en: "A complete clinical treatment of the sole and nails, with sterilised instruments and a medical approach.",
    },
  },
  {
    id: "nail-fungus",
    title: { el: "Μυκητίαση νυχιών", en: "Nail fungus" },
    blurb: {
      el: "Διάγνωση και θεραπεία ονυχομυκητίασης — λείανση, τοπική αγωγή και παρακολούθηση μέχρι το νύχι να ξαναγεννηθεί καθαρό.",
      en: "Diagnosis and treatment of onychomycosis — debridement, topical therapy and follow-up until the nail grows back clear.",
    },
  },
  {
    id: "callus",
    title: { el: "Καθαρισμός κάλου", en: "Callus removal" },
    blurb: {
      el: "Ανώδυνη αφαίρεση κάλων και σκληρύνσεων που επιστρέφει την άνεση στο βήμα σας από την πρώτη μέρα.",
      en: "Painless removal of corns and hardened skin that gives your step back its comfort from day one.",
    },
  },
  {
    id: "ingrown",
    title: { el: "Ονυχοκρύπτωση", en: "Ingrown toenail" },
    blurb: {
      el: "Ανακούφιση από το πονεμένο νύχι που μπαίνει στο δέρμα — αντιμετώπιση σε κάθε στάδιο, χωρίς νυστέρι.",
      en: "Relief from the painful nail growing into the skin — treated at every stage, without a scalpel.",
    },
  },
  {
    id: "orthonyxia",
    title: { el: "Ορθονυχία", en: "Nail bracing (orthonyxia)" },
    blurb: {
      el: "Τοποθέτηση νάρθηκα που διορθώνει σταδιακά την καμπυλότητα του νυχιού και προλαμβάνει την υποτροπή.",
      en: "A brace that gradually corrects the curvature of the nail and prevents the problem from returning.",
    },
  },
  {
    id: "orthonyxia-maintenance",
    title: { el: "Συντήρηση ορθονυχίας", en: "Brace maintenance" },
    blurb: {
      el: "Τακτικός έλεγχος και επαναρύθμιση του νάρθηκα, ώστε η διόρθωση να συνεχίζεται σωστά.",
      en: "Regular checks and re-adjustment of the brace, so the correction keeps progressing as it should.",
    },
  },
  {
    id: "nail-involution",
    title: { el: "Θεραπεία είσφρυσης νυχιών", en: "Involuted nail therapy" },
    blurb: {
      el: "Ειδική αγωγή για νύχια που γυρίζουν προς τα μέσα και πιέζουν το πλάγιο τοίχωμα του δακτύλου.",
      en: "Targeted therapy for nails that curl inward and press against the side wall of the toe.",
    },
  },
];

/* ── Testimonials ─────────────────────────────────────────── */
// ⚠️ PLACEHOLDER reviews — swap for real Google / Facebook reviews.
export type Testimonial = {
  id: string;
  name: string;
  role: L10n;
  quote: L10n;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Optional /public path. Falls back to a monogram if omitted. */
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Μαρία Κ.",
    role: { el: "Θεραπευτικό πεντικιούρ", en: "Therapeutic pedicure" },
    rating: 5,
    quote: {
      el: "Πήγα με πόνο δύο χρόνων και έφυγα περπατώντας κανονικά. Η Adelma εξηγεί τα πάντα βήμα-βήμα και δεν βιάζεται ποτέ.",
      en: "I walked in with two years of pain and walked out normally. Adelma explains everything step by step and never rushes.",
    },
  },
  {
    id: "t2",
    name: "Γιώργος Π.",
    role: { el: "Ονυχοκρύπτωση", en: "Ingrown toenail" },
    rating: 5,
    quote: {
      el: "Φοβόμουν ότι θα χρειαστεί χειρουργείο. Τελικά τρεις συνεδρίες και τέλος. Απόλυτη καθαριότητα στον χώρο.",
      en: "I was terrified I'd need surgery. Three sessions and it was over. The space is spotless.",
    },
  },
  {
    id: "t3",
    name: "Ελένη Δ.",
    role: { el: "Ορθονυχία", en: "Nail bracing" },
    rating: 5,
    quote: {
      el: "Ο νάρθηκας δούλεψε ακριβώς όπως μου τον περιέγραψε. Επιτέλους φοράω κλειστά παπούτσια χωρίς να μετράω τις ώρες.",
      en: "The brace worked exactly as described. I finally wear closed shoes without counting the hours.",
    },
  },
  {
    id: "t4",
    name: "Νίκος Α.",
    role: { el: "Μυκητίαση νυχιών", en: "Nail fungus" },
    rating: 5,
    quote: {
      el: "Είχα δοκιμάσει τα πάντα από το φαρμακείο. Εδώ βρήκα σοβαρή διάγνωση και πρόγραμμα. Το νύχι ξαναβγήκε καθαρό.",
      en: "I had tried everything from the pharmacy. Here I found a real diagnosis and a plan. The nail grew back clear.",
    },
  },
  {
    id: "t5",
    name: "Σοφία Μ.",
    role: { el: "Καθαρισμός κάλου", en: "Callus removal" },
    rating: 5,
    quote: {
      el: "Στέκομαι όρθια δέκα ώρες τη μέρα. Πηγαίνω κάθε δύο μήνες και είναι το καλύτερο δώρο που κάνω στον εαυτό μου.",
      en: "I'm on my feet ten hours a day. I go every two months and it's the best gift I give myself.",
    },
  },
];

/* ── Page copy ────────────────────────────────────────────── */
export const copy = {
  nav: {
    services: { el: "Υπηρεσίες", en: "Services" },
    about: { el: "Το κέντρο", en: "The centre" },
    testimonials: { el: "Μαρτυρίες", en: "Stories" },
    book: { el: "Κλείσε ραντεβού", en: "Book now" },
  },
  hero: {
    eyebrow: { el: "Ποδολογικό Κέντρο · Περισσός", en: "Podology Centre · Perissos" },
    headline: {
      el: "Κάθε βήμα\nξεκινά από τα\nάκρα σου.",
      en: "Every step\nbegins at\nyour feet.",
    },
    sub: {
      el: "Κλινική ποδολογία με ιατρική ακρίβεια και ανθρώπινη φροντίδα. Από την ονυχοκρύπτωση μέχρι την ορθονυχία — ανώδυνα, αποστειρωμένα, με πρόγραμμα.",
      en: "Clinical podology with medical precision and human care. From ingrown nails to nail bracing — painless, sterile, and always with a plan.",
    },
    cta: { el: "Κλείσε ραντεβού", en: "Book an appointment" },
    ctaAlt: { el: "Δες τις υπηρεσίες", en: "See what we treat" },
    stats: [
      { value: "7", label: { el: "Θεραπείες άκρων", en: "Foot treatments" } },
      { value: "100%", label: { el: "Αποστειρωμένα εργαλεία", en: "Sterilised tools" } },
      { value: "1:1", label: { el: "Προσωπικό ραντεβού", en: "Private appointment" } },
    ],
  },
  services: {
    eyebrow: { el: "Τι αντιμετωπίζουμε", en: "What we treat" },
    title: { el: "Μόνο πόδια.\nΜόνο σωστά.", en: "Only feet.\nDone properly." },
    lede: {
      el: "Δεν είμαστε ινστιτούτο αισθητικής. Είμαστε ποδολογικό κέντρο — κάθε θεραπεία έχει διάγνωση, πρωτόκολλο και συνέχεια.",
      en: "We are not a beauty salon. We are a podology centre — every treatment has a diagnosis, a protocol and a follow-up.",
    },
    note: {
      el: "Δεν είσαι σίγουρος τι χρειάζεσαι; Κλείσε ραντεβού και το βρίσκουμε μαζί.",
      en: "Not sure what you need? Book a visit and we'll work it out together.",
    },
  },
  about: {
    eyebrow: { el: "Το κέντρο", en: "The centre" },
    title: { el: "Θα μας βρεις στον Περισσό.", en: "Find us in Perissos." },
    body: {
      el: "Ένας ήσυχος, φωτεινός χώρος αφιερωμένος αποκλειστικά στην υγεία των άκρων. Κάθε ραντεβού είναι προσωπικό: χωρίς αναμονή, χωρίς κόσμο, με χρόνο να ακουστεί το ιστορικό σου. Όλα τα εργαλεία αποστειρώνονται σε κλίβανο πριν από κάθε συνεδρία.",
      en: "A quiet, light-filled space dedicated entirely to the health of your feet. Every appointment is private: no waiting room, no crowd, and enough time for your history to actually be heard. Every instrument is autoclave-sterilised before each session.",
    },
    directions: { el: "Οδηγίες πρόσβασης", en: "Get directions" },
    hoursTitle: { el: "Ώρες λειτουργίας", en: "Opening hours" },
    contactTitle: { el: "Επικοινωνία", en: "Get in touch" },
  },
  testimonials: {
    eyebrow: { el: "Μαρτυρίες", en: "Stories" },
    title: { el: "Ό,τι λένε\nμετά το πρώτο βήμα.", en: "What they say\nafter the first step." },
    hint: { el: "Σύρε, ή χρησιμοποίησε τα βέλη", en: "Drag, or use the arrows" },
  },
  footer: {
    tagline: {
      el: "Ποδολογικό κέντρο · Adelma M. Oliveira",
      en: "Podology centre · Adelma M. Oliveira",
    },
    rights: { el: "Με επιφύλαξη παντός δικαιώματος.", en: "All rights reserved." },
  },
} as const;

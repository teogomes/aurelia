type P = { className?: string };

export const InstagramIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M14 9V7.2c0-.9.2-1.3 1.4-1.3H17V3h-2.6C11.6 3 10.5 4.4 10.5 7v2H8.5v3h2V21h3.5v-9h2.4l.4-3H14Z" />
  </svg>
);

export const PinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path d="M12 21s7-5.2 7-10.5A7 7 0 0 0 5 10.5C5 15.8 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.5" />
  </svg>
);

export const PhoneIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path d="M6.5 3h3l1.5 4.5-2 1.4a12 12 0 0 0 5.6 5.6l1.4-2L20.5 14v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  </svg>
);

export const MailIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 5.5L20 7" />
  </svg>
);

export const StarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8L12 3Z" />
  </svg>
);

export const ArrowIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

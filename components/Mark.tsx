/**
 * PLACEHOLDER LOGO MARK.
 * A hand-traced stand-in for the real Aurelia mark: the footprint
 * with the orbit looping around it. Drop the client's real SVG in
 * /public/logo-mark.svg and swap this component's usage for an
 * <Image>, or paste the real paths in here — the API stays the same.
 *
 * Everything inherits `currentColor`, so it works on teal or on bone.
 */
export function Mark({
  className = "",
  spin = false,
}: {
  className?: string;
  /** Slowly rotate the orbit ring — used in the hero. */
  spin?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label="Aurelia"
    >
      {/* Orbit — back half, passes behind the heel */}
      <g
        style={
          spin
            ? { transformOrigin: "50px 55px", animation: "orbit-spin 34s linear infinite" }
            : undefined
        }
      >
        <ellipse
          cx="50"
          cy="55"
          rx="42"
          ry="17"
          transform="rotate(-18 50 55)"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.55"
        />
        <ellipse
          cx="50"
          cy="55"
          rx="36"
          ry="12"
          transform="rotate(-24 50 55)"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
      </g>

      {/* Sole */}
      <path
        d="M34 44c-8 8-7 20-2 30 4 9 12 14 19 10 7-4 7-14 5-24-2-10-4-16-10-18-5-2-9-1-12 2Z"
        fill="currentColor"
        opacity="0.85"
      />

      {/* Toes — big to little */}
      <ellipse cx="35" cy="28" rx="7" ry="9.5" transform="rotate(-8 35 28)" fill="currentColor" opacity="0.85" />
      <ellipse cx="48" cy="23" rx="5" ry="7" transform="rotate(6 48 23)" fill="currentColor" opacity="0.85" />
      <ellipse cx="57.5" cy="25" rx="4.4" ry="6" transform="rotate(12 57.5 25)" fill="currentColor" opacity="0.85" />
      <ellipse cx="65.5" cy="29" rx="3.9" ry="5.2" transform="rotate(18 65.5 29)" fill="currentColor" opacity="0.85" />
      <ellipse cx="72" cy="34.5" rx="3.3" ry="4.4" transform="rotate(24 72 34.5)" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

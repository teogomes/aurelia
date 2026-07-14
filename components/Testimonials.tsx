"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "./Reveal";
import { StarIcon, ArrowIcon } from "./icons";
import { useLang } from "@/lib/i18n";
import { copy, testimonials, type Testimonial } from "@/site.config";

/* ══════════════════════════════════════════════════════════════
   THE ORBIT OF FACES
   The logo's ring, turned into the navigation itself. Each patient
   sits on the ellipse; the one at the front is the one speaking.
   Drag the ring, click a face, or use ← →. It rotates on its own
   until you touch it.
   ══════════════════════════════════════════════════════════════ */

const N = testimonials.length;
const STEP = 360 / N;
const FRONT = 90; // bottom of the ellipse = closest to the viewer
const AUTOPLAY_MS = 6500;

/** Where index `i` sits on the ring, before rotation. */
const seat = (i: number) => i * STEP;

/** Rotation that brings `i` to the front, taken the short way round. */
function nearestRotationFor(i: number, current: number) {
  const raw = FRONT - seat(i);
  const turns = Math.round((current - raw) / 360);
  return raw + turns * 360;
}

export function Testimonials() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false); // user took over → stop autoplay
  const [paused, setPaused] = useState(false);

  const rot = useMotionValue(FRONT); // degrees
  const smooth = useSpring(rot, { stiffness: 55, damping: 16, mass: 0.9 });

  const drag = useRef<{ startX: number; startRot: number } | null>(null);

  const goTo = useCallback(
    (i: number) => {
      const next = ((i % N) + N) % N;
      rot.set(nearestRotationFor(next, rot.get()));
      setIndex(next);
    },
    [rot],
  );

  /* Autoplay — a slow, unhurried turn. Dies the moment you interact. */
  useEffect(() => {
    if (engaged || paused) return;
    const id = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, engaged, paused, goTo]);

  /* Keyboard */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setEngaged(true);
      goTo(index + 1);
    }
    if (e.key === "ArrowLeft") {
      setEngaged(true);
      goTo(index - 1);
    }
  };

  /* Pointer drag — spin the ring with your finger */
  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startRot: smooth.get() };
    setEngaged(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    rot.set(drag.current.startRot + dx * 0.45);
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    // Snap to whichever face is closest to the front.
    const r = rot.get();
    const nearest = Math.round((FRONT - r) / STEP);
    goTo(((nearest % N) + N) % N);
  };

  const active = testimonials[index];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-bone py-24 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* A pale wash so the ring has something to float on */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 78% 62%, rgba(195,227,236,0.55), transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-[var(--shell)] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-teal-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500" />
            {t(copy.testimonials.eyebrow)}
          </p>
          <h2 className="mt-5 max-w-2xl display text-[clamp(2.3rem,5vw,4rem)] leading-[1.02]">
            {t(copy.testimonials.title)
              .split("\n")
              .map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-14 md:mt-20 md:grid-cols-[1fr_1fr] md:gap-8">
          {/* ── The quote ───────────────────────────────────── */}
          <div className="relative min-h-[19rem]">
            {/* One enormous quotation mark, set in the wordmark serif. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-3 -top-24 select-none serif text-[13rem] leading-none text-teal-500/10 md:-top-28 md:text-[17rem]"
            >
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.figure
                key={active.id}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex gap-1 text-teal-500">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5" />
                  ))}
                </div>

                <blockquote className="mt-6 text-[clamp(1.5rem,2.6vw,2.2rem)] font-light leading-[1.38] tracking-[-0.02em] text-teal-900">
                  {t(active.quote)}
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-teal-500/50" />
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-teal-900">
                      {active.name}
                    </p>
                    <p className="mt-0.5 text-[0.75rem] uppercase tracking-[0.16em] text-teal-600/70">
                      {t(active.role)}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Counter + autoplay progress */}
            <div className="mt-10 flex items-center gap-4">
              <span className="font-mono text-xs tracking-[0.2em] text-teal-900/45">
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1.5 opacity-40">/</span>
                {String(N).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-teal-500/15">
                <motion.div
                  key={`${index}-${engaged}-${paused}`}
                  className="h-px bg-teal-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: engaged || paused ? 0 : 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
              <p className="hidden text-[0.68rem] uppercase tracking-[0.16em] text-teal-900/35 sm:block">
                {t(copy.testimonials.hint)}
              </p>
            </div>
          </div>

          {/* ── The ring ────────────────────────────────────── */}
          <div className="relative">
          <div
            role="listbox"
            tabIndex={0}
            aria-label="Testimonials"
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative mx-auto aspect-square w-full max-w-[32rem] cursor-grab touch-pan-y select-none active:cursor-grabbing"
          >
            {/* Static guide ellipses — the orbit, drawn */}
            <svg
              aria-hidden
              viewBox="0 0 400 400"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <ellipse
                cx="200"
                cy="200"
                rx="160"
                ry="88"
                fill="none"
                stroke="rgba(30,156,168,0.30)"
                strokeWidth="1.2"
              />
              <ellipse
                cx="200"
                cy="200"
                rx="122"
                ry="64"
                fill="none"
                stroke="rgba(30,156,168,0.16)"
                strokeWidth="1"
                strokeDasharray="3 6"
              />
            </svg>

            {/* Centre disc — the still point the ring turns against. */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 grid h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-teal-500 shadow-[0_18px_44px_-18px_rgba(30,156,168,0.85)]">
              <span className="wordmark text-[0.5rem] text-white">AURELIA</span>
            </div>

            {testimonials.map((tst, i) => (
              <OrbitFace
                key={tst.id}
                data={tst}
                seatAngle={seat(i)}
                rot={smooth}
                active={i === index}
                onSelect={() => {
                  setEngaged(true);
                  goTo(i);
                }}
              />
            ))}
          </div>

            {/* Arrows. Below the ring rather than flanking it — at the
                ellipse's widest points the faces already reach the
                container edge, and arrows there would swallow clicks. */}
            <div className="-mt-2 flex items-center justify-center gap-4">
              <Arrow
                dir="prev"
                label={t({ el: "Προηγούμενη", en: "Previous" })}
                onClick={() => {
                  setEngaged(true);
                  goTo(index - 1);
                }}
              />

              {/* Dots — position at a glance, and a third way in */}
              <div className="flex items-center gap-2">
                {testimonials.map((tst, i) => (
                  <button
                    key={tst.id}
                    type="button"
                    aria-label={tst.name}
                    onClick={() => {
                      setEngaged(true);
                      goTo(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
                      i === index
                        ? "w-7 bg-teal-500"
                        : "w-1.5 bg-teal-500/25 hover:bg-teal-500/50"
                    }`}
                  />
                ))}
              </div>

              <Arrow
                dir="next"
                label={t({ el: "Επόμενη", en: "Next" })}
                onClick={() => {
                  setEngaged(true);
                  goTo(index + 1);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Prev / next ──────────────────────────────────────────────── */
function Arrow({
  dir,
  label,
  onClick,
}: {
  dir: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="group pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-white text-teal-700 shadow-[0_10px_30px_-12px_rgba(15,49,56,0.45)] ring-1 ring-teal-500/15 transition-all duration-500 ease-[var(--ease-out-expo)] hover:bg-teal-500 hover:text-white hover:shadow-[0_16px_40px_-12px_rgba(30,156,168,0.8)] active:scale-95"
    >
      <ArrowIcon
        className={`h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          dir === "prev"
            ? "rotate-180 group-hover:-translate-x-0.5"
            : "group-hover:translate-x-0.5"
        }`}
      />
    </button>
  );
}

/* ── One face, riding the ellipse ─────────────────────────────── */
function OrbitFace({
  data,
  seatAngle,
  rot,
  active,
  onSelect,
}: {
  data: Testimonial;
  seatAngle: number;
  rot: MotionValue<number>;
  active: boolean;
  onSelect: () => void;
}) {
  /* Radii as a fraction of the CONTAINER — they must match the guide
     ellipse (rx 160/400, ry 88/400 of the viewBox).

     A percentage in a `transform: translate()` resolves against the
     element's OWN box, not its parent's — so the offset is applied to
     a full-bleed wrapper (same size as the ring) and the face is
     centred inside it. The wrapper carries position, the face carries
     depth. */
  const RX = 40; // %
  const RY = 22; // %

  const theta = useTransform(rot, (r) => ((seatAngle + r) * Math.PI) / 180);
  const x = useTransform(theta, (a) => `${RX * Math.cos(a)}%`);
  const y = useTransform(theta, (a) => `${RY * Math.sin(a)}%`);
  // sin = +1 at the front, -1 at the back. Everything else reads off it.
  const depth = useTransform(theta, (a) => Math.sin(a));
  const scale = useTransform(depth, [-1, 1], [0.6, 1.12]);
  const opacity = useTransform(depth, [-1, 0, 1], [0.28, 0.6, 1]);
  const filter = useTransform(depth, (d) => `blur(${(1 - (d + 1) / 2) * 2.6}px)`);
  const zIndex = useTransform(depth, (d) => Math.round(d * 100) + 100);

  const initials = data.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      style={{ x, y, zIndex }}
      className="pointer-events-none absolute inset-0"
    >
      <motion.button
        type="button"
        role="option"
        aria-selected={active}
        aria-label={data.name}
        onClick={onSelect}
        style={{ scale, opacity, filter }}
        className="pointer-events-auto absolute left-1/2 top-1/2 -ml-10 -mt-10 h-20 w-20 rounded-full outline-none"
      >
      {/* Avatar. ⚠️ PLACEHOLDER — monogram until real photos exist.
          Set `avatar` on the testimonial in site.config.ts to use one. */}
      <span
        className={`grid h-full w-full place-items-center overflow-hidden rounded-full text-base font-semibold tracking-wide transition-[box-shadow,background-color] duration-500 ${
          active
            ? "bg-teal-500 text-white shadow-[0_16px_40px_-12px_rgba(30,156,168,0.95)]"
            : "bg-white text-teal-700 shadow-[0_8px_24px_-12px_rgba(15,49,56,0.5)]"
        }`}
        style={
          data.avatar
            ? {
                backgroundImage: `url(${data.avatar})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {!data.avatar && initials}
      </span>

        {/* The speaking face gets its own little orbit — the logo, again */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -inset-2.5 rounded-full border border-teal-500/40 transition-opacity duration-500 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          aria-hidden
          className={`pointer-events-none absolute -inset-2.5 rounded-full transition-opacity duration-500 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            border: "1.5px solid transparent",
            borderTopColor: "var(--color-teal-500)",
            animation: active ? "orbit-spin 3.5s linear infinite" : undefined,
          }}
        />
      </motion.button>
    </motion.div>
  );
}

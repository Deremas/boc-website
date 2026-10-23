import { useEffect, useId, useState, type CSSProperties } from "react";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
};

/** Seconds between each testimonial advance (home + marketing). */
export const TESTIMONIAL_INTERVAL_MS = 4000;
const MAX_VISIBLE = 3;

function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7 4.5v15l12-7.5L7 4.5z" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 5l-7 7 7 7"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function columnsFor(width: number, rail: boolean) {
  if (rail) {
    if (width >= 1100) return 2;
    return 1;
  }
  if (width >= 1100) return 3;
  if (width >= 760) return 2;
  return 1;
}

function useFineHover() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFine(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return fine;
}

export default function TestimonialCarousel({
  items,
  interval = TESTIMONIAL_INTERVAL_MS,
  showAllFrom,
  variant = "grid",
}: {
  items: Testimonial[];
  interval?: number;
  showAllFrom?: number;
  /** `rail` = horizontal strip that advances; never wraps into a multi-row dump. */
  variant?: "grid" | "rail";
}) {
  const labelId = useId();
  const rail = variant === "rail";
  const fineHover = useFineHover();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(rail ? 1 : showAllFrom ? items.length : MAX_VISIBLE);
  const count = Math.min(visible, items.length);
  const showingAll = !rail && count >= items.length;
  const canRotate = !showingAll && interval > 0 && items.length > count;
  const motionPaused = paused || held;

  useEffect(() => {
    const apply = () => {
      const width = window.innerWidth;
      if (!rail && showAllFrom && width >= showAllFrom) {
        setVisible(items.length);
        return;
      }
      setVisible(columnsFor(width, rail));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [items.length, showAllFrom, rail]);

  useEffect(() => {
    if (motionPaused || !canRotate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setIndex((value) => (value + 1) % items.length);
    }, interval);

    return () => window.clearTimeout(timer);
  }, [motionPaused, index, items.length, interval, canRotate]);

  useEffect(() => {
    const onVisibility = () => setHeld(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (items.length === 0) return null;

  const shown = showingAll
    ? items
    : Array.from({ length: count }, (_, offset) => items[(index + offset) % items.length]);
  const step = (direction: number) => setIndex((value) => (value + direction + items.length) % items.length);

  const hold = () => {
    if (!fineHover) return;
    setHeld(true);
  };
  const release = (event?: { currentTarget: EventTarget & Element; relatedTarget: EventTarget | null }) => {
    if (!fineHover) return;
    if (event) {
      const next = event.relatedTarget as Node | null;
      if (next && event.currentTarget.contains(next)) return;
    }
    setHeld(false);
  };

  return (
    <div
      className={`carousel${rail ? " carousel-rail" : ""}${motionPaused ? " is-paused" : ""}`}
      onPointerEnter={hold}
      onPointerLeave={() => release()}
      onFocusCapture={hold}
      onBlurCapture={release}
      aria-roledescription={canRotate ? "carousel" : undefined}
      aria-labelledby={labelId}
    >
      <span id={labelId} className="sr-only">
        Client testimonials
      </span>
      <div
        className={`quote-row${rail ? " quote-rail" : ""}`}
        key={showingAll ? "all" : index}
        aria-live="polite"
      >
        {shown.map((item, offset) => (
          <article
            className="card quote-card"
            key={`${item.name}-${item.company}-${offset}`}
            style={{ "--quote-delay": `${offset * 60}ms` } as CSSProperties}
          >
            <blockquote>“{item.quote}”</blockquote>
            <div className="quote-person">
              {item.photo ? (
                <img className="quote-photo" src={item.photo} alt="" width="56" height="56" loading="lazy" />
              ) : null}
              <div>
                <strong>{item.name}</strong>
                <p>
                  {item.role}, {item.company}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      {(canRotate || rail) && items.length > count && (
        <div className="carousel-nav">
          <button type="button" onClick={() => step(-1)} aria-label="Previous testimonial">
            <ChevronLeft />
          </button>
          {canRotate && (
            <button
              type="button"
              className="carousel-pause"
              aria-pressed={paused}
              aria-label={paused ? "Play testimonials" : "Pause testimonials"}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? <PlayIcon /> : <PauseIcon />}
            </button>
          )}
          <button type="button" onClick={() => step(1)} aria-label="Next testimonial">
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

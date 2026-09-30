import { useEffect, useState } from "react";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const ROTATE_MS = 5000;
const MAX_VISIBLE = 3;

function columnsFor(width: number) {
  if (width >= 1100) return 3;
  if (width >= 760) return 2;
  return 1;
}

export default function TestimonialCarousel({
  items,
  interval = ROTATE_MS,
  showAllFrom,
}: {
  items: Testimonial[];
  interval?: number;
  showAllFrom?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(showAllFrom ? items.length : MAX_VISIBLE);
  const count = Math.min(visible, items.length);
  const showingAll = count >= items.length;

  useEffect(() => {
    const apply = () => {
      const width = window.innerWidth;
      if (showAllFrom && width >= showAllFrom) {
        setVisible(items.length);
        return;
      }
      setVisible(columnsFor(width));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [items.length, showAllFrom]);

  useEffect(() => {
    if (paused || showingAll || interval <= 0 || items.length <= count) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setIndex((value) => (value + 1) % items.length);
    }, interval);

    return () => window.clearTimeout(timer);
  }, [paused, index, items.length, count, interval, showingAll]);

  if (items.length === 0) return null;

  const shown = showingAll
    ? items
    : Array.from({ length: count }, (_, offset) => items[(index + offset) % items.length]);
  const step = (direction: number) => setIndex((value) => (value + direction + items.length) % items.length);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="quote-row">
        {shown.map((item) => (
          <article className="card quote-card" key={`${item.name}-${item.company}`}>
            <blockquote>“{item.quote}”</blockquote>
            <div>
              <strong>{item.name}</strong>
              <p>
                {item.role}, {item.company}
              </p>
            </div>
          </article>
        ))}
      </div>
      {items.length > count && (
        <div className="carousel-nav">
          <button type="button" onClick={() => step(-1)} aria-label="Previous testimonial">
            ←
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      )}
    </div>
  );
}

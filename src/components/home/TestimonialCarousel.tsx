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

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(MAX_VISIBLE);
  const count = Math.min(visible, items.length);
  const shownCount = Math.min(MAX_VISIBLE, items.length);

  useEffect(() => {
    const apply = () => setVisible(columnsFor(window.innerWidth));
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    if (paused || items.length <= count) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setIndex((value) => (value + 1) % items.length);
    }, ROTATE_MS);

    return () => window.clearTimeout(timer);
  }, [paused, index, items.length, count]);

  if (items.length === 0) return null;

  const shown = Array.from({ length: shownCount }, (_, offset) => items[(index + offset) % items.length]);
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

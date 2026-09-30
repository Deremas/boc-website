import { useEffect, useState } from "react";

const filters = [
  { id: "all", label: "All" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "business-systems", label: "Business Systems" },
];

export default function WorkFilter() {
  const [active, setActive] = useState("all");

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-work-card]").forEach((card) => {
      const categories = (card.dataset.category ?? "").split(/\s+/);
      card.hidden = active !== "all" && !categories.includes(active);
    });
  }, [active]);

  return (
    <div className="filter-row" role="tablist" aria-label="Filter work">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className="btn btn-secondary"
          aria-pressed={active === filter.id}
          onClick={() => setActive(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

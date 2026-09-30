import { useState } from "react";

type Group = { id: string; title: string; items: string[] };

export default function ModuleTabs({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const current = groups.find((group) => group.id === active) ?? groups[0];
  if (!current) return null;

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="ERP modules">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={group.id === current.id}
            onClick={() => setActive(group.id)}
          >
            {group.title}
          </button>
        ))}
      </div>
      <ul className="module-list">
        {current.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

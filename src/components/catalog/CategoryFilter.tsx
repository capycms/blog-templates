"use client";

const categories = [
  { id: "all", label: "All", icon: "◈" },
  { id: "minimal", label: "Minimal", icon: "○" },
  { id: "editorial", label: "Editorial", icon: "▤" },
  { id: "developer", label: "Developer", icon: "⌘" },
  { id: "creative", label: "Creative", icon: "✦" },
  { id: "business", label: "Business", icon: "◆" },
  { id: "personal", label: "Personal", icon: "♡" },
];

export function CategoryFilter({
  active,
  onChange,
  counts,
  total,
}: {
  active: string;
  onChange: (cat: string) => void;
  counts: Record<string, number>;
  total: number;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((cat) => {
        const count = cat.id === "all" ? total : (counts[cat.id] || 0);
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span className="text-xs">{cat.icon}</span>
            {cat.label}
            <span
              className={`text-xs tabular-nums ${
                isActive ? "text-white/60" : "text-gray-400"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

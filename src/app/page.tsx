"use client";

import { useState, useMemo } from "react";
import { TemplateCard } from "@/components/catalog/TemplateCard";
import { CategoryFilter } from "@/components/catalog/CategoryFilter";
import { getAllTemplates } from "@/lib/templates";

const templates = getAllTemplates();

const categoryCounts = templates.reduce(
  (acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);

export default function Home() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = category === "all"
      ? templates
      : templates.filter((t) => t.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.features.some((f) => f.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [category, search]);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center text-xl">
              📐
            </div>
            <span className="text-white/60 font-medium tracking-wide text-sm uppercase">
              CapyCMS
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
            Blog Templates
          </h1>
          <p className="text-xl text-white/60 max-w-xl mb-10 leading-relaxed">
            {templates.length} unique designs for React &amp; Next.js.
            Preview live, pick your style, and ship your blog.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: "Templates", value: templates.length, color: "text-white" },
              { label: "Minimal", value: categoryCounts.minimal || 0, color: "text-gray-300" },
              { label: "Editorial", value: categoryCounts.editorial || 0, color: "text-amber-300" },
              { label: "Developer", value: categoryCounts.developer || 0, color: "text-green-300" },
              { label: "Creative", value: categoryCounts.creative || 0, color: "text-pink-300" },
              { label: "Business", value: categoryCounts.business || 0, color: "text-blue-300" },
              { label: "Personal", value: categoryCounts.personal || 0, color: "text-emerald-300" },
            ].map((stat) => (
              <div key={stat.label} className="text-center min-w-[60px]">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Toolbar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <CategoryFilter
            active={category}
            onChange={setCategory}
            counts={categoryCounts}
            total={templates.length}
          />
          <div className="relative sm:ml-auto w-full sm:w-auto">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {filtered.length === templates.length
              ? `Showing all ${templates.length} templates`
              : `${filtered.length} template${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No templates match your search.</p>
            <button
              onClick={() => { setSearch(""); setCategory("all"); }}
              className="mt-4 text-sm text-gray-900 underline underline-offset-4 hover:no-underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/60 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-900">CapyCMS</span>
            <span>&middot;</span>
            <span>{templates.length} templates</span>
          </div>
          <p className="text-sm text-gray-400">
            Run <code className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 text-xs font-mono">npm run setup</code> to start building your blog
          </p>
        </div>
      </footer>
    </div>
  );
}


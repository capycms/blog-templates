"use client";

import { useState } from "react";
import { TemplateCard } from "@/components/catalog/TemplateCard";
import { CategoryFilter } from "@/components/catalog/CategoryFilter";
import { getAllTemplates } from "@/lib/templates";

const templates = getAllTemplates();

export default function Home() {
  const [category, setCategory] = useState("all");
  const filtered =
    category === "all"
      ? templates
      : templates.filter((t) => t.category === category);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">CapyCMS Blog Templates</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          50 unique blog templates for React &amp; Next.js. Pick a style, preview it
          with demo articles, and start building.
        </p>
      </header>

      <CategoryFilter active={category} onChange={setCategory} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t text-center text-sm text-gray-500">
        <p>CapyCMS &mdash; {templates.length} templates available</p>
      </footer>
    </main>
  );
}


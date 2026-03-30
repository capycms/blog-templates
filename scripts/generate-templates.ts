/**
 * Script to generate all 50 template folders.
 * Run: npx tsx scripts/generate-templates.ts
 */
import fs from "fs";
import path from "path";

interface TemplateDef {
  id: string;
  name: string;
  category: string;
  bgClass: string;
  textClass: string;
  accentClass: string;
  headingFont: string;
  bodyFont: string;
  cardBg: string;
  borderClass: string;
  layout: "centered" | "sidebar-right" | "sidebar-left" | "full-width" | "split" | "timeline" | "masonry" | "stream";
  maxWidth: string;
  hasDarkBg: boolean;
  listStyle: "grid" | "list" | "cards" | "timeline" | "masonry" | "stream";
  showReadingTime: boolean;
  showAuthorBio: boolean;
  showTags: boolean;
  showNewsletter: boolean;
  showBreadcrumbs: boolean;
  showProgressBar: boolean;
  showToc: boolean;
  showRelated: boolean;
}

const templates: TemplateDef[] = [
  // MINIMAL (8)
  { id: "blank-canvas", name: "Blank Canvas", category: "minimal", bgClass: "bg-white", textClass: "text-gray-900", accentClass: "text-gray-500", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-gray-200", layout: "full-width", maxWidth: "max-w-4xl", hasDarkBg: false, listStyle: "list", showReadingTime: true, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "one-column-light", name: "One Column Light", category: "minimal", bgClass: "bg-gray-50", textClass: "text-gray-800", accentClass: "text-blue-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-gray-100", layout: "centered", maxWidth: "max-w-xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "stark-monochrome", name: "Stark Monochrome", category: "minimal", bgClass: "bg-white", textClass: "text-black", accentClass: "text-black", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-black", layout: "full-width", maxWidth: "max-w-3xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: true, showProgressBar: false, showToc: false, showRelated: false },
  { id: "whitespace-serif", name: "Whitespace Serif", category: "minimal", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-gray-400", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-gray-100", layout: "centered", maxWidth: "max-w-2xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "outline-only", name: "Outline Only", category: "minimal", bgClass: "bg-white", textClass: "text-gray-900", accentClass: "text-gray-600", headingFont: "font-mono", bodyFont: "font-sans", cardBg: "bg-transparent", borderClass: "border-gray-900", layout: "centered", maxWidth: "max-w-3xl", hasDarkBg: false, listStyle: "cards", showReadingTime: false, showAuthorBio: false, showTags: true, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "text-first", name: "Text First", category: "minimal", bgClass: "bg-white", textClass: "text-gray-700", accentClass: "text-indigo-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-gray-200", layout: "centered", maxWidth: "max-w-2xl", hasDarkBg: false, listStyle: "list", showReadingTime: true, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: true, showRelated: false },
  { id: "grid-dots", name: "Grid Dots", category: "minimal", bgClass: "bg-gray-50 bg-[url('/patterns/dots.svg')] bg-repeat", textClass: "text-gray-800", accentClass: "text-gray-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-gray-200", layout: "sidebar-right", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "silent-elegance", name: "Silent Elegance", category: "minimal", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-amber-600", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-amber-200", layout: "centered", maxWidth: "max-w-2xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: true, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },

  // EDITORIAL (8)
  { id: "magazine-grid", name: "Magazine Grid", category: "editorial", bgClass: "bg-amber-50", textClass: "text-amber-900", accentClass: "text-amber-700", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-amber-200", layout: "full-width", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "masonry", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: true, showProgressBar: false, showToc: false, showRelated: false },
  { id: "newspaper-classic", name: "Newspaper Classic", category: "editorial", bgClass: "bg-stone-50", textClass: "text-stone-900", accentClass: "text-stone-600", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-stone-300", layout: "sidebar-right", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "list", showReadingTime: true, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "journal-split", name: "Journal Split", category: "editorial", bgClass: "bg-stone-100", textClass: "text-stone-800", accentClass: "text-stone-600", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-stone-200", layout: "split", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "editorial-sidebar", name: "Editorial Sidebar", category: "editorial", bgClass: "bg-gray-900", textClass: "text-gray-100", accentClass: "text-amber-400", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-gray-800", borderClass: "border-gray-700", layout: "sidebar-right", maxWidth: "max-w-6xl", hasDarkBg: true, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: true },
  { id: "gallery-layout", name: "Gallery Layout", category: "editorial", bgClass: "bg-white", textClass: "text-gray-900", accentClass: "text-pink-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-gray-50", borderClass: "border-gray-200", layout: "full-width", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "grid", showReadingTime: false, showAuthorBio: false, showTags: true, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "folio-editorial", name: "Folio Editorial", category: "editorial", bgClass: "bg-amber-50", textClass: "text-amber-900", accentClass: "text-amber-600", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-amber-100", layout: "full-width", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "cards", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "publication-dark", name: "Publication Dark", category: "editorial", bgClass: "bg-gray-950", textClass: "text-gray-100", accentClass: "text-rose-400", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-gray-900", borderClass: "border-gray-800", layout: "sidebar-right", maxWidth: "max-w-6xl", hasDarkBg: true, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: true, showNewsletter: true, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "timeline-digest", name: "Timeline Digest", category: "editorial", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-indigo-500", headingFont: "font-serif", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-indigo-200", layout: "centered", maxWidth: "max-w-3xl", hasDarkBg: false, listStyle: "timeline", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },

  // DEVELOPER (8)
  { id: "devlog-terminal", name: "Devlog Terminal", category: "developer", bgClass: "bg-gray-950", textClass: "text-green-400", accentClass: "text-green-300", headingFont: "font-mono", bodyFont: "font-mono", cardBg: "bg-gray-900", borderClass: "border-green-800", layout: "centered", maxWidth: "max-w-3xl", hasDarkBg: true, listStyle: "list", showReadingTime: true, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "github-wiki", name: "GitHub Wiki", category: "developer", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-blue-600", headingFont: "font-mono", bodyFont: "font-sans", cardBg: "bg-gray-50", borderClass: "border-gray-300", layout: "sidebar-left", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: true, showRelated: false },
  { id: "hacker-neon", name: "Hacker Neon", category: "developer", bgClass: "bg-black", textClass: "text-cyan-300", accentClass: "text-fuchsia-400", headingFont: "font-mono", bodyFont: "font-mono", cardBg: "bg-gray-950", borderClass: "border-cyan-800", layout: "centered", maxWidth: "max-w-3xl", hasDarkBg: true, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: true, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "code-blog", name: "Code Blog", category: "developer", bgClass: "bg-gray-900", textClass: "text-gray-200", accentClass: "text-yellow-400", headingFont: "font-mono", bodyFont: "font-mono", cardBg: "bg-gray-800", borderClass: "border-gray-700", layout: "centered", maxWidth: "max-w-3xl", hasDarkBg: true, listStyle: "list", showReadingTime: true, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "api-doc-style", name: "API Doc Style", category: "developer", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-blue-500", headingFont: "font-mono", bodyFont: "font-sans", cardBg: "bg-gray-50", borderClass: "border-gray-200", layout: "full-width", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: true, showRelated: false },
  { id: "retro-terminal", name: "Retro Terminal", category: "developer", bgClass: "bg-black bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:100%_4px]", textClass: "text-green-500", accentClass: "text-green-300", headingFont: "font-mono", bodyFont: "font-mono", cardBg: "bg-black", borderClass: "border-green-900", layout: "centered", maxWidth: "max-w-2xl", hasDarkBg: true, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "dark-minimal-code", name: "Dark Minimal Code", category: "developer", bgClass: "bg-gray-950", textClass: "text-gray-300", accentClass: "text-violet-400", headingFont: "font-mono", bodyFont: "font-mono", cardBg: "bg-gray-900", borderClass: "border-gray-800", layout: "centered", maxWidth: "max-w-3xl", hasDarkBg: true, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: true, showToc: false, showRelated: false },
  { id: "rust-inspired", name: "Rust Inspired", category: "developer", bgClass: "bg-orange-950", textClass: "text-orange-100", accentClass: "text-orange-400", headingFont: "font-serif", bodyFont: "font-mono", cardBg: "bg-orange-900", borderClass: "border-orange-700", layout: "sidebar-right", maxWidth: "max-w-5xl", hasDarkBg: true, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },

  // CREATIVE (9)
  { id: "rainbow-cards", name: "Rainbow Cards", category: "creative", bgClass: "bg-pink-50", textClass: "text-gray-800", accentClass: "text-pink-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-pink-200", layout: "full-width", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "grid", showReadingTime: false, showAuthorBio: false, showTags: true, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "asymmetric-bold", name: "Asymmetric Bold", category: "creative", bgClass: "bg-yellow-50", textClass: "text-gray-900", accentClass: "text-red-500", headingFont: "font-serif", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-red-300", layout: "full-width", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "cards", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "brutalist-art", name: "Brutalist Art", category: "creative", bgClass: "bg-white", textClass: "text-black", accentClass: "text-black", headingFont: "font-mono", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-black", layout: "full-width", maxWidth: "max-w-4xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "pastel-dream", name: "Pastel Dream", category: "creative", bgClass: "bg-purple-50", textClass: "text-purple-900", accentClass: "text-purple-400", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-purple-200", layout: "centered", maxWidth: "max-w-3xl", hasDarkBg: false, listStyle: "cards", showReadingTime: false, showAuthorBio: false, showTags: true, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "split-visual", name: "Split Visual", category: "creative", bgClass: "bg-gray-100", textClass: "text-gray-900", accentClass: "text-teal-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-gray-300", layout: "split", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "masonry", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "sketch-hand", name: "Sketch Hand", category: "creative", bgClass: "bg-amber-50 bg-[url('/patterns/sketch.svg')] bg-repeat", textClass: "text-amber-900", accentClass: "text-amber-600", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-amber-50", borderClass: "border-amber-300 border-dashed", layout: "centered", maxWidth: "max-w-2xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "neon-glitch", name: "Neon Glitch", category: "creative", bgClass: "bg-black", textClass: "text-fuchsia-300", accentClass: "text-cyan-400", headingFont: "font-mono", bodyFont: "font-mono", cardBg: "bg-gray-950", borderClass: "border-fuchsia-700", layout: "centered", maxWidth: "max-w-3xl", hasDarkBg: true, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "gradient-expressive", name: "Gradient Expressive", category: "creative", bgClass: "bg-gradient-to-br from-pink-100 to-sky-100", textClass: "text-gray-900", accentClass: "text-pink-600", headingFont: "font-serif", bodyFont: "font-sans", cardBg: "bg-white/80", borderClass: "border-pink-200", layout: "centered", maxWidth: "max-w-3xl", hasDarkBg: false, listStyle: "cards", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "retro-70s", name: "Retro 70s", category: "creative", bgClass: "bg-yellow-100", textClass: "text-orange-900", accentClass: "text-orange-600", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-yellow-50", borderClass: "border-orange-300", layout: "centered", maxWidth: "max-w-3xl", hasDarkBg: false, listStyle: "cards", showReadingTime: false, showAuthorBio: false, showTags: true, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },

  // BUSINESS (9)
  { id: "corporate-minimal", name: "Corporate Minimal", category: "business", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-blue-600", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-gray-50", borderClass: "border-gray-200", layout: "sidebar-right", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: true, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "executive-brief", name: "Executive Brief", category: "business", bgClass: "bg-gray-50", textClass: "text-gray-800", accentClass: "text-blue-500", headingFont: "font-serif", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-gray-200", layout: "sidebar-right", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "cards", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: true, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "landing-blog", name: "Landing Blog", category: "business", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-emerald-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-gray-50", borderClass: "border-emerald-200", layout: "full-width", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "grid", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: true, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "thought-leader", name: "Thought Leader", category: "business", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-indigo-500", headingFont: "font-serif", bodyFont: "font-sans", cardBg: "bg-gray-50", borderClass: "border-gray-200", layout: "sidebar-right", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: true, showTags: false, showNewsletter: true, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: true },
  { id: "case-study-flow", name: "Case Study Flow", category: "business", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-sky-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-sky-50", borderClass: "border-sky-200", layout: "full-width", maxWidth: "max-w-4xl", hasDarkBg: false, listStyle: "cards", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "resource-hub", name: "Resource Hub", category: "business", bgClass: "bg-gray-50", textClass: "text-gray-800", accentClass: "text-teal-600", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-gray-200", layout: "full-width", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "grid", showReadingTime: false, showAuthorBio: false, showTags: true, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "webinar-sync", name: "Webinar Sync", category: "business", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-violet-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-violet-50", borderClass: "border-violet-200", layout: "sidebar-right", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: true, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "b2b-index", name: "B2B Index", category: "business", bgClass: "bg-white", textClass: "text-gray-800", accentClass: "text-blue-700", headingFont: "font-serif", bodyFont: "font-sans", cardBg: "bg-blue-50", borderClass: "border-blue-200", layout: "sidebar-right", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "grid", showReadingTime: false, showAuthorBio: false, showTags: true, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "industry-insights", name: "Industry Insights", category: "business", bgClass: "bg-gray-50", textClass: "text-gray-800", accentClass: "text-emerald-600", headingFont: "font-serif", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-gray-200", layout: "sidebar-right", maxWidth: "max-w-6xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: true, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },

  // PERSONAL (8)
  { id: "home-page-blog", name: "Home Page Blog", category: "personal", bgClass: "bg-gray-50", textClass: "text-gray-800", accentClass: "text-rose-500", headingFont: "font-serif", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-gray-200", layout: "full-width", maxWidth: "max-w-4xl", hasDarkBg: false, listStyle: "grid", showReadingTime: false, showAuthorBio: true, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "cozy-blog", name: "Cozy Blog", category: "personal", bgClass: "bg-orange-50", textClass: "text-orange-900", accentClass: "text-orange-500", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-orange-200", layout: "sidebar-right", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: true, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "stream-thoughts", name: "Stream Thoughts", category: "personal", bgClass: "bg-purple-50", textClass: "text-purple-800", accentClass: "text-purple-500", headingFont: "font-mono", bodyFont: "font-mono", cardBg: "bg-white", borderClass: "border-purple-200", layout: "centered", maxWidth: "max-w-2xl", hasDarkBg: false, listStyle: "stream", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "portfolio-journal", name: "Portfolio Journal", category: "personal", bgClass: "bg-amber-50", textClass: "text-amber-900", accentClass: "text-amber-600", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-amber-200", layout: "sidebar-left", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "indie-maker", name: "Indie Maker", category: "personal", bgClass: "bg-sky-50", textClass: "text-sky-900", accentClass: "text-sky-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-sky-200", layout: "sidebar-left", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "cards", showReadingTime: false, showAuthorBio: true, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "notebook-analog", name: "Notebook Analog", category: "personal", bgClass: "bg-yellow-50", textClass: "text-yellow-900", accentClass: "text-yellow-700", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-yellow-50", borderClass: "border-yellow-300", layout: "centered", maxWidth: "max-w-2xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
  { id: "digital-garden", name: "Digital Garden", category: "personal", bgClass: "bg-emerald-50", textClass: "text-emerald-900", accentClass: "text-emerald-600", headingFont: "font-serif", bodyFont: "font-serif", cardBg: "bg-white", borderClass: "border-emerald-200", layout: "sidebar-left", maxWidth: "max-w-5xl", hasDarkBg: false, listStyle: "list", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: true },
  { id: "micro-personal", name: "Micro Personal", category: "personal", bgClass: "bg-pink-50", textClass: "text-pink-900", accentClass: "text-pink-500", headingFont: "font-sans", bodyFont: "font-sans", cardBg: "bg-white", borderClass: "border-pink-200", layout: "centered", maxWidth: "max-w-2xl", hasDarkBg: false, listStyle: "timeline", showReadingTime: false, showAuthorBio: false, showTags: false, showNewsletter: false, showBreadcrumbs: false, showProgressBar: false, showToc: false, showRelated: false },
];

const templatesWithFeaturedImage = new Set([
  "magazine-grid",
  "newspaper-classic",
  "journal-split",
  "editorial-sidebar",
  "gallery-layout",
  "folio-editorial",
  "timeline-digest",
  "split-visual",
  "landing-blog",
  "case-study-flow",
]);

// ---------------------------------------------------------------------------
// File generators
// ---------------------------------------------------------------------------
const root = path.join(process.cwd(), "src/templates");

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function generateConfig(t: TemplateDef): string {
  return `import { TemplateConfig } from "@/lib/types";

export const config: TemplateConfig = {
  id: "${t.id}",
  name: "${t.name}",
  category: "${t.category}",
  description: "${t.name} template",
  features: [${[
    t.showReadingTime && '"reading-time"',
    t.showAuthorBio && '"author-bio"',
    t.showTags && '"tags"',
    t.showNewsletter && '"newsletter-cta"',
    t.showBreadcrumbs && '"breadcrumbs"',
    t.showProgressBar && '"progress-bar"',
    t.showToc && '"toc"',
    t.showRelated && '"related-posts"',
  ]
    .filter(Boolean)
    .join(", ")}],
  typography: "${t.bodyFont === "font-mono" ? "monospace" : t.bodyFont === "font-serif" ? "serif" : "sans-serif"}",
  colorScheme: "${t.hasDarkBg ? "dark" : "light"}",
};
`;
}

function generateLayout(t: TemplateDef): string {
  const defaultSidebarContent = `
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 ${t.cardBg} ${t.borderClass} border rounded-lg p-4">
              <h3 className="${t.headingFont} font-bold mb-2">About</h3>
              <p className="text-sm opacity-70">${t.name} template</p>
            </div>
          </aside>`;

  const newspaperSidebarContent = `
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 ${t.cardBg} ${t.borderClass} border rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xs uppercase tracking-widest ${t.accentClass}">In this issue</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/${t.id}/getting-started" className="hover:underline">
                      Getting Started with React Hooks
                    </a>
                  </li>
                  <li>
                    <a href="/templates/${t.id}/vite-vs-nextjs" className="hover:underline">
                      Vite vs Next.js
                    </a>
                  </li>
                  <li>
                    <a href="/templates/${t.id}/essential-libraries" className="hover:underline">
                      Essential React Libraries
                    </a>
                  </li>
                </ul>
              </div>
              <div className="border-t ${t.borderClass} p-4">
                <h3 className="text-xs uppercase tracking-widest ${t.accentClass}">Sections</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border ${t.borderClass}">React</span>
                  <span className="text-xs px-2 py-1 rounded-full border ${t.borderClass}">Next.js</span>
                  <span className="text-xs px-2 py-1 rounded-full border ${t.borderClass}">Tooling</span>
                </div>
              </div>
              <div className="border-t ${t.borderClass} p-4">
                <h3 className="text-xs uppercase tracking-widest ${t.accentClass}">About</h3>
                <p className="text-xs opacity-70 mt-2">${t.name} template</p>
              </div>
            </div>
          </aside>`;

  const publicationDarkSidebarContent = `
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 ${t.cardBg} ${t.borderClass} border rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest ${t.accentClass}">Issue 01</p>
                <h3 className="${t.headingFont} font-bold mt-2">Also read</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/${t.id}/getting-started" className="hover:underline">
                      Getting Started with React Hooks
                    </a>
                  </li>
                  <li>
                    <a href="/templates/${t.id}/vite-vs-nextjs" className="hover:underline">
                      Vite vs Next.js
                    </a>
                  </li>
                  <li>
                    <a href="/templates/${t.id}/essential-libraries" className="hover:underline">
                      Essential React Libraries
                    </a>
                  </li>
                </ul>
              </div>
              <div className="border-t ${t.borderClass} p-4">
                <p className="text-xs opacity-70">${t.name} template</p>
              </div>
            </div>
          </aside>`;

  const rustInspiredSidebarContent = `
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 ${t.cardBg} ${t.borderClass} border rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest ${t.accentClass}">Docs</p>
                <h3 className="${t.headingFont} font-bold mt-2">Topics</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border ${t.borderClass} text-orange-100/80">Ownership</span>
                  <span className="text-xs px-2 py-1 rounded-full border ${t.borderClass} text-orange-100/80">Borrowing</span>
                  <span className="text-xs px-2 py-1 rounded-full border ${t.borderClass} text-orange-100/80">Lifetimes</span>
                </div>
              </div>
              <div className="border-t ${t.borderClass} p-4">
                <p className="text-xs uppercase tracking-widest ${t.accentClass}">Read next</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/${t.id}/getting-started" className="hover:underline text-orange-100/80">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="/templates/${t.id}/essential-libraries" className="hover:underline text-orange-100/80">
                      Essential Libraries
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>`;

  const corporateMinimalSidebarContent = `
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 ${t.cardBg} ${t.borderClass} border rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xs uppercase tracking-widest ${t.accentClass}">Company</h3>
                <p className="mt-2 text-sm opacity-70">CapyCMS Insights — product, engineering, and growth.</p>
              </div>
              <div className="border-t ${t.borderClass} p-4">
                <h3 className="text-xs uppercase tracking-widest ${t.accentClass}">Latest</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/${t.id}/getting-started" className="hover:underline">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="/templates/${t.id}/vite-vs-nextjs" className="hover:underline">
                      Vite vs Next.js
                    </a>
                  </li>
                  <li>
                    <a href="/templates/${t.id}/essential-libraries" className="hover:underline">
                      Essential Libraries
                    </a>
                  </li>
                </ul>
              </div>
              <div className="border-t ${t.borderClass} p-4">
                <h3 className="text-xs uppercase tracking-widest ${t.accentClass}">Topics</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border ${t.borderClass}">Product</span>
                  <span className="text-xs px-2 py-1 rounded-full border ${t.borderClass}">Engineering</span>
                  <span className="text-xs px-2 py-1 rounded-full border ${t.borderClass}">Strategy</span>
                </div>
              </div>
            </div>
          </aside>`;

  const executiveBriefSidebarContent = `
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 ${t.cardBg} ${t.borderClass} border rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest ${t.accentClass}">Executive Brief</p>
                <p className="mt-2 text-sm opacity-70">Short, decision-ready notes for busy teams.</p>
              </div>
              <div className="border-t ${t.borderClass} p-4">
                <h3 className="text-xs uppercase tracking-widest ${t.accentClass}">Read next</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/${t.id}/getting-started" className="hover:underline">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="/templates/${t.id}/essential-libraries" className="hover:underline">
                      Essential Libraries
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>`;

  const sidebarContent =
    t.id === "newspaper-classic"
      ? newspaperSidebarContent
      : t.id === "publication-dark"
        ? publicationDarkSidebarContent
        : t.id === "rust-inspired"
          ? rustInspiredSidebarContent
          : t.id === "corporate-minimal"
            ? corporateMinimalSidebarContent
            : t.id === "executive-brief"
              ? executiveBriefSidebarContent
        : defaultSidebarContent;

  const centeredChildren =
    t.id === "dark-minimal-code"
      ? `<div className="relative pl-6">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-violet-400/30" />
          {children}
        </div>`
      : "{children}";

  let mainContent: string;
  if (t.layout === "sidebar-right") {
    mainContent = `
      <main className="${t.maxWidth} mx-auto px-6 py-8 flex gap-8">
        <div className="flex-1 min-w-0">{children}</div>${sidebarContent}
      </main>`;
  } else if (t.layout === "sidebar-left") {
    mainContent = `
      <main className="${t.maxWidth} mx-auto px-6 py-8 flex gap-8">
        ${sidebarContent}<div className="flex-1 min-w-0">{children}</div>
      </main>`;
  } else {
    mainContent = `\n      <main className="${t.maxWidth} mx-auto px-6 py-8">${centeredChildren}</main>`;
  }

  return `
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="${t.bgClass} ${t.textClass} min-h-screen">
      <header className="border-b ${t.borderClass} ${t.cardBg === "bg-transparent" ? "bg-transparent" : t.cardBg.includes("/") ? t.cardBg : t.cardBg + "/80"} backdrop-blur">
        <div className="${t.maxWidth} mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="${t.headingFont} text-xl font-bold ${t.accentClass}">${t.name}</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>${mainContent}
      <footer className="border-t ${t.borderClass} mt-12">
        <div className="${t.maxWidth} mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 ${t.name} &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}
`;
}

function generateArticleList(t: TemplateDef): string {
  if (t.id === "rainbow-cards") {
    return `import { Post } from "@/lib/types";
import { TagList } from "@/components/shared/TagList";

const cardColors = [
  "bg-pink-50",
  "bg-amber-50",
  "bg-sky-50",
  "bg-emerald-50",
  "bg-purple-50",
];

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => {
          const bg = cardColors[i % cardColors.length];
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/${t.id}/" + post.frontmatter.slug}
              className={
                "block group rounded-lg border ${t.borderClass} overflow-hidden hover:shadow-md transition-shadow " +
                bg
              }
            >
              <div className="p-5">
                <p className="text-xs opacity-60">{post.frontmatter.date}</p>
                <h2 className="${t.headingFont} text-xl font-bold mt-1 group-hover:underline">
                  {post.frontmatter.title}
                </h2>
                <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>
                <div className="mt-3">
                  <TagList tags={post.frontmatter.tags} />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "asymmetric-bold") {
    return `import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="${t.headingFont} text-3xl md:text-4xl font-bold mb-10">Articles</h1>
      <div className="space-y-10">
        {posts.map((post, i) => {
          const isRight = i % 2 === 1;
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/${t.id}/" + post.frontmatter.slug}
              className={"block group " + (isRight ? "md:text-right" : "")}
            >
              <div
                className={
                  "rounded-lg border ${t.borderClass} ${t.cardBg} p-8 md:w-4/5 " +
                  (isRight ? "md:ml-auto" : "md:mr-auto")
                }
              >
                <div className="flex items-baseline justify-between gap-4 text-xs uppercase tracking-widest opacity-60">
                  <span>{post.frontmatter.date}</span>
                  <span>{post.frontmatter.author}</span>
                </div>
                <h2 className="${t.headingFont} text-3xl font-bold mt-3 group-hover:underline">
                  {post.frontmatter.title}
                </h2>
                <div className="${t.accentClass} mt-4">
                  <div className="h-1 w-14 bg-current" />
                </div>
                <p className="mt-4 opacity-70">{post.frontmatter.excerpt}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "brutalist-art") {
    return `import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="${t.headingFont} text-4xl md:text-5xl font-black uppercase tracking-tight mb-10">
        ARTICLES
      </h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/${t.id}/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="border-2 ${t.borderClass} ${t.cardBg} p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest">
                <span>{post.frontmatter.date}</span>
                <span>{post.frontmatter.author}</span>
              </div>
              <h2 className="${t.headingFont} text-2xl md:text-3xl font-black mt-4 group-hover:underline">
                {post.frontmatter.title}
              </h2>
              <p className="mt-3 opacity-80">{post.frontmatter.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "pastel-dream") {
    return `import { Post } from "@/lib/types";
import { TagList } from "@/components/shared/TagList";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/${t.id}/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="rounded-2xl border ${t.borderClass} bg-white/70 backdrop-blur p-8 hover:shadow-md transition-shadow">
              <p className="text-xs opacity-60">{post.frontmatter.date}</p>
              <h2 className="${t.headingFont} text-2xl md:text-3xl font-bold mt-2 group-hover:underline">
                {post.frontmatter.title}
              </h2>
              <p className="mt-4 opacity-70">{post.frontmatter.excerpt}</p>
              <div className="mt-5">
                <TagList tags={post.frontmatter.tags} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "split-visual") {
    return `import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts;

  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Featured</h1>

      {featured ? (
        <a
          href={"/templates/${t.id}/" + featured.frontmatter.slug}
          className="block group mb-10"
        >
          <div className="grid md:grid-cols-2 rounded-lg border ${t.borderClass} overflow-hidden ${t.cardBg}">
            <div className="aspect-video md:aspect-auto bg-gray-200">
              {featured.frontmatter.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="p-8 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest ${t.accentClass}">Featured</p>
              <h2 className="${t.headingFont} text-3xl md:text-4xl font-bold mt-3 group-hover:underline">
                {featured.frontmatter.title}
              </h2>
              <p className="mt-4 opacity-70">{featured.frontmatter.excerpt}</p>
              <p className="mt-6 text-sm opacity-60">
                {featured.frontmatter.date} &middot; {featured.frontmatter.author}
              </p>
            </div>
          </div>
        </a>
      ) : null}

      <div className="columns-1 md:columns-2 lg:columns-3 [column-gap:1.5rem]">
        {rest.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/${t.id}/" + post.frontmatter.slug}
            className="block break-inside-avoid mb-6 group rounded-lg border ${t.borderClass} overflow-hidden ${t.cardBg} hover:shadow-md transition-shadow"
          >
            {post.frontmatter.coverImage ? (
              <div className="aspect-video bg-gray-200 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
            <div className="p-4">
              <h3 className="${t.headingFont} text-lg font-bold group-hover:underline">
                {post.frontmatter.title}
              </h3>
              <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
              <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "sketch-hand") {
    return `import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Notes</h1>
      <div className="space-y-5">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/${t.id}/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="rounded-lg border ${t.borderClass} ${t.cardBg} p-6 hover:shadow-md transition-shadow">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="${t.headingFont} text-xl font-bold group-hover:underline">
                  {post.frontmatter.title}
                </h2>
                <span className="text-xs opacity-60 shrink-0">{post.frontmatter.date}</span>
              </div>
              <p className="mt-2 text-sm opacity-70">{post.frontmatter.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "neon-glitch") {
    return `import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/${t.id}/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="rounded-lg border ${t.borderClass} ${t.cardBg} overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
                <div className="w-1 bg-cyan-400" />
                <div className="w-1 bg-fuchsia-500/80" />
                <div className="flex-1 p-6">
                  <p className="text-xs uppercase tracking-widest opacity-70">{post.frontmatter.date}</p>
                  <h2 className="${t.headingFont} text-2xl font-bold mt-2 group-hover:underline">
                    {post.frontmatter.title}
                  </h2>
                  <p className="mt-3 text-sm opacity-70">{post.frontmatter.excerpt}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "gradient-expressive") {
    return `import { Post } from "@/lib/types";

const gradients = [
  "from-pink-400 to-sky-400",
  "from-amber-400 to-fuchsia-400",
  "from-emerald-400 to-sky-400",
];

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-6">
        {posts.map((post, i) => {
          const g = gradients[i % gradients.length];
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/${t.id}/" + post.frontmatter.slug}
              className="block group"
            >
              <div className="rounded-xl overflow-hidden border ${t.borderClass} ${t.cardBg} hover:shadow-md transition-shadow">
                <div className={"h-2 bg-gradient-to-r " + g} />
                <div className="p-7">
                  <p className="text-xs opacity-60">{post.frontmatter.date}</p>
                  <h2 className="${t.headingFont} text-2xl font-bold mt-2 group-hover:underline">
                    {post.frontmatter.title}
                  </h2>
                  <p className="mt-4 opacity-70">{post.frontmatter.excerpt}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "retro-70s") {
    return `import { Post } from "@/lib/types";
import { TagList } from "@/components/shared/TagList";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, i) => {
          const rot = i % 2 === 1 ? "-rotate-1" : "rotate-1";
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/${t.id}/" + post.frontmatter.slug}
              className="block group"
            >
              <div
                className={
                  "rounded-lg border ${t.borderClass} bg-yellow-50 p-6 hover:shadow-md transition-shadow " +
                  rot
                }
              >
                <div className="bg-white border ${t.borderClass} rounded p-3">
                  <div className="aspect-video bg-orange-100 overflow-hidden rounded">
                    {post.frontmatter.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.frontmatter.coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-widest opacity-60">{post.frontmatter.date}</p>
                  <h2 className="${t.headingFont} text-2xl font-bold mt-2 group-hover:underline">
                    {post.frontmatter.title}
                  </h2>
                  <p className="mt-3 opacity-70">{post.frontmatter.excerpt}</p>
                  <div className="mt-4">
                    <TagList tags={post.frontmatter.tags} />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "executive-brief") {
    return `import { Post } from "@/lib/types";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Executive Brief</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/${t.id}/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="${t.cardBg} rounded-lg border ${t.borderClass} p-6 hover:shadow-md transition-shadow">
              <p className="text-xs uppercase tracking-widest ${t.accentClass}">Executive Summary</p>
              <h2 className="${t.headingFont} text-2xl font-bold mt-2 group-hover:underline">
                {post.frontmatter.title}
              </h2>
              <div className="mt-4 rounded border ${t.borderClass} bg-gray-50 p-4">
                <p className="text-sm opacity-70">{post.frontmatter.excerpt}</p>
              </div>
              <p className="mt-4 text-sm opacity-60">
                {post.frontmatter.date} &middot; {post.frontmatter.author}
              </p>
            </div>
          </a>
        ))}
      </div>
      <NewsletterCTA variant="light" />
    </div>
  );
}
`;
  }

  if (t.id === "timeline-digest") {
    return `import { Post } from "@/lib/types";

function formatMonthYear(isoDate: string) {
  const d = new Date(isoDate);
  const fmt = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
  return fmt.format(d);
}

export default function ArticleList({ posts }: { posts: Post[] }) {
  const entries: Array<{ type: "heading"; label: string } | { type: "post"; post: Post }> = [];
  let current = "";

  for (const post of posts) {
    const label = formatMonthYear(post.frontmatter.date);
    if (label !== current) {
      current = label;
      entries.push({ type: "heading", label });
    }
    entries.push({ type: "post", post });
  }

  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Timeline</h1>
      <div className="relative border-l-2 ${t.borderClass} ml-4 space-y-6 pl-8">
        {entries.map((entry) =>
          entry.type === "heading" ? (
            <div key={entry.label} className="pt-6">
              <div className="text-xs uppercase tracking-widest opacity-60">{entry.label}</div>
            </div>
          ) : (
            <a
              key={entry.post.frontmatter.slug}
              href={"/templates/${t.id}/" + entry.post.frontmatter.slug}
              className="block group relative"
            >
              <div className="absolute -left-10 top-1 w-4 h-4 rounded-full ${t.bgClass} border-2 ${t.borderClass}" />
              <span className="text-xs opacity-50">{entry.post.frontmatter.date}</span>
              <h2 className="${t.headingFont} text-lg font-bold group-hover:underline">
                {entry.post.frontmatter.title}
              </h2>
              <p className="text-sm opacity-70 mt-1">{entry.post.frontmatter.excerpt}</p>
              {entry.post.frontmatter.coverImage ? (
                <div className="mt-3 max-w-sm aspect-video bg-gray-200 overflow-hidden rounded border ${t.borderClass}">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.post.frontmatter.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
            </a>
          )
        )}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "code-blog") {
    return `import { Post } from "@/lib/types";
import { ReadingTime } from "@/components/shared/ReadingTime";

function getComplexity(content: string) {
  const fence = String.fromCharCode(96).repeat(3);
  const fences = content.split(fence).length - 1;
  const codeBlocks = Math.floor(fences / 2);
  const score = codeBlocks * 2 + Math.round(content.length / 1200);
  if (score <= 3) return "Low";
  if (score <= 6) return "Medium";
  return "High";
}

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-8">
        {posts.map((post) => {
          const complexity = getComplexity(post.content);
          return (
            <a
              key={post.frontmatter.slug}
              href={"/templates/${t.id}/" + post.frontmatter.slug}
              className="block group"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                <span className="opacity-70">{post.frontmatter.date}</span>
                <span>&middot;</span>
                <span className="opacity-70">
                  <ReadingTime content={post.content} />
                </span>
                <span>&middot;</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded border border-gray-700 text-yellow-300">
                  Complexity: {complexity}
                </span>
              </div>
              <h2 className="${t.headingFont} text-xl font-bold group-hover:underline">
                {post.frontmatter.title}
              </h2>
              <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "journal-split") {
    return `import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts;

  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Journal</h1>

      {featured ? (
        <a
          href={"/templates/${t.id}/" + featured.frontmatter.slug}
          className="block group mb-10"
        >
          <div className="${t.cardBg} rounded-lg border ${t.borderClass} overflow-hidden grid md:grid-cols-2">
            <div className="aspect-video md:aspect-auto bg-stone-200">
              {featured.frontmatter.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Featured</p>
              <h2 className="${t.headingFont} text-3xl font-bold group-hover:underline">
                {featured.frontmatter.title}
              </h2>
              <p className="mt-3 opacity-70">{featured.frontmatter.excerpt}</p>
              <p className="mt-6 text-sm opacity-60">
                {featured.frontmatter.date} &middot; {featured.frontmatter.author}
              </p>
            </div>
          </div>
        </a>
      ) : null}

      <div className="space-y-6">
        {rest.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/${t.id}/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <h2 className="${t.headingFont} text-xl font-bold group-hover:underline">
                    {post.frontmatter.title}
                  </h2>
                  <span className="text-sm opacity-50 shrink-0 ml-4">{post.frontmatter.date}</span>
                </div>
                <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>
              </div>
              {post.frontmatter.coverImage ? (
                <div className="hidden sm:block w-40 shrink-0 aspect-video bg-stone-200 overflow-hidden rounded border ${t.borderClass}">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.frontmatter.coverImage} alt="" className="w-full h-full object-cover" />
                </div>
              ) : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
`;
  }

  if (t.id === "folio-editorial") {
    return `import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts;

  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Articles</h1>

      {featured ? (
        <a
          href={"/templates/${t.id}/" + featured.frontmatter.slug}
          className="block group mb-10"
        >
          <div className="${t.cardBg} rounded-lg border ${t.borderClass} overflow-hidden">
            {featured.frontmatter.coverImage ? (
              <div className="aspect-video bg-amber-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Featured</p>
              <h2 className="${t.headingFont} text-3xl font-bold group-hover:underline">
                {featured.frontmatter.title}
              </h2>
              <p className="mt-3 opacity-70">{featured.frontmatter.excerpt}</p>
              <p className="mt-6 text-sm opacity-60">
                {featured.frontmatter.date} &middot; {featured.frontmatter.author}
              </p>
            </div>
          </div>
        </a>
      ) : null}

      {rest.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <a
              key={post.frontmatter.slug}
              href={"/templates/${t.id}/" + post.frontmatter.slug}
              className="block group ${t.cardBg} rounded-lg border ${t.borderClass} overflow-hidden hover:shadow-md transition-shadow"
            >
              {post.frontmatter.coverImage ? (
                <div className="aspect-video bg-amber-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.frontmatter.coverImage} alt="" className="w-full h-full object-cover" />
                </div>
              ) : null}
              <div className="p-5">
                <h3 className="${t.headingFont} text-xl font-bold group-hover:underline">
                  {post.frontmatter.title}
                </h3>
                <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
                <p className="opacity-70 mt-2">{post.frontmatter.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
`;
  }

  if (t.id === "one-column-light") {
    return `"use client";

import { useMemo, useState } from "react";
import { Post } from "@/lib/types";

export default function ArticleList({ posts }: { posts: Post[] }) {
  const pageSize = 2;
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const [page, setPage] = useState(0);

  const visiblePosts = useMemo(
    () => posts.slice(page * pageSize, page * pageSize + pageSize),
    [page, posts]
  );

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <div>
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-8">
        {visiblePosts.map((post) => (
          <a
            key={post.frontmatter.slug}
            href={"/templates/${t.id}/" + post.frontmatter.slug}
            className="block group"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="${t.headingFont} text-xl font-bold group-hover:underline">
                {post.frontmatter.title}
              </h2>
              <span className="text-sm opacity-50 shrink-0 ml-4">{post.frontmatter.date}</span>
            </div>
            <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>
          </a>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={!canPrev}
          className={
            "px-3 py-1.5 rounded border border-gray-200 hover:bg-white transition-colors " +
            (!canPrev ? "opacity-40 cursor-not-allowed" : "")
          }
        >
          Previous
        </button>
        <span className="opacity-60">
          Page {page + 1} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={!canNext}
          className={
            "px-3 py-1.5 rounded border border-gray-200 hover:bg-white transition-colors " +
            (!canNext ? "opacity-40 cursor-not-allowed" : "")
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
`;
  }

  const imports: string[] = ['import { Post } from "@/lib/types";'];
  if (t.showReadingTime) imports.push('import { ReadingTime } from "@/components/shared/ReadingTime";');
  if (t.showTags) imports.push('import { TagList } from "@/components/shared/TagList";');
  if (t.showBreadcrumbs) imports.push('import { Breadcrumbs } from "@/components/shared/Breadcrumbs";');
  if (t.showNewsletter) imports.push('import { NewsletterCTA } from "@/components/shared/NewsletterCTA";');

  const showFeaturedImage = templatesWithFeaturedImage.has(t.id);
  const tagVariant =
    t.id === "outline-only"
      ? "outline"
      : t.id === "hacker-neon"
        ? "neon"
        : t.hasDarkBg
          ? "dark"
          : "light";
  const newsletterVariant = t.hasDarkBg ? "dark" : "light";
  const imagePlaceholder = t.hasDarkBg ? "bg-white/10" : "bg-gray-200";

  let listBody: string;

  switch (t.listStyle) {
    case "grid":
      listBody = `
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={\`/templates/${t.id}/\${post.frontmatter.slug}\`} className="block group ${t.cardBg} rounded-lg border ${t.borderClass} overflow-hidden hover:shadow-md transition-shadow">
            ${showFeaturedImage ? `
            {post.frontmatter.coverImage ? (
              <div className="aspect-video ${imagePlaceholder} overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}` : ""}
            <div className="p-4">
              <h2 className="${t.headingFont} text-lg font-bold group-hover:underline">{post.frontmatter.title}</h2>
              <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
              <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>${t.showTags ? `\n              <div className="mt-3"><TagList tags={post.frontmatter.tags} variant="${tagVariant}" /></div>` : ""}
            </div>
          </a>
        ))}
      </div>`;
      break;
    case "masonry":
      listBody = `
      <div className="columns-1 md:columns-2 lg:columns-3 [column-gap:1.5rem]">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={\`/templates/${t.id}/\${post.frontmatter.slug}\`} className="block break-inside-avoid mb-6 group ${t.cardBg} rounded-lg border ${t.borderClass} overflow-hidden hover:shadow-md transition-shadow">
            ${showFeaturedImage ? `
            {post.frontmatter.coverImage ? (
              <div className="aspect-video ${imagePlaceholder} overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}` : ""}
            <div className="p-4">
              <h2 className="${t.headingFont} text-lg font-bold group-hover:underline">{post.frontmatter.title}</h2>
              <p className="text-sm opacity-60 mt-1">{post.frontmatter.date}</p>
              <p className="text-sm opacity-70 mt-2">{post.frontmatter.excerpt}</p>${t.showTags ? `\n              <div className="mt-3"><TagList tags={post.frontmatter.tags} variant="${tagVariant}" /></div>` : ""}
            </div>
          </a>
        ))}
      </div>`;
      break;
    case "cards":
      listBody = `
      <div className="space-y-6">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={\`/templates/${t.id}/\${post.frontmatter.slug}\`} className="block group ${t.cardBg} rounded-lg border ${t.borderClass} p-6 hover:shadow-md transition-shadow">
            ${showFeaturedImage ? `
            {post.frontmatter.coverImage ? (
              <div className="mb-4 aspect-video ${imagePlaceholder} overflow-hidden rounded border ${t.borderClass}">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.frontmatter.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}` : ""}
            <h2 className="${t.headingFont} text-xl font-bold group-hover:underline">{post.frontmatter.title}</h2>
            <p className="text-sm opacity-60 mt-1">{post.frontmatter.date} &middot; {post.frontmatter.author}</p>
            <p className="opacity-70 mt-2">{post.frontmatter.excerpt}</p>${t.showTags ? `\n            <div className="mt-3"><TagList tags={post.frontmatter.tags} variant="${tagVariant}" /></div>` : ""}
          </a>
        ))}
      </div>`;
      break;
    case "timeline":
      listBody = `
      <div className="relative border-l-2 ${t.borderClass} ml-4 space-y-8 pl-8">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={\`/templates/${t.id}/\${post.frontmatter.slug}\`} className="block group relative">
            <div className="absolute -left-10 top-1 w-4 h-4 rounded-full ${t.bgClass} border-2 ${t.borderClass}" />
            <span className="text-xs opacity-50">{post.frontmatter.date}</span>
            <h2 className="${t.headingFont} text-lg font-bold group-hover:underline">{post.frontmatter.title}</h2>
            <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>${showFeaturedImage ? `
            {post.frontmatter.coverImage ? (
              <div className="mt-3 max-w-sm aspect-video ${imagePlaceholder} overflow-hidden rounded border ${t.borderClass}">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.frontmatter.coverImage} alt="" className="w-full h-full object-cover" />
              </div>
            ) : null}` : ""}
          </a>
        ))}
      </div>`;
      break;
    case "stream":
      listBody = `
      <div className="space-y-4">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={\`/templates/${t.id}/\${post.frontmatter.slug}\`} className="block group p-4 rounded border ${t.borderClass} hover:shadow transition-shadow">
            <span className="text-xs opacity-50">{post.frontmatter.date}</span>
            <h2 className="${t.headingFont} font-bold group-hover:underline">{post.frontmatter.title}</h2>
            <p className="text-sm opacity-70">{post.frontmatter.excerpt}</p>
          </a>
        ))}
      </div>`;
      break;
    default: // list
      if (showFeaturedImage) {
        listBody = `
      <div className="space-y-8">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={\`/templates/${t.id}/\${post.frontmatter.slug}\`} className="block group">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <h2 className="${t.headingFont} text-xl font-bold group-hover:underline">{post.frontmatter.title}</h2>
                  <span className="text-sm opacity-50 shrink-0 ml-4">{post.frontmatter.date}</span>
                </div>
                <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>${t.showReadingTime ? '\n                <div className="text-xs opacity-50 mt-1"><ReadingTime content={post.content} /></div>' : ""}${t.showTags ? `\n                <div className="mt-2"><TagList tags={post.frontmatter.tags} variant="${tagVariant}" /></div>` : ""}
              </div>
              {post.frontmatter.coverImage ? (
                <div className="hidden sm:block w-32 shrink-0 aspect-video ${imagePlaceholder} overflow-hidden rounded border ${t.borderClass}">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.frontmatter.coverImage} alt="" className="w-full h-full object-cover" />
                </div>
              ) : null}
            </div>
          </a>
        ))}
      </div>`;
      } else {
        listBody = `
      <div className="space-y-8">
        {posts.map((post) => (
          <a key={post.frontmatter.slug} href={\`/templates/${t.id}/\${post.frontmatter.slug}\`} className="block group">
            <div className="flex items-baseline justify-between">
              <h2 className="${t.headingFont} text-xl font-bold group-hover:underline">{post.frontmatter.title}</h2>
              <span className="text-sm opacity-50 shrink-0 ml-4">{post.frontmatter.date}</span>
            </div>
            <p className="text-sm opacity-70 mt-1">{post.frontmatter.excerpt}</p>${t.showReadingTime ? '\n            <div className="text-xs opacity-50 mt-1"><ReadingTime content={post.content} /></div>' : ""}${t.showTags ? `\n            <div className="mt-2"><TagList tags={post.frontmatter.tags} variant="${tagVariant}" /></div>` : ""}
          </a>
        ))}
      </div>`;
      }
      break;
  }

  return `${imports.join("\n")}

export default function ArticleList({ posts }: { posts: Post[] }) {
  return (
    <div>${t.showBreadcrumbs ? '\n      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Articles" }]} />' : ""}
      <h1 className="${t.headingFont} text-3xl font-bold mb-8">Articles</h1>${listBody}${t.showNewsletter ? `\n      <NewsletterCTA variant="${newsletterVariant}" />` : ""}
    </div>
  );
}
`;
}

function generateArticlePage(t: TemplateDef): string {
  if (t.id === "api-doc-style") {
    return `import { Post } from "@/lib/types";
import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";
import { getTableOfContents } from "@/lib/toc";
import { TableOfContents } from "@/components/shared/TableOfContents";

export default function ArticlePage({ post }: { post: Post }) {
  const toc = getTableOfContents(post.content);

  return (
    <div className="flex gap-8">
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-8">
          <TableOfContents items={toc} variant="light" />
        </div>
      </aside>
      <article className="min-w-0 flex-1">
        <h1 className="${t.headingFont} text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
        <div className="flex items-center gap-3 text-sm opacity-60 mb-8">
          <span>{post.frontmatter.date}</span>
          <span>&middot;</span>
          <span>{post.frontmatter.author}</span>
        </div>
        <div className="lg:hidden">
          <TableOfContents items={toc} variant="light" />
        </div>
        <div className="prose max-w-none ${t.bodyFont}">
          <MarkdownRenderer source={post.content} variant="wiki" />
        </div>
      </article>
    </div>
  );
}
`;
  }

  const imports: string[] = [
    'import { Post } from "@/lib/types";',
    'import { MarkdownRenderer } from "@/components/shared/MarkdownRenderer";',
  ];
  if (t.showReadingTime) imports.push('import { ReadingTime } from "@/components/shared/ReadingTime";');
  if (t.showAuthorBio) imports.push('import { AuthorBio } from "@/components/shared/AuthorBio";');
  if (t.showTags) imports.push('import { TagList } from "@/components/shared/TagList";');
  if (t.showProgressBar) imports.push('import { ProgressBar } from "@/components/shared/ProgressBar";');
  if (t.showBreadcrumbs) imports.push('import { Breadcrumbs } from "@/components/shared/Breadcrumbs";');
  if (t.showNewsletter) imports.push('import { NewsletterCTA } from "@/components/shared/NewsletterCTA";');
  if (t.showToc) imports.push('import { getTableOfContents } from "@/lib/toc";');
  if (t.showToc) imports.push('import { TableOfContents } from "@/components/shared/TableOfContents";');
  if (t.showRelated) imports.push('import { getAllPosts } from "@/lib/posts";');
  if (t.showRelated) imports.push('import { RelatedPosts } from "@/components/shared/RelatedPosts";');

  const showFeaturedImage = templatesWithFeaturedImage.has(t.id);
  const tagVariant = t.id === "outline-only" ? "outline" : t.hasDarkBg ? "dark" : "light";
  const newsletterVariant = t.hasDarkBg ? "dark" : "light";
  const tocVariant = t.hasDarkBg ? "dark" : "light";
  const markdownVariant =
    t.id === "outline-only"
      ? "outline"
      : t.id === "brutalist-art" || t.id === "stark-monochrome"
        ? "outline"
      : t.id === "devlog-terminal" || t.id === "retro-terminal"
        ? "terminal"
        : t.id === "github-wiki" || t.id === "api-doc-style"
          ? "wiki"
          : t.id === "hacker-neon" || t.id === "neon-glitch"
            ? "neon"
            : t.hasDarkBg
              ? "dark"
              : "light";
  const authorBioVariant =
    t.id === "silent-elegance"
      ? "elegant"
      : t.id === "corporate-minimal"
        ? "corporate"
        : t.hasDarkBg
          ? "dark"
          : "light";
  const relatedVariant = t.hasDarkBg ? "dark" : "light";
  const progressBarProps = t.id === "dark-minimal-code" ? ' barClassName="bg-violet-400"' : "";

  return `${imports.join("\n")}

export default function ArticlePage({ post }: { post: Post }) {
  ${t.showToc ? "const toc = getTableOfContents(post.content);\n\n  " : ""}
  ${t.showRelated ? "const allPosts = getAllPosts().filter((p) => p.frontmatter.slug !== post.frontmatter.slug);\n  const tags = post.frontmatter.tags;\n  const relatedByTags = tags.length\n    ? allPosts.filter((p) => p.frontmatter.tags.some((tag) => tags.includes(tag)))\n    : [];\n  const related = (relatedByTags.length ? relatedByTags : allPosts).slice(0, 3);\n\n  " : ""}
  ${t.id === "code-blog" ? "const complexity = (() => {\n    const fence = String.fromCharCode(96).repeat(3);\n    const fences = post.content.split(fence).length - 1;\n    const codeBlocks = Math.floor(fences / 2);\n    const score = codeBlocks * 2 + Math.round(post.content.length / 1200);\n    if (score <= 3) return \"Low\";\n    if (score <= 6) return \"Medium\";\n    return \"High\";\n  })();\n\n  " : ""}
  return (
    <div>
      <article>${t.showProgressBar ? `\n              <ProgressBar${progressBarProps} />` : ""}${t.showBreadcrumbs ? '\n              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Articles", href: "/" }, { label: post.frontmatter.title }]} />' : ""}
              ${showFeaturedImage ? `
              {post.frontmatter.coverImage ? (
                <div className="mb-8 aspect-video overflow-hidden rounded-lg border ${t.borderClass}">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.frontmatter.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}` : ""}

              <h1 className="${t.headingFont} text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
              ${t.id === "code-blog" ? `
              <div className="flex flex-wrap items-center gap-2 text-sm mb-8">
                <span className="opacity-60">{post.frontmatter.date}</span>
                <span className="opacity-60">&middot;</span>
                <span className="opacity-60">{post.frontmatter.author}</span>${t.showReadingTime ? '\n                <span className="opacity-60">&middot;</span><span className="opacity-60"><ReadingTime content={post.content} /></span>' : ""}
                <span className="inline-flex items-center px-2 py-0.5 rounded border border-gray-700 text-yellow-300 text-xs">
                  Complexity: {complexity}
                </span>
              </div>` : `
              <div className="flex items-center gap-3 text-sm opacity-60 mb-8">
                <span>{post.frontmatter.date}</span>
                <span>&middot;</span>
                <span>{post.frontmatter.author}</span>${t.showReadingTime ? '\n                <span>&middot;</span><ReadingTime content={post.content} />' : ""}
              </div>`}
              ${t.showTags ? `\n              <div className="mb-6"><TagList tags={post.frontmatter.tags} variant="${tagVariant}" /></div>` : ""}${t.showToc ? `\n              <TableOfContents items={toc} variant="${tocVariant}" />` : ""}
              
              <div className="prose ${t.hasDarkBg ? "prose-invert" : ""} max-w-none ${t.bodyFont}">
                <MarkdownRenderer source={post.content} variant="${markdownVariant}" />
              </div>
              ${t.showRelated ? `\n              <RelatedPosts posts={related} variant="${relatedVariant}" />` : ""}
                ${t.showNewsletter ? `\n              <NewsletterCTA variant="${newsletterVariant}" />` : ""}${t.showAuthorBio ? `\n              <AuthorBio author={post.frontmatter.author} variant="${authorBioVariant}" />` : ""}
          </article>
    </div>
  );
}
`;
}

// ---------------------------------------------------------------------------
// Generate all templates
// ---------------------------------------------------------------------------
for (const t of templates) {
  const dir = path.join(root, t.id);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, "config.ts"), generateConfig(t));
  fs.writeFileSync(path.join(dir, "BlogLayout.tsx"), generateLayout(t));
  fs.writeFileSync(path.join(dir, "ArticleList.tsx"), generateArticleList(t));
  fs.writeFileSync(path.join(dir, "ArticlePage.tsx"), generateArticlePage(t));
}

console.log(`✅ Generated ${templates.length} templates in src/templates/`);

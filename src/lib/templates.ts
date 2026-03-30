import { TemplateConfig } from "./types";

const templateConfigs: TemplateConfig[] = [
  // MINIMAL (8)
  { id: "blank-canvas", name: "Blank Canvas", category: "minimal", description: "Full-width layout with classic serif typography and maximum whitespace", features: ["reading-time"], typography: "serif", colorScheme: "light" },
  { id: "one-column-light", name: "One Column Light", category: "minimal", description: "Centered 600px column with modern sans-serif and minimal pagination", features: ["pagination"], typography: "sans-serif", colorScheme: "light" },
  { id: "stark-monochrome", name: "Stark Monochrome", category: "minimal", description: "Strict monochrome brutalist design with breadcrumbs", features: ["breadcrumbs"], typography: "sans-serif", colorScheme: "monochrome" },
  { id: "whitespace-serif", name: "Whitespace Serif", category: "minimal", description: "Heavy serif typography with extremely spacious vertical rhythm", features: [], typography: "serif", colorScheme: "light" },
  { id: "outline-only", name: "Outline Only", category: "minimal", description: "Border-based design with no fills, monospace headings, high contrast", features: ["tags"], typography: "monospace", colorScheme: "light" },
  { id: "text-first", name: "Text First", category: "minimal", description: "Content-focused with subtle table of contents and reading time", features: ["toc", "reading-time"], typography: "sans-serif", colorScheme: "light" },
  { id: "grid-dots", name: "Grid Dots", category: "minimal", description: "Dotted background pattern with two-column article and side notes", features: ["side-notes"], typography: "sans-serif", colorScheme: "monochrome" },
  { id: "silent-elegance", name: "Silent Elegance", category: "minimal", description: "Centered column with gold accent, serif typography, author bio footer", features: ["author-bio"], typography: "serif", colorScheme: "light" },
  // EDITORIAL (8)
  { id: "magazine-grid", name: "Magazine Grid", category: "editorial", description: "Masonry 3-column hero with serif headers and sepia tones", features: ["breadcrumbs", "featured-image"], typography: "serif", colorScheme: "sepia" },
  { id: "newspaper-classic", name: "Newspaper Classic", category: "editorial", description: "Two-column layout with wide left and narrow right sidebar", features: ["sidebar", "featured-image"], typography: "serif", colorScheme: "light" },
  { id: "journal-split", name: "Journal Split", category: "editorial", description: "Split hero with image left and text right, earthy tones", features: ["featured-image"], typography: "serif", colorScheme: "earth" },
  { id: "editorial-sidebar", name: "Editorial Sidebar", category: "editorial", description: "Right sidebar with featured image, dark theme, related posts", features: ["sidebar", "related-posts", "featured-image"], typography: "serif", colorScheme: "dark" },
  { id: "gallery-layout", name: "Gallery Layout", category: "editorial", description: "Magazine grid with contemporary sans-serif and high contrast", features: ["featured-image", "tags"], typography: "sans-serif", colorScheme: "light" },
  { id: "folio-editorial", name: "Folio Editorial", category: "editorial", description: "Featured article hero full-width with card grid below", features: ["featured-image"], typography: "serif", colorScheme: "cream" },
  { id: "publication-dark", name: "Publication Dark", category: "editorial", description: "Dark editorial with white serif headers and newsletter CTA", features: ["sidebar", "newsletter-cta", "tags"], typography: "serif", colorScheme: "dark" },
  { id: "timeline-digest", name: "Timeline Digest", category: "editorial", description: "Vertical timeline article list with featured images", features: ["featured-image", "timeline"], typography: "mixed", colorScheme: "light" },
  // DEVELOPER (8)
  { id: "devlog-terminal", name: "Devlog Terminal", category: "developer", description: "Monospace code font everywhere with dark mode and CLI aesthetics", features: ["syntax-highlight", "reading-time"], typography: "monospace", colorScheme: "dark" },
  { id: "github-wiki", name: "GitHub Wiki", category: "developer", description: "Markdown-style rendering with prominent code blocks and grey backgrounds", features: ["toc", "syntax-highlight"], typography: "monospace", colorScheme: "light" },
  { id: "hacker-neon", name: "Hacker Neon", category: "developer", description: "Dark theme with neon green/cyan accents and cyberpunk aesthetics", features: ["syntax-highlight", "tags"], typography: "monospace", colorScheme: "neon" },
  { id: "code-blog", name: "Code Blog", category: "developer", description: "Syntax highlighting as central feature with complexity level indicator", features: ["syntax-highlight", "reading-time", "complexity"], typography: "monospace", colorScheme: "dark" },
  { id: "api-doc-style", name: "API Doc Style", category: "developer", description: "Sticky left sidebar TOC with monospace headings and full-width code blocks", features: ["toc", "sidebar", "syntax-highlight"], typography: "monospace", colorScheme: "light" },
  { id: "retro-terminal", name: "Retro Terminal", category: "developer", description: "Green on black terminal look with monospace typography and blinking cursor", features: ["syntax-highlight"], typography: "monospace", colorScheme: "terminal" },
  { id: "dark-minimal-code", name: "Dark Minimal Code", category: "developer", description: "Near-black background with neon accent line and progress bar", features: ["progress-bar", "syntax-highlight"], typography: "monospace", colorScheme: "dark" },
  { id: "rust-inspired", name: "Rust Inspired", category: "developer", description: "Burnt orange and dark brown with serif-monospace mix", features: ["sidebar", "syntax-highlight"], typography: "mixed", colorScheme: "rust" },
  // CREATIVE (9)
  { id: "rainbow-cards", name: "Rainbow Cards", category: "creative", description: "Colorful card grid with pastel backgrounds per post", features: ["tags"], typography: "sans-serif", colorScheme: "pastel" },
  { id: "asymmetric-bold", name: "Asymmetric Bold", category: "creative", description: "Zigzag asymmetric layout with handwritten-style headers", features: [], typography: "handwritten", colorScheme: "colorful" },
  { id: "brutalist-art", name: "Brutalist Art", category: "creative", description: "Heavy black lines, handwritten typography, high contrast avant-garde", features: [], typography: "handwritten", colorScheme: "monochrome" },
  { id: "pastel-dream", name: "Pastel Dream", category: "creative", description: "Soft pastel colors with serifs, rounded borders and dreamy gradients", features: ["tags"], typography: "serif", colorScheme: "pastel" },
  { id: "split-visual", name: "Split Visual", category: "creative", description: "Video hero placeholder with text split and masonry grid", features: ["featured-image"], typography: "sans-serif", colorScheme: "colorful" },
  { id: "sketch-hand", name: "Sketch Hand", category: "creative", description: "Sketchy SVG patterns, handwritten typography, soft colors", features: [], typography: "handwritten", colorScheme: "soft" },
  { id: "neon-glitch", name: "Neon Glitch", category: "creative", description: "Glitch and neon text effects, cyberpunk magenta/cyan palette", features: [], typography: "monospace", colorScheme: "neon" },
  { id: "gradient-expressive", name: "Gradient Expressive", category: "creative", description: "Bold gradients as content separators with rotating color schemes", features: [], typography: "serif", colorScheme: "gradient" },
  { id: "retro-70s", name: "Retro 70s", category: "creative", description: "Avocado/mustard/burnt orange palette with polaroid-style borders", features: ["tags"], typography: "serif", colorScheme: "retro" },
  // BUSINESS (9)
  { id: "corporate-minimal", name: "Corporate Minimal", category: "business", description: "Conservative layout with blue/white/grey palette and author credentials", features: ["sidebar", "author-bio"], typography: "sans-serif", colorScheme: "corporate" },
  { id: "executive-brief", name: "Executive Brief", category: "business", description: "Executive summary cards with two-column sidebar and newsletter CTA", features: ["sidebar", "newsletter-cta"], typography: "serif", colorScheme: "light" },
  { id: "landing-blog", name: "Landing Blog", category: "business", description: "Hero with big CTA and featured section above article list", features: ["newsletter-cta", "featured-image"], typography: "sans-serif", colorScheme: "light" },
  { id: "thought-leader", name: "Thought Leader", category: "business", description: "Prominent author photo, related articles sidebar with CTA", features: ["author-bio", "sidebar", "related-posts", "newsletter-cta"], typography: "serif", colorScheme: "light" },
  { id: "case-study-flow", name: "Case Study Flow", category: "business", description: "Narrative-driven layout with section icons and full-width images", features: ["featured-image"], typography: "sans-serif", colorScheme: "light" },
  { id: "resource-hub", name: "Resource Hub", category: "business", description: "Category filtering, metadata cards, search bar prominence", features: ["tags", "search"], typography: "sans-serif", colorScheme: "light" },
  { id: "webinar-sync", name: "Webinar Sync", category: "business", description: "Blog and webinar integration with event CTAs in sidebar", features: ["sidebar", "newsletter-cta"], typography: "sans-serif", colorScheme: "light" },
  { id: "b2b-index", name: "B2B Index", category: "business", description: "Magazine layout with business categories and enterprise sidebar", features: ["sidebar", "tags"], typography: "serif", colorScheme: "light" },
  { id: "industry-insights", name: "Industry Insights", category: "business", description: "Full-width article with styled pull quotes and sidebar news", features: ["sidebar", "newsletter-cta"], typography: "serif", colorScheme: "light" },
  // PERSONAL (8)
  { id: "home-page-blog", name: "Home Page Blog", category: "personal", description: "Portfolio top section with blog grid below, mixed typography", features: ["author-bio"], typography: "mixed", colorScheme: "colorful" },
  { id: "cozy-blog", name: "Cozy Blog", category: "personal", description: "Warm earth tones, serif typography, illustrated headers", features: ["sidebar", "author-bio"], typography: "serif", colorScheme: "warm" },
  { id: "stream-thoughts", name: "Stream Thoughts", category: "personal", description: "Vertical stream post-it note style with monospace typography", features: [], typography: "monospace", colorScheme: "pastel" },
  { id: "portfolio-journal", name: "Portfolio Journal", category: "personal", description: "Left sidebar for portfolio, main column for blog", features: ["sidebar"], typography: "serif", colorScheme: "cream" },
  { id: "indie-maker", name: "Indie Maker", category: "personal", description: "Quirky author sidebar with project list and colorful accents", features: ["sidebar", "author-bio"], typography: "sans-serif", colorScheme: "colorful" },
  { id: "notebook-analog", name: "Notebook Analog", category: "personal", description: "Paper texture background with handwritten font and pen-drawn borders", features: [], typography: "handwritten", colorScheme: "paper" },
  { id: "digital-garden", name: "Digital Garden", category: "personal", description: "Graph connections sidebar with zen palette and botanical serif", features: ["sidebar", "related-posts"], typography: "serif", colorScheme: "zen" },
  { id: "micro-personal", name: "Micro Personal", category: "personal", description: "Micro-content focused with timeline layout and playful pastels", features: ["timeline"], typography: "sans-serif", colorScheme: "pastel" },
];

export function getAllTemplates(): TemplateConfig[] {
  return templateConfigs;
}

export function getTemplateById(id: string): TemplateConfig | undefined {
  return templateConfigs.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): TemplateConfig[] {
  return templateConfigs.filter((t) => t.category === category);
}

export function getAllTemplateIds(): string[] {
  return templateConfigs.map((t) => t.id);
}

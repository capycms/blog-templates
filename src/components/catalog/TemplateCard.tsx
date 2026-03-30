import { TemplateConfig } from "@/lib/types";

const categoryStyles: Record<string, { bg: string; dot: string }> = {
  minimal: { bg: "bg-gray-100 text-gray-700", dot: "bg-gray-400" },
  editorial: { bg: "bg-amber-50 text-amber-700", dot: "bg-amber-400" },
  developer: { bg: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-400" },
  creative: { bg: "bg-pink-50 text-pink-700", dot: "bg-pink-400" },
  business: { bg: "bg-blue-50 text-blue-700", dot: "bg-blue-400" },
  personal: { bg: "bg-violet-50 text-violet-700", dot: "bg-violet-400" },
};

const typographyLabel: Record<string, string> = {
  serif: "Serif",
  "sans-serif": "Sans",
  monospace: "Mono",
  handwritten: "Hand",
  mixed: "Mixed",
};

export function TemplateCard({ template }: { template: TemplateConfig }) {
  const style = categoryStyles[template.category] || categoryStyles.minimal;

  return (
    <a
      href={`/templates/${template.id}`}
      className="group relative flex flex-col rounded-xl overflow-hidden border border-gray-200/80 bg-white hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Preview */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <iframe
          src={`/templates/${template.id}`}
          title={template.name}
          loading="lazy"
          tabIndex={-1}
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: "1280px",
            height: "900px",
            transform: "scale(0.3)",
            transformOrigin: "top left",
          }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 transition-all duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-medium px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            Preview →
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">
            {template.name}
          </h3>
          <span
            className={`shrink-0 inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${style.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {template.category}
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {template.description}
        </p>

        {/* Meta row */}
        <div className="mt-auto flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
            {typographyLabel[template.typography] || template.typography}
          </span>
          <span className="text-[11px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
            {template.colorScheme}
          </span>
          {template.features.slice(0, 2).map((f) => (
            <span
              key={f}
              className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded"
            >
              {f}
            </span>
          ))}
          {template.features.length > 2 && (
            <span className="text-[11px] text-gray-400">
              +{template.features.length - 2}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

import { TemplateConfig } from "@/lib/types";

const categoryColors: Record<string, string> = {
  minimal: "bg-gray-100 text-gray-700",
  editorial: "bg-amber-100 text-amber-800",
  developer: "bg-gray-800 text-white",
  creative: "bg-pink-100 text-pink-800",
  business: "bg-blue-100 text-blue-800",
  personal: "bg-green-100 text-green-800",
};

export function TemplateCard({ template }: { template: TemplateConfig }) {
  return (
    <a
      href={`/templates/${template.id}`}
      className="group block rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1"
    >
      <div className="relative h-52 overflow-hidden bg-gray-50">
        <iframe
          src={`/templates/${template.id}`}
          title={template.name}
          loading="lazy"
          tabIndex={-1}
          className="absolute top-0 left-0 origin-top-left pointer-events-none"
          style={{
            width: "1280px",
            height: "900px",
            transform: "scale(0.3)",
            transformOrigin: "top left",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span
          className={`absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[template.category] || "bg-gray-100 text-gray-700"}`}
        >
          {template.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{template.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{template.description}</p>
        <div className="flex flex-wrap gap-1">
          {template.features.slice(0, 3).map((f) => (
            <span key={f} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
              {f}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

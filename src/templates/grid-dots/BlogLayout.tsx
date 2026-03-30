import { withBasePath } from "@/lib/base-path";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-gray-50 bg-repeat text-gray-800 min-h-screen"
      style={{ backgroundImage: `url(${withBasePath("/patterns/dots.svg")})` }}
    >
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href={withBasePath("/")} className="font-sans text-xl font-bold text-gray-500">Grid Dots</a>
          <nav className="flex gap-4 text-sm">
            <a href={withBasePath("/")} className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8 flex gap-8">
        <div className="flex-1 min-w-0">{children}</div>
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 bg-white border-gray-200 border rounded-lg p-4">
              <h3 className="font-sans font-bold mb-2">About</h3>
              <p className="text-sm opacity-70">Grid Dots template</p>
            </div>
          </aside>
      </main>
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Grid Dots &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

import { Branding } from "@/lib/types";


export default function BlogLayout({ children, branding }: { children: React.ReactNode; branding?: Branding }) {
  const name = branding?.blogName ?? "Corporate Minimal";
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <header className="border-b border-gray-200 bg-gray-50/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-sans text-xl font-bold text-blue-600" style={branding?.accentColor ? { color: branding.accentColor } : undefined}>
            {branding?.logoUrl && <img src={branding.logoUrl} alt="" className="inline h-6 w-6 mr-2 rounded" />}
            {name}
          </a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
        <div className="flex-1 min-w-0">{children}</div>
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 bg-gray-50 border-gray-200 border rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xs uppercase tracking-widest text-blue-600">Company</h3>
                <p className="mt-2 text-sm opacity-70">CapyCMS Insights — product, engineering, and growth.</p>
              </div>
              <div className="border-t border-gray-200 p-4">
                <h3 className="text-xs uppercase tracking-widest text-blue-600">Latest</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/corporate-minimal/getting-started" className="hover:underline">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="/templates/corporate-minimal/vite-vs-nextjs" className="hover:underline">
                      Vite vs Next.js
                    </a>
                  </li>
                  <li>
                    <a href="/templates/corporate-minimal/essential-libraries" className="hover:underline">
                      Essential Libraries
                    </a>
                  </li>
                </ul>
              </div>
              <div className="border-t border-gray-200 p-4">
                <h3 className="text-xs uppercase tracking-widest text-blue-600">Topics</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border border-gray-200">Product</span>
                  <span className="text-xs px-2 py-1 rounded-full border border-gray-200">Engineering</span>
                  <span className="text-xs px-2 py-1 rounded-full border border-gray-200">Strategy</span>
                </div>
              </div>
            </div>
          </aside>
      </main>
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} {name} &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

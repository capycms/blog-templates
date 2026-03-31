import { Branding } from "@/lib/types";


export default function BlogLayout({ children, branding }: { children: React.ReactNode; branding?: Branding }) {
  const name = branding?.blogName ?? "Newspaper Classic";
  return (
    <div className="bg-stone-50 text-stone-900 min-h-screen">
      <header className="border-b border-stone-300 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-stone-600" style={branding?.accentColor ? { color: branding.accentColor } : undefined}>
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
            <div className="sticky top-8 bg-white border-stone-300 border rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-xs uppercase tracking-widest text-stone-600">In this issue</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/newspaper-classic/getting-started" className="hover:underline">
                      Getting Started with React Hooks
                    </a>
                  </li>
                  <li>
                    <a href="/templates/newspaper-classic/vite-vs-nextjs" className="hover:underline">
                      Vite vs Next.js
                    </a>
                  </li>
                  <li>
                    <a href="/templates/newspaper-classic/essential-libraries" className="hover:underline">
                      Essential React Libraries
                    </a>
                  </li>
                </ul>
              </div>
              <div className="border-t border-stone-300 p-4">
                <h3 className="text-xs uppercase tracking-widest text-stone-600">Sections</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border border-stone-300">React</span>
                  <span className="text-xs px-2 py-1 rounded-full border border-stone-300">Next.js</span>
                  <span className="text-xs px-2 py-1 rounded-full border border-stone-300">Tooling</span>
                </div>
              </div>
              <div className="border-t border-stone-300 p-4">
                <h3 className="text-xs uppercase tracking-widest text-stone-600">About</h3>
                <p className="text-xs opacity-70 mt-2">Newspaper Classic template</p>
              </div>
            </div>
          </aside>
      </main>
      <footer className="border-t border-stone-300 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} {name} &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

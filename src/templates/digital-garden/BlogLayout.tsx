
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-emerald-50 text-emerald-900 min-h-screen">
      <header className="border-b border-emerald-200 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-emerald-600">Digital Garden</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8 flex gap-8">
        
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 bg-white border-emerald-200 border rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-emerald-600">Connections</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border border-emerald-200">react</span>
                  <span className="text-xs px-2 py-1 rounded-full border border-emerald-200">nextjs</span>
                  <span className="text-xs px-2 py-1 rounded-full border border-emerald-200">tools</span>
                </div>
              </div>
              <div className="border-t border-emerald-200 p-4">
                <p className="text-xs uppercase tracking-widest text-emerald-600">Explore</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/digital-garden/getting-started" className="hover:underline">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="/templates/digital-garden/essential-libraries" className="hover:underline">
                      Essential Libraries
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside><div className="flex-1 min-w-0">{children}</div>
      </main>
      <footer className="border-t border-emerald-200 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Digital Garden &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

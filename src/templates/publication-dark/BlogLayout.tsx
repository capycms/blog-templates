
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-rose-400">Publication Dark</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
        <div className="flex-1 min-w-0">{children}</div>
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 bg-gray-900 border-gray-800 border rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-rose-400">Issue 01</p>
                <h3 className="font-serif font-bold mt-2">Also read</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/publication-dark/getting-started" className="hover:underline">
                      Getting Started with React Hooks
                    </a>
                  </li>
                  <li>
                    <a href="/templates/publication-dark/vite-vs-nextjs" className="hover:underline">
                      Vite vs Next.js
                    </a>
                  </li>
                  <li>
                    <a href="/templates/publication-dark/essential-libraries" className="hover:underline">
                      Essential React Libraries
                    </a>
                  </li>
                </ul>
              </div>
              <div className="border-t border-gray-800 p-4">
                <p className="text-xs opacity-70">Publication Dark template</p>
              </div>
            </div>
          </aside>
      </main>
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Publication Dark &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

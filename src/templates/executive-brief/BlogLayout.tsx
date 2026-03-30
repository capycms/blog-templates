
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-blue-500">Executive Brief</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8 flex gap-8">
        <div className="flex-1 min-w-0">{children}</div>
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 bg-white border-gray-200 border rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-blue-500">Executive Brief</p>
                <p className="mt-2 text-sm opacity-70">Short, decision-ready notes for busy teams.</p>
              </div>
              <div className="border-t border-gray-200 p-4">
                <h3 className="text-xs uppercase tracking-widest text-blue-500">Read next</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/executive-brief/getting-started" className="hover:underline">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="/templates/executive-brief/essential-libraries" className="hover:underline">
                      Essential Libraries
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
      </main>
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Executive Brief &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}


export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-orange-950 text-orange-100 min-h-screen">
      <header className="border-b border-orange-700 bg-orange-900/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-orange-400">Rust Inspired</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8 flex gap-8">
        <div className="flex-1 min-w-0">{children}</div>
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 bg-orange-900 border-orange-700 border rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-orange-400">Docs</p>
                <h3 className="font-serif font-bold mt-2">Topics</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded-full border border-orange-700 text-orange-100/80">Ownership</span>
                  <span className="text-xs px-2 py-1 rounded-full border border-orange-700 text-orange-100/80">Borrowing</span>
                  <span className="text-xs px-2 py-1 rounded-full border border-orange-700 text-orange-100/80">Lifetimes</span>
                </div>
              </div>
              <div className="border-t border-orange-700 p-4">
                <p className="text-xs uppercase tracking-widest text-orange-400">Read next</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/rust-inspired/getting-started" className="hover:underline text-orange-100/80">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="/templates/rust-inspired/essential-libraries" className="hover:underline text-orange-100/80">
                      Essential Libraries
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
      </main>
      <footer className="border-t border-orange-700 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Rust Inspired &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

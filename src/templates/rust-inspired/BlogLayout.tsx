
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
            <div className="sticky top-8 bg-orange-900 border-orange-700 border rounded-lg p-4">
              <h3 className="font-serif font-bold mb-2">About</h3>
              <p className="text-sm opacity-70">Rust Inspired template</p>
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

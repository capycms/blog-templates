
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 text-amber-900 min-h-screen">
      
      <header className="border-b border-amber-200 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-amber-700">Magazine Grid</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-amber-200 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Magazine Grid &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}


export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-100 text-orange-900 min-h-screen">
      <header className="border-b border-orange-300 bg-yellow-50/80 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-orange-600">Retro 70s</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-orange-300 mt-12">
        <div className="max-w-3xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Retro 70s &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

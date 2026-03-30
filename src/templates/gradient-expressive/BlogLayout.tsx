
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-pink-100 to-sky-100 text-gray-900 min-h-screen">
      
      <header className="border-b border-pink-200 bg-white/80 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-pink-600">Gradient Expressive</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-pink-200 mt-12">
        <div className="max-w-3xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Gradient Expressive &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

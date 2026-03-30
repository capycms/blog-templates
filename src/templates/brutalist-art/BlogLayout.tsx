
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-black min-h-screen">
      <header className="border-b border-black bg-white/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-mono text-xl font-bold text-black">Brutalist Art</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-black mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Brutalist Art &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

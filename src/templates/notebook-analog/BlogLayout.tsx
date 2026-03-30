
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:100%_28px] text-yellow-900 min-h-screen">
      <header className="border-b border-yellow-300 border-dashed bg-yellow-50/80 backdrop-blur">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-yellow-700">Notebook Analog</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-yellow-300 border-dashed mt-12">
        <div className="max-w-2xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Notebook Analog &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}


export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-950 text-gray-300 min-h-screen">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-mono text-xl font-bold text-violet-400">Dark Minimal Code</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-8"><div className="relative pl-6">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-violet-400/30" />
          {children}
        </div></main>
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-3xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Dark Minimal Code &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

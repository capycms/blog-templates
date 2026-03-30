
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-950 text-gray-300 min-h-screen">
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50"><div className="h-full bg-current w-0" /></div>
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-mono text-xl font-bold text-violet-400">Dark Minimal Code</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-3xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Dark Minimal Code &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

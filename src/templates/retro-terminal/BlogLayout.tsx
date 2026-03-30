
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:100%_4px] text-green-500 min-h-screen">
      <header className="border-b border-green-900 bg-black/80 backdrop-blur">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-mono text-xl font-bold text-green-300">Retro Terminal</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-green-900 mt-12">
        <div className="max-w-2xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Retro Terminal &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}


export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-purple-50 text-purple-800 min-h-screen">
      
      <header className="border-b border-purple-200 bg-white/80 backdrop-blur">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-mono text-xl font-bold text-purple-500">Stream Thoughts</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-purple-200 mt-12">
        <div className="max-w-2xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Stream Thoughts &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

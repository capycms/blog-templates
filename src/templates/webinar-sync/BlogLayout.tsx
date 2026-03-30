
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <header className="border-b border-violet-200 bg-violet-50/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-sans text-xl font-bold text-violet-500">Webinar Sync</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8 flex gap-8">
        <div className="flex-1 min-w-0">{children}</div>
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 bg-violet-50 border-violet-200 border rounded-lg p-4">
              <h3 className="font-sans font-bold mb-2">About</h3>
              <p className="text-sm opacity-70">Webinar Sync template</p>
            </div>
          </aside>
      </main>
      <footer className="border-t border-violet-200 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Webinar Sync &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

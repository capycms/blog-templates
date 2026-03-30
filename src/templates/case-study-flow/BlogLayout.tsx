
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <header className="border-b border-sky-200 bg-sky-50/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-sans text-xl font-bold text-sky-500">Case Study Flow</a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-sky-200 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; 2026 Case Study Flow &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

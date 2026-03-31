import { Branding } from "@/lib/types";


export default function BlogLayout({ children, branding }: { children: React.ReactNode; branding?: Branding }) {
  const name = branding?.blogName ?? "Cozy Blog";
  return (
    <div className="bg-orange-50 text-orange-900 min-h-screen">
      <header className="border-b border-orange-200 bg-white/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-orange-500" style={branding?.accentColor ? { color: branding.accentColor } : undefined}>
            {branding?.logoUrl && <img src={branding.logoUrl} alt="" className="inline h-6 w-6 mr-2 rounded" />}
            {name}
          </a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8 flex gap-8">
        <div className="flex-1 min-w-0">{children}</div>
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-8 bg-white border-orange-200 border rounded-lg overflow-hidden">
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-orange-500">About me</p>
                <p className="mt-2 text-sm opacity-70">
                  Warm notes on building, learning, and life.
                </p>
              </div>
              <div className="border-t border-orange-200 p-4">
                <p className="text-xs uppercase tracking-widest text-orange-500">Latest</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a href="/templates/cozy-blog/getting-started" className="hover:underline">
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="/templates/cozy-blog/essential-libraries" className="hover:underline">
                      Essential Libraries
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
      </main>
      <footer className="border-t border-orange-200 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} {name} &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

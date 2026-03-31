import { Branding } from "@/lib/types";


export default function BlogLayout({ children, branding }: { children: React.ReactNode; branding?: Branding }) {
  const name = branding?.blogName ?? "Retro 70s";
  return (
    <div className="bg-yellow-100 text-orange-900 min-h-screen">
      <header className="border-b border-orange-300 bg-yellow-50/80 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-serif text-xl font-bold text-orange-600" style={branding?.accentColor ? { color: branding.accentColor } : undefined}>
            {branding?.logoUrl && <img src={branding.logoUrl} alt="" className="inline h-6 w-6 mr-2 rounded" />}
            {name}
          </a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-orange-300 mt-12">
        <div className="max-w-3xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} {name} &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

import { Branding } from "@/lib/types";


export default function BlogLayout({ children, branding }: { children: React.ReactNode; branding?: Branding }) {
  const name = branding?.blogName ?? "Micro Personal";
  return (
    <div className="bg-pink-50 text-pink-900 min-h-screen">
      <header className="border-b border-pink-200 bg-white/80 backdrop-blur">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-sans text-xl font-bold text-pink-500" style={branding?.accentColor ? { color: branding.accentColor } : undefined}>
            {branding?.logoUrl && <img src={branding.logoUrl} alt="" className="inline h-6 w-6 mr-2 rounded" />}
            {name}
          </a>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-pink-200 mt-12">
        <div className="max-w-2xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} {name} &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

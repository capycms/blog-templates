import { Branding } from "@/lib/types";

import { withBasePath } from "@/lib/base-path";

export default function BlogLayout({ children, branding }: { children: React.ReactNode; branding?: Branding }) {
  const name = branding?.blogName ?? "Sketch Hand";
  return (
    <div
      className="bg-amber-50 bg-repeat text-amber-900 min-h-screen"
      style={{ backgroundImage: `url(${withBasePath("/patterns/sketch.svg")})` }}
    >
      <header className="border-b border-amber-300 border-dashed bg-amber-50/80 backdrop-blur">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href={withBasePath("/")} className="font-serif text-xl font-bold text-amber-600">
            {branding?.logoUrl && <img src={branding.logoUrl} alt="" className="inline h-6 w-6 mr-2 rounded" />}
            {name}
          </a>
          <nav className="flex gap-4 text-sm">
            <a href={withBasePath("/")} className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
          </nav>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-amber-300 border-dashed mt-12">
        <div className="max-w-2xl mx-auto px-6 py-6 text-center text-sm opacity-60">
          &copy; {new Date().getFullYear()} {name} &mdash; Built with CapyCMS
        </div>
      </footer>
    </div>
  );
}

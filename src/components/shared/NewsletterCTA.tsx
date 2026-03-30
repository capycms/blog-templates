'use client';

export function NewsletterCTA({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-lg p-6 my-8 border ${
        isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
      }`}
    >
      <h3 className="font-bold text-lg mb-2">Subscribe to the newsletter</h3>
      <p className={`text-sm mb-4 ${isDark ? "text-white/70" : "text-gray-600"}`}>
        Get the latest posts delivered right to your inbox.
      </p>
      <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="you@example.com"
          className={`flex-1 px-3 py-2 rounded text-sm outline-none ${
            isDark
              ? "bg-black/20 border border-white/10 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/15"
              : "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-black/10"
          }`}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-sm ${
            isDark
              ? "bg-white text-black hover:bg-white/90"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

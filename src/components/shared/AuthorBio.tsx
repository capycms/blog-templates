export function AuthorBio({
  author,
  variant = "light",
}: {
  author: string;
  variant?: "light" | "dark" | "elegant";
}) {
  const isDark = variant === "dark";
  const isElegant = variant === "elegant";

  const borderClass = isDark
    ? "border-white/10"
    : isElegant
      ? "border-amber-200"
      : "border-gray-200";

  const avatarClass = isDark
    ? "bg-white/10 text-white/80 border border-white/10"
    : isElegant
      ? "bg-amber-50 text-amber-700 border border-amber-200"
      : "bg-gray-200 text-gray-700";

  const roleClass = isDark
    ? "text-white/60"
    : isElegant
      ? "text-amber-700/70"
      : "opacity-60";

  return (
    <div className={`flex items-center gap-4 mt-10 pt-6 border-t ${borderClass}`}>
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${avatarClass}`}
      >
        {author.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="font-semibold">{author}</p>
        <p className={`text-sm ${roleClass}`}>Writer & content creator</p>
      </div>
    </div>
  );
}

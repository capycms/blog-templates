export function AuthorBio({ author }: { author: string }) {
  return (
    <div className="flex items-center gap-4 mt-8 pt-6 border-t">
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-600">
        {author.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm opacity-60">Writer & content creator</p>
      </div>
    </div>
  );
}

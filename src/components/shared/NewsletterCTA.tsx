'use client';

export function NewsletterCTA() {
  return (
    <div className="bg-gray-50 rounded-lg p-6 my-8">
      <h3 className="font-bold text-lg mb-2">Subscribe to the newsletter</h3>
      <p className="text-sm text-gray-600 mb-4">
        Get the latest posts delivered right to your inbox.
      </p>
      <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="you@example.com"
          className="flex-1 px-3 py-2 border rounded text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

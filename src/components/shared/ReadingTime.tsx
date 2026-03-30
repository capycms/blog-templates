export function ReadingTime({ content }: { content: string }) {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return <span>{minutes} min read</span>;
}

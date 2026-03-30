import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const components = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
      {...props}
    />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-gray-300" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto mb-4 text-sm" {...props} />
  ),
  code: (props: React.ComponentProps<"code"> & { className?: string }) => {
    const isInline = !props.className;
    return isInline ? (
      <code className="bg-gray-100 text-pink-600 rounded px-1.5 py-0.5 text-sm font-mono" {...props} />
    ) : (
      <code {...props} />
    );
  },
  hr: () => <hr className="my-8 border-gray-200" />,
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-blue-600 underline hover:text-blue-800" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-bold" {...props} />
  ),
  img: (props: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg max-w-full h-auto my-4" alt={props.alt || ""} {...props} />
  ),
};

export function MarkdownRenderer({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
      components={components}
    />
  );
}

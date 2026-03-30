import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

type MarkdownVariant = "light" | "dark" | "outline" | "terminal" | "wiki" | "neon";

function getComponents(variant: MarkdownVariant) {
  const blockquoteClass =
    variant === "terminal"
      ? "border-l-4 border-green-900 pl-4 italic text-green-200/80 my-4"
      : variant === "neon"
        ? "border-l-4 border-fuchsia-700 pl-4 italic text-cyan-200/80 my-4"
        : variant === "dark"
          ? "border-l-4 border-white/20 pl-4 italic text-white/70 my-4"
          : variant === "wiki"
            ? "border-l-4 border-gray-200 pl-4 italic text-gray-700 my-4"
            : variant === "outline"
              ? "border-l-4 border-gray-900 pl-4 italic text-gray-800 my-4"
              : "border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4";

  const tableBorderClass =
    variant === "terminal"
      ? "border-green-900"
      : variant === "neon"
        ? "border-cyan-900"
        : variant === "dark"
          ? "border-white/15"
          : variant === "wiki"
            ? "border-gray-200"
            : variant === "outline"
              ? "border-gray-900"
              : "border-gray-300";

  const thBgClass =
    variant === "terminal"
      ? "bg-black/40"
      : variant === "neon"
        ? "bg-black/40"
        : variant === "dark"
          ? "bg-white/5"
          : variant === "wiki"
            ? "bg-gray-50"
            : variant === "outline"
              ? "bg-transparent"
              : "bg-gray-100";

  const preClass =
    variant === "terminal"
      ? "bg-black/50 text-green-100 border border-green-900"
      : variant === "neon"
        ? "bg-black/50 text-cyan-100 border border-fuchsia-800"
        : variant === "dark"
          ? "bg-black/30 text-gray-100 border border-white/10"
          : variant === "wiki"
            ? "bg-gray-50 text-gray-900 border border-gray-200"
            : variant === "outline"
              ? "bg-transparent text-gray-900 border border-gray-900"
              : "bg-gray-900 text-gray-100";

  const inlineCodeClass =
    variant === "terminal"
      ? "bg-black/50 text-green-200 border border-green-900"
      : variant === "neon"
        ? "bg-black/50 text-fuchsia-200 border border-fuchsia-800"
        : variant === "dark"
          ? "bg-white/10 text-white border border-white/10"
          : variant === "wiki"
            ? "bg-gray-100 text-gray-900 border border-gray-200"
            : variant === "outline"
              ? "bg-transparent text-gray-900 border border-gray-900"
              : "bg-gray-100 text-pink-600";

  const hrClass =
    variant === "terminal"
      ? "border-green-900"
      : variant === "neon"
        ? "border-fuchsia-800"
        : variant === "dark"
          ? "border-white/15"
          : variant === "wiki"
            ? "border-gray-200"
            : variant === "outline"
              ? "border-gray-900"
              : "border-gray-200";

  const linkClass =
    variant === "terminal"
      ? "text-green-200 underline hover:text-green-100"
      : variant === "neon"
        ? "text-cyan-300 underline hover:text-cyan-200"
        : variant === "dark"
          ? "text-blue-300 underline hover:text-blue-200"
          : variant === "wiki"
            ? "text-blue-600 underline hover:text-blue-800"
            : variant === "outline"
              ? "text-gray-900 underline hover:text-gray-700"
              : "text-blue-600 underline hover:text-blue-800";

  return {
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
      <blockquote className={blockquoteClass} {...props} />
    ),
    table: (props: React.ComponentProps<"table">) => (
      <div className="overflow-x-auto mb-4">
        <table
          className={`min-w-full border-collapse border ${tableBorderClass}`}
          {...props}
        />
      </div>
    ),
    th: (props: React.ComponentProps<"th">) => (
      <th
        className={`border ${tableBorderClass} ${thBgClass} px-4 py-2 text-left font-semibold`}
        {...props}
      />
    ),
    td: (props: React.ComponentProps<"td">) => (
      <td className={`border ${tableBorderClass} px-4 py-2`} {...props} />
    ),
    pre: (props: React.ComponentProps<"pre">) => (
      <pre className={`rounded-lg p-4 overflow-x-auto mb-4 text-sm ${preClass}`} {...props} />
    ),
    code: (props: React.ComponentProps<"code"> & { className?: string }) => {
      const isInline = !props.className;
      return isInline ? (
        <code
          className={`rounded px-1.5 py-0.5 text-sm font-mono ${inlineCodeClass}`}
          {...props}
        />
      ) : (
        <code {...props} />
      );
    },
    hr: () => <hr className={`my-8 ${hrClass}`} />,
    a: (props: React.ComponentProps<"a">) => (
      <a className={linkClass} {...props} />
    ),
    strong: (props: React.ComponentProps<"strong">) => (
      <strong className="font-bold" {...props} />
    ),
    img: (props: React.ComponentProps<"img">) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="rounded-lg max-w-full h-auto my-4" alt={props.alt || ""} {...props} />
    ),
  };
}

export function MarkdownRenderer({
  source,
  variant = "light",
  syntaxHighlight,
}: {
  source: string;
  variant?: MarkdownVariant;
  syntaxHighlight?: boolean;
}) {
  const isLightVariant = variant === "light" || variant === "wiki" || variant === "outline";
  const shikiTheme = isLightVariant ? "github-light" : "github-dark";

  const rehypePlugins: any[] = [rehypeSlug];
  if (syntaxHighlight) {
    rehypePlugins.push([
      rehypePrettyCode,
      { theme: shikiTheme, keepBackground: false, bypassInlineCode: true },
    ]);
  }

  return (
    <MDXRemote
      source={source}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins } }}
      components={getComponents(variant)}
    />
  );
}

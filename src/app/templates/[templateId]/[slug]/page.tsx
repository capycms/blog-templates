import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { getTemplateById } from "@/lib/templates";
import { getTemplateComponents, allTemplateIds } from "@/lib/template-registry";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { templateId: string; slug: string }[] = [];
  for (const templateId of allTemplateIds) {
    for (const slug of slugs) {
      params.push({ templateId, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ templateId: string; slug: string }>;
}) {
  const { templateId, slug } = await params;
  const config = getTemplateById(templateId);
  const post = getPostBySlug(slug);
  return {
    title: post
      ? `${post.frontmatter.title} — ${config?.name ?? templateId}`
      : "Not Found",
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ templateId: string; slug: string }>;
}) {
  const { templateId, slug } = await params;
  const config = getTemplateById(templateId);
  const components = getTemplateComponents(templateId);
  const post = getPostBySlug(slug);
  if (!config || !components || !post) notFound();

  const { BlogLayout, ArticlePage: ArticlePageComponent } = components;

  return (
    <BlogLayout>
      <div className="mb-6">
        <a
          href={`/templates/${templateId}`}
          className="text-sm opacity-60 hover:underline"
        >
          &larr; Back to article list
        </a>
      </div>
      <ArticlePageComponent post={post} />
    </BlogLayout>
  );
}

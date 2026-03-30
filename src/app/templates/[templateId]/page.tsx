import { getAllPosts } from "@/lib/posts";
import { getTemplateById } from "@/lib/templates";
import { getTemplateComponents, allTemplateIds } from "@/lib/template-registry";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return allTemplateIds.map((id) => ({ templateId: id }));
}

export function generateMetadata({ params }: { params: Promise<{ templateId: string }> }) {
  return params.then(({ templateId }) => {
    const config = getTemplateById(templateId);
    return {
      title: config ? `${config.name} — CapyCMS Templates` : "Not Found",
    };
  });
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const config = getTemplateById(templateId);
  const components = getTemplateComponents(templateId);
  if (!config || !components) notFound();

  const posts = getAllPosts();
  const { BlogLayout, ArticleList } = components;

  return (
    <BlogLayout>
      <div className="mb-6">
        <a href="/" className="text-sm opacity-60 hover:underline">
          &larr; Back to catalog
        </a>
      </div>
      <ArticleList posts={posts} />
    </BlogLayout>
  );
}

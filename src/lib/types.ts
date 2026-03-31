export type Category =
  | "minimal"
  | "editorial"
  | "developer"
  | "creative"
  | "business"
  | "personal";

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
}

export interface TemplateConfig {
  id: string;
  name: string;
  category: Category;
  description: string;
  features: string[];
  typography: "serif" | "sans-serif" | "monospace" | "handwritten" | "mixed";
  colorScheme: string;
}

export interface Branding {
  blogName: string;
  accentColor: string;
  logoUrl?: string;
}

export interface TemplateModule {
  config: TemplateConfig;
  ArticleList: React.ComponentType<{ posts: Post[]; branding?: Branding }>;
  ArticlePage: React.ComponentType<{ post: Post; branding?: Branding }>;
  BlogLayout: React.ComponentType<{ children: React.ReactNode; branding?: Branding }>;
}

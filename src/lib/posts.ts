import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostFrontmatter } from "./types";
import { withBasePath } from "./base-path";

const userPostsDirectory = path.join(process.cwd(), "content/posts");
const demoPostsDirectory = path.join(process.cwd(), "content/demo-posts");

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

function resolvePostsDirectory(): string {
  const userFiles = listMarkdownFiles(userPostsDirectory);
  if (userFiles.length > 0) return userPostsDirectory;
  return demoPostsDirectory;
}

export function getAllPosts(): Post[] {
  const postsDirectory = resolvePostsDirectory();
  const files = listMarkdownFiles(postsDirectory);
  if (files.length === 0) return [];
  return files
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);

      const frontmatter = data as PostFrontmatter;
      return {
        frontmatter: frontmatter.coverImage
          ? { ...frontmatter, coverImage: withBasePath(frontmatter.coverImage) }
          : frontmatter,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.frontmatter.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.frontmatter.slug);
}

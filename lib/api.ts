import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  published_at: string;
  meta_title?: string;
  meta_description?: string;
  github_url?: string | null;
  featured_image?: string | null;
  content: string;
}

export async function getPosts(): Promise<BlogPostData[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title || "",
        excerpt: data.excerpt || "",
        published_at: data.published_at || "",
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        github_url: data.github_url || null,
        featured_image: data.featured_image || null,
        content: content,
      };
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => {
    return b.published_at.localeCompare(a.published_at);
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    
    // Render markdown content to HTML string
    const htmlContent = await marked.parse(content);
    
    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      published_at: data.published_at || "",
      meta_title: data.meta_title || "",
      meta_description: data.meta_description || "",
      github_url: data.github_url || null,
      featured_image: data.featured_image || null,
      content: htmlContent,
    };
  } catch (error) {
    console.error(`Error reading post with slug ${slug}:`, error);
    return null;
  }
}

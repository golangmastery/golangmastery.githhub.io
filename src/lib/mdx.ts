import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

// Define the content types
export type ContentType = 'courses' | 'projects';

// Define the frontmatter interface
export interface Frontmatter {
  title: string;
  description: string;
  coverImage?: string;
  level?: string;
  difficulty?: string;
  tags?: string[];
  technologies?: string[];
  demoUrl?: string;
  repoUrl?: string;
  labs?: any[];
  [key: string]: any;
}

// Get the content directory
const contentDirectory = path.join(process.cwd(), 'content');

// Get all content files for a specific type
export function getAllContentFiles(type: ContentType): string[] {
  const contentTypeDirectory = path.join(contentDirectory, type);
  
  // Check if directory exists
  if (!fs.existsSync(contentTypeDirectory)) {
    return [];
  }
  
  return fs.readdirSync(contentTypeDirectory).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
}

// Get content file by slug
export function getContentFileBySlug(type: ContentType, slug: string) {
  const contentTypeDirectory = path.join(contentDirectory, type);
  const filePath = path.join(contentTypeDirectory, `${slug}.mdx`);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    // Try .md extension if .mdx doesn't exist
    const mdFilePath = path.join(contentTypeDirectory, `${slug}.md`);
    if (!fs.existsSync(mdFilePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(mdFilePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      frontmatter: data as Frontmatter,
      slug,
      content,
    };
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    frontmatter: data as Frontmatter,
    slug,
    content,
  };
}

// Get all content for a specific type
export async function getAllContent(type: ContentType) {
  const files = getAllContentFiles(type);
  
  if (files.length === 0) {
    return [];
  }
  
  const content = files.map(file => {
    const filePath = path.join(contentDirectory, type, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      frontmatter: data as Frontmatter,
      slug: file.replace(/\.mdx?$/, ''),
    };
  });
  
  // Sort content by level/difficulty (Beginner, Intermediate, Advanced) and then by title
  return content.sort((a, b) => {
    const levelOrder: Record<string, number> = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
    const levelA = levelOrder[(a.frontmatter.level || a.frontmatter.difficulty) as string] || 999;
    const levelB = levelOrder[(b.frontmatter.level || b.frontmatter.difficulty) as string] || 999;

    if (levelA !== levelB) {
      return levelA - levelB;
    }

    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}

// Convert MDX to HTML
export async function serializeMDX(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    }
  });
  
  return mdxSource;
}

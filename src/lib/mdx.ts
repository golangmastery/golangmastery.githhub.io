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
  date?: string;
  slug: string;
  coverImage: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  labs?: { title: string; slug: string; description: string }[];
}

// Get the content directory
const contentDirectory = path.join(process.cwd(), 'src/content');

// Get all content files for a specific type
export function getAllContentFiles(type: ContentType): string[] {
  const contentTypeDirectory = path.join(contentDirectory, type);
  return fs.readdirSync(contentTypeDirectory).filter(file => file.endsWith('.mdx'));
}

// Get content file by slug
export function getContentFileBySlug(type: ContentType, slug: string) {
  const contentTypeDirectory = path.join(contentDirectory, type);
  const filePath = path.join(contentTypeDirectory, `${slug}.mdx`);
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
  
  const content = files.map(file => {
    const filePath = path.join(contentDirectory, type, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      frontmatter: data as Frontmatter,
      slug: file.replace('.mdx', ''),
    };
  });
  
  return content;
}

// Serialize MDX content
export async function serializeMdx(content: string) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    },
  });
}

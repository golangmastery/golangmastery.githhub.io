import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

// Get the content directory
const contentDirectory = path.join(process.cwd(), 'content');

// Get all content files for a specific type
export function getAllContentFiles(type) {
  const contentTypeDirectory = path.join(contentDirectory, type);

  // Check if directory exists
  if (!fs.existsSync(contentTypeDirectory)) {
    return [];
  }

  return fs.readdirSync(contentTypeDirectory).filter(file => file.endsWith('.mdx'));
}

// Get content file by slug
export function getContentFileBySlug(type, slug) {
  const contentTypeDirectory = path.join(contentDirectory, type);
  const filePath = path.join(contentTypeDirectory, `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    slug,
    content,
  };
}

// Get all content for a specific type
export async function getAllContent(type) {
  const files = getAllContentFiles(type);

  if (files.length === 0) {
    return [];
  }

  const content = files.map(file => {
    const filePath = path.join(contentDirectory, type, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      frontmatter: data,
      slug: file.replace('.mdx', ''),
    };
  });

  // Sort content by level (Beginner, Intermediate, Advanced) and then by title
  return content.sort((a, b) => {
    const levelOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
    const levelA = levelOrder[a.frontmatter.level] || 999;
    const levelB = levelOrder[b.frontmatter.level] || 999;

    if (levelA !== levelB) {
      return levelA - levelB;
    }

    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}

// Serialize MDX content
export async function serializeMdx(content) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    },
    scope: {
      // Add any global variables you want available in MDX here
    },
  });
}

// Get related content based on tags
export async function getRelatedContent(type, currentSlug, tags, limit = 3) {
  const allContent = await getAllContent(type);

  // Filter out the current content and find related content by tags
  const relatedContent = allContent
    .filter(item => item.slug !== currentSlug)
    .filter(item => {
      const itemTags = item.frontmatter.tags || [];
      return tags.some(tag => itemTags.includes(tag));
    })
    .slice(0, limit);

  return relatedContent;
}

// Get content by tag
export async function getContentByTag(type, tag) {
  const allContent = await getAllContent(type);

  return allContent.filter(item => {
    const itemTags = item.frontmatter.tags || [];
    return itemTags.includes(tag);
  });
}

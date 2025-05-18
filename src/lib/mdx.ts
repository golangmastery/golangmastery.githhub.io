import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
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
export function getContentFileBySlug(type: string, slug: string) {
  try {
    const contentTypeDirectory = path.join(contentDirectory, type);
    const filePath = path.join(contentTypeDirectory, `${slug}.mdx`);
    
    console.log(`Trying to access file: ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File exists: false`);
      
      // Special case for quick-start-with-golang-modules
      if (type === 'courses/quick-start-with-golang-modules') {
        const directPath = path.join(contentDirectory, 'courses/quick-start-with-golang-modules', `${slug}.mdx`);
        console.log(`Trying quick-start-with-golang-modules direct path: ${directPath}`);
        
        if (fs.existsSync(directPath)) {
          console.log(`Found file at direct path: ${directPath}`);
          const fileContents = fs.readFileSync(directPath, 'utf8');
          const { data, content } = matter(fileContents);
          
          console.log(`File exists: true`);
          console.log(`File size: ${fileContents.length} bytes`);
          
          return {
            frontmatter: data as Frontmatter,
            slug,
            content,
          };
        }
      }
      
      // If direct path doesn't exist, try course-specific directory for modules
      if (type.includes('courses/')) {
        const courseSlug = type.split('/')[1];
        const alternatePath = path.join(contentDirectory, 'courses', `${courseSlug}-modules`, `${slug}.mdx`);
        
        console.log(`File not found, trying alternate path: ${alternatePath}`);
        
        if (fs.existsSync(alternatePath)) {
          console.log(`Found file at alternate path: ${alternatePath}`);
          const fileContents = fs.readFileSync(alternatePath, 'utf8');
          const { data, content } = matter(fileContents);
          
          console.log(`File exists: true`);
          console.log(`File size: ${fileContents.length} bytes`);
          
          return {
            frontmatter: data as Frontmatter,
            slug,
            content,
          };
        }
      }
      
      // Try .md extension if .mdx doesn't exist
      const mdFilePath = path.join(contentTypeDirectory, `${slug}.md`);
      if (!fs.existsSync(mdFilePath)) {
        console.log(`File not found: ${filePath}`);
        throw new Error(`File not found: ${filePath}`);
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
    
    console.log(`File exists: true`);
    console.log(`File size: ${fileContents.length} bytes`);
    
    return {
      frontmatter: data as Frontmatter,
      slug,
      content,
    };
  } catch (error) {
    console.error(`Error loading MDX file for ${slug}:`, error);
    throw error;
  }
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
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug
      ],
      format: 'mdx',
    }
  });
  
  return mdxSource;
}

// Added for compatibility with pages/courses/[...slug].tsx
export const serializeMdx = serializeMDX;

// Get all module files for a course
export function getModuleFiles(courseSlug: string) {
  try {
    // First try to read modules directly from the course directory
    const directModulesPath = path.join(contentDirectory, 'courses', courseSlug);
    
    if (fs.existsSync(directModulesPath)) {
      console.log(`Using direct module path: ${directModulesPath}`);
      
      // Read all module files and prepare metadata
      const moduleFiles = fs.readdirSync(directModulesPath)
        .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
        .map(file => {
          const filePath = path.join(directModulesPath, file);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContents);
          const slug = file.replace(/\.mdx?$/, '');
          
          // Extract order from filename (if it starts with a number)
          const orderMatch = slug.match(/^(\d+)/);
          const order = orderMatch ? parseInt(orderMatch[1]) : 999;
          
          return {
            slug,
            title: data.title || slug,
            description: data.description || '',
            order: data.order || order,
            path: filePath,
          };
        })
        .sort((a, b) => a.order - b.order);
        
      return moduleFiles;
    }
    
    // If direct path doesn't exist, try the course-specific modules directory
    const moduleDirectory = path.join(contentDirectory, 'courses', `${courseSlug}-modules`);
    
    if (!fs.existsSync(moduleDirectory)) {
      console.log(`Module directory not found: ${moduleDirectory}`);
      
      // Special case for quick-start-with-golang-modules
      if (courseSlug === 'quick-start-with-golang-modules') {
        console.log(`Using special case for quick-start-with-golang-modules`);
        return getModuleFiles('quick-start-with-golang-modules');
      }
      
      // Last resort - if the courseSlug is 'quick-start-with-golang', try 'quick-start-with-golang-modules'
      if (courseSlug === 'quick-start-with-golang') {
        return getModuleFiles('quick-start-with-golang-modules');
      }
      
      return [];
    }
    
    console.log(`Using module directory: ${moduleDirectory}`);
    
    // Read all module files and prepare metadata
    const moduleFiles = fs.readdirSync(moduleDirectory)
      .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(moduleDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        const slug = file.replace(/\.mdx?$/, '');
        
        // Extract order from filename (if it starts with a number)
        const orderMatch = slug.match(/^(\d+)/);
        const order = orderMatch ? parseInt(orderMatch[1]) : 999;
        
        return {
          slug,
          title: data.title || slug,
          description: data.description || '',
          order: data.order || order,
          path: filePath,
        };
      })
      .sort((a, b) => a.order - b.order);
      
    return moduleFiles;
  } catch (error) {
    console.error(`Error getting module files for course ${courseSlug}:`, error);
    return [];
  }
}

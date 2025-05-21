import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

// Define the content types
export type ContentType = 'courses' | 'projects';
const COURSE_TYPE = 'courses'; // Constant for 'courses'

// Define the frontmatter interface
export interface Frontmatter {
  title: string;
  description: string;
  coverImage?: string;
  level?: string;
  difficulty?: string; // Potentially merge with level or clarify distinction
  tags?: string[];
  technologies?: string[];
  demoUrl?: string;
  repoUrl?: string;
  labs?: any[]; // Consider a more specific type than any[] if labs have a structure
  order?: number; // Add order here as it's used in modules
  [key: string]: any; // Keep for flexibility but try to minimize its use
}

// Define the structure for a loaded MDX file
interface LoadedMdxFile {
  frontmatter: Frontmatter;
  slug: string;
  content: string;
}

// Define the structure for a module item
export interface Module {
  slug: string;
  title: string;
  description: string;
  order: number;
  // path?: string; // Path might not be needed by consumers, evaluate if it can be removed
}

// Get the content directory
const contentDirectory = path.join(process.cwd(), 'content');

// Helper to read and parse an MDX file if it exists
function tryReadFile(filePath: string, slug: string): LoadedMdxFile | null {
  if (fs.existsSync(filePath)) {
    console.log(`Found file at: ${filePath}`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    console.log(`File size: ${fileContents.length} bytes`);
    return {
      frontmatter: data as Frontmatter,
      slug,
      content,
    };
  }
  console.log(`File not found at: ${filePath}`);
  return null;
}

// Get content file by slug
export function getContentFileBySlug(typeSlug: string, fileSlug: string): LoadedMdxFile {
  console.log(`Attempting to load content for type: ${typeSlug}, slug: ${fileSlug}`);
  const baseContentType = typeSlug.split('/')[0] as ContentType; // e.g., 'courses'
  const courseSpecificSlug = typeSlug.includes('/') ? typeSlug.split('/')[1] : null; // e.g., 'quick-start-with-golang-modules'

  const pathsToTry: string[] = [];

  // Path 1: Direct path within the type directory (e.g., content/courses/quick-start-with-golang-modules/fileSlug.mdx)
  pathsToTry.push(path.join(contentDirectory, typeSlug, `${fileSlug}.mdx`));

  // Path 2: If it's a course and a specific course slug is part of typeSlug, check its direct module folder
  // This handles cases like typeSlug = 'courses/quick-start-with-golang-modules'
  if (baseContentType === COURSE_TYPE && courseSpecificSlug) {
     // Already covered by Path 1 if typeSlug is the full path, but good for clarity
  }

  // Path 3: If it's a course, check the `coursename-modules` directory
  // This handles cases where typeSlug is just 'courses' and fileSlug is a course overview,
  // or when we are looking for a module in a course-specific folder.
  if (baseContentType === COURSE_TYPE && courseSpecificSlug) { // courseSpecificSlug is the actual course name here
    pathsToTry.push(path.join(contentDirectory, COURSE_TYPE, `${courseSpecificSlug}-modules`, `${fileSlug}.mdx`));
  }


  for (const p of pathsToTry) {
    const mdxResult = tryReadFile(p, fileSlug);
    if (mdxResult) return mdxResult;

    // Try .md extension as a fallback for the same path
    const mdResult = tryReadFile(p.replace('.mdx', '.md'), fileSlug);
    if (mdResult) return mdResult;
  }

  // Fallback for course overview files that might be directly in `content/courses/courseSlug.mdx`
  if (baseContentType === COURSE_TYPE && !typeSlug.includes('/')) { // typeSlug is just 'courses', fileSlug is course name
      const courseOverviewPath = path.join(contentDirectory, COURSE_TYPE, `${fileSlug}.mdx`);
      const mdxResult = tryReadFile(courseOverviewPath, fileSlug);
      if (mdxResult) return mdxResult;
      const mdResult = tryReadFile(courseOverviewPath.replace('.mdx', '.md'), fileSlug);
      if (mdResult) return mdResult;
  }


  console.error(`File not found for type: ${typeSlug}, slug: ${fileSlug} after trying all paths.`);
  throw new Error(`Content file not found: ${typeSlug}/${fileSlug}`);
}


// Get all content files for a specific type (e.g., all course overview files)
export function getAllContentFiles(type: ContentType): string[] {
  const contentTypeDirectory = path.join(contentDirectory, type);
  if (!fs.existsSync(contentTypeDirectory)) {
    console.warn(`Content directory not found: ${contentTypeDirectory}`);
    return [];
  }
  return fs.readdirSync(contentTypeDirectory).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
}

// Get all content for a specific type
export async function getAllContent(type: ContentType): Promise<{ frontmatter: Frontmatter; slug: string }[]> {
  const files = getAllContentFiles(type);
  if (files.length === 0) {
    return [];
  }

  const content = files.map(file => {
    const slug = file.replace(/\.mdx?$/, '');
    // Use getContentFileBySlug to ensure consistent frontmatter loading,
    // even though we don't need the content body here.
    // Type for getContentFileBySlug is just the base type (e.g. 'courses')
    const { frontmatter } = getContentFileBySlug(type, slug);
    return {
      frontmatter,
      slug,
    };
  });

  return content.sort((a, b) => {
    const levelOrder: Record<string, number> = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
    const levelA = levelOrder[(a.frontmatter.level || a.frontmatter.difficulty) as string] || 999;
    const levelB = levelOrder[(b.frontmatter.level || b.frontmatter.difficulty) as string] || 999;

    if (levelA !== levelB) return levelA - levelB;
    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}

// Convert MDX to HTML
export async function serializeMDX(source: string) {
  return serialize(source, {
    parseFrontmatter: false, // Frontmatter is already parsed by gray-matter
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
      format: 'mdx',
    },
  });
}

// Alias for compatibility
export const serializeMdx = serializeMDX;

// Helper to read modules from a given directory
function readModulesFromDirectory(directoryPath: string): Module[] {
  if (!fs.existsSync(directoryPath)) {
    console.log(`Module directory not found: ${directoryPath}`);
    return [];
  }

  console.log(`Reading modules from: ${directoryPath}`);
  return fs.readdirSync(directoryPath)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(directoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      const slug = file.replace(/\.mdx?$/, '');
      
      const orderMatch = slug.match(/^(\d+)/);
      const orderFromFile = orderMatch ? parseInt(orderMatch[1], 10) : Infinity;
      
      return {
        slug,
        title: data.title || slug.replace(/^\d+-?/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Prettify title from slug
        description: data.description || '',
        order: typeof data.order === 'number' ? data.order : orderFromFile,
        // path: filePath, // Exposing file system path, reconsider if needed by client
      } as Module;
    })
    .sort((a, b) => a.order - b.order);
}

// Get all module files for a course
export function getModuleFiles(courseSlug: string): Module[] {
  console.log(`Getting modules for course: ${courseSlug}`);
  
  // Special case for quick-start-with-golang course - use modules from quick-start-with-golang-modules directory
  if (courseSlug === 'quick-start-with-golang') {
    console.log('Handling special case for quick-start-with-golang');
    return readModulesFromDirectory(path.join(contentDirectory, COURSE_TYPE, 'quick-start-with-golang-modules'));
  }
  
  // Path 1: Direct course slug directory (e.g., content/courses/quick-start-with-golang-modules/)
  let modules = readModulesFromDirectory(path.join(contentDirectory, COURSE_TYPE, courseSlug));
  if (modules.length > 0) {
    return modules;
  }

  // Path 2: Course slug with '-modules' suffix (e.g., content/courses/my-course-modules/)
  // This might be redundant if your convention is that courseSlug always points to the module dir.
  // However, keeping it if some courses follow `courseName/` and others `courseName-modules/`
  modules = readModulesFromDirectory(path.join(contentDirectory, COURSE_TYPE, `${courseSlug}-modules`));
  if (modules.length > 0) {
    return modules;
  }
  
  console.warn(`No modules found for course: ${courseSlug} after trying standard paths.`);
  return [];
}

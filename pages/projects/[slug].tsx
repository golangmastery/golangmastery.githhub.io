import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getContentFileBySlug } from '../../lib/mdx';
import MDXComponents from '../../components/MDXComponents';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';

interface ProjectFrontmatter {
  title: string;
  description: string;
  coverImage: string;
  difficulty: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  [key: string]: any;
}

interface ProjectPageProps {
  frontmatter: ProjectFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real app, you would get all project slugs here
  return {
    paths: [
      { params: { slug: 'golang-restful-api' } },
      { params: { slug: 'golang-cli-tool' } },
      { params: { slug: 'realtime-chat-app' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProjectPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const { frontmatter, content } = getContentFileBySlug('projects', slug);
  
  const mdxSource = await serialize(content);
  
  return {
    props: {
      frontmatter: {
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        coverImage: frontmatter.coverImage || '',
        difficulty: frontmatter.difficulty || '',
        technologies: frontmatter.technologies || [],
        demoUrl: frontmatter.demoUrl || '',
        repoUrl: frontmatter.repoUrl || '',
        ...frontmatter
      },
      mdxSource,
    },
  };
};

export default function ProjectPage({ frontmatter, mdxSource }: ProjectPageProps) {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="relative h-64 w-full mb-6">
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  frontmatter.difficulty === 'Beginner'
                    ? 'bg-green-100 text-green-800'
                    : frontmatter.difficulty === 'Intermediate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {frontmatter.difficulty}
              </span>
              {frontmatter.technologies.map((tech: string) => (
                <span key={tech} className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-4">{frontmatter.description}</p>
            <div className="flex gap-4">
              {frontmatter.demoUrl && (
                <Link href={frontmatter.demoUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Live Demo
                </Link>
              )}
              {frontmatter.repoUrl && (
                <Link href={frontmatter.repoUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors">
                  View Code
                </Link>
              )}
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <MDXRemote {...mdxSource} components={MDXComponents} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 
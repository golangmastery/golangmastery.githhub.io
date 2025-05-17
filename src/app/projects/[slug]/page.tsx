import { MDXRemote } from 'next-mdx-remote/rsc';
import { getContentFileBySlug } from '@/lib/mdx';
import MDXComponents from '@/components/MDXComponents';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  // In a real app, you would get all project slugs here
  return [
    { slug: 'build-a-cli-task-manager' },
    { slug: 'restful-api-with-gin-framework' },
    { slug: 'real-time-chat-application' },
  ];
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { frontmatter, content } = getContentFileBySlug('projects', slug);

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
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  frontmatter.level === 'Beginner'
                    ? 'bg-green-100 text-green-800'
                    : frontmatter.level === 'Intermediate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {frontmatter.level}
              </span>
              {frontmatter.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-700">{frontmatter.description}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <MDXRemote source={content} components={MDXComponents} />
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors mr-4"
            >
              Back to Projects
            </Link>
            <Link
              href="#"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Project
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

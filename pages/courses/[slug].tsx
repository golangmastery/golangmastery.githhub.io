import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getContentFileBySlug } from '../../lib/mdx';
import MDXComponents from '../../components/MDXComponents';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';

interface CourseFrontmatter {
  title: string;
  description: string;
  coverImage: string;
  level: string;
  tags: string[];
  labs?: {
    slug: string;
    title: string;
    description: string;
  }[];
  [key: string]: any;
}

interface CoursePageProps {
  frontmatter: CourseFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real app, you would get all course slugs here
  return {
    paths: [
      { params: { slug: 'quick-start-with-golang' } },
      { params: { slug: 'concurrent-programming-with-go' } },
      { params: { slug: 'web-development-with-go' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CoursePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const { frontmatter, content } = getContentFileBySlug('courses', slug);
  
  const mdxSource = await serialize(content);
  
  return {
    props: {
      frontmatter: {
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        coverImage: frontmatter.coverImage || '',
        level: frontmatter.level || '',
        tags: frontmatter.tags || [],
        labs: frontmatter.labs || [],
        ...frontmatter
      },
      mdxSource,
    },
  };
};

export default function CoursePage({ frontmatter, mdxSource }: CoursePageProps) {
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
            <MDXRemote {...mdxSource} components={MDXComponents} />
          </div>

          {frontmatter.labs && frontmatter.labs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Course Labs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {frontmatter.labs.map((lab, index: number) => (
                  <div key={lab.slug} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-2">
                      {index + 1}. {lab.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{lab.description}</p>
                    <Link href={`/labs/${lab.slug}`}>
                      <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block">
                        Start Lab
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MDXComponents from '../../components/MDXComponents';
import { getContentFileBySlug, getAllContentFiles, serializeMdx } from '../../lib/mdx';

export default function ProjectPage({ frontmatter, mdxSource }) {
  const router = useRouter();

  // Function to get the appropriate level badge style
  const getLevelBadgeStyle = (level) => {
    switch(level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>{frontmatter.title} - Golang Mastery</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-sm mb-4">
              <Link href="/">
                <a className="hover:underline">Home</a>
              </Link>
              <span>/</span>
              <Link href="/projects">
                <a className="hover:underline">Projects</a>
              </Link>
              <span>/</span>
              <span>{frontmatter.title}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{frontmatter.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`px-3 py-1 text-sm rounded-full ${getLevelBadgeStyle(frontmatter.level)}`}>
                {frontmatter.level}
              </span>
              {frontmatter.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-white/20 text-white rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg text-white/90 max-w-3xl">{frontmatter.description}</p>

            <div className="mt-8 flex items-center space-x-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span>Hands-on Project</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Self-paced</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <div className="prose prose-lg max-w-none">
              <MDXRemote {...mdxSource} components={MDXComponents} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Project Resources</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:border-indigo-100">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-bold">Project Documentation</h3>
                </div>
                <p className="text-gray-600 mb-4">Access the complete documentation for this project, including detailed explanations and API references.</p>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                  View Documentation
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:border-indigo-100">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <h3 className="text-lg font-bold">Source Code</h3>
                </div>
                <p className="text-gray-600 mb-4">Download the starter code and solution for this project from our GitHub repository.</p>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center">
                  View on GitHub
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link href="/projects">
                <a className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors font-medium inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Projects
                </a>
              </Link>

              <a
                href="#"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium inline-flex items-center shadow-sm hover:shadow"
              >
                Start Project
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const files = getAllContentFiles('projects');

  const paths = files.map(file => ({
    params: {
      slug: file.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const { frontmatter, content } = getContentFileBySlug('projects', slug);
  const mdxSource = await serializeMdx(content);

  return {
    props: {
      frontmatter,
      slug,
      mdxSource,
    },
  };
}

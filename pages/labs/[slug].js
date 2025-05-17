import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MDXComponents from '../../components/MDXComponents';
import { getContentFileBySlug, getAllContentFiles, serializeMdx } from '../../lib/mdx';
import { extractHeadings } from '../../lib/toc';

export default function LabPage({ frontmatter, mdxSource, content }) {
  const router = useRouter();
  const [headings, setHeadings] = useState([]);

  // Extract headings from content on component mount
  useEffect(() => {
    if (content) {
      const extractedHeadings = extractHeadings(content);
      setHeadings(extractedHeadings);
    }
  }, [content]);

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
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
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-2 text-sm mb-4">
              <Link href="/">
                <a className="hover:underline">Home</a>
              </Link>
              <span>/</span>
              <Link href="/courses">
                <a className="hover:underline">Courses</a>
              </Link>
              <span>/</span>
              <Link href="/labs">
                <a className="hover:underline">Labs</a>
              </Link>
              <span>/</span>
              <span>{frontmatter.title}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{frontmatter.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`px-3 py-1 text-sm rounded-full ${getLevelBadgeStyle(frontmatter.level)}`}>
                {frontmatter.level}
              </span>
              {frontmatter.tags && frontmatter.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm bg-white/20 text-white rounded-full">
                  {tag}
                </span>
              ))}
              {frontmatter.duration && (
                <span className="px-3 py-1 text-sm bg-white/20 text-white rounded-full flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {frontmatter.duration}
                </span>
              )}
            </div>

            <p className="text-lg text-white/90 max-w-3xl">{frontmatter.description}</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lab Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
                {/* Table of Contents for mobile */}
                <div className="lg:hidden mb-8">
                  <MDXComponents.TableOfContents headings={headings} />
                </div>

                <div className="prose prose-lg prose-green max-w-full w-full lg:prose-xl">
                  <MDXRemote {...mdxSource} components={MDXComponents} />
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mb-8">
                <Link href="/labs">
                  <a className="bg-gray-100 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium inline-flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    All Labs
                  </a>
                </Link>

                <a
                  href="#"
                  className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-colors font-medium inline-flex items-center shadow-sm hover:shadow"
                >
                  Next Lab
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="hidden lg:block sticky top-24">
                {/* Table of Contents for desktop */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Lab Content</h3>
                  <MDXComponents.TableOfContents headings={headings} />
                </div>

                {/* Lab Info Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Lab Information</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Difficulty</h4>
                      <div className={`inline-block px-3 py-1 text-sm rounded-full ${getLevelBadgeStyle(frontmatter.level)}`}>
                        {frontmatter.level}
                      </div>
                    </div>

                    {frontmatter.duration && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Estimated Time</h4>
                        <div className="text-gray-700 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {frontmatter.duration}
                        </div>
                      </div>
                    )}

                    {frontmatter.tags && frontmatter.tags.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {frontmatter.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {frontmatter.prerequisites && frontmatter.prerequisites.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Prerequisites</h4>
                        <ul className="text-gray-700 space-y-1">
                          {frontmatter.prerequisites.map(prereq => (
                            <li key={prereq} className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <Link href={`/labs/${prereq}`}>
                                <a className="text-blue-600 hover:underline">{prereq.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Help Button */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <a
                    href="#"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium inline-flex items-center w-full justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Get Help
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const files = getAllContentFiles('labs');

  const paths = files.map(file => ({
    params: {
      slug: file.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const { frontmatter, content } = getContentFileBySlug('labs', slug);
    const mdxSource = await serializeMdx(content);

    return {
      props: {
        frontmatter,
        slug,
        mdxSource,
        content, // Pass the raw content for extracting headings
      },
    };
  } catch (error) {
    console.error(`Error loading lab ${slug}:`, error);
    return {
      notFound: true,
    };
  }
}

import { notFound } from 'next/navigation';
import { getContentFileBySlug, getAllContent } from '@/lib/mdx';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

export async function generateStaticParams() {
  const courses = await getAllContent('courses');
  
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await getContentFileBySlug('courses', params.slug);
  
  if (!course) {
    notFound();
  }

  const { frontmatter, content } = course;

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/courses" className="text-blue-600 hover:underline flex items-center">
            ← Back to Courses
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
          
          <div className="flex items-center space-x-2 mb-6">
            <span className={`px-2 py-1 text-xs rounded-full ${
              frontmatter.level === 'Beginner' ? 'bg-green-100 text-green-800' :
              frontmatter.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {frontmatter.level}
            </span>
            {frontmatter.tags?.map((tag: string) => (
              <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="prose max-w-none mb-12">
            <MDXRemote source={content} />
          </div>

          {frontmatter.labs && frontmatter.labs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Course Labs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frontmatter.labs.map((lab: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">{lab.title}</h3>
                    <p className="text-gray-600 mb-4">{lab.description}</p>
                    <Link 
                      href={`/lab/${lab.slug}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block"
                    >
                      Start Lab
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
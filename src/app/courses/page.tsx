import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getAllContent } from '@/lib/mdx';

export default async function CoursesPage() {
  const courses = await getAllContent('courses');

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Golang Courses</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">
          Master Golang with our comprehensive courses. Each course is designed to help you learn specific aspects of Go programming through interactive labs and practical challenges.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.slug} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div className="h-48 w-full bg-blue-100 flex items-center justify-center">
                <div className="text-blue-600 text-5xl font-bold">Go</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.frontmatter.title}</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.frontmatter.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.frontmatter.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.frontmatter.level}
                  </span>
                  {course.frontmatter.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{course.frontmatter.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {course.frontmatter.labs ? course.frontmatter.labs.length : 0} labs
                  </span>
                  <Link href={`/courses/${course.slug}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Start Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

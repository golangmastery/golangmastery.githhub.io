import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { courses } from '../../src/data/courses';
import Link from 'next/link';
import Image from 'next/image';

export default function CoursesPage() {
  return (
    <div>
      <Head>
        <title>Go Courses - Golang Mastery</title>
        <meta name="description" content="Learn Golang with our comprehensive courses. From beginner to advanced topics." />
      </Head>

      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Go Courses</h1>
          <p className="text-lg text-gray-700 mb-8">
            Our courses are designed to help you learn Go programming from the ground up. Each course includes interactive labs and practical examples.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="h-48 w-full bg-blue-100 flex items-center justify-center">
                  <div className="text-blue-600 text-5xl font-bold">Go</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                    {course.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{course.labs.length} labs</span>
                    <Link href={`/courses/${course.slug}`}>
                      <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Start Learning
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 
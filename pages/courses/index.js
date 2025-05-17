import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CourseCard from '../../components/CourseCard';
import { getAllContent } from '../../lib/mdx';

export default function CoursesPage({ courses }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Golang Courses - Golang Mastery</title>
        <meta name="description" content="Learn Golang with our structured courses and hands-on labs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Golang Courses</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Master Go programming with our structured learning path. Each course includes hands-on labs and projects to reinforce your learning.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Filter and Search (placeholder for future implementation) */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-700 font-medium">Filter by:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Topics</option>
                <option value="basics">Basics</option>
                <option value="web">Web Development</option>
                <option value="api">API Development</option>
              </select>
            </div>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Courses Grid */}
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6">We're working on adding more courses. Check back soon!</p>

              <Link href="/labs">
                <a className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium inline-flex items-center shadow-sm hover:shadow">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Browse Labs Instead
                </a>
              </Link>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-8 mt-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-3/4 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Ready to start learning?</h3>
                <p className="text-white/90">
                  Begin your Go programming journey today with our structured courses and hands-on labs.
                </p>
              </div>
              <div className="md:w-1/4 md:text-right">
                <Link href="/labs/your-first-go-program">
                  <a className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-flex items-center shadow-sm hover:shadow">
                    Start First Lab
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const courses = await getAllContent('courses');

    return {
      props: {
        courses,
      },
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return {
      props: {
        courses: [],
      },
    };
  }
}

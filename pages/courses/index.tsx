import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { courses, Course } from '../../data/courses';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesIndex() {
  const [level, setLevel] = useState('All');
  const [search, setSearch] = useState('');

  const filteredCourses = courses.filter((course: Course) => {
    const levelMatch = level === 'All' || course.level === level;
    const searchMatch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    return levelMatch && searchMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <Head>
        <title>Courses | GolangMastery</title>
        <meta name="description" content="Browse all Golang courses" />
      </Head>
      <Header />
      <main className="flex-1 w-full container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 text-center">All Courses</h1>
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-4 py-2 rounded-full font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  level === lvl
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'
                }`}
                aria-pressed={level === lvl}
              >
                {lvl}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 bg-white shadow-sm"
            aria-label="Search courses"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course: Course, idx) => (
            <div
              key={course.slug}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="h-48 w-full bg-blue-100 flex items-center justify-center overflow-hidden">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-blue-600 text-5xl font-bold">Go</div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                    {course.duration}
                  </span>
                  {course.topics && course.topics.slice(0, 2).map((topic, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
                {/* Instructor */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={course.instructorImage || '/images/instructor-placeholder.jpg'}
                    alt={course.instructor}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                  <span className="text-gray-700 font-medium text-sm">{course.instructor}</span>
                </div>
                <div className="prose prose-indigo prose-sm mb-4 text-gray-600 line-clamp-3">
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{course.topics?.length || 0} topics</span>
                  <Link
                    href={`/courses/${course.slug}`}
                    aria-label={`View ${course.title}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredCourses.length === 0 && (
          <div className="text-center text-gray-500 mt-16 text-lg">No courses found.</div>
        )}
      </main>
      <Footer />
      {/* Fade-in animation keyframes */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 
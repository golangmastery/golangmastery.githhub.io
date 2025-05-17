import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAllContent } from '../lib/mdx';

export default function Home({ courses, projects }) {
  const [activeTab, setActiveTab] = useState('learn');

  return (
    <div>
      <Head>
        <title>Golang Mastery - Learn Golang with Interactive Labs</title>
        <meta name="description" content="Master Golang with our interactive labs and structured learning path. Perfect for beginners and experienced developers." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative h-64 w-64 mx-auto">
              <img 
                src="https://golang.org/lib/godoc/images/go-logo-blue.svg" 
                alt="Golang Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Golang</h1>
            <p className="text-lg text-gray-600 mb-6">
              Golang is a versatile, high-level programming language. This Skill Tree offers a systematic way to learn Go. 
              It's perfect for programming beginners, providing a structured roadmap to grasp Go syntax, data structures, 
              and concurrency. Hands-on, non-video courses and coding exercises in an interactive Go playground help you 
              develop practical skills to write clean and efficient Go code for various applications.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="text-gray-600 font-medium">40 skills</span>
              <span className="text-gray-600 font-medium">|</span>
              <span className="text-gray-600 font-medium">10 courses</span>
              <span className="text-gray-600 font-medium">|</span>
              <span className="text-gray-600 font-medium">25 projects</span>
            </div>
            <div className="mt-8">
              <Link href="/courses/quick-start-with-golang">
                <a className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Start Learning
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`py-4 px-6 font-medium text-lg ${
                activeTab === 'learn'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('learn')}
            >
              Learn Skills
            </button>
            <button
              className={`py-4 px-6 font-medium text-lg ${
                activeTab === 'build'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('build')}
            >
              Build Projects
            </button>
          </div>

          {activeTab === 'learn' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course.slug} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="h-48 w-full bg-blue-100 flex items-center justify-center">
                    <div className="text-blue-600 text-5xl font-bold">Go</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{course.frontmatter.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        course.frontmatter.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        course.frontmatter.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.frontmatter.level}
                      </span>
                      {course.frontmatter.tags.map(tag => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.slug} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="h-48 w-full bg-blue-100 flex items-center justify-center">
                    <div className="text-blue-600 text-5xl font-bold">Go</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.frontmatter.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.frontmatter.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        project.frontmatter.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.frontmatter.level}
                      </span>
                      {project.frontmatter.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.frontmatter.description}</p>
                    <div className="flex justify-end">
                      <Link href={`/projects/${project.slug}`}>
                        <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                          Start Project
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Related Skill Trees */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Related Skill Trees</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="#">
              <a className="flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
                <div className="w-24 h-24 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-3xl font-bold">Web</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Web Development</h3>
              </a>
            </Link>
            <Link href="#">
              <a className="flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
                <div className="w-24 h-24 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-3xl font-bold">DevOps</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">DevOps</h3>
              </a>
            </Link>
            <Link href="#">
              <a className="flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
                <div className="w-24 h-24 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-3xl font-bold">Micro</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Microservices</h3>
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Discord CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Discord and Learn Together</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Connect with other Golang enthusiasts, get help with your code, and share your projects.
          </p>
          <a href="#" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
            Join Now
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const courses = await getAllContent('courses');
  const projects = await getAllContent('projects');
  
  return {
    props: {
      courses,
      projects,
    },
  };
}

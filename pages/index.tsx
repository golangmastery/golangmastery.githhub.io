import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'learn' | 'build'>('learn');

  const courses = [
    {
      id: '1',
      title: 'Quick Start with Golang',
      slug: 'quick-start-with-golang',
      coverImage: '/images/courses/quick-start-with-golang.png',
      description: 'Master Golang fundamentals in this hands-on course designed for beginners. Learn essential concepts like data types, control structures, functions, packages, and data structures through interactive labs and practical challenges.',
      level: 'Beginner',
      tags: ['Go', 'Programming'],
      labCount: 10
    },
    {
      id: '2',
      title: 'Concurrent Programming with Go',
      slug: 'concurrent-programming-with-go',
      coverImage: '/images/courses/concurrent-programming-with-go.png',
      description: 'Learn how to write concurrent programs in Go using goroutines and channels. This course covers concurrency patterns, synchronization, and best practices for writing efficient concurrent code in Go.',
      level: 'Intermediate',
      tags: ['Go', 'Concurrency'],
      labCount: 5
    },
    {
      id: '3',
      title: 'Web Development with Go',
      slug: 'web-development-with-go',
      coverImage: '/images/courses/web-development-with-go.png',
      description: 'Build web applications with Go\'s standard library and popular frameworks. Learn how to create RESTful APIs, handle HTTP requests, and connect to databases.',
      level: 'Intermediate',
      tags: ['Go', 'Web Development'],
      labCount: 5
    }
  ];

  const projects = [
    {
      id: 'p1',
      title: 'Build a CLI Task Manager',
      slug: 'build-a-cli-task-manager',
      coverImage: '/images/projects/cli-task-manager.png',
      description: 'Create a command-line task manager application with Go. Learn how to handle user input, store data, and build a useful CLI tool.',
      level: 'Beginner',
      tags: ['Go', 'CLI']
    },
    {
      id: 'p2',
      title: 'RESTful API with Gin Framework',
      slug: 'restful-api-with-gin-framework',
      coverImage: '/images/projects/restful-api-gin.png',
      description: 'Build a RESTful API using the Gin web framework. Implement CRUD operations, middleware, and authentication.',
      level: 'Intermediate',
      tags: ['Go', 'Web Development', 'Gin']
    },
    {
      id: 'p3',
      title: 'Real-time Chat Application',
      slug: 'real-time-chat-application',
      coverImage: '/images/projects/real-time-chat.png',
      description: 'Create a real-time chat application using Go and WebSockets. Learn how to handle concurrent connections and real-time communication.',
      level: 'Intermediate',
      tags: ['Go', 'WebSockets', 'Real-time']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Golang Mastery - Free Interactive Go Programming Courses</title>
        <meta name="description" content="Master Go programming with free, interactive courses and hands-on projects. Perfect for beginners and experienced developers." />
        <meta name="keywords" content="golang, go programming, free courses, coding, programming tutorials" />
      </Head>

      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 flex justify-center">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <Image
                src="/images/go-gopher.svg"
                alt="Go Gopher Mascot"
                width={320}
                height={320}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Master <span className="text-blue-600">Go Programming</span> for Free
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Learn Golang with our structured, hands-on courses and projects. 
              Build real-world applications while mastering Go concepts with 
              our interactive coding labs.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">100% Free</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Interactive Labs</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">Practical Projects</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/courses/quick-start-with-golang" className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors text-center">
                Start Learning
              </Link>
              <Link href="/projects" className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors text-center">
                Explore Projects
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why Learn Go Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Learn Go?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast & Efficient</h3>
              <p className="text-gray-600">Go's performance rivals C/C++ while being much easier to write and maintain. It's compiled to machine code for maximum efficiency.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Built-in Concurrency</h3>
              <p className="text-gray-600">Go's goroutines and channels make concurrent programming simple and accessible, perfect for today's multi-core systems.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Industry Demand</h3>
              <p className="text-gray-600">Go is used by top companies like Google, Uber, Twitch, and Dropbox. Learning Go opens doors to high-paying job opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Start Your Go Learning Journey</h2>
          <div className="flex justify-center border-b border-gray-200 mb-12">
            <button
              className={`py-4 px-6 font-medium text-lg ${
                activeTab === 'learn'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('learn')}
            >
              Courses
            </button>
            <button
              className={`py-4 px-6 font-medium text-lg ${
                activeTab === 'build'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('build')}
            >
              Projects
            </button>
          </div>

          {activeTab === 'learn' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <span className="text-sm text-gray-500">{course.labCount} labs</span>
                      <Link href={`/courses/${course.slug}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Start Learning
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <div className="h-48 w-full bg-blue-100 flex items-center justify-center">
                    <div className="text-blue-600 text-5xl font-bold">Go</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        project.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.level}
                      </span>
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex justify-end">
                      <Link href={`/projects/${project.slug}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Start Project
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link href={activeTab === 'learn' ? "/courses" : "/projects"} className="text-blue-600 font-medium hover:text-blue-800 underline">
              View all {activeTab === 'learn' ? 'courses' : 'projects'} →
            </Link>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Go Community</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect with other Go enthusiasts, get help with your code, and collaborate on projects.
            Our community is open to everyone, from beginners to experts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://discord.gg/golangmastery" 
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Join Discord
            </a>
            <a 
              href="https://github.com/golangmastery" 
              className="bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-900 transition-colors"
            >
              Contribute on GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
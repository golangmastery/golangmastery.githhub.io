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
      labCount: 10,
      duration: '4 weeks',
      students: '2.5k'
    },
    {
      id: '2',
      title: 'Concurrent Programming with Go',
      slug: 'concurrent-programming-with-go',
      coverImage: '/images/courses/concurrent-programming-with-go.png',
      description: 'Learn how to write concurrent programs in Go using goroutines and channels. This course covers concurrency patterns, synchronization, and best practices for writing efficient concurrent code in Go.',
      level: 'Intermediate',
      tags: ['Go', 'Concurrency'],
      labCount: 19,
      duration: '6 weeks',
      students: '1.8k'
    },
    {
      id: '3',
      title: 'Web Development with Go',
      slug: 'web-development-with-go',
      coverImage: '/images/courses/web-development-with-go.png',
      description: 'Build web applications with Go\'s standard library and popular frameworks. Learn how to create RESTful APIs, handle HTTP requests, and connect to databases.',
      level: 'Intermediate',
      tags: ['Go', 'Web Development'],
      labCount: 0,
      duration: '8 weeks',
      students: '1.2k'
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
      tags: ['Go', 'CLI'],
      difficulty: 'Easy',
      duration: '2-3 hours'
    },
    {
      id: 'p2',
      title: 'RESTful API with Gin Framework',
      slug: 'restful-api-with-gin-framework',
      coverImage: '/images/projects/restful-api-gin.png',
      description: 'Build a RESTful API using the Gin web framework. Implement CRUD operations, middleware, and authentication.',
      level: 'Intermediate',
      tags: ['Go', 'Web Development', 'Gin'],
      difficulty: 'Medium',
      duration: '4-6 hours'
    },
    {
      id: 'p3',
      title: 'Real-time Chat Application',
      slug: 'real-time-chat-application',
      coverImage: '/images/projects/real-time-chat.png',
      description: 'Create a real-time chat application using Go and WebSockets. Learn how to handle concurrent connections and real-time communication.',
      level: 'Intermediate',
      tags: ['Go', 'WebSockets', 'Real-time'],
      difficulty: 'Hard',
      duration: '6-8 hours'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Head>
        <title>Golang Mastery - Free Interactive Go Programming Courses</title>
        <meta name="description" content="Master Go programming with free, interactive courses and hands-on projects. Perfect for beginners and experienced developers." />
        <meta name="keywords" content="golang, go programming, free courses, coding, programming tutorials" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-primary-500/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-primary-500/30 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-medium">Free • Interactive • Community-driven</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Master
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Go Programming
                </span>
                <span className="text-3xl lg:text-4xl font-medium text-blue-100">for Free</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed max-w-lg">
                Build real-world applications with our hands-on courses, interactive labs, and practical projects designed by industry experts.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">10+</div>
                  <div className="text-sm text-blue-200">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">50+</div>
                  <div className="text-sm text-blue-200">Labs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">5k+</div>
                  <div className="text-sm text-blue-200">Students</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/courses/quick-start-with-golang" className="group relative overflow-hidden bg-white text-primary-700 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:-translate-y-1">
                  <span className="relative z-10 flex items-center justify-center">
                    Start Learning for Free
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link href="/projects" className="group border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1">
                  <span className="flex items-center justify-center">
                    Explore Projects
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur-2xl opacity-30 animate-pulse-glow"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="flex items-center justify-center h-80">
                    <Image
                      src="/images/go-gopher.svg"
                      alt="Go Gopher Mascot"
                      width={300}
                      height={300}
                      className="drop-shadow-2xl animate-bounce-light"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Golang Mastery?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of developers who've accelerated their Go programming journey with our proven learning methodology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast Learning",
                description: "Master Go concepts quickly with our interactive coding environments and hands-on approach.",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: "🔄",
                title: "Built-in Concurrency",
                description: "Learn Go's powerful goroutines and channels through practical examples and real-world projects.",
                gradient: "from-green-400 to-blue-500"
              },
              {
                icon: "🚀",
                title: "Industry Ready",
                description: "Build portfolio-worthy projects used by companies like Google, Uber, and Docker.",
                gradient: "from-purple-400 to-pink-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-opacity duration-300 bg-gradient-to-r from-primary-500/30 to-purple-500/30"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Start Your <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Learning Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose your path: Learn fundamentals through structured courses or dive into hands-on projects.
            </p>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              <button
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'learn'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('learn')}
              >
                📚 Courses
              </button>
              <button
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'build'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('build')}
              >
                🛠️ Projects
              </button>
            </div>
          </div>

          {/* Enhanced Course Cards */}
          {activeTab === 'learn' ? (
            <div className="grid lg:grid-cols-3 gap-8 animate-slide-up">
              {courses.map((course, index) => (
                <div key={course.id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    {/* Course Header */}
                    <div className="relative h-48 bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]"></div>
                      <div className="relative text-white text-6xl font-bold opacity-20 transform group-hover:scale-110 transition-transform duration-300">
                        Go
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                          course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                    </div>
                    
                    {/* Course Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {course.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                          {course.students}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          {course.labCount} labs
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {course.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link href={`/courses/${course.slug}`} className="group/btn w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center">
                        Start Learning
                        <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Enhanced Project Cards
            <div className="grid lg:grid-cols-3 gap-8 animate-slide-up">
              {projects.map((project, index) => (
                <div key={project.id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    {/* Project Header */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]"></div>
                      <div className="relative text-white text-6xl font-bold opacity-20 transform group-hover:scale-110 transition-transform duration-300">
                        🛠️
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          project.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    {/* Project Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {project.duration}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.level}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link href={`/projects/${project.slug}`} className="group/btn w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center">
                        Start Project
                        <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href={activeTab === 'learn' ? "/courses" : "/projects"} className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 text-lg group">
              View all {activeTab === 'learn' ? 'courses' : 'projects'}
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 text-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-primary-500/30 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="animate-slide-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Join Our <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Go Community</span>
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with thousands of Go enthusiasts, get help with your code, and collaborate on amazing projects. 
              Our community welcomes everyone from beginners to experts.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <a 
                href="https://discord.gg/golangmastery" 
                className="group bg-white text-primary-700 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
                Join Discord
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="https://github.com/golangmastery" 
                className="group border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
                Contribute on GitHub
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">5,000+</div>
                <div className="text-blue-200">Community Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
                <div className="text-blue-200">Daily Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
                <div className="text-blue-200">Expert Mentors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-blue-200">Community Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
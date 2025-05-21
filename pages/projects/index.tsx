import { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  image: string;
  slug: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 'cli-todo-app',
    title: 'CLI Todo Application',
    description: 'Build a command-line task manager using Go\'s standard library. Learn about file I/O, basic data structures, and command line argument parsing.',
    level: 'Beginner',
    duration: '2-3 hours',
    image: '/images/projects/cli-todo-app.jpg',
    slug: 'cli-todo-app',
    tags: ['CLI', 'File I/O', 'CRUD']
  },
  {
    id: 'rest-api',
    title: 'RESTful API Server',
    description: 'Create a RESTful API server with Go. Implement CRUD operations, middleware, and connect to a database. Perfect for understanding web development in Go.',
    level: 'Intermediate',
    duration: '4-6 hours',
    image: '/images/projects/rest-api.jpg',
    slug: 'rest-api',
    tags: ['API', 'Web', 'Database']
  },
  {
    id: 'concurrent-web-crawler',
    title: 'Concurrent Web Crawler',
    description: 'Build a web crawler that leverages Go\'s concurrency primitives. Learn about goroutines, channels, and graceful error handling in concurrent programs.',
    level: 'Intermediate',
    duration: '3-5 hours',
    image: '/images/projects/web-crawler.jpg',
    slug: 'concurrent-web-crawler',
    tags: ['Concurrency', 'HTTP', 'Parsing']
  },
  {
    id: 'microservice-auth',
    title: 'Authentication Microservice',
    description: 'Develop a secure authentication microservice with JWT token support. Implement user registration, login, and role-based access control.',
    level: 'Advanced',
    duration: '6-8 hours',
    image: '/images/projects/auth-service.jpg',
    slug: 'microservice-auth',
    tags: ['Security', 'Microservices', 'JWT']
  },
  {
    id: 'realtime-chat',
    title: 'Real-time Chat Application',
    description: 'Create a real-time chat application using WebSockets in Go. Build both the backend server and a simple frontend to handle messages.',
    level: 'Intermediate',
    duration: '5-7 hours',
    image: '/images/projects/realtime-chat.jpg',
    slug: 'realtime-chat',
    tags: ['WebSockets', 'Real-time', 'Frontend']
  },
  {
    id: 'blockchain',
    title: 'Simple Blockchain Implementation',
    description: 'Build a basic blockchain with proof-of-work consensus. Understand the fundamental concepts behind blockchain technology using Go.',
    level: 'Advanced',
    duration: '8-10 hours',
    image: '/images/projects/blockchain.jpg',
    slug: 'blockchain',
    tags: ['Blockchain', 'Cryptography', 'Consensus']
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => {
    // Filter by level
    const levelMatch = filter === 'all' || project.level.toLowerCase() === filter.toLowerCase();
    
    // Filter by search query
    const searchMatch = !searchQuery || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return levelMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Go Programming Projects | GolangMastery</title>
        <meta name="description" content="Practice your Go skills with real-world projects" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Go Programming Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Apply your Go knowledge with hands-on projects. From beginners to advanced developers, 
            we have projects to help you build a strong portfolio and gain practical experience.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
              >
                All Levels
              </button>
              <button
                onClick={() => setFilter('beginner')}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === 'beginner' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-r border-gray-300`}
              >
                Beginner
              </button>
              <button
                onClick={() => setFilter('intermediate')}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === 'intermediate' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-r border-gray-300`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setFilter('advanced')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  filter === 'advanced' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-r border-gray-300`}
              >
                Advanced
              </button>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-800">No projects found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="h-48 w-full bg-gray-200 overflow-hidden">
                  <img 
                    src={project.image || '/images/project-placeholder.jpg'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/project-placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      project.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      project.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {project.level}
                    </span>
                    <span className="text-sm text-gray-500">{project.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <span className="text-blue-600 group-hover:text-blue-700 font-medium text-sm inline-flex items-center">
                      View Project
                      <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 
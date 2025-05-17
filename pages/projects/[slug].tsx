import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';

interface ProjectDetails {
  title: string;
  description: string;
  level: string;
  duration: string;
  image: string;
  tags: string[];
  overview: string;
  objectives: string[];
  technologies: string[];
  steps: {
    title: string;
    content: string;
  }[];
}

interface ProjectData {
  [key: string]: ProjectDetails;
}

const projectData: ProjectData = {
  'cli-todo-app': {
    title: 'CLI Todo Application',
    description: 'Build a command-line task manager using Go\'s standard library. Learn about file I/O, basic data structures, and command line argument parsing.',
    level: 'Beginner',
    duration: '2-3 hours',
    image: '/images/projects/cli-todo-app.jpg',
    tags: ['CLI', 'File I/O', 'CRUD'],
    overview: 'This project will guide you through building a command-line todo application using Go. You\'ll learn how to structure a Go CLI application, work with files for persistent storage, and implement basic CRUD operations.',
    objectives: [
      'Create a CLI application using Go\'s standard library',
      'Implement file-based storage for persistent data',
      'Build command-line argument parsing for various operations',
      'Structure Go code in a maintainable way'
    ],
    technologies: [
      'Go standard library',
      'os and io/ioutil packages',
      'encoding/json for data serialization',
      'flag package for CLI arguments'
    ],
    steps: [
      {
        title: 'Setup Project Structure',
        content: 'Create a new Go project with appropriate directory structure. Initialize Go modules for dependency management.'
      },
      {
        title: 'Define Data Models',
        content: 'Create structs to represent tasks and collections of tasks. Implement methods for basic operations.'
      },
      {
        title: 'Implement File Storage',
        content: 'Build functions to read and write task data to JSON files for persistent storage.'
      },
      {
        title: 'Create CLI Commands',
        content: 'Implement command-line argument parsing to support adding, listing, completing, and removing tasks.'
      },
      {
        title: 'Add Error Handling',
        content: 'Implement robust error handling to make your application resilient and user-friendly.'
      },
      {
        title: 'Enhance User Experience',
        content: 'Add color output, interactive prompts, and helpful usage information.'
      }
    ]
  },
  'rest-api': {
    title: 'RESTful API Server',
    description: 'Create a RESTful API server with Go. Implement CRUD operations, middleware, and connect to a database.',
    level: 'Intermediate',
    duration: '4-6 hours',
    image: '/images/projects/rest-api.jpg',
    tags: ['API', 'Web', 'Database'],
    overview: 'In this project, you\'ll build a RESTful API server using Go. You\'ll learn how to handle HTTP requests, implement middleware for authentication and logging, and connect to a database for persistent storage.',
    objectives: [
      'Create a RESTful API server with proper route handling',
      'Implement middleware for cross-cutting concerns',
      'Connect to a database for persistent storage',
      'Implement proper error handling and status codes'
    ],
    technologies: [
      'net/http or popular web frameworks (Gin, Echo, etc.)',
      'SQL or NoSQL database',
      'JWT for authentication',
      'Testing packages for API testing'
    ],
    steps: [
      {
        title: 'Setup Project Structure',
        content: 'Initialize a new Go module and organize your project with a clean architecture.'
      },
      {
        title: 'Create API Routes',
        content: 'Define API endpoints and implement route handlers for resource operations.'
      },
      {
        title: 'Implement Middleware',
        content: 'Create middleware for logging, authentication, and error handling.'
      },
      {
        title: 'Connect to Database',
        content: 'Set up database connections and implement data access functions.'
      },
      {
        title: 'Add Authentication',
        content: 'Implement user authentication using JWT or similar technology.'
      },
      {
        title: 'Test API Endpoints',
        content: 'Write tests to verify API functionality and performance.'
      }
    ]
  },
  'concurrent-web-crawler': {
    title: 'Concurrent Web Crawler',
    description: 'Build a web crawler that leverages Go\'s concurrency primitives. Learn about goroutines, channels, and error handling in concurrent programs.',
    level: 'Intermediate',
    duration: '3-5 hours',
    image: '/images/projects/web-crawler.jpg',
    tags: ['Concurrency', 'HTTP', 'Parsing'],
    overview: 'This project focuses on building a concurrent web crawler using Go\'s powerful concurrency primitives. You\'ll learn how to efficiently crawl websites while managing resources and handling errors gracefully.',
    objectives: [
      'Implement a concurrent web crawler using goroutines and channels',
      'Handle rate limiting and polite crawling practices',
      'Extract and process information from web pages',
      'Manage error handling in concurrent code'
    ],
    technologies: [
      'Goroutines and channels',
      'net/http for making requests',
      'Context package for cancellation',
      'HTML parsing libraries'
    ],
    steps: [
      {
        title: 'Design Crawler Architecture',
        content: 'Plan how your crawler will work, including concurrency patterns and data flow.'
      },
      {
        title: 'Implement URL Fetching',
        content: 'Create functions to fetch web pages and handle HTTP errors properly.'
      },
      {
        title: 'Extract Links and Data',
        content: 'Parse HTML content to extract links and relevant information.'
      },
      {
        title: 'Implement Concurrency',
        content: 'Use goroutines and channels to process multiple pages concurrently.'
      },
      {
        title: 'Add Rate Limiting',
        content: 'Implement polite crawling with rate limiting to avoid overloading servers.'
      },
      {
        title: 'Handle Errors and Cancellation',
        content: 'Add proper error handling and support for graceful shutdown.'
      }
    ]
  }
};

export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;
  
  // Handle the case when the page is being server-rendered
  if (router.isFallback || !slug) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  const slugString = Array.isArray(slug) ? slug[0] : slug;
  const project = projectData[slugString];
  
  // Handle case when project is not found
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The project you're looking for doesn't exist or may have been removed.</p>
          <a href="/projects" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            View All Projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{project.title} | GolangMastery</title>
        <meta name="description" content={project.description} />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{project.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{project.level}</span>
                </div>
              </div>
              
              <a
                href="#steps"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors w-full sm:w-auto"
              >
                Start Project
              </a>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto bg-gray-200">
              <img
                src={project.image || '/images/project-placeholder.jpg'}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/project-placeholder.jpg';
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Overview */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Overview</h2>
            <p className="text-gray-700 mb-8">{project.overview}</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Learning Objectives</h3>
                <ul className="space-y-3">
                  {project.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Technologies Used</h3>
                <ul className="space-y-3">
                  {project.technologies.map((tech, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project Steps */}
        <div id="steps" className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Steps</h2>
            <div className="space-y-8">
              {project.steps.map((step, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-700">{step.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blue-600 rounded-xl shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Join our community to get help, share your progress, and connect with other Go developers!
            </p>
            <a
              href="/register"
              className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-md transition-colors"
            >
              Join Community
            </a>
          </div>
        </div>
      </main>
    </div>
  );
} 
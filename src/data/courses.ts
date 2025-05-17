export interface Lab {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  labs: Lab[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Quick Start with Golang',
    slug: 'quick-start-with-golang',
    coverImage: '/images/courses/quick-start-with-golang.png',
    description: 'Master Golang fundamentals in this hands-on course designed for beginners. Learn essential concepts like data types, control structures, functions, packages, and data structures through interactive labs and practical challenges. Perfect for those starting their Golang programming journey.',
    level: 'Beginner',
    tags: ['Go', 'Programming'],
    labs: [
      {
        id: '1-1',
        title: 'Your First Go Program',
        slug: 'your-first-go-program',
        description: 'Write your first Go program and understand the basic structure of Go code.'
      },
      {
        id: '1-2',
        title: 'Go Data Types and Variables',
        slug: 'go-data-types-and-variables',
        description: 'Learn about Go\'s data types and how to declare and use variables.'
      },
      {
        id: '1-3',
        title: 'Control Structures in Go',
        slug: 'control-structures-in-go',
        description: 'Master control flow with if statements, loops, and switch cases in Go.'
      },
      {
        id: '1-4',
        title: 'Functions in Go',
        slug: 'functions-in-go',
        description: 'Learn how to define and use functions in Go, including multiple return values.'
      },
      {
        id: '1-5',
        title: 'Arrays and Slices',
        slug: 'arrays-and-slices',
        description: 'Understand how to work with arrays and slices in Go.'
      },
      {
        id: '1-6',
        title: 'Maps and Structs',
        slug: 'maps-and-structs',
        description: 'Learn about Go\'s maps and structs for organizing data.'
      },
      {
        id: '1-7',
        title: 'Pointers in Go',
        slug: 'pointers-in-go',
        description: 'Understand pointers and memory management in Go.'
      },
      {
        id: '1-8',
        title: 'Methods and Interfaces',
        slug: 'methods-and-interfaces',
        description: 'Learn how to define methods and implement interfaces in Go.'
      },
      {
        id: '1-9',
        title: 'Error Handling',
        slug: 'error-handling',
        description: 'Master error handling patterns in Go.'
      },
      {
        id: '1-10',
        title: 'Packages and Modules',
        slug: 'packages-and-modules',
        description: 'Learn how to organize code with packages and modules in Go.'
      }
    ]
  },
  {
    id: '2',
    title: 'Concurrent Programming with Go',
    slug: 'concurrent-programming-with-go',
    coverImage: '/images/courses/concurrent-programming-with-go.png',
    description: 'Learn how to write concurrent programs in Go using goroutines and channels. This course covers concurrency patterns, synchronization, and best practices for writing efficient concurrent code in Go.',
    level: 'Intermediate',
    tags: ['Go', 'Concurrency'],
    labs: [
      {
        id: '2-1',
        title: 'Introduction to Goroutines',
        slug: 'introduction-to-goroutines',
        description: 'Learn about goroutines, Go\'s lightweight threads for concurrent execution.'
      },
      {
        id: '2-2',
        title: 'Channels Basics',
        slug: 'channels-basics',
        description: 'Understand how to use channels for communication between goroutines.'
      },
      {
        id: '2-3',
        title: 'Buffered Channels',
        slug: 'buffered-channels',
        description: 'Learn about buffered channels and when to use them.'
      },
      {
        id: '2-4',
        title: 'Select Statement',
        slug: 'select-statement',
        description: 'Master the select statement for handling multiple channel operations.'
      },
      {
        id: '2-5',
        title: 'Mutex and Atomic Operations',
        slug: 'mutex-and-atomic-operations',
        description: 'Learn about mutual exclusion and atomic operations for safe concurrent access.'
      }
    ]
  },
  {
    id: '3',
    title: 'Web Development with Go',
    slug: 'web-development-with-go',
    coverImage: '/images/courses/web-development-with-go.png',
    description: 'Build web applications with Go\'s standard library and popular frameworks. Learn how to create RESTful APIs, handle HTTP requests, and connect to databases.',
    level: 'Intermediate',
    tags: ['Go', 'Web Development'],
    labs: [
      {
        id: '3-1',
        title: 'HTTP Server Basics',
        slug: 'http-server-basics',
        description: 'Create a simple HTTP server using Go\'s standard library.'
      },
      {
        id: '3-2',
        title: 'Routing and Handlers',
        slug: 'routing-and-handlers',
        description: 'Learn how to define routes and handlers for your web application.'
      },
      {
        id: '3-3',
        title: 'Working with JSON',
        slug: 'working-with-json',
        description: 'Master JSON encoding and decoding in Go.'
      },
      {
        id: '3-4',
        title: 'Database Integration',
        slug: 'database-integration',
        description: 'Connect your Go application to a database.'
      },
      {
        id: '3-5',
        title: 'RESTful API Design',
        slug: 'restful-api-design',
        description: 'Design and implement a RESTful API with Go.'
      }
    ]
  }
];

export const projects: Project[] = [
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
  },
  {
    id: 'p4',
    title: 'Microservices with Go',
    slug: 'microservices-with-go',
    coverImage: '/images/projects/microservices.png',
    description: 'Build a microservices architecture using Go. Learn about service discovery, API gateways, and inter-service communication.',
    level: 'Advanced',
    tags: ['Go', 'Microservices']
  },
  {
    id: 'p5',
    title: 'Blockchain Implementation in Go',
    slug: 'blockchain-implementation-in-go',
    coverImage: '/images/projects/blockchain.png',
    description: 'Create a simple blockchain implementation in Go. Understand the fundamentals of blockchain technology and cryptography.',
    level: 'Advanced',
    tags: ['Go', 'Blockchain', 'Cryptography']
  },
  {
    id: 'p6',
    title: 'File Upload Service',
    slug: 'file-upload-service',
    coverImage: '/images/projects/file-upload.png',
    description: 'Build a file upload service with Go. Learn how to handle multipart form data, file storage, and serve files.',
    level: 'Intermediate',
    tags: ['Go', 'Web Development']
  }
];

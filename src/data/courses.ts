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
        title: 'Introduction to Concurrency in Go',
        slug: 'introduction-to-concurrency',
        description: "Understand the difference between concurrency and parallelism, and Go's approach to concurrent programming."
      },
      {
        id: '2-2',
        title: 'Channels Basics',
        slug: 'channels-basics',
        description: 'Learn about channels, the fundamental communication mechanism between goroutines.'
      },
      {
        id: '2-3',
        title: 'Bidirectional Channels',
        slug: 'bidirectional-channels',
        description: 'Learn how to use bidirectional channels for sending and receiving data.'
      },
      {
        id: '2-4',
        title: 'Directional Channels',
        slug: 'directional-channels',
        description: 'Understand how to use channels that can only send or only receive data.'
      },
      {
        id: '2-5',
        title: 'Buffered Channels',
        slug: 'buffered-channels',
        description: 'Learn about buffered channels that can hold multiple values.'
      },
      {
        id: '2-6',
        title: 'Creating Goroutines',
        slug: 'creating-goroutines',
        description: 'Learn how to create and use goroutines, the lightweight threads of Go.'
      },
      {
        id: '2-7',
        title: 'Working with WaitGroups',
        slug: 'working-with-waitgroups',
        description: 'Use WaitGroups to coordinate multiple goroutines and wait for their completion.'
      },
      {
        id: '2-8',
        title: 'Testing with WaitGroups',
        slug: 'testing-with-waitgroups',
        description: 'Learn strategies for testing concurrent code with WaitGroups.'
      },
      {
        id: '2-9',
        title: 'Race Conditions',
        slug: 'race-conditions',
        description: 'Understand what race conditions are and how to detect them.'
      },
      {
        id: '2-10',
        title: 'Using Mutex',
        slug: 'using-mutex',
        description: 'Learn how to use mutexes to protect shared resources from concurrent access.'
      },
      {
        id: '2-11',
        title: 'The Producer-Consumer Problem',
        slug: 'producer-consumer-problem',
        description: 'Solve the classic producer-consumer problem using Go concurrency primitives.'
      },
      {
        id: '2-12',
        title: 'Range over Channels',
        slug: 'range-over-channels',
        description: 'Learn how to iterate over the values received from a channel.'
      },
      {
        id: '2-13',
        title: 'Unbuffered Channels',
        slug: 'unbuffered-channels',
        description: 'Deep dive into unbuffered channels and their synchronization properties.'
      },
      {
        id: '2-14',
        title: 'Buffered vs Unbuffered Channels',
        slug: 'buffered-vs-unbuffered',
        description: 'Compare buffered and unbuffered channels and learn when to use each.'
      },
      {
        id: '2-15',
        title: 'Channel Direction',
        slug: 'channel-direction',
        description: 'Learn how to specify and enforce channel direction in function parameters.'
      },
      {
        id: '2-16',
        title: 'Channel Ownership',
        slug: 'channel-ownership',
        description: 'Understand the concept of channel ownership and why it matters.'
      },
      {
        id: '2-17',
        title: 'Pipeline Pattern',
        slug: 'pipeline-pattern',
        description: 'Learn how to implement the pipeline pattern for processing streams of data.'
      },
      {
        id: '2-18',
        title: 'Fan-Out Fan-In Pattern',
        slug: 'fan-out-fan-in',
        description: 'Distribute work and collect results using the fan-out fan-in pattern.'
      },
      {
        id: '2-19',
        title: 'Cancellation with Context Package',
        slug: 'context-package',
        description: 'Learn how to use the context package to manage goroutine lifecycles and handle cancellation.'
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

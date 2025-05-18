export interface Course {
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  image: string;
  price: string;
  instructor: string;
  instructorImage: string;
  instructorBio: string;
  topics: string[];
  requirements: string[];
  moduleCount?: number;
  // ... other fields as needed
}

const sangamInstructor = {
  instructor: 'Sangam Biradar',
  instructorImage: '/favicon.ico',
  instructorBio: 'Sangam Biradar is a DevOps and Cloud Native expert, CNCF Ambassador, and international speaker with a passion for teaching Go and modern cloud technologies.'
};

export const courses: Course[] = [
  {
    slug: 'quick-start-with-golang-modules',
    title: 'Quick Start with Golang',
    description: 'Master Golang fundamentals in this hands-on course designed for beginners. Learn essential concepts like data types, control structures, functions, packages, and data structures through interactive labs and practical challenges.',
    level: 'Beginner',
    duration: '4 weeks',
    image: '/images/courses/quick-start-with-golang.png',
    price: 'Free',
    moduleCount: 101,
    ...sangamInstructor,
    topics: [
      'Go installation and setup',
      'Variables, Constants, and Data Types',
      'Control Flow: Conditionals and Loops',
      'Functions and Methods',
      'Arrays, Slices, and Maps',
      'Structs and Interfaces',
      'Packages and Modules',
      'Error Handling',
      'Concurrency Basics',
      'Building a Simple CLI Application'
    ],
    requirements: [
      'Basic programming knowledge in any language',
      'Familiarity with command line operations',
      'Computer with minimum 4GB RAM and 10GB free disk space'
    ]
  },
  {
    slug: 'concurrent-programming-with-go',
    title: 'Concurrent Programming with Go',
    description: 'Learn how to write concurrent programs in Go using goroutines and channels. This course covers concurrency patterns, synchronization, and best practices for writing efficient concurrent code in Go.',
    level: 'Intermediate',
    duration: '5 weeks',
    image: '/images/courses/concurrent-programming-with-go.png',
    price: 'Free',
    moduleCount: 15,
    ...sangamInstructor,
    topics: [
      'Goroutines and Channels',
      'Synchronization Techniques',
      'Mutexes and WaitGroups',
      'Concurrency Patterns',
      'Error Handling in Concurrent Code',
      'Best Practices for Concurrency',
      'Testing and Debugging Concurrent Programs'
    ],
    requirements: [
      'Solid understanding of Go fundamentals',
      'Experience with basic concurrency concepts',
      'Familiarity with Go tooling and environment'
    ]
  },
  {
    slug: 'web-development-with-go',
    title: 'Web Development with Go',
    description: 'Build web applications with Go\'s standard library and popular frameworks. Learn how to create RESTful APIs, handle HTTP requests, and connect to databases.',
    level: 'Intermediate',
    duration: '6 weeks',
    image: '/images/courses/web-development-with-go.png',
    price: 'Free',
    moduleCount: 20,
    ...sangamInstructor,
    topics: [
      'HTTP Fundamentals with Go',
      'Routing and Handlers',
      'Middleware Patterns',
      'Building REST APIs',
      'Authentication and Authorization',
      'Database Integration',
      'Session Management',
      'File Uploads and Processing',
      'Deployment Strategies'
    ],
    requirements: [
      'Good understanding of Go fundamentals',
      'Basic knowledge of web concepts (HTTP, APIs)',
      'Familiarity with databases (SQL or NoSQL)'
    ]
  },
  {
    slug: 'advanced-go-patterns',
    title: 'Advanced Go Patterns',
    description: 'Take your Go skills to the next level with advanced design patterns, reflection, and performance optimization. Ideal for experienced Go developers.',
    level: 'Advanced',
    duration: '7 weeks',
    image: '/images/courses/advanced-go-patterns.png',
    price: 'Free',
    moduleCount: 18,
    ...sangamInstructor,
    topics: [
      'Advanced Concurrency Patterns',
      'Reflection and Unsafe Operations',
      'Performance Optimization',
      'Memory Management and Garbage Collection',
      'Testing Strategies and Benchmarking',
      'Profiling and Debugging',
      'Building Robust Services'
    ],
    requirements: [
      'Strong Go programming skills',
      'Experience with web development',
      'Familiarity with cloud computing concepts'
    ]
  },
  {
    slug: 'microservices-with-go',
    title: 'Microservices with Go',
    description: 'Design and implement microservices architecture using Go and modern tools. Learn about gRPC, service discovery, and containerization.',
    level: 'Advanced',
    duration: '8 weeks',
    image: '/images/courses/microservices-with-go.png',
    price: 'Free',
    moduleCount: 22,
    ...sangamInstructor,
    topics: [
      'Microservices Architecture Principles',
      'Service Design and Communication Patterns',
      'gRPC and Protocol Buffers',
      'Service Discovery',
      'API Gateways',
      'Circuit Breaking and Retries',
      'Distributed Tracing',
      'Containerization with Docker',
      'Kubernetes Deployment',
      'Monitoring and Observability'
    ],
    requirements: [
      'Strong Go programming skills',
      'Experience with web development',
      'Basic understanding of containerization',
      'Familiarity with cloud computing concepts'
    ]
  },
  {
    slug: 'testing-in-go',
    title: 'Testing in Go',
    description: 'Master unit testing, integration testing, and benchmarking in Go. Learn how to write robust, maintainable, and well-tested Go code.',
    level: 'Intermediate',
    duration: '3 weeks',
    image: '/images/courses/testing-in-go.png',
    price: 'Free',
    moduleCount: 12,
    ...sangamInstructor,
    topics: [
      'Unit Testing in Go',
      'Integration Testing',
      'Test Coverage and Reporting',
      'Benchmarking',
      'Mocking and Test Doubles',
      'Best Practices for Testing'
    ],
    requirements: [
      'Basic Go programming knowledge',
      'Familiarity with Go tools',
      'Interest in software quality'
    ]
  }
]; 
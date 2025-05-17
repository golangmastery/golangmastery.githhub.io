import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="relative h-64 w-64 mx-auto">
            <Image 
              src="/images/golang-logo.png" 
              alt="Golang Logo"
              width={256}
              height={256}
              style={{ objectFit: 'contain' }}
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
            <Link href="/courses/quick-start-with-golang" className="btn-primary">
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

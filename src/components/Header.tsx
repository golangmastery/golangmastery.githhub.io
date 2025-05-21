import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 relative">
            <Image 
              src="/images/go-logo-blue.svg" 
              alt="Golang Mascot" 
              layout="fill" 
              objectFit="contain"
            />
          </div>
          <div className="font-bold text-xl text-blue-600">GolangMastery</div>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Courses
          </Link>
          <Link href="/projects" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Projects
          </Link>
          <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Resources
          </Link>
          <Link href="https://github.com/golangmastery" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            GitHub
          </Link>
        </nav>
        
        <div>
          <Link href="/courses/quick-start-with-golang" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}

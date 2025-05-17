import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Check if the current route matches the link
  const isActive = (path) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  // Handle scroll event to add shadow when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white ${isScrolled ? 'shadow-md' : 'shadow-sm'} transition-shadow duration-300`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-blue-700 transition-colors">G</div>
            <div className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">GolangMastery</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/courses" 
              className={`font-medium ${isActive('/courses')
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
              Learn
            </Link>
            <Link href="/projects" 
              className={`font-medium ${isActive('/projects')
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
              Projects
            </Link>
            <Link href="/pricing" 
              className={`font-medium ${isActive('/pricing')
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
              Pricing
            </Link>
            <div className="flex items-center space-x-4 ml-4">
              <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Log In
              </Link>
              <Link href="/register" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow">
                Join For Free
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
            <ul className="space-y-4">
              <li>
                <Link href="/courses"
                  className={`block font-medium ${isActive('/courses')
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/projects"
                  className={`block font-medium ${isActive('/projects')
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/pricing"
                  className={`block font-medium ${isActive('/pricing')
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                  Pricing
                </Link>
              </li>
              <li className="pt-4 border-t border-gray-100">
                <Link href="/login" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Log In
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium text-center shadow-sm">
                  Join For Free
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

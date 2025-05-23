import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Check if the current route matches the link
  const isActive = (path) => {
    if (path === '/') {
      return router.pathname === path;
    }
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300 transform group-hover:scale-105 shadow-lg group-hover:shadow-primary-500/25">
                <span className="relative">G</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <div className="font-bold text-2xl text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
              Golang<span className="text-primary-500">Mastery</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <a href="/courses" 
              className={`relative px-6 py-3 font-semibold rounded-xl transition-all duration-300 group ${
                isActive('/courses')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}>
              <span className="relative z-10 flex items-center">
                📚 Learn
              </span>
              {isActive('/courses') && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-xl"></div>
              )}
            </a>
            
            <a href="/projects" 
              className={`relative px-6 py-3 font-semibold rounded-xl transition-all duration-300 group ${
                isActive('/projects')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}>
              <span className="relative z-10 flex items-center">
                🛠️ Projects
              </span>
              {isActive('/projects') && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-xl"></div>
              )}
            </a>
            
            <a href="/pricing" 
              className={`relative px-6 py-3 font-semibold rounded-xl transition-all duration-300 group ${
                isActive('/pricing')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}>
              <span className="relative z-10 flex items-center">
                💎 Pricing
              </span>
              {isActive('/pricing') && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-xl"></div>
              )}
            </a>
            
            {/* CTA Buttons */}
            <div className="flex items-center space-x-3 ml-6">
              <a href="/login" className="text-gray-600 hover:text-primary-600 font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-50">
                Log In
              </a>
              <a href="/register" className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/25">
                <span className="relative z-10 flex items-center">
                  Join for Free
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current rounded transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`absolute left-0 top-2.5 w-6 h-0.5 bg-current rounded transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`absolute left-0 top-4 w-6 h-0.5 bg-current rounded transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-6 border-t border-gray-100 mt-4">
            <ul className="space-y-2">
              <li>
                <a href="/courses"
                  className={`block px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                    isActive('/courses')
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}>
                  📚 Learn
                </a>
              </li>
              <li>
                <a href="/projects"
                  className={`block px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                    isActive('/projects')
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}>
                  🛠️ Projects
                </a>
              </li>
              <li>
                <a href="/pricing"
                  className={`block px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                    isActive('/pricing')
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}>
                  💎 Pricing
                </a>
              </li>
              <li className="pt-4">
                <a href="/login" className="block px-6 py-3 text-gray-600 hover:text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300">
                  Log In
                </a>
              </li>
              <li className="pt-2">
                <a href="/register" className="block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 text-center shadow-lg">
                  Join for Free
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

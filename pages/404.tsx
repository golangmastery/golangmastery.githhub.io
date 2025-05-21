import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Get the current path
    const path = window.location.pathname;
    
    // If the path includes the GitHub Pages prefix, clean it and redirect
    if (path.includes('/golangmastery.github.io/')) {
      const cleanPath = path.replace('/golangmastery.github.io', '');
      router.push(cleanPath);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
} 
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Get the current path
    const path = window.location.pathname;
    
    // Remove the base path if it exists
    const cleanPath = path.replace('/golangmastery.github.io', '');
    
    // Try to redirect to the correct path
    if (cleanPath !== path) {
      router.push(cleanPath);
    } else {
      // If we're already at the clean path, redirect to home
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">Redirecting you to the correct page...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
} 
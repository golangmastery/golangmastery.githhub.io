import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div>
      <Header />
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}

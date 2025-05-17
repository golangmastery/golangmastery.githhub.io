import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="font-bold text-xl text-primary">GolangMastery</div>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/learn" className="text-gray-600 hover:text-primary transition-colors">
            Learn
          </Link>
          <Link href="/projects" className="text-gray-600 hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-primary transition-colors">
            Log In
          </Link>
          <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition-colors">
            Join For Free
          </Link>
        </div>
      </div>
    </header>
  );
}

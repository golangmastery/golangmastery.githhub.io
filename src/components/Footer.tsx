import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GolangMastery</h3>
            <p className="text-gray-300">
              Learn Golang with hands-on labs and projects. Master Go programming with our structured learning path.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Learning Path</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="text-gray-300 hover:text-white transition-colors">
                  Learn Golang
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">
                  Golang Projects
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-300 hover:text-white transition-colors">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/playground" className="text-gray-300 hover:text-white transition-colors">
                  Golang Playground
                </Link>
              </li>
              <li>
                <Link href="/cheatsheet" className="text-gray-300 hover:text-white transition-colors">
                  Golang Cheat Sheet
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-gray-300 hover:text-white transition-colors">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="https://github.com/golangmastery" className="text-gray-300 hover:text-white transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/golangmastery" className="text-gray-300 hover:text-white transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://discord.gg/golangmastery" className="text-gray-300 hover:text-white transition-colors">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} GolangMastery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

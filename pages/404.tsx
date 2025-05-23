import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Head>
        <title>404 - Page Not Found | Golang Mastery</title>
        <meta name="description" content="Oops! The page you're looking for doesn't exist. Let's get you back on track with our Go learning resources." />
      </Head>

      <Header />

      {/* 404 Section */}
      <section className="flex-grow flex items-center justify-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-bounce-light"></div>
        
        <div className="container mx-auto px-4 py-20 text-center relative">
          <div className="max-w-3xl mx-auto animate-slide-up">
            {/* 404 Illustration */}
            <div className="mb-12">
              <div className="relative inline-block">
                <div className="text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-20 leading-none">
                  404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl animate-bounce-light">🔍</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-12">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Oops! Page Not Found
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                The page you're looking for seems to have vanished into the digital void. 
                But don't worry, we've got plenty of Go resources to get you back on track!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/" className="group relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/25">
                <span className="relative z-10 flex items-center justify-center">
                  🏠 Go Home
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link href="/courses" className="group border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-2xl font-semibold hover:bg-primary-50 transition-all duration-300 transform hover:-translate-y-1">
                <span className="flex items-center justify-center">
                  📚 Browse Courses
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Popular Links */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-card border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Popular Learning Paths
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { 
                    href: "/courses/quick-start-with-golang", 
                    label: "Quick Start with Go",
                    icon: "🚀",
                    description: "Perfect for beginners"
                  },
                  { 
                    href: "/projects", 
                    label: "Hands-on Projects",
                    icon: "🛠️",
                    description: "Build real applications"
                  },
                  { 
                    href: "/courses/concurrent-programming-with-go", 
                    label: "Concurrency in Go",
                    icon: "⚡",
                    description: "Master goroutines"
                  },
                  { 
                    href: "/courses/web-development-with-go", 
                    label: "Web Development",
                    icon: "🌐",
                    description: "Build web apps"
                  }
                ].map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="group p-4 rounded-xl border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 text-left"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {link.icon}
                      </span>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {link.label}
                        </div>
                        <div className="text-sm text-gray-500 group-hover:text-primary-500 transition-colors">
                          {link.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
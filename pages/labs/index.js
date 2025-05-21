import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAllContent } from '../../lib/mdx';

export default function LabsPage({ labs }) {
  // Function to get the appropriate level badge style
  const getLevelBadgeStyle = (level) => {
    switch(level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Golang Labs - Golang Mastery</title>
        <meta name="description" content="Interactive Golang labs to help you master Go programming" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Golang Labs</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Learn Go programming through interactive, hands-on labs. Each lab focuses on a specific concept and includes exercises to reinforce your learning.
            </p>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Filter and Search (placeholder for future implementation) */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-700 font-medium">Filter by:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="all">All Topics</option>
                <option value="basics">Basics</option>
                <option value="concurrency">Concurrency</option>
                <option value="web">Web Development</option>
              </select>
            </div>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search labs..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Labs List */}
          <div className="space-y-6">
            {labs.map((lab) => (
              <div key={lab.slug} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-green-100">
                <Link href={`/labs/${lab.slug}`} className="block p-6">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-800 mr-3">{lab.frontmatter.title}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getLevelBadgeStyle(lab.frontmatter.level)}`}>
                          {lab.frontmatter.level}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{lab.frontmatter.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {lab.frontmatter.tags && lab.frontmatter.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                            {tag}
                          </span>
                        ))}
                        {lab.frontmatter.duration && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {lab.frontmatter.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <span className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
                        Start Lab
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            
            {labs.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No labs found</h3>
                <p className="text-gray-500">We're working on adding more labs. Check back soon!</p>
              </div>
            )}
          </div>
          
          {/* Contribute CTA */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md p-8 mt-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-3/4 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Contribute to Golang Mastery</h3>
                <p className="text-white/90">
                  Help others learn Go by contributing new labs or improving existing ones. Our MDX-based content makes it easy to add interactive elements and code examples.
                </p>
              </div>
              <div className="md:w-1/4 md:text-right">
                <a
                  href="https://github.com/golangmastery/golangmastery.githhub.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors inline-flex items-center shadow-sm hover:shadow"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Contribute on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const labs = await getAllContent('labs');
    
    return {
      props: {
        labs,
      },
    };
  } catch (error) {
    console.error('Error fetching labs:', error);
    return {
      props: {
        labs: [],
      },
    };
  }
}

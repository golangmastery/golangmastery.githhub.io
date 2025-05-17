import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { projects } from '../../src/data/courses';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <div>
      <Head>
        <title>Go Projects - Golang Mastery</title>
        <meta name="description" content="Learn by building real-world projects with Go. From CLI tools to web applications and more." />
      </Head>

      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Go Projects</h1>
          <p className="text-lg text-gray-700 mb-8">
            Learn by building real-world projects with Go. These projects will help you apply your knowledge and build a portfolio of Go applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="h-48 w-full bg-blue-100 flex items-center justify-center">
                  <div className="text-blue-600 text-5xl font-bold">Go</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      project.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {project.level}
                    </span>
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex justify-end">
                    <Link href={`/projects/${project.slug}`}>
                      <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Start Project
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 
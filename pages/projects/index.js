import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProjectCard from '../../components/ProjectCard';
import { getAllContent } from '../../lib/mdx';

export default function ProjectsPage({ projects }) {
  return (
    <div>
      <Head>
        <title>Golang Projects - Golang Mastery</title>
        <meta name="description" content="Browse our Golang projects and start building today." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Golang Projects</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">
          Apply your Golang knowledge with our hands-on projects. Each project is designed to help you build practical applications and reinforce your Go programming skills.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const projects = await getAllContent('projects');
  
  return {
    props: {
      projects,
    },
  };
}

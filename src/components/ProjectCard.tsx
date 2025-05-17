import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/data/courses';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card">
      <div className="relative h-48 w-full">
        <Image 
          src={project.coverImage} 
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-lg"
        />
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
          <Link href={`/projects/${project.slug}`} className="btn-primary">
            Start Project
          </Link>
        </div>
      </div>
    </div>
  );
}

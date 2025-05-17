import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/data/courses';

interface ProjectFrontmatter {
  title: string;
  description: string;
  coverImage: string;
  difficulty?: string;
  level?: string;
  technologies?: string[];
  tags?: string[];
  slug?: string;
  [key: string]: any;
}

interface ProjectWithFrontmatter {
  frontmatter: ProjectFrontmatter;
  slug: string;
}

interface ProjectCardProps {
  project: Project | ProjectWithFrontmatter;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Handle both Project and ProjectWithFrontmatter interfaces
  const isProjectWithFrontmatter = 'frontmatter' in project;
  
  const title = isProjectWithFrontmatter ? project.frontmatter.title : project.title;
  const description = isProjectWithFrontmatter ? project.frontmatter.description : project.description;
  const coverImage = isProjectWithFrontmatter ? project.frontmatter.coverImage : project.coverImage;
  const level = isProjectWithFrontmatter 
    ? (project.frontmatter.level || project.frontmatter.difficulty) 
    : project.level;
  const tags = isProjectWithFrontmatter 
    ? (project.frontmatter.tags || project.frontmatter.technologies || []) 
    : project.tags;
  const slug = isProjectWithFrontmatter 
    ? (project.frontmatter.slug || project.slug) 
    : project.slug;

  return (
    <div className="card">
      <div className="relative h-48 w-full">
        <Image 
          src={coverImage} 
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-2 py-1 text-xs rounded-full ${
            level === 'Beginner' ? 'bg-green-100 text-green-800' :
            level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {level}
          </span>
          {tags && tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-end">
          <Link href={`/projects/${slug}`}>
            <a className="btn-primary">Start Project</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

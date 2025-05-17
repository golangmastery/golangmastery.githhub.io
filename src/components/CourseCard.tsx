import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/data/courses';

interface CourseFrontmatter {
  title: string;
  description: string;
  coverImage: string;
  level: string;
  tags: string[];
  labs?: any[];
  slug?: string;
  [key: string]: any;
}

interface CourseWithFrontmatter {
  frontmatter: CourseFrontmatter;
  slug: string;
}

interface CourseCardProps {
  course: Course | CourseWithFrontmatter;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Handle both Course and CourseWithFrontmatter interfaces
  const isWithFrontmatter = 'frontmatter' in course;
  
  const title = isWithFrontmatter ? course.frontmatter.title : course.title;
  const description = isWithFrontmatter ? course.frontmatter.description : course.description;
  const coverImage = isWithFrontmatter ? course.frontmatter.coverImage : course.coverImage;
  const level = isWithFrontmatter ? course.frontmatter.level : course.level;
  const tags = isWithFrontmatter ? course.frontmatter.tags : course.tags;
  const slug = isWithFrontmatter ? (course.frontmatter.slug || course.slug) : course.slug;
  const labs = isWithFrontmatter ? (course.frontmatter.labs || []) : course.labs;

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
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{labs.length} labs</span>
          <Link href={`/courses/${slug}`}>
            <a className="btn-primary">Start Learning</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

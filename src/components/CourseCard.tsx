import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/data/courses';

// Define interfaces that match our data structure
interface CourseFrontmatter {
  title: string;
  description: string;
  coverImage?: string;
  level: string;
  tags?: string[];
  labs?: any[];
  slug?: string;
  moduleCount?: number;
  [key: string]: any;
}

interface CourseWithFrontmatter {
  frontmatter: CourseFrontmatter;
  slug: string;
}

interface CourseCardProps {
  course: Course | CourseWithFrontmatter;
  index?: number;
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  // Handle both Course and CourseWithFrontmatter interfaces
  const isWithFrontmatter = 'frontmatter' in course;
  
  const title = isWithFrontmatter ? course.frontmatter.title : course.title;
  const description = isWithFrontmatter ? course.frontmatter.description : course.description;
  // For image, try multiple possible sources
  const coverImage = isWithFrontmatter 
    ? course.frontmatter.coverImage 
    : course.coverImage;
  const level = isWithFrontmatter ? course.frontmatter.level : course.level;
  const tags = isWithFrontmatter ? (course.frontmatter.tags || []) : (course.tags || []);
  const slug = isWithFrontmatter ? (course.frontmatter.slug || course.slug) : course.slug;
  const labs = isWithFrontmatter ? (course.frontmatter.labs || []) : (course.labs || []);
  
  // Get moduleCount if available using type assertion
  const moduleCount = isWithFrontmatter 
    ? course.frontmatter.moduleCount 
    : (course as any).moduleCount;
  
  // Define level badge color
  const levelColor = 
    level === 'Beginner' ? 'bg-green-100 text-green-800' :
    level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
    'bg-red-100 text-red-800';

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 group flex flex-col h-full"
      style={{ 
        animationDelay: `${index * 60}ms`, 
        animationFillMode: 'both'
      }}
    >
      <div className="relative h-52 w-full">
        {coverImage ? (
          <Image 
            src={coverImage} 
            alt={`Cover image for ${title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 3} // Prioritize loading first 3 images
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center">
            <div className="text-white text-7xl font-bold opacity-30 group-hover:opacity-40 transition-opacity duration-300 relative z-10">Go</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"/>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-xl font-bold mb-1 drop-shadow-sm">{title}</h3>
          <p className="text-sm text-white/90 line-clamp-1">{description}</p>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${levelColor}`}>
            {level}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-600">
              {labs?.length || 0} labs
            </span>
          </div>
          
          {moduleCount && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                {moduleCount} modules
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link
            href={`/courses/${slug}`}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
            aria-label={`Start learning ${title}`}
          >
            Start Learning
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

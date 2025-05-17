import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/data/courses';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="card">
      <div className="relative h-48 w-full">
        <Image 
          src={course.coverImage} 
          alt={course.title}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <div className="flex items-center space-x-2 mb-4">
          <span className={`px-2 py-1 text-xs rounded-full ${
            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.level}
          </span>
          {course.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{course.labs.length} labs</span>
          <Link href={`/courses/${course.slug}`} className="btn-primary">
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
}

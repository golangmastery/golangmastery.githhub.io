import Link from 'next/link';
import Image from 'next/image';

export default function CourseCard({ course }) {
  // Ensure course and frontmatter exist
  const frontmatter = course?.frontmatter || {};
  
  // Get module count 
  const modules = frontmatter.moduleCount || 0;
  
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
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] border border-gray-100 group h-full flex flex-col">
      <div className="relative">
        <div className="h-52 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center overflow-hidden">
          {frontmatter.coverImage ? (
            <Image 
              src={frontmatter.coverImage}
              alt={frontmatter.title || 'Course cover'}
              width={400}
              height={225}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <>
              <div className="text-white text-7xl font-bold opacity-30 group-hover:opacity-40 transition-opacity duration-300 relative z-10">Go</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getLevelBadgeStyle(frontmatter.level)}`}>
            {frontmatter.level || 'Beginner'}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{frontmatter.title || 'Untitled Course'}</h3>

        {(frontmatter.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(frontmatter.tags || []).slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md font-medium">
                {tag}
              </span>
            ))}
            {(frontmatter.tags || []).length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md font-medium">
                +{(frontmatter.tags || []).length - 3} more
              </span>
            )}
          </div>
        )}

        <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{frontmatter.description || 'No description available'}</p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                {frontmatter.labs ? frontmatter.labs.length : 0} labs
              </span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                {modules} modules
              </span>
            </div>
          </div>

          <Link href={`/courses/${course.slug}`}>
            <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm hover:shadow font-medium flex items-center">
              Start Learning
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

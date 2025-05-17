import { useState } from 'react';
import CourseCard from './CourseCard';
import ProjectCard from './ProjectCard';
import { courses, projects } from '@/data/courses';

export default function TabSection() {
  const [activeTab, setActiveTab] = useState<'learn' | 'build'>('learn');

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-4 px-6 font-medium text-lg ${
              activeTab === 'learn'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('learn')}
          >
            Learn Skills
          </button>
          <button
            className={`py-4 px-6 font-medium text-lg ${
              activeTab === 'build'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('build')}
          >
            Build Projects
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

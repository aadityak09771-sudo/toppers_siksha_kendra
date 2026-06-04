import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentDashboardLayout } from '../layouts/StudentDashboardLayout';
import { Store, Search } from 'lucide-react';
import { DASHBOARD_COURSES, type DashboardCourse } from '../config/studentData';
import { CourseCard } from '../components/dashboard/CourseCard';
import { CourseDetailsModal } from '../components/dashboard/CourseDetailsModal';

export const DashboardCourses: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<DashboardCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    let result = DASHBOARD_COURSES;
    
    // Search filter
    if (searchQuery) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [searchQuery]);

  const handleViewDetails = (course: DashboardCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleStartLearning = (course: DashboardCourse) => {
    setIsModalOpen(false);
    navigate(`/courses/${course.id}`);
  };

  return (
    <StudentDashboardLayout 
      searchQuery={searchQuery} 
      onSearchChange={setSearchQuery}
    >
      <div className="space-y-12 pt-[30px]">
        {/* Header Section */}
        <section>
          <div className="pt-[50px] flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2 text-[var(--color-primary)] font-black uppercase tracking-[0.2em] text-[10px]">
              <Store size={14} />
              Explore
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Our Courses</h2>
            <p className="text-gray-500">Discover top-rated courses to master your exams and build your career.</p>
          </div>
        </section>

        {/* Course Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              Popular Courses
              <span className="ml-3 text-sm text-gray-400 font-bold">({filteredCourses.length})</span>
            </h3>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  onViewDetails={handleViewDetails}
                  onStartLearning={handleStartLearning}
                  actionText="Enroll Now"
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-300 shadow-sm">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500 max-w-xs mx-auto">We couldn't find any courses matching your search query.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      </div>

      <CourseDetailsModal 
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartLearning={handleStartLearning}
        actionText="Enroll Now"
      />
    </StudentDashboardLayout>
  );
};

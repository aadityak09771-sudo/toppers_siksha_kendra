import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentDashboardLayout } from '../layouts/StudentDashboardLayout';
import { CourseCard } from '../components/dashboard/CourseCard';
import { CourseDetailsModal } from '../components/dashboard/CourseDetailsModal';
import { EmptyState } from '../components/dashboard/EmptyState';
import { DASHBOARD_COURSES, type DashboardCourse } from '../config/studentData';

export const MyCourses: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<DashboardCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    return DASHBOARD_COURSES.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.language.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleViewDetails = (course: DashboardCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleStartLearning = (course: DashboardCourse) => {
    setIsModalOpen(false);
    navigate(`/student/course/${course.id}/learn`);
  };

  return (
    <StudentDashboardLayout 
      searchQuery={searchQuery} 
      onSearchChange={setSearchQuery}
    >
      <div className="space-y-8">

        {/* Courses Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-3xl font-black text-[#071b4d] tracking-tight">My Courses</h2>
              <div title="Change Target Exam" className="bg-[#fff1e8] text-[#ff7a21] px-[18px] py-[10px] rounded-full font-bold flex items-center gap-2 shadow-sm border border-[#ffe3cf] hover:bg-[#ffe7d7] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                <span>🎯</span> Target: JEE 2027
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-blue-50 text-[var(--color-primary)] text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                {filteredCourses.length} Found
              </span>
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  onViewDetails={handleViewDetails}
                  onStartLearning={handleStartLearning}
                />
              ))}
            </div>
          ) : (
            <EmptyState onClear={() => setSearchQuery('')} />
          )}

          {/* Motivation Banner */}
          <div className="mt-10 bg-[#fff8f4] border border-[#ffe3cf] rounded-[24px] p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-4xl bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm">🚀</div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-[#071b4d] mb-1">Stay Consistent, Achieve Excellence!</h3>
              <p className="text-[#ff7a21] font-medium mt-1">Your future is built one lesson at a time.</p>
            </div>
            <button className="bg-[#ff7a21] text-white border-none h-12 px-6 rounded-xl font-bold whitespace-nowrap hover:bg-[#e66a15] hover:-translate-y-1 hover:shadow-orange-500/40 transition-all duration-300 shadow-lg shadow-orange-500/20 cursor-pointer">
              Track My Progress
            </button>
          </div>
        </section>
      </div>

      <CourseDetailsModal 
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartLearning={handleStartLearning}
        actionText="Start Learning"
      />
    </StudentDashboardLayout>
  );
};

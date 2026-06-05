import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { CourseSidebar } from './CourseSidebar';
import { LessonOverview } from './LessonOverview';

const mockCourseData = {
  id: '1',
  title: 'Class 12th Board Mastery',
  lessons: [
    { id: 'l1', lessonNumber: 1, title: 'Introduction to the Course', duration: '15:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: true, isLocked: false },
    { id: 'l2', lessonNumber: 2, title: 'Basic Concepts', duration: '45:00', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', isCompleted: false, isLocked: false },
    { id: 'l3', lessonNumber: 3, title: 'Chapter Fundamentals', duration: '60:00', videoUrl: '', isCompleted: false, isLocked: true },
    { id: 'l4', lessonNumber: 4, title: 'Practice Session', duration: '30:00', videoUrl: '', isCompleted: false, isLocked: true },
    { id: 'l5', lessonNumber: 5, title: 'Revision Class', duration: '40:00', videoUrl: '', isCompleted: false, isLocked: true }
  ]
};

export const CourseLearningPage: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(mockCourseData.lessons[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLessonSelect = (lesson: any) => {
    if (!lesson.isLocked) {
      setCurrentLesson(lesson);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf6] pb-20">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6 overflow-hidden">
            <Link to="/dashboard" className="p-2.5 hover:bg-[#fffaf6] rounded-xl text-[#0a2458] hover:text-[#ff6b00] transition-colors border border-transparent hover:border-[#ff6b00]/20 shrink-0"><ArrowLeft size={22} /></Link>
            
            <div className="flex items-center gap-3 border-r border-gray-100 pr-4 md:pr-6 hidden sm:flex shrink-0">
              <img src="/assets/images/logo.png" alt="Logo" className="w-[35px] object-contain" onError={(e) => { e.currentTarget.src = "/assets/images/home/TKS.png" }} />
              <div className="flex flex-col leading-none justify-center">
                <span className="text-[9px] font-bold text-gray-500 mb-0.5">Topper's</span>
                <h2 className="text-[16px] font-[800] text-[#0a2458] leading-none m-0">
                  Siksha<span className="text-[#ff6b00]">Kendra</span>
                </h2>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="flex items-center gap-2 mb-0.5"><span className="text-[10px] font-black text-[#ff6b00] bg-[#fffaf6] px-2 py-0.5 rounded uppercase tracking-wider border border-[#ff6b00]/20">Live Course</span><span className="text-sm font-black text-[#0a2458] truncate">{mockCourseData.title}</span></div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] truncate">Lesson {currentLesson.lessonNumber}: {currentLesson.title}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid lg:grid-cols-[70%_30%] gap-8 xl:gap-12">
          <div className="space-y-8 md:space-y-12"><VideoPlayer url={currentLesson.videoUrl} title={currentLesson.title} /><LessonOverview lesson={currentLesson} courseTitle={mockCourseData.title} /></div>
          <div><CourseSidebar lessons={mockCourseData.lessons} currentLessonId={currentLesson.id} onLessonSelect={handleLessonSelect} /></div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Play, CheckCircle2, Lock } from 'lucide-react';

interface Lesson {
  id: string;
  lessonNumber: number;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
}

interface CourseSidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  onLessonSelect: (lesson: Lesson) => void;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({ lessons, currentLessonId, onLessonSelect }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden lg:sticky lg:top-[100px] flex flex-col lg:max-h-[calc(100vh-140px)]">
      <div className="p-6 border-b border-gray-50 bg-[#fffaf6] shrink-0">
        <h3 className="text-xl font-black text-[#0a2458] tracking-tight">Course Content</h3>
        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
          {lessons.length} Lessons • 12+ Hours Content
        </p>
      </div>
      <div className="overflow-y-auto no-scrollbar flex-grow max-h-[50vh] lg:max-h-none">
        {lessons.map((lesson) => {
          const isCurrent = lesson.id === currentLessonId;
          const isLocked = lesson.isLocked;

          return (
            <button 
              key={lesson.id}
              onClick={() => !isLocked && onLessonSelect(lesson)}
              className={`w-full flex items-center gap-4 p-5 transition-all border-b border-gray-50 text-left group
                ${isCurrent ? 'bg-[#ff6b00]/10' : 'hover:bg-gray-50'}
                ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-all duration-300
                ${isCurrent ? 'bg-[#ff6b00] text-white shadow-[0_15px_40px_rgba(255,107,0,0.08)]' : 'bg-white border border-gray-100 text-[#0a2458] group-hover:border-[#ff6b00] group-hover:text-[#ff6b00]'}
              `}>
                {isLocked ? <Lock size={20} /> : lesson.isCompleted ? <CheckCircle2 size={20} className={isCurrent ? 'text-white' : 'text-[#ff6b00]'} /> : isCurrent ? <Play size={20} className="fill-current" /> : <span className="text-sm font-black">{lesson.lessonNumber}</span>}
              </div>
              <div className="flex-grow min-w-0">
                <h4 className={`text-sm font-black truncate transition-colors ${isCurrent ? 'text-[#ff6b00]' : 'text-[#0a2458]'}`}>{lesson.title}</h4>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lesson.duration}</span>
                  {isCurrent && <span className="text-[10px] font-black text-[#ff6b00] uppercase tracking-[0.2em]">Playing</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="p-6 bg-[#fffaf6] border-t border-gray-50 shrink-0">
        <button className="w-full py-3 bg-white border-2 border-[#ff6b00] rounded-[20px] text-xs font-black text-[#ff6b00] hover:bg-[#ff6b00] hover:text-white transition-all shadow-[0_15px_40px_rgba(0,0,0,0.08)]">Download All Resources</button>
      </div>
    </div>
  );
};
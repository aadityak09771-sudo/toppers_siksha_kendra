import React from 'react';
import { Info, Download, PenTool } from 'lucide-react';

interface LessonOverviewProps {
  lesson: any;
  courseTitle: string;
}

export const LessonOverview: React.FC<LessonOverviewProps> = ({ lesson, courseTitle }) => (
  <div className="bg-white p-8 md:p-12 rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
    <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-[#fffaf6] rounded-2xl flex items-center justify-center text-[#ff6b00]">
          <Info size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-[#0a2458] tracking-tight">Lesson Overview</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Details & Resources</p>
        </div>
      </div>
    </div>

    <div className="prose prose-blue max-w-none">
      <p className="text-gray-500 text-base leading-relaxed font-medium mb-8">
        Welcome to <span className="text-[#0a2458] font-black">Lesson {lesson.lessonNumber}</span>. In this session, we will deep dive into the core concepts of <span className="text-[#ff6b00] font-black">{courseTitle}</span>. This lesson is designed to provide you with both theoretical knowledge and practical applications. Make sure to download the attached study materials and attempt the practice quiz after watching the video.
      </p>
    </div>

    <div className="mt-10 pt-10 border-t border-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button className="flex items-center gap-3 bg-white rounded-[20px] h-14 px-4 text-xs font-black border-2 border-gray-100 hover:border-[#ff6b00] group transition-all text-[#0a2458]">
        <div className="w-8 h-8 bg-[#fffaf6] rounded-lg flex items-center justify-center text-gray-400 group-hover:text-[#ff6b00] transition-colors"><Download size={16} /></div>
        <span>Download Lecture Notes</span>
      </button>
      <button className="flex items-center gap-3 bg-white rounded-[20px] h-14 px-4 text-xs font-black border-2 border-gray-100 hover:border-[#ff6b00] group transition-all text-[#0a2458]">
        <div className="w-8 h-8 bg-[#fffaf6] rounded-lg flex items-center justify-center text-gray-400 group-hover:text-[#ff6b00] transition-colors"><PenTool size={16} /></div>
        <span>Practice Questions</span>
      </button>
    </div>
  </div>
);
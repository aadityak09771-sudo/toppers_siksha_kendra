import React from 'react';
import { GraduationCap, School } from 'lucide-react';
import { TargetExamPills } from './TargetExamPills';

interface AcademicDetailsCardProps {
  details: any;
}

export const AcademicDetailsCard: React.FC<AcademicDetailsCardProps> = ({ details }) => {
  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#f3e5d8] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(34,197,94,0.08)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-[14px] bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
          <GraduationCap size={24} />
        </div>
        <h2 className="text-[20px] sm:text-[22px] font-[800] text-[#0a2458]">Academic Details</h2>
      </div>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 text-green-500"><GraduationCap size={18} /></div>
          <div><p className="text-[11px] font-[800] text-gray-400 uppercase tracking-widest mb-1">Current Class</p><p className="text-[14px] sm:text-[15px] font-[700] text-[#1f2937]">{details.class}</p></div>
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-1 text-green-500"><School size={18} /></div>
          <div><p className="text-[11px] font-[800] text-gray-400 uppercase tracking-widest mb-1">Education Board</p><p className="text-[14px] sm:text-[15px] font-[700] text-[#1f2937]">{details.board}</p></div>
        </div>
        <div className="pt-2">
          <p className="text-[11px] font-[800] text-gray-400 uppercase tracking-widest mb-3">Target Exams</p>
          <TargetExamPills exams={details.exams} />
        </div>
      </div>
    </div>
  );
};
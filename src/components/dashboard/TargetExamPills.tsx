import React from 'react';
import { Target } from 'lucide-react';

interface TargetExamPillsProps {
  exams: string[];
}

export const TargetExamPills: React.FC<TargetExamPillsProps> = ({ exams }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {exams.map((exam, index) => (
        <span key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fffaf6] border border-[#f3e5d8] text-[#ff6b00] rounded-full text-[11px] sm:text-[12px] font-[800] tracking-wide">
          <Target size={12} />
          {exam}
        </span>
      ))}
    </div>
  );
};
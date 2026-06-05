import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const MotivationCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#fff7f1] to-[#fffaf6] rounded-[20px] p-6 border border-[#ffeadd] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="absolute -right-4 -top-4 text-[#ff6b00]/5 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
        <ShieldCheck size={120} />
      </div>
      <div className="relative z-10">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#ff6b00] shadow-sm mb-4">
          <ShieldCheck size={20} />
        </div>
        <h3 className="text-lg font-[800] text-[#0a2458] mb-2">Committed to Excellence</h3>
        <p className="text-[#64748b] text-[13px] font-[500] leading-relaxed">
          Focused on achieving academic goals and building a bright future. Keep learning, keep growing!
        </p>
      </div>
    </div>
  );
};
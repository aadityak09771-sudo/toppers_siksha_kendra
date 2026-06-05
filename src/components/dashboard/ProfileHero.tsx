import React from 'react';
import { Edit2, Camera } from 'lucide-react';

interface ProfileHeroProps {
  name: string;
  className: string;
  board: string;
  onEditClick: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({ name, className, board, onEditClick }) => {
  const getInitials = (n: string) => n.split(' ').map(x => x[0]).join('').toUpperCase();

  return (
    <div className="relative bg-white rounded-[30px] border border-[#f3e5d8] shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="h-[180px] bg-gradient-to-r from-[#ff6b00] to-[#ff8a3d] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-black/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="px-6 sm:px-10 pb-8 relative">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 sm:gap-0 -mt-16 sm:-mt-12 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 w-full sm:w-auto">
            <div className="relative group">
              <div className="w-[110px] h-[110px] bg-white rounded-[24px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-2 relative z-10 border border-gray-50">
                <div className="w-full h-full bg-[#fff1e7] rounded-[16px] flex items-center justify-center text-[#ff6b00] font-[900] text-[36px] tracking-tight">
                  {getInitials(name)}
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-[#ff6b00] hover:shadow-md transition-all z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                <Camera size={18} />
              </button>
            </div>

            <div className="text-center sm:text-left pb-2">
              <h1 className="text-[28px] md:text-[32px] font-[800] text-[#0a2458] leading-tight mb-1">{name}</h1>
              <p className="text-[#64748b] font-[600] text-[15px]">{className} • {board} Board</p>
            </div>
          </div>

          <button 
            onClick={onEditClick}
            className="flex items-center gap-2 bg-[#ff6b00] text-white px-6 py-3 rounded-full font-[700] text-[14px] hover:bg-[#e55d00] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(255,107,0,0.2)] transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Edit2 size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 bg-[#fffaf6] px-4 py-2 rounded-xl border border-[#f3e5d8]">
            <span className="text-[11px] font-[800] text-gray-500 uppercase tracking-wider">Profile</span>
            <span className="text-[13px] font-[800] text-[#22c55e]">85% Complete</span>
          </div>
          <div className="flex items-center gap-2 bg-[#fffaf6] px-4 py-2 rounded-xl border border-[#f3e5d8]">
            <span className="text-[11px] font-[800] text-gray-500 uppercase tracking-wider">Joined</span>
            <span className="text-[13px] font-[800] text-[#0a2458]">Mar 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
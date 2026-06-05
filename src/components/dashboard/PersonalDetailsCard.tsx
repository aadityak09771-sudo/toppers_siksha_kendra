import React from 'react';
import { User, Phone, Mail, MapPin, Settings } from 'lucide-react';

interface PersonalDetailsCardProps {
  details: any;
}

export const PersonalDetailsCard: React.FC<PersonalDetailsCardProps> = ({ details }) => {
  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#f3e5d8] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(255,107,0,0.08)] transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[14px] bg-[#fffaf6] border border-[#ff6b00]/20 flex items-center justify-center text-[#ff6b00]">
            <User size={24} />
          </div>
          <h2 className="text-[20px] sm:text-[22px] font-[800] text-[#0a2458]">Personal Details</h2>
        </div>
        <button className="text-gray-400 hover:text-[#ff6b00] transition-colors"><Settings size={20} /></button>
      </div>
      <div className="space-y-0">
        <DetailRow icon={<User size={18} />} label="Full Name" value={details.name} isFirst />
        <DetailRow icon={<Phone size={18} />} label="Mobile Number" value={details.mobileNo} />
        <DetailRow icon={<User size={18} />} label="Gender" value={details.gender} />
        <DetailRow icon={<Mail size={18} />} label="Email Address" value={details.email} />
        <DetailRow icon={<MapPin size={18} />} label="City / Village" value={details.city} />
        <DetailRow icon={<MapPin size={18} />} label="State" value={details.state} isLast />
      </div>
    </div>
  );
};
const DetailRow = ({ icon, label, value, isFirst = false, isLast = false }: any) => (
  <div className={`flex items-start gap-4 py-4 sm:py-5 ${!isLast ? 'border-b border-gray-50' : ''} ${isFirst ? 'pt-0' : ''} ${isLast ? 'pb-0' : ''}`}>
    <div className="mt-1 text-[#ff6b00]/60">{icon}</div>
    <div>
      <p className="text-[11px] font-[800] text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-[14px] sm:text-[15px] font-[700] text-[#1f2937] break-all sm:break-normal">{value}</p>
    </div>
  </div>
);
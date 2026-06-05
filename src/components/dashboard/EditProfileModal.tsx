import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDetails: any;
  onSave: (updatedDetails: any) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, currentDetails, onSave }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedDetails = {
      ...currentDetails,
      name: formData.get('name'),
      email: formData.get('email'),
      mobileNo: formData.get('mobileNo'),
      gender: formData.get('gender'),
      city: formData.get('city'),
      state: formData.get('state'),
    };
    onSave(updatedDetails);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm">
      <style>{`
        @keyframes modalEnter {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-enter { animation: modalEnter 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .modal-scrollbar::-webkit-scrollbar { width: 6px; }
        .modal-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .modal-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
      
      <div className="absolute inset-0 transition-opacity" onClick={onClose} />

      <div className="relative z-10 bg-white w-[95%] md:w-[700px] max-w-4xl rounded-[28px] shadow-2xl flex flex-col max-h-[90vh] animate-modal-enter border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#fffaf6]">
            <h2 className="text-2xl font-[800] text-[#0a2458] tracking-tight">Edit Profile</h2>
            <button type="button" onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#f3e5d8] text-gray-500 hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all shadow-sm"><X size={20} /></button>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-6 bg-white modal-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-[800] text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                <input name="name" type="text" defaultValue={currentDetails.name} className="w-full h-[52px] px-4 rounded-[14px] border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 outline-none font-[700] text-[#0a2458] transition-all" required />
              </div>
              <div>
                <label className="block text-[11px] font-[800] text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                <input name="email" type="email" defaultValue={currentDetails.email} className="w-full h-[52px] px-4 rounded-[14px] border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 outline-none font-[700] text-[#0a2458] transition-all" required />
              </div>
              <div>
                <label className="block text-[11px] font-[800] text-gray-500 uppercase tracking-widest mb-2">Mobile Number</label>
                <input name="mobileNo" type="tel" defaultValue={currentDetails.mobileNo} className="w-full h-[52px] px-4 rounded-[14px] border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 outline-none font-[700] text-[#0a2458] transition-all" required />
              </div>
              <div>
                <label className="block text-[11px] font-[800] text-gray-500 uppercase tracking-widest mb-2">Gender</label>
                <select name="gender" defaultValue={currentDetails.gender || "Male"} className="w-full h-[52px] px-4 rounded-[14px] border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 outline-none font-[700] text-[#0a2458] transition-all appearance-none cursor-pointer">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div><label className="block text-[11px] font-[800] text-gray-500 uppercase tracking-widest mb-2">City</label><input name="city" type="text" defaultValue={currentDetails.city} className="w-full h-[52px] px-4 rounded-[14px] border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 outline-none font-[700] text-[#0a2458] transition-all" /></div>
              <div><label className="block text-[11px] font-[800] text-gray-500 uppercase tracking-widest mb-2">State</label><input name="state" type="text" defaultValue={currentDetails.state} className="w-full h-[52px] px-4 rounded-[14px] border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 outline-none font-[700] text-[#0a2458] transition-all" /></div>
            </div>
          </div>
          <div className="p-6 border-t border-[#f3e5d8] bg-[#fffaf6] flex justify-end gap-4 shrink-0">
            <button type="button" onClick={onClose} className="px-6 py-3.5 rounded-[14px] font-[800] text-gray-600 bg-white border border-[#f3e5d8] hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">Cancel</button>
            <button type="submit" className="px-8 py-3.5 rounded-[14px] font-[800] bg-gradient-to-r from-[#ff8a33] to-[#ff6b00] hover:from-[#ff6b00] hover:to-[#e45e00] text-white transition-colors shadow-[0_10px_20px_rgba(255,107,0,0.2)] hover:-translate-y-0.5">Save Changes</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
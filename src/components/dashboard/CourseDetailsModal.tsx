import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, Globe, Clock, Calendar, Star, ShoppingCart } from 'lucide-react';
import type { DashboardCourse } from '../../config/studentData';
import { useCartStore } from '../../store/useCartStore';

interface CourseDetailsModalProps {
  course: DashboardCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onStartLearning: (course: DashboardCourse) => void;
  actionText?: string;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ 
  course, 
  isOpen, 
  onClose,
  onStartLearning,
  actionText
}) => {
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addToCart);
  if (!course || !isOpen) return null;

  const highlights = course.highlights && course.highlights.length > 0 
    ? course.highlights 
    : ["Live Classes", "Doubt Support", "Study Material", "Weekly Tests", "Mock Tests", "Revision Sessions"];

  const subjects = course.subjects && course.subjects.length > 0
    ? course.subjects
    : ["Physics", "Chemistry", "Mathematics", "Biology"];

  const handleAction = (isBuyNow: boolean) => {
    if (actionText === 'Start Learning') {
      onStartLearning(course);
      return;
    }
    addToCart({
      id: course.id,
      title: course.title,
      price: course.price,
      originalPrice: course.originalPrice || '',
      image: course.thumbnail || '/assets/images/course.png',
      category: course.category
    });
    if (isBuyNow) navigate('/dashboard/cart');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <style>{`
        @keyframes modalEnter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-enter { animation: modalEnter 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .modal-scrollbar::-webkit-scrollbar { width: 6px; }
        .modal-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .modal-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .modal-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>

      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl h-auto max-h-[90vh] bg-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-modal-enter">
        
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-white hover:bg-[#ff6b00] text-gray-600 hover:text-white rounded-full flex items-center justify-center lg:hidden shadow-lg transition-colors"
        >
          <X size={20} />
        </button>

        {/* LEFT PANEL (45%) */}
        <div className="w-full lg:w-[45%] flex flex-col relative shrink-0 h-[35vh] lg:h-auto">
          <div className="absolute inset-0 z-0">
             <img 
               src={course.thumbnail || '/assets/images/course.png'} 
               alt={course.title} 
               className="w-full h-full object-cover"
               onError={(e) => { 
                 const target = e.target as HTMLImageElement;
                 target.onerror = null; 
                 target.src = "/assets/images/course.png"; 
               }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
          </div>

          <div className="relative z-10 flex flex-col h-full p-6 lg:p-8 justify-end">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#ff6b00] text-white text-[11px] font-[800] px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {course.category}
              </span>
              <span className="bg-white text-[#0a2458] text-[11px] font-[800] px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                {course.language}
              </span>
            </div>
            <h2 className="text-3xl font-[800] text-white leading-tight mb-6">
              {course.title}
            </h2>

            <div className="hidden lg:block">
              <h4 className="text-[12px] font-[800] text-white/70 uppercase tracking-widest mb-4">What You Will Get</h4>
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-[#ff6b00]" strokeWidth={2.5} />
                    <span className="text-white font-[600] text-[14px]">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (55%) */}
        <div className="w-full lg:w-[55%] bg-white flex flex-col relative h-[55vh] lg:h-auto">
          {/* Desktop Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-[#fffaf6] border border-[#f3e5d8] hover:bg-[#ff6b00] text-[#64748b] hover:text-white rounded-full hidden lg:flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <X size={24} />
          </button>

          <div className="flex-grow p-6 lg:p-8 overflow-y-auto modal-scrollbar flex flex-col">
            <div className="lg:pr-16">
              <h4 className="text-[13px] font-[800] text-[#ff6b00] uppercase tracking-widest mb-4">Course Overview</h4>
              <p className="text-[#64748b] text-[14px] leading-[1.7] font-medium mb-6">
                {course.description || "Comprehensive preparation curriculum designed by expert educators. This course provides structured learning, continuous practice, and in-depth performance analysis to ensure maximum exam readiness."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-[#fffaf6] border border-[#f3e5d8] flex items-center justify-center text-[#ff6b00] shrink-0">
                  <Globe size={20} />
                </div>
                <div className="pt-0.5">
                  <p className="text-[11px] font-[800] text-[#64748b] uppercase tracking-wider mb-1">Language</p>
                  <p className="text-[14px] font-[800] text-[#0a2458]">{course.language}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-[#fffaf6] border border-[#f3e5d8] flex items-center justify-center text-[#ff6b00] shrink-0">
                  <Clock size={20} />
                </div>
                <div className="pt-0.5">
                  <p className="text-[11px] font-[800] text-[#64748b] uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-[14px] font-[800] text-[#0a2458]">300+ Hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-[#fffaf6] border border-[#f3e5d8] flex items-center justify-center text-[#ff6b00] shrink-0">
                  <Calendar size={20} />
                </div>
                <div className="pt-0.5">
                  <p className="text-[11px] font-[800] text-[#64748b] uppercase tracking-wider mb-1">Start Date</p>
                  <p className="text-[14px] font-[800] text-[#0a2458]">{course.startDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-[#fffaf6] border border-[#f3e5d8] flex items-center justify-center text-yellow-500 shrink-0">
                  <Star size={20} className="fill-yellow-500" />
                </div>
                <div className="pt-0.5">
                  <p className="text-[11px] font-[800] text-[#64748b] uppercase tracking-wider mb-1">Rating</p>
                  <p className="text-[14px] font-[800] text-[#0a2458]">4.9 (12k+ reviews)</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-[11px] font-[800] text-[#64748b] uppercase tracking-widest mb-4">Subjects Covered</h4>
              <div className="flex flex-wrap gap-2.5">
                {subjects.map((subject) => (
                  <span key={subject} className="px-3 py-1.5 bg-[#fffaf6] border border-[#f3e5d8] text-[#ff6b00] rounded-full text-xs font-[700]">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile-only "What you will get" */}
            <div className="lg:hidden mb-6">
              <h4 className="text-[11px] font-[800] text-[#64748b] uppercase tracking-widest mb-4">What You Will Get</h4>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#ff6b00]" strokeWidth={2.5} />
                    <span className="text-[#0a2458] font-[600] text-[14px]">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-[#f3e5d8]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  {course.discount && (
                    <span className="inline-block bg-[#22c55e]/10 text-[#22c55e] text-[11px] font-[800] px-3 py-1 rounded-md mb-2 w-max uppercase tracking-wider">
                      {course.discount}
                    </span>
                  )}
                  <div className="flex items-baseline gap-3">
                    <span className="text-[32px] font-[800] text-[#0a2458] leading-none">{course.price}</span>
                    {course.originalPrice && course.originalPrice !== course.price && (
                      <span className="text-[18px] font-[700] text-[#64748b] line-through">{course.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  className="flex-1 h-[50px] rounded-[14px] bg-gradient-to-r from-[#ff8a33] to-[#ff6b00] hover:from-[#ff6b00] hover:to-[#e45e00] text-white font-[700] text-[14px] flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(255,107,0,0.2)] hover:-translate-y-[2px] transition-all duration-300"
                  onClick={() => handleAction(true)}
                >
                  <ShoppingCart size={20} />
                  {actionText || 'Buy Now'}
                </button>
                <button 
                  className="flex-1 h-[50px] rounded-[14px] bg-white border-2 border-[#ff6b00] text-[#ff6b00] font-[700] text-[14px] hover:bg-[#fffaf6] transition-colors flex items-center justify-center"
                  onClick={() => { handleAction(false); alert("Added to Cart"); }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

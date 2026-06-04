import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Globe } from 'lucide-react';
import type { DashboardCourse } from '../../config/studentData';
import { useCartStore } from '../../store/useCartStore';

interface CourseCardProps {
  course: DashboardCourse;
  onViewDetails?: (course: DashboardCourse) => void;
  onStartLearning?: (course: DashboardCourse) => void;
  actionText?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onViewDetails, onStartLearning, actionText }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addToCart);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (actionText === 'Enroll Now' || actionText === 'Buy Now') {
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        originalPrice: course.originalPrice || '',
        image: course.thumbnail || '/assets/images/course.png',
        category: course.category
      });
      navigate('/dashboard/cart');
    } else {
      onStartLearning?.(course);
    }
  };

  return (
    <article className="group bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(255,107,0,0.12)] border border-[#f1f5f9] hover:border-[#ff6b00]/30 flex flex-col h-full cursor-pointer" onClick={() => onViewDetails?.(course)}>
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={course.thumbnail || '/assets/images/course.png'} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { 
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = "/assets/images/course.png"; 
          }}
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="bg-[#ff6b00] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-xl font-bold text-[#071b4d] mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-[#ff6b00] transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
          <div className="flex items-center gap-1.5">
            <BookOpen size={16} className="text-[#ff6b00]" />
            <span className="font-medium">{course.lessons}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe size={16} className="text-[#ff6b00]" />
            <span className="font-medium">{course.language}</span>
          </div>
        </div>

        <div className="mt-auto border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#071b4d]">{course.price}</span>
                {course.originalPrice && course.originalPrice !== course.price && (
                  <span className="text-sm font-bold text-gray-400 line-through">{course.originalPrice}</span>
                )}
              </div>
            </div>
            {course.discount && (
              <span className="bg-[#fff1e7] text-[#ff6b00] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                {course.discount}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); onViewDetails?.(course); }}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-100 text-gray-600 font-bold text-sm hover:border-[#ff6b00] hover:text-[#ff6b00] transition-colors"
            >
              Details
            </button>
            <button 
              onClick={handleAction}
              className="flex-1 py-3 px-4 rounded-xl bg-[#ff6b00] hover:bg-[#e65c00] text-white font-bold text-sm shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1"
            >
              {actionText || 'Start Learning'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

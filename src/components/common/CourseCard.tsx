import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import type { CommonCourse } from '../../types/entities';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/useCartStore';

interface CourseCardProps {
  course: CommonCourse;
  showExplore?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, showExplore = true }) => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const openAuthModal = useAuthStore(state => state.openAuthModal);
  const addToCart = useCartStore(state => state.addToCart);

  const handleAction = () => {
    if (!isLoggedIn) {
      openAuthModal();
    } else {
      addToCart({
        id: course.id?.toString() || Math.random().toString(),
        title: course.title,
        // Fallbacks for data shape differences
        price: (course as any).price || '₹4,999',
        originalPrice: (course as any).originalPrice || '₹8,000',
        image: course.image.replace(/^\.\//, '/'),
        category: course.audience || 'Course'
      });
      navigate('/dashboard/cart');
    }
  };

  return (
    <article className="bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-[#f1f5f9] flex flex-col h-full">
      <div className="relative h-[100px] overflow-hidden">
        {course.badge && (
          <div className="absolute top-2 left-3 z-10 bg-[var(--color-primary)] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
            {course.badge}
          </div>
        )}
        <img 
          src={course.image.replace(/^\.\//, '/')} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow bg-white">
        <h3 className="text-base font-bold text-[var(--color-text-main)] mb-2 line-clamp-2 min-h-[3rem]">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-xs mb-4">
          <Users size={14} />
          <span>{course.audience}</span>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-2">
            {showExplore && (
              <Button 
                variant="outline" 
                className="flex-1 py-1.5 h-9 text-[10px]"
                onClick={() => course.id && navigate(`/courses/${course.id}`)}
              >
                EXPLORE
              </Button>
            )}
            
            <Button 
              variant="solid" 
              className="flex-1 py-1.5 h-9 text-[10px] shadow-md shadow-blue-500/10"
              onClick={handleAction}
            >
              {isLoggedIn ? 'ENROLL NOW' : 'BUY NOW'}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, /* Monitor, */ BookOpen, Clock } from 'lucide-react';
import type { Course } from '../../types/courses';
import { Button } from '../ui/Button';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const discountAmount = course.originalPrice - course.price;
  const discountPercentage = Math.round((discountAmount / course.originalPrice) * 100);

  return (
    <div className="bg-white rounded-[24px] border border-[#f5e6d7] shadow-sm hover:shadow-[0_25px_50px_rgba(255,107,0,0.15)] hover:border-[#ff6b00]/30 hover:-translate-y-[10px] transition-all duration-[400ms] overflow-hidden flex flex-col h-full group">
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-[400ms]"
        />
        <div className="absolute top-2 left-3 flex flex-wrap gap-2">
          <span className="bg-[#ff6b00] text-white text-[9px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-2 flex flex-col flex-grow bg-gray-50">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3rem]">
          {course.title}
        </h3>

        <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mb-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={14} className="text-[#ff6b00]" />
            <span className="text-xs">{course.target}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BookOpen size={14} className="text-[#ff6b00]" />
            <span className="text-xs">{course.language}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={14} className="text-[#ff6b00]" />
            <span className="text-xs group-hover:text-[#ff6b00] transition-colors">{course.startDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-[#fff1e7] text-[#ff6b00] text-[9px] font-bold px-2 py-0.5 rounded-md">
            {course.lessonsCount}
          </span>
        </div>

        <div className="mt-auto border-t border-gray-50">
          <div className="flex items-end gap-3 mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
              <span className="text-xl font-black text-gray-900">₹{course.price.toLocaleString()}</span>
            </div>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-lg mb-0.5">
              {discountPercentage}% OFF
            </span>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 rounded-xl h-10 text-xs bg-transparent border-none text-[#ff6b00] font-[700] hover:bg-[#fff7f1] hover:translate-x-1 transition-all duration-300"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              Details
            </Button>
            <Button 
              variant="solid" 
              className="flex-1 rounded-xl h-10 text-xs bg-[#ff6b00] hover:bg-[#e45e00] text-white border-none shadow-md shadow-orange-500/20 transition-all"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
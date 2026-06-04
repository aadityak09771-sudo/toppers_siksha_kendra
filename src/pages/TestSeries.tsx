import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentDashboardLayout } from '../layouts/StudentDashboardLayout';
import { FileText } from 'lucide-react';
import { TEST_SERIES_DATA } from '../config/testSeriesData';
import { TestSeriesCard } from '../components/dashboard/TestSeriesCard';
import { CourseDetailsModal } from '../components/dashboard/CourseDetailsModal';
import type { DashboardCourse } from '../config/studentData';
import type { TestSeries as TestSeriesType } from '../config/testSeriesData';
import { useCartStore } from '../store/useCartStore';

export const TestSeries: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<DashboardCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);

  const filteredSeries = TEST_SERIES_DATA.filter(series => 
    series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    series.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (series: TestSeriesType) => {
    const mappedCourse: DashboardCourse = {
      id: series.id.toString(),
      title: series.title,
      category: series.category,
      language: "English",
      target: series.category,
      startDate: "Immediate Access",
      discount: series.discount,
      lessons: `${series.tests} Tests`,
      price: `₹${series.price}`,
      originalPrice: `₹${series.oldPrice}`,
      thumbnail: series.image,
      description: `Comprehensive test series for ${series.category} covering ${series.syllabus} with over ${series.questions} highly curated questions to boost your exam readiness.`,
      highlights: [
        `${series.tests} Full-length & Part Tests`,
        `${series.questions} Practice Questions`,
        "Detailed Performance Analytics",
        "All India Ranking"
      ],
      subjects: [series.syllabus]
    };
    setSelectedCourse(mappedCourse);
    setIsModalOpen(true);
  };

  const handleBuyNow = (series: TestSeriesType) => {
    setIsModalOpen(false);
    addToCart({
      id: `ts_${series.id}`,
      title: series.title,
      price: `₹${series.price}`,
      originalPrice: `₹${series.oldPrice}`,
      image: series.image,
      category: series.category
    });
    navigate('/dashboard/cart');
  };

  return (
    <StudentDashboardLayout 
      searchQuery={searchQuery} 
      onSearchChange={setSearchQuery}
    >
      <div className="space-y-12 pt-[30px]">
        
        {/* Header Section */}
        <section>
          <div className="pt-[50px] flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2 text-[#ff6b00] font-black uppercase tracking-[0.2em] text-[10px]">
              <FileText size={14} />
              Assessments
            </div>
            <h2 className="text-3xl font-black text-[#071b4d] tracking-tight">
              Popular <span className="text-[#ff6b00]">Test Series</span>
            </h2>
            <p className="text-gray-500 font-medium">
              Assess your preparation and improve your performance
            </p>
          </div>
        </section>

        {/* Grid Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSeries.map((series) => (
              <TestSeriesCard 
                key={series.id} 
                series={series}
                onViewDetails={handleViewDetails}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </section>

      </div>

      <CourseDetailsModal 
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartLearning={(course) => navigate(`/courses/${course.id}`)}
        actionText="Buy Now"
      />
    </StudentDashboardLayout>
  );
};
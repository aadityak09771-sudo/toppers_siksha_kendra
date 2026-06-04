import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, TrendingUp, Target, ShieldCheck } from 'lucide-react';
import { Skeleton } from '../ui/Skeleton/Skeleton';
import { useAuthStore } from '../../store/useAuthStore';
import { CourseDetailsModal } from '../dashboard/CourseDetailsModal';
import type { DashboardCourse } from '../../config/studentData';
import { useCartStore } from '../../store/useCartStore';
import './CourseDiscovery.css';

interface ApiCourse {
  course_id: number;
  course_name: string;
  course_desc: string | null;
  board: string;
  language: string;
  course_price: number;
  discounted_price: number;
  course_image: string | null;
  start_date: string | null;
  batch_id: number | null;
  batch_name: string | null;
}

interface DiscoveryCourse {
  id: number;
  subject: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  discountPercentage?: number;
  image: string;
  buttonText: string;
  lessons: string;
  duration: string;
  language?: string;
  startDate?: string;
}

interface CourseCardProps extends DiscoveryCourse {
  onViewDetails: (course: DiscoveryCourse) => void;
}

const CourseCard: React.FC<CourseCardProps> = (props) => {
  const { id, subject, title, description, price, originalPrice, discountPercentage, image, /* buttonText, */ lessons, duration, onViewDetails } = props;
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const openAuthModal = useAuthStore(state => state.openAuthModal);
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addToCart);

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      openAuthModal();
    } else {
      addToCart({
        id: id.toString(),
        title: title,
        price: price,
        originalPrice: originalPrice,
        image: image,
        category: subject
      });
      navigate('/dashboard/cart');
    }
  };

  const handleDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    onViewDetails(props);
  };

  return (
    <div className="premium-course-card">
      <div className="course-image-wrapper">
        <img 
          src={image} 
          alt={title} 
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x250/f3f4f6/a1a1aa?text=Course+Image'; }}
        />
      </div>
      <div className="course-content">
        <h3>{title}</h3>
        <p>{description}</p>
        
        <div className="course-meta">
          <span>{lessons}</span>
          <span>{duration}</span>
        </div>

        <div className="course-price-row">
          <span className="price">{price}</span>
          {originalPrice && originalPrice !== price && (
            <span className="old-price">{originalPrice}</span>
          )}
          {discountPercentage && discountPercentage > 0 && (
            <span className="discount">{discountPercentage}% OFF</span>
          )}
        </div>

        <div className="course-actions">
          <button className="details-btn" onClick={handleDetails}>Details</button>
          <button className="buy-btn" onClick={handleBuy}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

const CourseCardSkeleton: React.FC = () => (
  <div className="premium-course-card">
    <div className="course-image-wrapper">
      <Skeleton width="100%" height="100%" />
    </div>
    <div className="course-content">
      <Skeleton variant="text" width="80%" height={24} className="mb-2" />
      <Skeleton variant="text" width="100%" height={16} className="mb-1" />
      <Skeleton variant="text" width="90%" height={16} className="mb-4" />
      <div className="course-price-row">
        <Skeleton variant="text" width={60} height={24} />
        <Skeleton variant="text" width={40} height={16} />
      </div>
      <div className="course-actions">
        <Skeleton variant="rectangular" width="100%" height={40} className="rounded flex-1" />
        <Skeleton variant="rectangular" width="100%" height={40} className="rounded flex-1" />
      </div>
    </div>
  </div>
);

export const CourseDiscovery: React.FC = () => {
  const [courses, setCourses] = useState<DiscoveryCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<DashboardCourse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiscoveryData = async () => {
      try {
        setIsLoading(true);
        // Mock API call simulation
        await new Promise(resolve => setTimeout(resolve, 1800));

        const mockCoursesResponse = {
          "success": true,
          "data": [
            {
              "course_id": 2,
              "course_name": "Social Science by ABC",
              "course_desc": null,
              "board": "CBSE Science",
              "language": "en",
              "course_price": 0,
              "discounted_price": 0,
              "course_image": null,
              "start_date": null,
              "batch_id": null,
              "batch_name": null
            },
            {
              "course_id": 1,
              "course_name": "Maths By The Kushwaha Sir",
              "course_desc": "Academics for class 9th ",
              "board": "CBSE Science",
              "language": "en",
              "course_price": 1200,
              "discounted_price": 999,
              "course_image": null,
              "start_date": "2026-05-16T12:00:00",
              "batch_id": 1,
              "batch_name": "Morning Batch"
            },
            {
              "course_id": 3,
              "course_name": "English Grammar Essentials",
              "course_desc": "Complete grammar rules for class 10th",
              "board": "CBSE Arts",
              "language": "en",
              "course_price": 999,
              "discounted_price": 499,
              "course_image": null,
              "start_date": null,
              "batch_id": null,
              "batch_name": null
            },
            {
              "course_id": 4,
              "course_name": "General Knowledge Boost",
              "course_desc": "Current affairs and history concepts",
              "board": "General",
              "language": "hi",
              "course_price": 499,
              "discounted_price": 0,
              "course_image": null,
              "start_date": null,
              "batch_id": null,
              "batch_name": null
            }
          ]
        };

        const imagePlaceholders = [
          "/assets/images/courses/science-course.jpg",
          "/assets/images/courses/maths-course.jpg",
          "/assets/images/courses/english-course.jpg",
          "/assets/images/courses/gk-course.jpg"
        ];

        const transformedCourses: DiscoveryCourse[] = mockCoursesResponse.data.map((course: ApiCourse, index) => {
          const discountPercentage = course.course_price > 0 && course.discounted_price < course.course_price
            ? Math.round(((course.course_price - course.discounted_price) / course.course_price) * 100)
            : undefined;

          return {
            id: course.course_id,
            subject: course.board,
            title: course.course_name,
            description: course.course_desc || `Complete ${course.board} preparation in ${course.language === 'en' ? 'English' : 'Hindi'}.`,
            price: course.discounted_price === 0 ? "Free" : `₹${course.discounted_price}`,
            originalPrice: course.course_price === 0 ? undefined : `₹${course.course_price}`,
            discountPercentage,
            image: course.course_image || imagePlaceholders[index % imagePlaceholders.length],
            buttonText: "Enroll Now →",
            lessons: "120+ Lessons",
            duration: "6 Months",
            language: course.language === 'en' ? 'English' : 'Hindi',
            startDate: course.start_date ? new Date(course.start_date).toLocaleDateString() : 'Self Paced'
          };
        });

        setCourses(transformedCourses);
      } catch (error) {
        console.error("Error fetching discovery data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscoveryData();
  }, []);

  const handleViewDetails = (course: DiscoveryCourse) => {
    const dashboardCourse: DashboardCourse = {
      id: course.id.toString(),
      title: course.title,
      category: course.subject,
      language: course.language || "English",
      thumbnail: course.image,
      target: course.subject,
      lessons: course.lessons,
      price: course.price,
      originalPrice: course.originalPrice && course.originalPrice !== course.price ? course.originalPrice : "",
      discount: course.discountPercentage ? `${course.discountPercentage}% OFF` : "",
      description: course.description,
      startDate: course.startDate || "Self Paced",
      subjects: [course.subject],
      highlights: [
        "Expert Faculty",
        "Comprehensive Syllabus Coverage",
        "Regular Mock Tests",
        "24/7 Doubt Resolution"
      ]
    };
    setSelectedCourse(dashboardCourse);
    setIsModalOpen(true);
  };

  const handleStartLearning = (course: DashboardCourse) => {
    setIsModalOpen(false);
    navigate(`/courses/${course.id}`);
  };

  return (
    <section className="course-discovery-section">
      <div className="container">
        <div className="course-badge">
          ⭐ TOP PICKS
        </div>

        <div className="course-header">
          <div>
            <h2 className="course-main-title">
              Popular <span>Courses</span>
            </h2>
            <p className="course-subtitle">Join thousands of learners in our most loved courses.</p>
            <p className="course-subtitle">Learn, practice and achieve your goals.</p>
          </div>
          <Link to="/courses" className="view-all-btn">
            View All Courses →
          </Link>
        </div>
        
        <div className="course-grid">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
          ) : (
            courses.map((course, index) => (
              <CourseCard key={index} {...course} onViewDetails={handleViewDetails} />
            ))
          )}
        </div>

        <div className="course-features-strip">
          <div className="feature-item">
            <BookOpen />
            <div>
              <h4>Quality Content</h4>
              <p>Curated by experts and updated regularly</p>
            </div>
          </div>
          <div className="feature-item">
            <TrendingUp />
            <div>
              <h4>Learn at Your Pace</h4>
              <p>Study anytime with lifetime access</p>
            </div>
          </div>
          <div className="feature-item">
            <Target />
            <div>
              <h4>Exam Focused</h4>
              <p>Concepts, practice & tests</p>
            </div>
          </div>
          <div className="feature-item">
            <ShieldCheck />
            <div>
              <h4>Trusted By Students</h4>
              <p>Join thousands of learners</p>
            </div>
          </div>
        </div>
      </div>

      <CourseDetailsModal 
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartLearning={handleStartLearning}
        actionText="Enroll Now"
      />
    </section>
  );
};

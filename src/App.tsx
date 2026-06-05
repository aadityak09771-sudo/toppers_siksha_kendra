import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { CourseListing } from './pages/CourseListing';
import { BoardSelection } from './pages/BoardSelection';
import { GoalSelection } from './pages/GoalSelection';
import { Faqs } from './pages/Faqs';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { LearningRoom } from './pages/LearningRoom';
import { MyCourses } from './pages/MyCourses';
import { MyProfile } from './pages/MyProfile';
import { Library } from './pages/Library';
import { MyPurchases } from './pages/MyPurchases';
import { DashboardCourses } from './pages/DashboardCourses';
import { TestSeries } from './pages/TestSeries';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { StudentDashboardLayout } from './layouts/StudentDashboardLayout';
/* import { PublicRoute } from './components/common/PublicRoute'; */
import { PrivateRoute } from './components/common/PrivateRoute';
import { ScrollToTop } from './utils/ScrollToTop';
import { AuthModal } from './components/common/AuthModal/AuthModal';
import { CourseLearningPage } from './components/dashboard/CourseLearningPage';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AuthModal />
      <Routes>
        {/* Standalone Pages (No Main Header/Footer) */}
        <Route
          path="/student/course/:courseId/learn"
          element={<PrivateRoute><CourseLearningPage /></PrivateRoute>}
        />

        {/* Main Layout Pages */}
        <Route path="*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/course-listing" element={<CourseListing />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/select-goal" element={<GoalSelection />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<PrivateRoute><MyCourses /></PrivateRoute>} />
              <Route path="/library" element={<PrivateRoute><Library /></PrivateRoute>} />
              <Route path="/my-purchases" element={<PrivateRoute><MyPurchases /></PrivateRoute>} />
              <Route path="/dashboard/courses" element={<PrivateRoute><DashboardCourses /></PrivateRoute>} />
              <Route path="/dashboard/tests" element={<PrivateRoute><TestSeries /></PrivateRoute>} />
              <Route path="/dashboard/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path="/student/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path="/dashboard/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/student/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route 
                path="/dashboard/profile" 
                element={
                  <PrivateRoute>
                    <StudentDashboardLayout searchQuery="" onSearchChange={() => {}}>
                      <MyProfile />
                    </StudentDashboardLayout>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/dashboard/about" 
                element={
                  <PrivateRoute>
                    <StudentDashboardLayout searchQuery="" onSearchChange={() => {}}>
                      <About isDashboard={true} />
                    </StudentDashboardLayout>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/dashboard/contact" 
                element={
                  <PrivateRoute>
                    <StudentDashboardLayout searchQuery="" onSearchChange={() => {}}>
                      <Contact isDashboard={true} />
                    </StudentDashboardLayout>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/dashboard/privacy" 
                element={
                  <PrivateRoute>
                    <StudentDashboardLayout searchQuery="" onSearchChange={() => {}}>
                      <Privacy />
                    </StudentDashboardLayout>
                  </PrivateRoute>
                } 
              />
              
              <Route path="/learning/:id" element={<PrivateRoute><LearningRoom /></PrivateRoute>} />
              <Route path="/category" element={<BoardSelection />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
};

export default App;

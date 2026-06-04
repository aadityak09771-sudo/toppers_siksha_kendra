import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/common/Header/Header';
import Footer from '../components/common/ExpertThoughts/Footer';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Check if the current URL belongs to the Student Dashboard
  const isDashboardRoute = 
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/learning') || 
    location.pathname.startsWith('/student') || 
    location.pathname === '/library' || 
    location.pathname === '/my-purchases';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Only hide the public Header if we are actively inside the Dashboard */}
      {!isDashboardRoute && <Header />}
      
      <main className="flex-grow">
        {children}
      </main>

      {/* Only hide the public Footer if we are actively inside the Dashboard */}
      {!isDashboardRoute && <Footer />}
    </div>
  );
};

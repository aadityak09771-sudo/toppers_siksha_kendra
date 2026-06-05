import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { Button } from '../../ui/Button';
import { Logo } from '../Logo';
import './Header.css'
import { AllCategoriesDropdown } from '../../dashboard/AllCategoriesDropdown'; 
import { LogoutModal } from '../../dashboard/LogoutModal';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const openAuthModal = useAuthStore(state => state.openAuthModal);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const logout = useAuthStore(state => state.logout);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path || (location.pathname === '/' && path === '/index.html');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
    <header className="header-public">
      <div className="container header-content">
        {/* Brand & All Categories */}
        <div className="header-logo-container">
          <Logo />
        </div>

        {/* Center/Main Navigation (Desktop) */}
        <nav className="main-nav">
          <ul className="nav-list">
            <li>
              <AllCategoriesDropdown />
            </li>
            <li>
              <Link 
                to="/" 
                className={`nav-link ${
                  isActive('/') ? 'nav-link-active' : 'nav-link-inactive'
                }`}
              >
                Home
                {isActive('/') && (
                  <span className="active-indicator" />
                )}
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${
                  isActive('/about') ? 'nav-link-active' : 'nav-link-inactive'
                }`}
              >
                About Us
                {isActive('/about') && (
                  <span className="active-indicator" />
                )}
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${
                  isActive('/contact') ? 'nav-link-active' : 'nav-link-inactive'
                }`}
              >
                Contact Us
                {isActive('/contact') && (
                  <span className="active-indicator" />
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="header-actions">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 md:gap-4 hidden sm:flex">
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 bg-gradient-to-r from-[#ff8a33] to-[#ff6b00] text-white px-5 sm:px-6 py-2.5 rounded-full font-[800] text-[13px] sm:text-sm hover:from-[#ff6b00] hover:to-[#e45e00] hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(255,107,0,0.25)] transition-all duration-300"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 sm:px-5 py-2.5 rounded-full font-[800] text-[13px] sm:text-sm hover:bg-red-100 hover:-translate-y-0.5 transition-all duration-300 border border-red-100"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:block">Log Out</span>
                </button>
              </div>
            ) : (
              <Button type="button" variant="primary" size="sm" onClick={openAuthModal} className="auth-button">
                  Login / Register
              </Button>
            )}
            <button className="mobile-menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} />
      
      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <Logo />
          <button className="close-menu" onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            <li>
              <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <AllCategoriesDropdown />
            </li>
            <li>
              <Link to="/about" className="mobile-nav-link" onClick={toggleMenu}>About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="mobile-nav-link" onClick={toggleMenu}>Contact Us</Link>
            </li>
          </ul>
          
          <div className="mobile-sidebar-actions">
            {isLoggedIn ? (
              <div className="flex flex-col gap-3 w-full">
                <Link to="/dashboard" className="w-full" onClick={toggleMenu}>
                  <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff8a33] to-[#ff6b00] text-white px-6 py-3.5 rounded-[14px] font-[800] text-[15px] hover:from-[#ff6b00] hover:to-[#e45e00] hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(255,107,0,0.25)] transition-all duration-300">
                    <LayoutDashboard size={20} />
                    <span>Go to Dashboard</span>
                  </button>
                </Link>
                <button 
                  onClick={() => { setShowLogoutModal(true); toggleMenu(); }}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-3.5 rounded-[14px] font-[800] text-[15px] hover:bg-red-100 transition-all duration-300 border border-red-100"
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <Button type="button" variant="primary" size="lg" onClick={() => { openAuthModal(); toggleMenu(); }} className="w-full">
                  Login / Register
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>

    {showLogoutModal && (
      <LogoutModal
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    )}
    </>
  );

};

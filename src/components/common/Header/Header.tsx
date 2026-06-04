import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { Button } from '../../ui/Button';
import { Logo } from '../Logo';
import './Header.css'
import { AllCategoriesDropdown } from '../../dashboard/AllCategoriesDropdown'; 

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const openAuthModal = useAuthStore(state => state.openAuthModal);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const logout = useAuthStore(state => state.logout);
  const location = useLocation();

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

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
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
              <>
                <Link to="/dashboard" className="hidden sm:block">
                  <Button type="button" variant="outline" size="sm" className="border-2 border-[#ff6b00] text-[#ff6b00] hover:bg-[#fffaf6]">
                    Dashboard
                  </Button>
                </Link>
                <Button type="button" variant="primary" size="sm" onClick={logout} className="auth-button bg-[#0a2458] hover:bg-[#071b4d]">
                  Log Out
                </Button>
              </>
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
                  <Button type="button" variant="outline" size="lg" className="w-full border-2 border-[#ff6b00] text-[#ff6b00] hover:bg-[#fffaf6] bg-white">
                    Go to Dashboard
                  </Button>
                </Link>
                <Button type="button" variant="primary" size="lg" onClick={() => { logout(); toggleMenu(); }} className="w-full bg-[#0a2458] hover:bg-[#071b4d]">
                    Log Out
                </Button>
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
  );

};

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, User, ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { STUDENT_PROFILE } from '../../config/studentProfile';
import { LogoutModal } from './LogoutModal';
import { useCartStore } from '../../store/useCartStore';

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  toggleSidebar: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  /* searchQuery, */
  /* onSearchChange, */
  toggleSidebar 
}) => {
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const cartItems = useCartStore(state => state.cartItems);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-[#eee] h-[80px]">
      <div className="px-[15px] md:px-[30px] h-full flex items-center justify-between">
        {/* Left: Hamburger & Brand */}
        <div className="flex items-center gap-[14px]">
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-[14px] cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img src="/assets/images/logo.png" alt="Logo" className="w-[45px] md:w-[55px] object-contain" onError={(e) => { e.currentTarget.src = "/assets/images/home/TKS.png" }} />
            <div className="hidden sm:flex flex-col leading-none justify-center">
              <span className="text-[12px] font-bold text-gray-500 mb-1">Topper's</span>
              <h2 className="text-[20px] md:text-[28px] font-[800] text-[#071b4d] leading-none m-0">
                Siksha<span className="text-[#ff7a21]">Kendra</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Right: Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => navigate('/dashboard/cart')} 
            className="relative p-2 text-[#5d6677] hover:bg-[#fff1e7] hover:text-[#ff6b00] rounded-full transition-colors hidden sm:block mr-2"
          >
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#ff6b00] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {cartItems.length}
              </span>
            )}
          </button>
          <div className="relative" ref={menuRef}>
            <div 
              className="flex items-center gap-3 pl-2 cursor-pointer group"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <span className="font-bold text-gray-700 hidden sm:block">{STUDENT_PROFILE.personalDetails.name}</span>
              <div className="w-12 h-12 rounded-full bg-[#ffe7d7] flex items-center justify-center text-[#ff7a21] font-bold text-lg border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                {getInitials(STUDENT_PROFILE.personalDetails.name)}
              </div>
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[110] overflow-hidden">
                <button 
                  onClick={() => {
                    navigate('/dashboard/profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={18} />
                  My Profile
                </button>
                <div className="h-px bg-gray-100 mx-2"></div>
                <button 
                  onClick={() => {
                    setShowProfileMenu(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
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

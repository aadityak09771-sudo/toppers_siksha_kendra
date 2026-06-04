import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Library, 
  ShoppingBag, 
  X,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Info,
  ShieldCheck,
  Store,
  FileText,
  Home
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { LogoutModal } from './LogoutModal';

interface StudentSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  path: string;
  subtext?: string;
  isActive?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({ isOpen, toggleSidebar }) => {
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    if (window.innerWidth < 1024) toggleSidebar();
  };
  
  const sections: SidebarSection[] = [
    {
      title: 'Learn Online',
      items: [
        { name: 'Back to Home', icon: <Home size={22} />, path: '/' },
        { name: 'My Dashboard', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
        { name: 'Library', icon: <Library size={22} />, path: '/library' },
        { name: 'My Purchases', icon: <ShoppingBag size={22} />, path: '/my-purchases' },
      ]
    },
    {
      title: 'Study Packs',
      items: [
        { name: 'Our Courses', icon: <Store size={22} />, path: '/dashboard/courses' },
        { name: 'Test Series', icon: <FileText size={22} />, path: '/dashboard/tests' },
      ]
    },
    {
      title: 'Support & Info',
      items: [
        { 
          name: 'Contact us', 
          icon: <MessageCircle size={22} />, 
          path: '/dashboard/contact',
          subtext: 'My issues'
        },
        { name: 'About us', icon: <Info size={22} />, path: '/dashboard/about' },
        { name: 'Privacy Policy', icon: <ShieldCheck size={22} />, path: '/dashboard/privacy' },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[110] lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-[80px] left-0 bottom-0 bg-[#f7f7f9] border-r border-[#eee] z-[120] w-[220px] transition-transform duration-300 transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto no-scrollbar shadow-sm lg:shadow-none flex flex-col`}>
        <style>{`
          @keyframes fadeSlide {
            from { opacity: 0; transform: translateX(-15px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .sidebar-card {
            animation: fadeSlide .4s ease forwards;
          }
          /* Completely hide the scrollbar */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>

        <div className="flex flex-col h-full p-4 md:p-[20px] overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-end mb-4">
            <button onClick={toggleSidebar} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-grow">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="px-[14px] text-[13px] font-[700] text-[#9aa3b5] uppercase tracking-[2px] mt-[24px] mb-[14px]">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) => `sidebar-card group flex items-center gap-3 px-4 h-[48px] rounded-[14px] transition-all duration-300 border-l-[4px] text-sm ${
                        isActive
                          ? 'bg-[#fff1e7] border-[#ff6b00] text-[#ff6b00] font-[700] shadow-sm'
                      : 'bg-[#f1f2f7] border-transparent text-[#5d6677] font-[600] hover:bg-[#fff9f5] hover:shadow-[0_8px_20px_rgba(255,107,0,0.12)] hover:border-[#ff6b00]/20 hover:-translate-y-[2px] hover:text-[#ff6b00]'
                      }`}
                      onClick={() => {
                        if (window.innerWidth < 1024) toggleSidebar();
                      }}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            
            {/* Mobile Profile Block */}
            <div className="lg:hidden flex items-center gap-3 px-4 py-3 mb-6 bg-white rounded-[16px] border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] cursor-pointer hover:border-[#ff6b00]/30 transition-colors" onClick={() => { navigate('/dashboard/profile'); if (window.innerWidth < 1024) toggleSidebar(); }}>
              <div className="w-10 h-10 rounded-full bg-[#ffe7d7] flex items-center justify-center text-[#ff6b00] font-bold text-lg border-2 border-white shadow-sm shrink-0">
                S
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-[800] text-[#0a2458] truncate">My Profile</span>
                <span className="text-[11px] text-[#64748b] font-medium truncate">View & Edit Settings</span>
              </div>
            </div>

            <button 
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-4 h-[48px] rounded-[14px] font-[600] bg-[#f1f2f7] text-[#5d6677] hover:bg-[#fff1e7] hover:text-[#ff4d4d] hover:shadow-[0_8px_20px_rgba(255,77,77,0.1)] hover:-translate-y-[2px] transition-all duration-300 border-l-[4px] border-transparent"
            >
              <LogOut size={22} />
              <span className="text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {showLogoutModal && (
        <LogoutModal
          onClose={() => setShowLogoutModal(false)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

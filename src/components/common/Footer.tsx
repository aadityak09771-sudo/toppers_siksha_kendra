import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, X, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo + Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-[14px]">
            <img src="/assets/images/logo.png" alt="Logo" className="w-[45px] md:w-[55px] object-contain" onError={(e) => { e.currentTarget.src = "/assets/images/home/TKS.png" }} />
            <div className="flex flex-col leading-none justify-center">
              <span className="text-[12px] font-bold text-gray-500 mb-1">Topper's</span>
              <h2 className="text-[20px] md:text-[28px] font-[800] text-[#071b4d] leading-none m-0">
                Siksha<span className="text-[#ff7a21]">Kendra</span>
              </h2>
            </div>
          </div>
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-gray-400">
              <Mail size={18} className="text-[#ff6b00]" />
              <a href="mailto:support@sikshakendra.com" className="hover:text-white transition-colors text-sm">
                contact@topperssikshakendra.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Phone size={18} className="text-[#ff6b00]" />
              <a href="tel:+919876543210" className="hover:text-white transition-colors text-sm">
                +91 9956660896 , +91 9365106332
              </a>
            </div>
            <div className="flex items-start gap-3 text-gray-400">
              <MapPin size={18} className="text-[#ff6b00] mt-1" />
              <span className="text-sm leading-relaxed">
                ,<br />Flat No. 103, 1st Floor Indradeep, Complex, 117/N/47, AVON Market, Ambedkar Nagar, Navin Nagar, Karadeo
                Kanpur, Uttar Pradesh, 208005, India
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 list-none p-0">
            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
          </ul>
        </div>

        {/* Support & Legal */}
        <div>
          <h4 className="text-lg font-bold mb-6">Support & Legal</h4>
          <ul className="space-y-4 list-none p-0">
            <li><Link to="/faqs" className="text-gray-400 hover:text-white transition-colors text-sm">FAQs</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-bold mb-6">Social Links</h4>
          <div className="flex flex-col gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff6b00]">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff6b00]">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              Facebook
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
              <Send size={20} className="text-[#ff6b00]" />
              Telegram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
              <X size={20} className="text-[#ff6b00]" />
              Twitter (X)
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Siksha Kendra. All rights reserved.</p>
      </div>
    </footer>
  );
};

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
/* import { FaFacebook, FaTwitter, FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa'; */
import './Footer.css';

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Contact Us", href: "/contact" },
  { title: "Courses", href: "/courses" },
  { title: "Study Packs", href: "/study-packs" },
  { title: "Test Series", href: "/test-series" },
  { title: "Expert Thoughts", href: "/insights" },
];

const supportLinks = [
  { title: "FAQs", href: "/faq" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms & Conditions", href: "/terms" },
  { title: "Refund Policy", href: "/refund-policy" },
  { title: "Shipping Policy", href: "/shipping-policy" },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-blob left"></div>
      <div className="footer-blob right"></div>
      <div className="footer-dots footer-dots-top"></div>
      <div className="footer-dots footer-dots-bottom"></div>

      <div className="footer-container">
        {/* Column 1: Brand */}
        <div className="footer-column footer-brand">
          <div className="flex items-center gap-[14px] mb-6">
            <img src="/assets/images/logo.png" alt="Logo" className="w-[45px] md:w-[55px] object-contain" onError={(e) => { e.currentTarget.src = "/assets/images/home/TKS.png" }} />
            <div className="flex flex-col leading-none justify-center">
              <span className="text-[12px] font-bold text-gray-500 mb-1">Topper's</span>
              <h2 className="text-[20px] md:text-[28px] font-[800] text-[#071b4d] leading-none m-0">
                Siksha<span className="text-[#ff7a21]">Kendra</span>
              </h2>
            </div>
          </div>
          <p className="footer-tagline">
            India's Trusted Learning Platform
          </p>
          <div className="footer-contact-list">
            <div className="contact-item">
              <div className="footer-contact-icon"><Mail size={16} /></div>
              <span>contact@Topperssikshakendra.com</span>
            </div>
            <div className="contact-item">
              <div className="footer-contact-icon"><Phone size={16} /></div>
              <span> +91 9956660896 , +91 9365106332</span>
            </div>
            <div className="contact-item">
              <div className="footer-contact-icon"><MapPin size={16} /></div>
              <span>Flat No. 103, 1st Floor Indradeep, Complex, 117/N/47, AVON Market, Ambedkar Nagar, Navin Nagar, Kakadeo
                Kanpur, Uttar Pradesh, 208005, India</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>
          <div className="footer-links">
            {quickLinks.map(link => (
              <a key={link.title} href={link.href} className="footer-link">{link.title}</a>
            ))}
          </div>
        </div>

        {/* Column 3: Support & Legal */}
        <div className="footer-column">
          <h3 className="footer-title">Support & Legal</h3>
          <div className="footer-links">
            {supportLinks.map(link => (
              <a key={link.title} href={link.href} className="footer-link">{link.title}</a>
            ))}
          </div>
        </div>

        {/* Column 4: Social Links */}
        {/* <div className="footer-column">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-links-list">
            <a href="#" className="social-item">
              <div className="social-icon"><FaInstagram size={18} /></div>
              <span>Instagram</span>
            </a>
            <a href="#" className="social-item">
              <div className="social-icon"><FaFacebook size={18} /></div>
              <span>Facebook</span>
            </a>
            <a href="#" className="social-item">
              <div className="social-icon"><FaTelegram size={18} /></div>
              <span>Telegram</span>
            </a>
            <a href="#" className="social-item">
              <div className="social-icon"><FaTwitter size={18} /></div>
              <span>Twitter (X)</span>
            </a>
            <a href="#" className="social-item">
              <div className="social-icon"><FaYoutube size={18} /></div>
              <span>YouTube</span>
            </a>
          </div>
        </div> */}
      </div>

      <div className="copyright-bar">
        © 2026 Topper's Siksha Kendra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
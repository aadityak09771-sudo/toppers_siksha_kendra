import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Lock, ShieldCheck, Zap, ShoppingCart, CheckCircle2, Tag } from 'lucide-react';
import { StudentDashboardLayout } from '../layouts/StudentDashboardLayout';
import { useCartStore } from '../store/useCartStore';

export const Checkout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCartStore();
  const [promoCode, setPromoCode] = useState('');

  const total = cartItems.reduce((acc, item) => {
    const priceStr = String(item.price).replace(/[^0-9]/g, '');
    return acc + (parseInt(priceStr) || 0);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <StudentDashboardLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
        <div className="max-w-[1200px] mx-auto pt-4 md:pt-8 pb-16">
          <div className="bg-white rounded-[24px] p-12 text-center shadow-sm border border-[#f3e5d8]">
            <div className="w-24 h-24 bg-[#fffaf6] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={40} className="text-[#ff6b00]" />
            </div>
            <h2 className="text-2xl font-[800] text-[#0a2458] mb-4">No courses available for checkout.</h2>
            <button 
              onClick={() => navigate('/dashboard/courses')}
              className="bg-[#ff6b00] text-white px-8 py-3.5 rounded-[14px] font-[700] hover:bg-[#e55d00] transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-1"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </StudentDashboardLayout>
    );
  }

  return (
    <StudentDashboardLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="max-w-[1200px] mx-auto pt-4 md:pt-8 pb-16">
        <h1 className="text-3xl md:text-4xl font-[800] text-[#0a2458] mb-2">Secure Checkout</h1>
        <p className="text-[#64748b] mb-10 text-sm md:text-base">Complete your purchase to start learning.</p>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SECTION (65%) */}
          <div className="w-full lg:w-[65%] space-y-6">
            
            {/* Selected Courses */}
            <div className="space-y-4">
              <h2 className="text-xl font-[800] text-[#0a2458] mb-4">Selected Courses</h2>
              {cartItems.map(item => (
                <div key={item.id} className="bg-white p-5 md:p-6 rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-[#f3e5d8] transition-all flex flex-col md:flex-row gap-6 relative group hover:-translate-y-1 hover:border-[#ff6b00]/30 hover:shadow-[0_15px_40px_rgba(255,107,0,0.08)]">
                  <div className="w-full md:w-[180px] h-[120px] shrink-0">
                    <img src={item.image || '/assets/images/course.png'} alt={item.title} className="w-full h-full object-cover rounded-xl border border-gray-100" />
                  </div>
                  <div className="flex-grow pr-0 md:pr-12">
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-block bg-[#fffaf6] border border-[#f3e5d8] text-[#ff6b00] text-[10px] font-[800] px-2.5 py-1 rounded-md uppercase tracking-wider">{item.category}</span>
                      <span className="text-xl font-[800] text-[#0a2458]">{typeof item.price === 'number' ? `₹${item.price.toLocaleString()}` : item.price}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-[800] text-[#0a2458] leading-tight mb-2">{item.title}</h3>
                    <p className="text-sm text-[#64748b] mb-4 line-clamp-2">Comprehensive curriculum designed by expert educators for ultimate exam readiness.</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {['Live Classes', 'Study Material', 'Mock Tests', 'Doubt Support'].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-[12px] font-[600] text-[#64748b]">
                          <CheckCircle2 size={16} className="text-[#22c55e]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="inline-flex bg-[#f8fafc] text-[#64748b] font-[700] text-[11px] px-3 py-1.5 rounded-lg border border-gray-100">
                      Valid for 12 Months
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo Section */}
            <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-[#f3e5d8]">
              <div className="flex items-center gap-3 mb-4">
                <Tag size={20} className="text-[#ff6b00]" />
                <h3 className="text-lg font-[800] text-[#0a2458]">Have a promo code?</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code here" 
                  className="flex-grow h-12 border border-[#e8e8e8] rounded-[12px] px-4 bg-[#f8fafc] focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 outline-none transition-all font-[600] text-gray-700 uppercase"
                />
                <button className="h-12 px-8 bg-[#0a2458] text-white rounded-[12px] font-[700] hover:bg-[#071b4d] transition-colors shadow-md">
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION (35%) */}
          <div className="w-full lg:w-[35%] space-y-6">
            
            {/* Order Summary Sticky Card */}
            <div className="sticky top-[100px]">
              <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-[#f3e5d8] mb-6">
                <h3 className="text-xl font-[800] text-[#0a2458] mb-6 border-b border-[#f3e5d8] pb-4">Order Summary</h3>
                <div className="space-y-4 mb-6 text-[#64748b] font-[600] text-[15px]">
                  <div className="flex justify-between"><span>Subtotal</span><span className="text-[#0a2458]">₹{total.toLocaleString()}</span></div>
                  <div className="flex justify-between text-[#22c55e]"><span>Discount</span><span>- ₹0</span></div>
                </div>
                <div className="border-t border-[#f3e5d8] pt-6 mb-8 flex justify-between items-end">
                  <span className="text-lg font-[800] text-[#0a2458]">Total Amount</span>
                  <span className="text-3xl font-[800] text-[#ff6b00]">₹{total.toLocaleString()}</span>
                </div>
                <button className="w-full h-14 bg-gradient-to-r from-[#ff8a33] to-[#ff6b00] text-white rounded-[14px] font-[800] text-[16px] flex items-center justify-center gap-2 shadow-[0_15px_30px_rgba(255,107,0,0.25)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,107,0,0.3)] transition-all duration-300">
                  <Lock size={18} /> Proceed to Payment
                </button>
              </div>

              <div className="text-center mb-6">
                <p className="text-[11px] font-[800] text-[#64748b] uppercase tracking-widest mb-3">Accepted Payment Methods</p>
                <div className="flex justify-center items-center gap-3">
                  <div className="w-12 h-8 bg-white border border-[#f3e5d8] rounded flex items-center justify-center shadow-sm text-[#ff6b00] font-[800] text-[10px] italic">UPI</div>
                  <div className="w-12 h-8 bg-white border border-[#f3e5d8] rounded flex items-center justify-center shadow-sm text-[#0a2458] font-[800] text-[10px] italic">VISA</div>
                  <div className="w-12 h-8 bg-white border border-[#f3e5d8] rounded flex items-center justify-center shadow-sm text-red-500 font-[800] text-[10px] italic">MC</div>
                  <div className="w-12 h-8 bg-white border border-[#f3e5d8] rounded flex items-center justify-center shadow-sm text-green-600 font-[800] text-[10px] italic">RuPay</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 items-center p-4 bg-white rounded-[16px] border border-[#f3e5d8] shadow-[0_5px_15px_rgba(0,0,0,0.02)]">
                  <div className="w-10 h-10 shrink-0 bg-[#fffaf6] rounded-full flex items-center justify-center text-[#ff6b00]"><ShieldCheck size={20} /></div>
                  <div><h4 className="font-[800] text-[#0a2458] text-[13px] mb-0.5">100% Secure Transactions</h4><p className="text-[11px] text-[#64748b] leading-tight">Your data is protected with SSL encryption.</p></div>
                </div>
                <div className="flex gap-4 items-center p-4 bg-white rounded-[16px] border border-[#f3e5d8] shadow-[0_5px_15px_rgba(0,0,0,0.02)]">
                  <div className="w-10 h-10 shrink-0 bg-[#fffaf6] rounded-full flex items-center justify-center text-[#ff6b00]"><Zap size={20} /></div>
                  <div><h4 className="font-[800] text-[#0a2458] text-[13px] mb-0.5">Instant Access</h4><p className="text-[11px] text-[#64748b] leading-tight">Get access to your course immediately after payment.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
};
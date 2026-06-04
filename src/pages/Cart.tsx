import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Lock, ShieldCheck, Headphones, CreditCard, ShoppingCart } from 'lucide-react';
import { StudentDashboardLayout } from '../layouts/StudentDashboardLayout';
import { useCartStore } from '../store/useCartStore';

export const Cart: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCartStore();

  // Convert formatted string prices (e.g. "₹4,999") to numbers for calculating the total
  const total = cartItems.reduce((acc, item) => {
    const priceStr = String(item.price).replace(/[^0-9]/g, '');
    return acc + (parseInt(priceStr) || 0);
  }, 0);

  return (
    <StudentDashboardLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="max-w-[1200px] mx-auto pt-4 md:pt-8 pb-16">
        <h1 className="text-3xl md:text-4xl font-[800] text-[#0a2458] mb-2">My Cart</h1>
        <p className="text-[#64748b] mb-10 text-sm md:text-base">Review your selected course(s) before checkout.</p>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-[24px] p-12 text-center shadow-sm border border-[#f3e5d8]">
            <div className="w-24 h-24 bg-[#fffaf6] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={40} className="text-[#ff6b00]" />
            </div>
            <h2 className="text-2xl font-[800] text-[#0a2458] mb-4">Your cart is empty</h2>
            <button 
              onClick={() => navigate('/dashboard/courses')}
              className="bg-[#ff6b00] text-white px-8 py-3.5 rounded-[14px] font-[700] hover:bg-[#e55d00] transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-1"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row gap-8">
            
            {/* Table / Item List */}
            <div className="flex-grow space-y-4 md:space-y-6">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-2 text-[#64748b] font-[700] text-[13px] uppercase tracking-wider border-b border-[#f3e5d8]">
                <div className="col-span-6">Item</div>
                <div className="col-span-3 text-center">Duration</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-1 text-right">Action</div>
              </div>
              
              {cartItems.map(item => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-4 md:p-6 rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-[#f3e5d8] transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,107,0,0.08)]">
                  <div className="col-span-1 md:col-span-6 flex gap-4 md:gap-5 items-center">
                    <img src={item.image} alt={item.title} className="w-24 h-20 md:w-28 object-cover rounded-xl shrink-0 border border-gray-100" />
                    <div>
                      <span className="inline-block bg-[#fffaf6] border border-[#f3e5d8] text-[#ff6b00] text-[10px] font-[800] px-2.5 py-1 rounded-md mb-2 uppercase tracking-wider">{item.category}</span>
                      <h3 className="text-base md:text-lg font-[800] text-[#0a2458] leading-tight mb-2">{item.title}</h3>
                      <div className="flex flex-wrap gap-2 md:gap-3 text-[11px] md:text-[12px] text-[#64748b] font-[600]">
                        <span>6 Lessons</span>
                        <span className="hidden sm:inline">•</span>
                        <span>12+ Hours Content</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-3 text-left md:text-center mt-2 md:mt-0">
                    <span className="inline-block bg-[#f8fafc] text-[#64748b] font-[700] text-[11px] md:text-xs px-3 py-1.5 rounded-lg border border-gray-100">Valid for 12 Months</span>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-between md:block text-left md:text-right">
                    <span className="md:hidden font-[800] text-[#64748b]">Price: </span>
                    <span className="text-xl font-[800] text-[#0a2458]">{typeof item.price === 'number' ? `₹${item.price.toLocaleString()}` : item.price}</span>
                  </div>
                  <div className="col-span-1 md:col-span-1 absolute md:static top-4 right-4 text-right">
                    <button onClick={() => removeFromCart(item.id)} className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors md:ml-auto">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom/Right Benefits & Checkout */}
            <div className="w-full xl:w-[380px] shrink-0 space-y-6 mt-4 xl:mt-0">
              <div className="bg-white p-6 md:p-8 rounded-[20px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-[#f3e5d8]">
                <h3 className="text-xl font-[800] text-[#0a2458] mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6 text-[#64748b] font-[600]">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="text-[#0a2458]">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#22c55e]">
                    <span>Discount</span>
                    <span>- ₹0</span>
                  </div>
                </div>
                <div className="border-t border-[#f3e5d8] pt-6 mb-8 flex justify-between items-center">
                  <span className="text-lg font-[800] text-[#0a2458]">Total</span>
                  <span className="text-3xl font-[800] text-[#ff6b00]">₹{total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => navigate('/dashboard/checkout')}
                  className="w-full h-14 bg-gradient-to-r from-[#ff8a33] to-[#ff6b00] text-white rounded-[14px] font-[800] text-[15px] flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(255,107,0,0.2)] hover:-translate-y-1 transition-all duration-300"
                >
                  <Lock size={18} /> Proceed To Checkout
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-center p-4 bg-[#fffaf6] rounded-[16px] border border-[#f3e5d8]">
                  <div className="w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center text-[#ff6b00] shadow-sm"><ShieldCheck size={20} /></div>
                  <div><h4 className="font-[800] text-[#0a2458] text-sm mb-0.5">Secure Payment</h4><p className="text-[12px] text-[#64748b]">Your payment information is safe.</p></div>
                </div>
                <div className="flex gap-4 items-center p-4 bg-[#fffaf6] rounded-[16px] border border-[#f3e5d8]">
                  <div className="w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center text-[#ff6b00] shadow-sm"><CreditCard size={20} /></div>
                  <div><h4 className="font-[800] text-[#0a2458] text-sm mb-0.5">7-Day Money Back</h4><p className="text-[12px] text-[#64748b]">Full refund policy.</p></div>
                </div>
                <div className="flex gap-4 items-center p-4 bg-[#fffaf6] rounded-[16px] border border-[#f3e5d8]">
                  <div className="w-10 h-10 shrink-0 bg-white rounded-full flex items-center justify-center text-[#ff6b00] shadow-sm"><Headphones size={20} /></div>
                  <div><h4 className="font-[800] text-[#0a2458] text-sm mb-0.5">24/7 Support</h4><p className="text-[12px] text-[#64748b]">We're always here to help.</p></div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </StudentDashboardLayout>
  );
};
import React, { useState } from 'react';
import { StudentDashboardLayout } from '../layouts/StudentDashboardLayout';
import { ShoppingBag, /* Calendar, */ Download, CheckCircle2 /*, ChevronRight, Search */ } from 'lucide-react';
/* import { DASHBOARD_COURSES } from '../config/studentData'; */

export const MyPurchases: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const purchases = [
    {
      id: 'TXN10293',
      courseId: 'b1',
      courseName: 'Arjuna JEE 2027',
      date: '12 Apr 2026',
      amount: '₹4,999',
      status: 'Success',
      paymentMethod: 'UPI',
    },
    {
      id: 'TXN10245',
      courseId: 'b2',
      courseName: 'Lakshya JEE 2027',
      date: '25 Mar 2026',
      amount: '₹5,999',
      status: 'Success',
      paymentMethod: 'Credit Card',
    }
  ];

  return (
    <StudentDashboardLayout 
      searchQuery={searchQuery} 
      onSearchChange={setSearchQuery}
    >
      <div className="space-y-12">
        {/* Header Section */}
        <section className="pt-[50px]">
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2 text-[var(--color-primary)] font-black uppercase tracking-[0.2em] text-[10px]">
              <ShoppingBag size={14} />
              Billing
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Purchases</h2>
            <p className="text-gray-500">Manage your course subscriptions and download invoices.</p>
          </div>
        </section>

        {/* Purchase History */}
        <section>
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course Name</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {purchases.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-gray-400">#{item.id}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">{item.courseName}</span>
                          <span className="text-[10px] text-gray-400 font-medium">{item.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-600">
                        {item.date}
                      </td>
                      <td className="px-8 py-6 text-sm font-black text-gray-900">
                        {item.amount}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-1.5 text-green-600">
                          <CheckCircle2 size={14} />
                          <span className="text-[10px] font-black uppercase tracking-wider">{item.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-[var(--color-primary)] rounded-xl transition-all border border-transparent hover:border-blue-100">
                          <Download size={14} />
                          <span className="text-[10px] font-black uppercase tracking-wider">Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {purchases.length === 0 && (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag size={40} />
                </div>
                <h3 className="text-xl font-black text-gray-900">No purchases yet</h3>
                <p className="text-gray-500 mt-2">When you enroll in a course, it will appear here.</p>
              </div>
            )}
          </div>
        </section>

        {/* Support Section */}
        <section className="relative overflow-hidden bg-gray-900 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl shadow-gray-950/20">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[var(--color-primary)] rounded-full blur-[100px] opacity-20" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 mx-auto md:mx-0">
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Payment Support</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black italic tracking-tight leading-tight">
                Facing issues with your <span className="text-[var(--color-primary)]">recent payment?</span>
              </h3>
              <p className="text-gray-400 font-medium text-base md:text-lg leading-relaxed">
                If your payment was deducted but the course isn't appearing, 
                our team will resolve it within 4-6 hours.
              </p>
            </div>
            
            <div className="flex flex-row items-center gap-4 w-full md:w-auto justify-center md:justify-end">
              <button className="flex-1 md:flex-none px-6 md:px-10 py-4 md:py-5 bg-[var(--color-primary)] hover:bg-blue-600 text-white rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest md:tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-1 whitespace-nowrap">
                Raise Ticket
              </button>
              <button className="flex-1 md:flex-none px-6 md:px-10 py-4 md:py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest md:tracking-[0.2em] transition-all border border-white/10 whitespace-nowrap">
                Chat
              </button>
            </div>
          </div>
        </section>
      </div>
    </StudentDashboardLayout>
  );
};

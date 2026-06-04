import React, { useState } from 'react';
import { StudentDashboardLayout } from '../layouts/StudentDashboardLayout';
import { Library as LibraryIcon, FileText, Video, Download /*, Search */ } from 'lucide-react';
import { CategoryScroller } from '../components/dashboard/CategoryScroller';

export const Library: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const resources = [
    { id: 1, title: 'Physics Formula Sheet', type: 'PDF', category: 'Class 12', size: '2.4 MB' },
    { id: 2, title: 'Organic Chemistry Basics', type: 'Video', category: 'Class 11', size: '45 mins' },
    { id: 3, title: 'Maths Mock Paper 2026', type: 'PDF', category: 'JEE', size: '1.8 MB' },
    { id: 4, title: 'English Grammar Guide', type: 'PDF', category: 'All Classes', size: '5.2 MB' },
  ];

  return (
    <StudentDashboardLayout 
      searchQuery={searchQuery} 
      onSearchChange={setSearchQuery}
    >
      <div className="space-y-12">
        {/* Header Section */}
        <section>
          <div className="pt-[50px] flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2 text-[var(--color-primary)] font-black uppercase tracking-[0.2em] text-[10px]">
              <LibraryIcon size={14} />
              Digital Library
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Free Study Resources</h2>
            <p className="text-gray-500">Master your subjects with our curated collection of free notes and videos.</p>
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Browse by Category</h3>
          </div>
          <CategoryScroller />
        </section>

        {/* Resources Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Recent Resources</h3>
            <button className="text-sm font-bold text-[var(--color-primary)] hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((res) => (
              <div key={res.id} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                <div className={`w-12 h-12 ${res.type === 'PDF' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {res.type === 'PDF' ? <FileText size={24} /> : <Video size={24} />}
                </div>
                <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{res.title}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <span>{res.category}</span>
                  <span>•</span>
                  <span>{res.size}</span>
                </div>
                <button className="w-full py-2.5 bg-gray-50 hover:bg-[var(--color-primary)] hover:text-white rounded-xl text-xs font-bold text-gray-600 transition-all flex items-center justify-center gap-2">
                  <Download size={14} />
                  Access Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-orange-50/50 rounded-[3rem] p-12 text-center border border-blue-100/50 shadow-sm">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-white text-[var(--color-primary)] rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/10 border border-blue-50">
              <LibraryIcon size={36} />
            </div>
            
            <div className="space-y-4 mb-10">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-[var(--color-primary)] text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                Coming Soon
              </span>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">Our Digital Treasure is Growing!</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Our team of expert educators is currently digitizing thousands of high-quality study materials. 
                Prepare for an unmatched learning experience.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: '1000+ Notes', color: 'bg-orange-500' },
                { label: '500+ Videos', color: 'bg-blue-500' },
                { label: '200+ Mock Tests', color: 'bg-green-500' }
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
                  <div className={`w-2 h-2 rounded-full ${badge.color} animate-pulse`} />
                  <span className="text-sm font-black text-gray-700">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </StudentDashboardLayout>
  );
};

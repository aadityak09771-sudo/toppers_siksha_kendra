import React, { useState, useMemo } from 'react';
import { StudentDashboardLayout } from '../layouts/StudentDashboardLayout';
import { Library as LibraryIcon, FileText, Video, Download, Search, Play, Clock, BookOpen, X, FolderOpen } from 'lucide-react';

const CATEGORIES = ["All", "Physics", "Chemistry", "Mathematics", "Biology", "English", "Reasoning", "Current Affairs"];

const PDF_RESOURCES = [
  { id: 1, title: "Physics Formula Sheet", class: "Class 12", category: "Physics", size: "2.4 MB", type: "pdf", url: "#" },
  { id: 2, title: "Maths Mock Paper 2026", class: "JEE", category: "Mathematics", size: "1.8 MB", type: "pdf", url: "#" },
  { id: 3, title: "English Grammar Guide", class: "All Classes", category: "English", size: "5.2 MB", type: "pdf", url: "#" },
  { id: 4, title: "Organic Chemistry Notes", class: "Class 11", category: "Chemistry", size: "3.1 MB", type: "pdf", url: "#" },
  { id: 5, title: "Current Affairs May 2026", class: "Competitive", category: "Current Affairs", size: "4.5 MB", type: "pdf", url: "#" },
  { id: 6, title: "Biology Diagram Book", class: "Class 12 / NEET", category: "Biology", size: "8.1 MB", type: "pdf", url: "#" },
];

const VIDEO_RESOURCES = [
  { id: 101, title: "Organic Chemistry Basics", class: "Class 11", category: "Chemistry", duration: "45 mins", type: "video", desc: "Understand the core concepts of organic chemistry to build a strong foundation for advanced topics.", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "/assets/images/course.png" },
  { id: 102, title: "Kinematics One Shot", class: "Class 11", category: "Physics", duration: "1h 20m", type: "video", desc: "Complete kinematics covered in a single comprehensive lecture designed for JEE/NEET preparation.", url: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "/assets/images/course.png" },
];

export const Library: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEO_RESOURCES[0] | null>(null);

  const filteredPdfs = useMemo(() => {
    return PDF_RESOURCES.filter(res => 
      (activeCategory === 'All' || res.category === activeCategory) &&
      (res.title.toLowerCase().includes(searchQuery.toLowerCase()) || res.class.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, activeCategory]);

  const filteredVideos = useMemo(() => {
    return VIDEO_RESOURCES.filter(res => 
      (activeCategory === 'All' || res.category === activeCategory) &&
      (res.title.toLowerCase().includes(searchQuery.toLowerCase()) || res.class.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, activeCategory]);

  const handleWatchVideo = (video: typeof VIDEO_RESOURCES[0]) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  return (
    <StudentDashboardLayout 
      searchQuery={searchQuery} 
      onSearchChange={setSearchQuery}
    >
      <div className="max-w-[1200px] mx-auto pt-4 md:pt-8 pb-16 space-y-12">
        
        {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-[#fffaf6] to-white border border-[#f3e5d8] rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.02)] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-10 items-center">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#ff6b00]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] bg-[#0a2458]/5 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fff1e7] rounded-full border border-[#ff6b00]/20 mb-6">
              <LibraryIcon size={16} className="text-[#ff6b00]" />
              <span className="text-[11px] font-[800] uppercase tracking-widest text-[#ff6b00]">Digital Library</span>
            </div>
            <h1 className="text-4xl md:text-[52px] font-[800] text-[#0a2458] leading-tight mb-5">
              Free Study <span className="text-[#ff6b00]">Resources</span>
            </h1>
            <p className="text-[#64748b] text-[16px] md:text-[18px] leading-[1.7] font-[500] w-full max-w-[95%]">
              Master your subjects with our curated collection of notes, PDFs, mock papers, and video lectures. Everything you need to excel, in one place.
            </p>
          </div>

          {/* CSS-based Educational Illustration */}
          <div className="relative z-10 w-full flex items-center justify-center lg:justify-end">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6b00]/20 to-[#ff8a33]/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 bg-gradient-to-b from-white to-[#fffcf9] rounded-[32px] shadow-[0_20px_50px_rgba(255,107,0,0.15)] flex items-center justify-center border border-[#ff6b00]/20 rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                <BookOpen size={64} className="text-[#ff6b00]" strokeWidth={1.5} />
              </div>
              <div className="absolute top-0 right-0 sm:-top-2 sm:-right-2 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1e3a8a] to-[#0a2458] rounded-[20px] shadow-[0_15px_30px_rgba(10,36,88,0.25)] flex items-center justify-center rotate-12 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-500 z-20 border-[3px] border-white">
                <FileText size={28} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-4 left-0 sm:-bottom-2 sm:-left-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#ff8a33] to-[#ff6b00] rounded-[20px] shadow-[0_15px_30px_rgba(255,107,0,0.25)] flex items-center justify-center -rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 z-20 border-[3px] border-white">
                <Video size={28} className="text-white" strokeWidth={1.5} />
              </div>
              {/* Decorative floating dots */}
              <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-[#22c55e] animate-bounce"></div>
              <div className="absolute bottom-8 right-8 w-5 h-5 rounded-full bg-[#3b82f6] animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* SEARCH & FILTER SECTION */}
        <section className="space-y-6">
          <div className="relative w-full max-w-2xl mx-auto md:mx-0">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search size={20} className="text-[#ff6b00]" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, topics, or subjects..." 
              className="w-full h-14 pl-14 pr-6 bg-white border border-[#f3e5d8] rounded-[20px] font-[600] text-[#1f2937] placeholder:text-[#64748b] focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-[#ff6b00]/10 shadow-[0_5px_15px_rgba(0,0,0,0.02)] transition-all"
            />
          </div>

          {/* RESOURCE CATEGORIES */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-[800] text-[13px] whitespace-nowrap transition-all duration-300 border ${
                  activeCategory === category 
                    ? 'bg-[#ff6b00] text-white border-[#ff6b00] shadow-[0_8px_20px_rgba(255,107,0,0.2)] -translate-y-1' 
                    : 'bg-white text-[#64748b] border-[#f3e5d8] hover:bg-[#fffaf6] hover:text-[#ff6b00] hover:border-[#ff6b00]/30 hover:-translate-y-1'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* EMPTY STATE */}
        {filteredPdfs.length === 0 && filteredVideos.length === 0 && (
          <div className="bg-white rounded-[24px] p-12 text-center shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-[#f3e5d8] w-full">
            <div className="w-24 h-24 bg-[#fffaf6] rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderOpen size={40} className="text-[#ff6b00]" />
            </div>
            <h2 className="text-2xl font-[800] text-[#0a2458] mb-2">No resources found</h2>
            <p className="text-[#64748b] max-w-md mx-auto">We couldn't find any resources matching your search or category. Try adjusting your filters.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-6 bg-white border-2 border-[#f3e5d8] text-[#64748b] px-6 py-2.5 rounded-[12px] font-[700] hover:bg-[#fffaf6] hover:text-[#ff6b00] hover:border-[#ff6b00]/30 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* DOWNLOAD CENTER (PDFs) */}
        {filteredPdfs.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#fff1e7] flex items-center justify-center text-[#ff6b00]"><FileText size={18} /></div>
              <h2 className="text-2xl font-[800] text-[#0a2458]">Download Center</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPdfs.map((pdf) => (
                <div key={pdf.id} className="bg-white rounded-[24px] p-6 border border-[#f3e5d8] shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,107,0,0.12)] hover:border-[#ff6b00]/30 transition-all duration-300 flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ff8a33] to-[#ff6b00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="w-14 h-14 bg-[#fffaf6] border border-[#f3e5d8] text-[#ff6b00] rounded-[16px] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#ff6b00] group-hover:text-white transition-all duration-300 shadow-sm">
                    <FileText size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[18px] font-[800] text-[#0a2458] leading-tight mb-3 group-hover:text-[#ff6b00] transition-colors line-clamp-2">{pdf.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-6 flex-wrap mt-auto">
                    <span className="inline-block bg-[#fffaf6] border border-[#f3e5d8] text-[#ff6b00] text-[10px] font-[800] px-2.5 py-1 rounded-md uppercase tracking-wider">{pdf.class}</span>
                    <span className="text-[#64748b] text-[12px] font-[600] bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">{pdf.size}</span>
                  </div>

                  <a 
                    href={pdf.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full h-[48px] bg-white border-2 border-[#f3e5d8] group-hover:border-[#ff6b00] text-[#64748b] group-hover:text-[#ff6b00] hover:!bg-[#ff6b00] hover:!text-white font-[700] text-[14px] rounded-[14px] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download size={18} />
                    Download
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RECOMMENDED VIDEOS */}
        {filteredVideos.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#fff1e7] flex items-center justify-center text-[#ff6b00]"><Play size={18} className="ml-0.5" /></div>
              <h2 className="text-2xl font-[800] text-[#0a2458]">Recommended Videos For You</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredVideos.map((video) => (
                <div key={video.id} className="flex flex-col sm:flex-row gap-6 bg-white rounded-[24px] p-5 border border-[#f3e5d8] shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,107,0,0.12)] hover:border-[#ff6b00]/30 transition-all duration-300 group cursor-pointer relative overflow-hidden" onClick={() => handleWatchVideo(video)}>
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-[#ff8a33] to-[#ff6b00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Thumbnail */}
                  <div className="w-full sm:w-[240px] h-[150px] rounded-[16px] overflow-hidden relative shrink-0 shadow-sm border border-gray-100">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = "/assets/images/course.png"; }} />
                    <div className="absolute inset-0 bg-[#0a2458]/20 group-hover:bg-[#0a2458]/10 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-[#ff6b00] shadow-[0_8px_16px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300 border border-white/50">
                        <Play size={22} className="ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-[800] px-2.5 py-1 rounded-md flex items-center gap-1.5 tracking-wider border border-white/10">
                      <Clock size={12} /> {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col py-1 pr-2 flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-block bg-[#fffaf6] border border-[#f3e5d8] text-[#ff6b00] text-[10px] font-[800] px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {video.class}
                      </span>
                      <span className="inline-block bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-[800] px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {video.category}
                      </span>
                    </div>
                    <h3 className="text-[19px] font-[800] text-[#0a2458] leading-tight mb-2 group-hover:text-[#ff6b00] transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-[14px] text-[#64748b] font-medium leading-relaxed line-clamp-2 mb-5 flex-grow">
                      {video.desc}
                    </p>
                    
                    <button className="mt-auto self-start px-6 py-2.5 bg-[#fffaf6] border-2 border-[#f3e5d8] group-hover:bg-[#ff6b00] group-hover:border-[#ff6b00] text-[#64748b] group-hover:text-white font-[700] text-[14px] rounded-[14px] flex items-center gap-2 shadow-sm transition-all duration-300">
                      <Play size={18} fill="currentColor" /> Watch Video
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* VIDEO PLAYER MODAL */}
      {videoModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-[9999] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <style>{`
            @keyframes modalEnter {
              from { opacity: 0; transform: scale(0.95) translateY(20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .animate-modal-enter { animation: modalEnter 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          `}</style>
          
          <div className="relative w-full max-w-4xl bg-[#0a2458] rounded-[24px] shadow-2xl overflow-hidden animate-modal-enter border border-white/10 flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
              <div>
                <span className="bg-[#ff6b00] text-white text-[10px] font-[800] px-2 py-1 rounded uppercase tracking-wider mr-3">{selectedVideo.class}</span>
                <h3 className="text-white font-[700] inline-block">{selectedVideo.title}</h3>
              </div>
              <button 
                onClick={() => setVideoModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Video Player Area */}
            <div className="w-full aspect-video bg-black relative">
              <video 
                src={selectedVideo.url} 
                controls 
                autoPlay 
                className="w-full h-full"
              />
            </div>
            
          </div>
        </div>
      )}

    </StudentDashboardLayout>
  );
};

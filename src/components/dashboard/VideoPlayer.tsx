import React from 'react';

interface VideoPlayerProps {
  url: string;
  title: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => (
  <div className="w-full bg-black rounded-[20px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] aspect-video relative group">
    <video 
      controls 
      className="w-full h-full object-contain"
      poster="/assets/images/course.png"
      src={url}
    >
      Your browser does not support the video tag.
    </video>
    <div className="absolute top-0 left-0 right-0 p-8 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <h2 className="text-white font-black text-lg md:text-xl drop-shadow-lg truncate">{title}</h2>
    </div>
  </div>
);
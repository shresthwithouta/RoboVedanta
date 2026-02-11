'use client';

import { Play, GraduationCap, Calendar, Clock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function VideoCard({ video, details, idx }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [player, setPlayer] = useState(null);
  const [progress, setProgress] = useState(0);
  const displayTitle = video.title || details.title;
  
  // Smart extraction
  let name = '';
  let course = 'Robotics Mentor';
  const fullTitle = displayTitle;
  
  if (fullTitle.includes('Name:')) {
    const parts = fullTitle.split('Course:');
    name = parts[0].replace('Name:', '').trim();
    if (parts[1]) {
      course = parts[1].split(',')[0].split('Session:')[0].trim();
    }
  } else if (fullTitle.includes('(')) {
    name = fullTitle.split('(')[0].trim();
    course = fullTitle.split('(')[1].split(')')[0];
  } else {
    name = fullTitle.split(',')[0].trim();
    if (fullTitle.includes(',')) {
      course = fullTitle.split(',')[1].trim();
    }
  }

  // Effect to handle progress polling
  useEffect(() => {
    let interval;
    if (player && isLoaded) {
      interval = setInterval(() => {
        try {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          if (duration > 0) {
            setProgress((currentTime / duration) * 100);
          }
        } catch (e) {
          // Player might not be ready yet
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [player, isLoaded]);

  // Effect to initialize player when facade is clicked
  useEffect(() => {
    if (isLoaded && !player && window.YT && window.YT.Player) {
      const newPlayer = new window.YT.Player(`player-${video.id}`, {
        videoId: video.id,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          showinfo: 0,
          disablekb: 1,
          origin: window.location.origin,
          widget_referrer: window.location.origin
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            setPlayer(event.target);
          }
        }
      });
    }
  }, [isLoaded, video.id, player]);

  return (
    <motion.div 
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       transition={{ delay: idx * 0.1 }}
       className="group relative bg-primary-600 border border-accent-500/20 
                  rounded-4xl overflow-hidden transition-all duration-500 
                  hover:border-accent-500/50 hover:shadow-2xl hover:shadow-accent-500/10"
    >
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-accent-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative aspect-video w-full bg-black overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 shadow-inner">
        {!isLoaded ? (
          <div 
            className="absolute inset-0 cursor-pointer group/facade"
            onClick={() => setIsLoaded(true)}
          >
            <img 
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt={displayTitle}
              className="w-full h-full object-cover opacity-80 group-hover/facade:opacity-100 transition-opacity duration-500 grayscale-20 group-hover:grayscale-0"
              onError={(e) => {
                e.target.src = details.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-accent-500 text-primary-900 flex items-center justify-center shadow-2xl group-hover/facade:scale-110 group-hover/facade:bg-white transition-all duration-300">
                <Play size={32} fill="currentColor" strokeWidth={0} className="ml-1" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/90 to-transparent text-center">
              <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover/facade:opacity-100 transition-opacity duration-300">
                 Click to launch mentor session
              </p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full group/player overflow-hidden">
            <div id={`player-${video.id}`} className="w-full h-full" />
            
            {/* Click Shield / Custom Overlays */}
            <div className="absolute inset-0 bg-transparent flex flex-col justify-end opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute top-0 inset-x-0 h-16 bg-linear-to-b from-black/80 to-transparent pointer-events-auto" />
              
              <div className="p-4 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-auto">
                <div className="flex flex-col gap-3">
                  <div className="relative h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-accent-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "linear" }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent-400">Exclusive Mentor Content</span>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-60">RoboVedanta TV</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-8 md:p-10 space-y-6 bg-linear-to-b from-primary-600/50 to-primary-950 text-center">
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-heading font-black text-white group-hover:text-accent-400 transition-colors duration-300 leading-tight">
            {name}
          </h3>
          <div className="flex justify-center flex-wrap gap-4 pt-2">
             <div className="flex items-center gap-2 text-white/70 text-xs font-black uppercase tracking-[0.2em] bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              <GraduationCap size={16} className="text-accent-500" />
              {course}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center justify-center gap-6">
             <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                <span className="text-xs text-white/40 font-black uppercase tracking-[0.3em]">Educator Profile</span>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Shine */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-transparent via-accent-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
    </motion.div>
  );
}

export default function TeacherVideos({ videos }) {
  const [videoDetails, setVideoDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVideoData() {
      if (!videos || videos.length === 0) {
        setIsLoading(false);
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      if (!apiKey) {
        console.warn('YouTube API Key not found');
        setIsLoading(false);
        return;
      }

      const videoIds = videos.map(v => v.id).join(',');
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoIds}&part=snippet,contentDetails&key=${apiKey}`
        );
        const data = await response.json();
        
        const details = {};
        data.items?.forEach(item => {
          details[item.id] = {
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url,
            duration: item.contentDetails.duration
          };
        });
        setVideoDetails(details);
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideoData();

    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, [videos]);

  // Handle Player Initialization when a user clicks play
  useEffect(() => {
    const activeVideos = videos.filter(v => document.getElementById(`player-${v.id}`));
    
    if (activeVideos.length > 0 && window.YT && window.YT.Player) {
      activeVideos.forEach(v => {
        new window.YT.Player(`player-${v.id}`, {
          videoId: v.id,
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            showinfo: 0,
            disablekb: 1,
            origin: window.location.origin,
            widget_referrer: window.location.origin
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
            }
          }
        });
      });
    }
  }, [videos, isLoading]); // Re-run when videos/loading state changes (handles the facade-to-player swap)

  if (!videos || videos.length === 0) return null;

  return (
    <section id="impact-gallery" className="px-4 pb-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-xs font-black uppercase tracking-[0.2em] mx-auto">
              <Play size={14} fill="currentColor" />
              Mentor Spotlight
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tighter">
              Meet Your <span className="text-shimmer">Educator</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
              Watch an exclusive session from your mentor to explore their teaching methodology and advanced robotics expertise.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-accent-500" size={40} />
            <p className="text-white/40 font-black uppercase tracking-widest text-xs">Loading Mentor Sessions...</p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${videos.length === 1 ? 'max-w-2xl mx-auto' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-8`}>
            {videos.map((video, idx) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                details={videoDetails[video.id] || {}} 
                idx={idx} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

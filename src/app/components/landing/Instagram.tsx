import React, { useRef, useEffect, forwardRef } from 'react';

// ------------------------------
// Type Definitions (Full Type Safety)
// ------------------------------
export interface ReelProps {
  id: string;
  videoUrl: string;
  profilePic: string;
  username: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  saves: string;
  audioCredit: string;
}

// ------------------------------
// Reusable Reel Item Component
// ------------------------------
const ReelItem = forwardRef<HTMLDivElement, ReelProps>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const actionBarRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="reel-item relative h-screen w-full">
      {/* Reel Video */}
      <video
        ref={videoRef}
        className="aw-full h-[80%] object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={props.videoUrl} type="video/mp4" />
      </video>

      {/* Readability Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/85 to-transparent" />

      {/* Right Action Bar */}
      <div
        ref={actionBarRef}
        className="action-bar absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-6 opacity-0 translate-x-4 transition-all duration-500 ease-out"
      >
        {/* Like Button (Pure Tailwind SVG) */}
        <div className="flex flex-col items-center group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            stroke="currentColor"
            fill="transparent"
            className="w-8 h-8 group-hover:fill-rose-500 group-hover:stroke-rose-500 transition-all duration-300"
            aria-label="Like this reel"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
          <span className="text-sm mt-1 opacity-90">{props.likes}</span>
        </div>

        {/* Comment Button */}
        <div className="flex flex-col items-center group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            stroke="currentColor"
            fill="none"
            className="w-8 h-8 group-hover:text-white/80 transition-all duration-300"
            aria-label="View comments"
          >
            <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          <span className="text-sm mt-1 opacity-90">{props.comments}</span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            stroke="currentColor"
            fill="none"
            className="w-8 h-8 group-hover:text-white/80 transition-all duration-300"
            aria-label="Share this reel"
          >
            <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
          <span className="text-sm mt-1 opacity-90">{props.shares}</span>
        </div>

        {/* Save Button */}
        <div className="flex flex-col items-center group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            stroke="currentColor"
            fill="none"
            className="w-8 h-8 group-hover:text-white/80 transition-all duration-300"
            aria-label="Save this reel"
          >
            <path d="M17.5 12c0 .13-.01.26-.03.39l-2.5 9.25a.75.75 0 0 1-1.47-.37l-.5-1.83a.75.75 0 0 0-.72-.52H7.69a.75.75 0 0 0-.72.52l-.5 1.83a.75.75 0 0 1-1.47.37l-2.5-9.25c-.02-.13-.03-.26-.03-.39s.01-.26.03-.39l2.5-9.25a.75.75 0 0 1 1.47.37l.5 1.83c.07.27.27.47.52.52h7.76c.25 0 .45-.2.52-.52l.5-1.83a.75.75 0 0 1 1.47-.37l2.5 9.25c.02.13.03.26.03.39Z" />
          </svg>
          <span className="text-sm mt-1 opacity-90">{props.saves}</span>
        </div>

        {/* Profile Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:scale-110 transition-all duration-300 cursor-pointer">
          <img
            src={props.profilePic}
            alt={`\({props.username}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Caption Section */}
      <div className="absolute bottom-6 left-4 right-4 space-y-2">
        <div className="flex items-center gap-2">
          <img
            src={props.profilePic}
            alt={`\){props.username}'s profile`}
            className="w-10 h-10 rounded-full border-2 border-white/20"
          />
          <span className="font-semibold">{props.username}</span>
          <button className="ml-2 px-3 py-1 bg-white text-black text-xs font-semibold rounded-full hover:bg-white/90 transition-all">
            Follow
          </button>
        </div>

        <p className="text-sm ml-12 opacity-90">{props.caption}</p>

        {/* Music Credit */}
        <div className="flex items-center gap-2 text-sm opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.75"
            stroke="currentColor"
            fill="none"
            className="w-4 h-4"
            aria-label="Audio track"
          >
            <path d="M19.5 12.75v-6a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v6a2.25 2.25 0 0 0 2.25 2.25h10.5A2.25 2.25 0 0 0 19.5 12.75Z" />
            <path d="M19.5 18.75v-1.5a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25V18.75m15 0h-15M12 12.75h.008v.008H12v-.008Z" />
          </svg>
          <span>{props.audioCredit}</span>
        </div>
      </div>
    </div>
  );
});

ReelItem.displayName = 'ReelItem';

// ------------------------------
// Main Reels Container Component
// ------------------------------
const InstagramReels: React.FC = () => {
  const reelsContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sample Reels Data
  const reels: ReelProps[] = [
    {
      id: '1',
      videoUrl: 'https://vdownload-22.sb-cd.com/5/8/5887447-720p.mp4?secure=aRFkjZUBTaf4Aot7geCf5g,1768633997&m=22&d=3&_tid=5887447',
      profilePic: 'https://picsum.photos/200/200?random=1',
      username: 'nature_capture',
      caption: 'Beautiful sunset captured from the Swiss Alps 🌄 #nature #sunset #travel',
      likes: '12.5K',
      comments: '892',
      shares: '2.1K',
      saves: '4.7K',
      audioCredit: 'Original audio by alpine_sounds',
    },
    {
      id: '2',
      videoUrl: 'https://vdownload-47.sb-cd.com/1/5/15495246-720p.mp4?secure=BbQOi4xohWCJb7AW4Tjr4w,1768635095&m=47&d=1&_tid=15495246',
      profilePic: 'https://picsum.photos/200/200?random=2',
      username: 'food_explorer',
      caption: 'Homemade matcha tiramisu 🍵 #foodie #dessert #recipe',
      likes: '24.8K',
      comments: '1.2K',
      shares: '5.3K',
      saves: '8.9K',
      audioCredit: 'Café vibes by lofi_beats',
    },
  ];

  // ------------------------------
  // Intersection Observer Setup
  // ------------------------------
  useEffect(() => {
    if (!reelsContainerRef.current) return;

    const observerOptions: IntersectionObserverInit = {
      root: reelsContainerRef.current,
      rootMargin: '0px',
      threshold: 0.75,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const reel = entry.target as HTMLDivElement;
        const video = reel.querySelector('video') as HTMLVideoElement;
        const actionBar = reel.querySelector('.action-bar') as HTMLDivElement;

        if (entry.isIntersecting) {
          video.play().catch((err) => console.warn('Auto-play blocked:', err));
          actionBar.classList.add('opacity-100', 'translate-x-0');
        } else {
          video.pause();
          actionBar.classList.remove('opacity-100', 'translate-x-0');
        }
      });
    }, observerOptions);

    // Observe all reel items
    reelRefs.current.forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    // Cleanup on unmount
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <main
      ref={reelsContainerRef}
      className="reel-container h-screen w-full overflow-y-auto scrollbar-hide"
    >
      {reels.map((reel, index) => (
        <ReelItem
          key={reel.id}
          {...reel}
          ref={(el) => (reelRefs.current[index] = el)}
        />
      ))}
    </main>
  );
};

export default InstagramReels;
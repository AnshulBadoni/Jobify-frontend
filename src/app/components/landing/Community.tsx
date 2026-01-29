"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  BrainCircuit, Wand2, LineChart, 
  CheckCircle2, Search, ArrowRight, 
  Cpu, Sparkles, FileText, ChevronRight,
  Wifi, Signal, Battery, BarChart2, PieChart,
  Briefcase, MapPin, DollarSign, Clock,
  Code2, Database, Layers, Terminal, ShieldCheck,
  TrendingUp, Activity, GitPullRequest, GitMerge,
  Building2, Users, Globe
} from 'lucide-react';

const Community: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      id: 0,
      title: "Smart Discovery",
      subtitle: "Precision Matching",
      description: "Our neural engine analyzes thousands of roles to find the 1% that fit your stack perfectly.",
      screen: "matching"
    },
    {
      id: 1,
      title: "Instant Tailoring",
      subtitle: "Contextual Optimization",
      description: "Generative AI rewrites your resume keywords for every single application automatically.",
      screen: "tailoring"
    },
    {
      id: 2,
      title: "Deep Analytics",
      subtitle: "Performance Tracking",
      description: "Visualize your funnel from application to offer with detailed conversion metrics and market insights.",
      screen: "analytics"
    }
  ];

  // Auto-cycle logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % features.length);
    }, 6000); // Increased slightly to allow reading the richer content

    return () => clearInterval(interval);
  }, [isPaused]);

  // Reset progress animation when step changes
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '0%';
      // Force reflow
      void progressRef.current.offsetWidth;
      progressRef.current.style.transition = 'width 6000ms linear';
      progressRef.current.style.width = '100%';
    }
  }, [activeStep, isPaused]);

  const getPhoneStyle = (index: number) => {
    const total = features.length;
    let relativePos = (index - activeStep + total) % total;

    // 0 = Active (Center)
    // 1 = Next (Right)
    // total - 1 = Prev (Left)

    // Active - Center Stage
    if (relativePos === 0) {
      return 'z-30 opacity-100 [transform:translate3d(0,0,0)_rotateY(0deg)_scale(1)] blur-none grayscale-0 shadow-2xl';
    }
    
    // Next - Tilted Right & Back
    if (relativePos === 1) {
       return 'z-20 opacity-60 [transform:translate3d(60px,0,-120px)_rotateY(-20deg)_scale(0.85)] blur-[1px] grayscale-[20%] shadow-xl pointer-events-none';
    }

    // Previous - Tilted Left & Back
    if (relativePos === total - 1) {
       return 'z-20 opacity-60 [transform:translate3d(-60px,0,-120px)_rotateY(20deg)_scale(0.85)] blur-[1px] grayscale-[20%] shadow-xl pointer-events-none';
    }
    
    // Fallback for more items (Hidden deep in back)
    return 'z-0 opacity-0 [transform:translate3d(0,0,-300px)_scale(0.5)]';
  };

  return (
    <section className="bg-white py-12 lg:py-0 lg:h-[850px] flex items-center justify-center overflow-hidden relative selection:bg-neutral-900 selection:text-white">
      
      {/* Clean Technical Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#FFFFFF]">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F5F5F5_1px,transparent_1px),linear-gradient(to_bottom,#F5F5F5_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        {/* Very subtle static vignette for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Typography & Navigation */}
          <div className="flex flex-col justify-center max-w-lg">
            

            {/* Headline */}
            <h2 className="text-3xl lg:text-5xl font-extrabold text-neutral-900 tracking-tighter leading-[0.95] mb-6">
              Job hunting on <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                autopilot.
              </span>
            </h2>
            
            <p className="text-md text-neutral-500 font-medium leading-relaxed mb-12">
              Stop applying blindly and waste time. Our AI agents scan, tailor, and apply to high-value roles for you 24/7.
            </p>

            {/* Interactive List */}
            <div 
              className="space-y-4 relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
               {features.map((feature, index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    className={`group relative pl-6 pr-4 py-4 rounded-2xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden ${
                       activeStep === index 
                          ? 'bg-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] border border-neutral-100 scale-[1.02] ring-1 ring-black/5' 
                          : 'hover:bg-white/60 border border-transparent opacity-60 hover:opacity-100 hover:scale-[1.01] hover:shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]'
                    }`}
                  >
                     {/* Progress Bar for Active Step */}
                     {activeStep === index && (
                       <div 
                        ref={progressRef}
                        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_-1px_8px_rgba(124,58,237,0.4)]"
                       />
                     )}

                     <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-5">
                           {/* Icon Box */}
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                              activeStep === index 
                                ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20 scale-110' 
                                : 'bg-neutral-100 text-neutral-400 group-hover:bg-white group-hover:text-violet-600 group-hover:shadow-md group-hover:scale-105'
                           }`}>
                              {index === 0 && <BrainCircuit size={20} />}
                              {index === 1 && <Wand2 size={20} />}
                              {index === 2 && <LineChart size={20} />}
                           </div>

                           <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                 <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                                    activeStep === index ? 'text-violet-600' : 'text-neutral-400 group-hover:text-violet-500'
                                 }`}>
                                    {feature.subtitle}
                                 </span>
                              </div>
                              <h3 className={`text-md font-bold transition-colors duration-300 ${
                                 activeStep === index ? 'text-neutral-900' : 'text-neutral-500 group-hover:text-neutral-800'
                              }`}>
                                 {feature.title}
                              </h3>
                           </div>
                        </div>
                        
                        {/* Arrow Icon */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                           activeStep === index 
                              ? 'bg-neutral-100 text-neutral-900 translate-x-0 opacity-100' 
                              : 'bg-transparent text-neutral-400 -translate-x-8 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0 group-hover:bg-white group-hover:shadow-sm'
                        }`}>
                           <ArrowRight size={16} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
          </div>

          {/* Right Column: Pixel Phone */}
          <div className="relative h-[550px] flex items-center justify-center perspective-container lg:translate-x-4">
             {/* Phone Stack with 3D Preserve */}
             <div className="relative w-70 aspect-[9/19] preserve-3d">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-all duration-[800ms] cubic-bezier(0.2, 0.8, 0.2, 1) origin-center ${getPhoneStyle(index)}`}
                  >
                     <PixelFrame>
                        {feature.screen === 'matching' && <MatchingScreen isActive={activeStep === 0} />}
                        {feature.screen === 'tailoring' && <TailoringScreen isActive={activeStep === 1} />}
                        {feature.screen === 'analytics' && <AnalyticsScreen isActive={activeStep === 2} />}
                     </PixelFrame>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Google Pixel Style Frame - Matte Black Finish
const PixelFrame: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="relative w-full h-full select-none">
    {/* Physical Buttons */}
    <div className="absolute top-28 -right-[2px] w-[3px] h-8 bg-[#222] rounded-r-md shadow-sm"></div>
    <div className="absolute top-40 -right-[2px] w-[3px] h-14 bg-[#222] rounded-r-md shadow-sm"></div>

    {/* Chassis */}
    <div className="relative w-full h-full bg-[#121212] rounded-[32px] p-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_20px_40px_-10px_rgba(0,0,0,0.5)] z-10 border border-[#333]">
       
       {/* Screen Bezel */}
       <div className="w-full h-full bg-black rounded-[30px] p-[6px] relative overflow-hidden">
          
          {/* Pixel Punch Hole */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-50 flex items-center justify-center ring-1 ring-[#333]">
             <div className="w-1 h-1 bg-[#050505] rounded-full">
                <div className="w-px h-px bg-white/30 rounded-full absolute top-[1px] right-[1px]"></div>
             </div>
          </div>

          {/* Screen Content Container */}
          <div className="w-full h-full bg-white rounded-[25px] overflow-hidden relative z-20">
             {/* Android Status Bar */}
             <div className="absolute top-0 left-0 right-0 h-10 z-40 flex justify-between items-center px-6 pt-3 text-neutral-900 mix-blend-difference pointer-events-none">
                <span className="text-[10px] font-bold tracking-wide text-white/90">9:30</span>
                <div className="flex gap-1.5 text-white/90 opacity-90">
                   <Wifi size={11} strokeWidth={2.5} />
                   <Signal size={11} fill="currentColor" strokeWidth={0} />
                   <Battery size={11} fill="currentColor" strokeWidth={0} />
                </div>
             </div>

             {children}
             
             {/* Navigation Bar */}
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-neutral-950/20 rounded-full z-50 backdrop-blur-sm"></div>
          </div>
       </div>

       {/* Premium Reflection Overlay */}
       <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-30 opacity-20"></div>
    </div>
  </div>
);

// --- HELPER COMPONENTS ---
const Skeleton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <div className={`animate-pulse bg-neutral-100 rounded-md ${className}`} style={style}></div>
);

// --- AI FEATURE SCREENS ---

// 1. Matching Screen: List of jobs with Match Scores
const MatchingScreen = ({ isActive }: { isActive: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isActive) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const jobs = [
    {
      role: "Senior AI Engineer",
      company: "Anthropic",
      location: "San Francisco",
      salary: "$280k - $420k",
      equity: "0.05% - 0.1%",
      match: "99%",
      logo: "A",
      logoColor: "bg-orange-600",
      skills: "Python, PyTorch, LLMs"
    },
    {
      role: "Staff Frontend",
      company: "Airbnb",
      location: "Remote",
      salary: "$240k - $310k",
      equity: "$150k/yr",
      match: "96%",
      logo: "A",
      logoColor: "bg-rose-500",
      skills: "React, GraphQL, Design Sys"
    },
    {
      role: "Founding Engineer",
      company: "Stealth",
      location: "New York",
      salary: "$180k - $250k",
      equity: "1.0% - 2.5%",
      match: "94%",
      logo: "S",
      logoColor: "bg-black",
      skills: "Fullstack, TypeScript, AWS"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] font-sans">
       <div className="pt-12 px-5 pb-3 bg-white sticky top-0 z-30 border-b border-neutral-100">
          <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-neutral-900 tracking-tight">Discover</h3>
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                  <Search size={14} />
              </div>
          </div>
          {/* Chips */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              <span className="text-[10px] font-semibold text-white bg-neutral-900 px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                  Recommended
              </span>
              <span className="text-[10px] font-medium text-neutral-500 bg-white border border-neutral-200 px-3 py-1.5 rounded-full whitespace-nowrap">
                  Staff Level
              </span>
              <span className="text-[10px] font-medium text-neutral-500 bg-white border border-neutral-200 px-3 py-1.5 rounded-full whitespace-nowrap">
                  Remote
              </span>
          </div>
       </div>
       
       <div className="flex-1 p-3 space-y-3 overflow-hidden bg-[#FAFAFA]">
          {isLoading ? (
            // Skeleton State
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-neutral-100">
                 <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3 w-full">
                       <Skeleton className="w-10 h-10 rounded-lg" />
                       <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                       </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-2 mb-3">
                    <Skeleton className="h-8 rounded-lg" />
                    <Skeleton className="h-8 rounded-lg" />
                 </div>
                 <Skeleton className="h-4 w-full mt-2" />
              </div>
            ))
          ) : (
            // Actual Data
            jobs.map((job, i) => (
              <div 
                key={i} 
                className={`bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-neutral-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                  <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3">
                          <div className={`w-10 h-10 rounded-lg ${job.logoColor} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>{job.logo}</div>
                          <div>
                              <h4 className="font-bold text-sm text-neutral-900 leading-tight">{job.role}</h4>
                              <p className="text-[11px] text-neutral-500 font-medium mt-0.5">{job.company} • {job.location}</p>
                          </div>
                      </div>
                      <div className="text-right">
                          <span className="block text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                              {job.match} Match
                          </span>
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-neutral-50 rounded-lg p-2 border border-neutral-100">
                          <span className="text-[9px] text-neutral-400 font-bold uppercase block mb-1">Salary</span>
                          <span className="text-xs font-bold text-neutral-900">{job.salary}</span>
                      </div>
                      <div className="bg-neutral-50 rounded-lg p-2 border border-neutral-100">
                          <span className="text-[9px] text-neutral-400 font-bold uppercase block mb-1">Equity</span>
                          <span className="text-xs font-bold text-neutral-900">{job.equity}</span>
                      </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-50">
                      <Code2 size={12} className="text-neutral-400" />
                      <span className="text-[10px] text-neutral-500 font-medium">{job.skills}</span>
                  </div>
              </div>
            ))
          )}
       </div>
    </div>
  );
};

// 2. Tailoring Screen: "Diff View" Code/Text Editor
const TailoringScreen = ({ isActive }: { isActive: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isActive) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
  <div className="flex flex-col h-full bg-white font-sans relative overflow-hidden">
     {/* Header */}
     <div className="pt-12 px-5 pb-3 bg-white sticky top-0 z-30 border-b border-neutral-100 flex justify-between items-center">
        <div>
            <h3 className="font-bold text-lg text-neutral-900 tracking-tight">Resume Diff</h3>
            <p className="text-[10px] text-neutral-400 font-medium">Target: Senior AI Eng @ Anthropic</p>
        </div>
        <div className="bg-violet-50 text-violet-600 px-2 py-1 rounded-md text-[10px] font-bold border border-violet-100 flex items-center gap-1">
            <Wand2 size={10} />
            Optimizing
        </div>
     </div>
     
     <div className="flex-1 relative overflow-hidden">
        {/* Background Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49%,#f5f5f5_50%)] bg-[size:100%_40px] pointer-events-none opacity-50"></div>

        <div className="p-5 space-y-6">
            
            {isLoading ? (
               <div className="space-y-6">
                  <div className="space-y-2">
                     <Skeleton className="h-3 w-12" />
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-12 w-full" />
                  </div>
                  <div className="space-y-2">
                     <Skeleton className="h-3 w-12" />
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-12 w-full" />
                  </div>
               </div>
            ) : (
            <>
            {/* Diff Block 1 */}
            <div className={`transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono text-neutral-400">LINE 12</span>
                    <span className="h-px bg-neutral-100 flex-1"></span>
                </div>
                {/* Deletion */}
                <div className="bg-red-50 border-l-2 border-red-300 p-2 mb-1 rounded-r-md">
                    <p className="text-[10px] text-red-700 line-through decoration-red-300/50 font-mono leading-relaxed opacity-60">
                        Worked on ML models for recommendation.
                    </p>
                </div>
                {/* Addition */}
                <div className={`bg-green-50 border-l-2 border-green-400 p-2 rounded-r-md relative overflow-hidden`}>
                     <div className={`absolute inset-0 bg-white/50 transition-transform duration-1000 origin-left ${isActive ? 'scale-x-0' : 'scale-x-100'}`}></div>
                    <p className="text-[10px] text-green-800 font-mono leading-relaxed font-medium">
                        Architected <span className="bg-green-200/50 px-0.5 rounded text-green-900 font-bold">Transformer-based</span> models, improving CTR by 15% using <span className="bg-green-200/50 px-0.5 rounded text-green-900 font-bold">PyTorch</span>.
                    </p>
                </div>
            </div>

             {/* Diff Block 2 */}
            <div className={`transition-all duration-700 delay-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-mono text-neutral-400">LINE 15</span>
                    <span className="h-px bg-neutral-100 flex-1"></span>
                </div>
                <div className="bg-red-50 border-l-2 border-red-300 p-2 mb-1 rounded-r-md">
                    <p className="text-[10px] text-red-700 line-through decoration-red-300/50 font-mono leading-relaxed opacity-60">
                        Managed infrastructure for data pipelines.
                    </p>
                </div>
                <div className={`bg-green-50 border-l-2 border-green-400 p-2 rounded-r-md relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-white/50 transition-transform duration-1000 origin-left delay-300 ${isActive ? 'scale-x-0' : 'scale-x-100'}`}></div>
                    <p className="text-[10px] text-green-800 font-mono leading-relaxed font-medium">
                        Scaled <span className="bg-green-200/50 px-0.5 rounded text-green-900 font-bold">Kubernetes</span> clusters handling 5TB+ daily ingestion via <span className="bg-green-200/50 px-0.5 rounded text-green-900 font-bold">Kafka</span>.
                    </p>
                </div>
            </div>
            </>
            )}

        </div>

        {/* ATS Score Overlay */}
        <div className={`absolute bottom-6 left-5 right-5 bg-neutral-900 text-white p-3 rounded-xl shadow-xl flex items-center justify-between transition-all duration-500 delay-1000 ${isActive && !isLoading ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center text-[10px] font-bold text-green-400">
                    98
                </div>
                <div>
                    <p className="text-[10px] font-bold">ATS Optimized</p>
                    <p className="text-[9px] text-neutral-400">Keyword density matched</p>
                </div>
            </div>
            <button className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-lg">
                Apply
            </button>
        </div>
     </div>
  </div>
  );
};

// 3. Analytics Screen: Pipeline Funnel & Portfolio
const AnalyticsScreen = ({ isActive }: { isActive: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isActive) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isActive]);
  
  return (
  <div className="flex flex-col h-full bg-[#FAFAFA] relative font-sans text-neutral-900">
     {/* Header */}
     <div className="pt-12 px-5 pb-3 bg-[#FAFAFA] sticky top-0 z-30">
        <h3 className="font-bold text-lg text-neutral-900 mb-1 tracking-tight">Pipeline</h3>
        <p className="text-[10px] text-neutral-400 font-medium flex items-center gap-2">
            <Activity size={10} className="text-violet-500" />
            Active Job Search • Day 14
        </p>
     </div>
     
     <div className="p-5 space-y-4">
        
        {/* Funnel Visualization */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-neutral-100">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-bold text-neutral-900 uppercase">Conversion Funnel</h4>
                <span className="text-[9px] font-medium text-neutral-400">Last 30 Days</span>
            </div>
            
            {isLoading ? (
               <div className="space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-6 w-1/4" />
               </div>
            ) : (
            <div className="space-y-2 relative">
                 {/* Connecting Line */}
                 <div className="absolute left-[7px] top-2 bottom-6 w-0.5 bg-neutral-100 z-0"></div>

                 {[
                    { label: "Applied", count: 86, color: "bg-neutral-900", width: "100%" },
                    { label: "Interviewing", count: 14, color: "bg-neutral-700", width: "60%" },
                    { label: "Technical", count: 6, color: "bg-violet-600", width: "40%" },
                    { label: "Offers", count: 2, color: "bg-emerald-500", width: "20%" },
                 ].map((stage, i) => (
                    <div key={i} className={`relative z-10 flex items-center gap-3 transition-all duration-500 delay-${i * 100} ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                        <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${stage.color}`}></div>
                        <div className="flex-1">
                            <div className="flex justify-between text-[10px] font-medium mb-1">
                                <span className="text-neutral-600">{stage.label}</span>
                                <span className="font-bold text-neutral-900">{stage.count}</span>
                            </div>
                            <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden w-full">
                                <div className={`h-full rounded-full ${stage.color}`} style={{ width: stage.width }}></div>
                            </div>
                        </div>
                    </div>
                 ))}
            </div>
            )}
        </div>

        {/* Market Value Graph */}
        <div className={`bg-white p-4 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-neutral-100 transition-all duration-700 delay-500 ${isActive && !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h4 className="text-[10px] font-bold text-neutral-900 uppercase mb-0.5">Est. Market Value</h4>
                    {isLoading ? <Skeleton className="h-6 w-24" /> : <div className="text-xl font-extrabold text-neutral-900 tracking-tight">$315,000</div>}
                </div>
                <div className="text-right">
                    <div className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                        <TrendingUp size={8} /> +18% YoY
                    </div>
                </div>
            </div>
            
            {/* Area Chart Placeholder */}
            {isLoading ? (
               <div className="flex items-end gap-1 h-16">
                  {Array.from({length: 10}).map((_, i) => <Skeleton key={i} className="flex-1 rounded-t-sm" style={{height: `${Math.random() * 50 + 20}%`}} />)}
               </div>
            ) : (
            <>
            <div className="h-16 w-full relative flex items-end gap-1">
                 {[35, 42, 40, 48, 52, 58, 55, 68, 72, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-violet-50 rounded-t-sm relative group">
                        <div 
                            className="absolute bottom-0 left-0 right-0 bg-violet-500 rounded-t-sm transition-all duration-1000 ease-out"
                            style={{ height: isActive ? `${h}%` : '0%', opacity: 0.2 + (i/10) * 0.8 }}
                        ></div>
                    </div>
                 ))}
            </div>
            <div className="flex justify-between text-[8px] text-neutral-400 font-medium mt-2">
                <span>Jan</span>
                <span>Jun</span>
                <span>Dec</span>
            </div>
            </>
            )}
        </div>

     </div>
  </div>
  );
};

export default Community;
"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { getMe } from "@/app/api/profile";
import { getMyPostedJobs } from "@/app/api/jobs";

// --- Helper Functions for Real Data ---

const getDaysOpen = (dateString: string) => {
    if (!dateString) return 0;
    const diff = new Date().getTime() - new Date(dateString).getTime();
    const days = Math.floor(diff / (1000 * 3600 * 24));
    return days;
};

const formatSalary = (min: number, max: number, currency: string) => {
    if (!min && !max) return "Salary not specified";
    const currSymbol = currency === "USD" ? "$" : "₹";
    return `${currSymbol}${min}k - ${max}k`;
};

const getJobColor = (id: number) => {
    const colors = [
        "border-blue-500",
        "border-indigo-500",
        "border-purple-500",
        "border-pink-500",
        "border-emerald-500",
        "border-orange-500"
    ];
    return colors[id % colors.length];
};

// --- Mock Data ---

const hiringMetrics = [
    { label: "Active Jobs", value: 8, description: "Open positions", trend: 2 },
    { label: "New Applicants", value: 136, description: "Last 7 days", trend: 12 },
    { label: "Interviews Set", value: 24, description: "This week", trend: 5 },
    { label: "Offers Pending", value: 3, description: "Awaiting signature", trend: 0 },
];

const priorityCandidates = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Frontend Engineer",
        current: "Senior Dev @ TechFlow",
        experience: "6 years",
        matchScore: 94,
        skills: ["React", "TypeScript", "GraphQL"],
        highlights: ["Ex-Google", "Local Candidate"],
        applied: "2h ago",
        avatar: "https://i.pravatar.cc/150?u=1"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "AI Developer",
        current: "ML Engineer @ DataCorp",
        experience: "4 years",
        matchScore: 88,
        skills: ["Python", "PyTorch", "AWS"],
        highlights: ["Masters Degree", "Within Budget"],
        applied: "5h ago",
        avatar: "https://i.pravatar.cc/150?u=2"
    },
    {
        id: 3,
        name: "Jessica Alba",
        role: "Product Designer",
        current: "Designer @ CreativeStudio",
        experience: "5 years",
        matchScore: 91,
        skills: ["Figma", "User Research", "Prototyping"],
        highlights: ["Strong Portfolio"],
        applied: "1d ago",
        avatar: "https://i.pravatar.cc/150?u=3"
    },
];

const upcomingInterviews = [
    { id: 1, time: "10:00 AM", candidate: "Sarah Jenkins", type: "Technical Screen" },
    { id: 2, time: "01:30 PM", candidate: "Alex Ross", type: "Culture Fit" },
    { id: 3, time: "03:00 PM", candidate: "Maria Garcia", type: "Final Round" },
];

const velocityStats = [
    { role: "Frontend Dev", filled: 80, estTime: "2 weeks" },
    { role: "Product Designer", filled: 45, estTime: "1 month" },
];

// --- Components ---

const CircularProgress = ({ percentage, label, subLabel }: { percentage: number, label: string, subLabel: string }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-800">
            <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="transform -rotate-90 w-12 h-12">
                    <circle cx="24" cy="24" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200 dark:text-neutral-800" />
                    <circle cx="24" cy="24" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="text-indigo-600 transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <span className="absolute text-[10px] font-bold text-gray-700 dark:text-gray-300">{percentage}%</span>
            </div>
            <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{label}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Est. close: <span className="text-indigo-600 dark:text-indigo-400 font-medium">{subLabel}</span></p>
            </div>
        </div>
    );
};

export default function HiringDashboard() {
    const [me, setMe] = useState<any>({ id: -1, username: "Hiring Manager", email: "", role: "recruiter" });
    const [activeTab, setActiveTab] = useState("Unreviewed");
    const [activePostings, setActivePostings] = useState<any[]>([]);

    useEffect(() => {
        fetchActivePostings();
        // getMe logic here...
    }, []);

    const fetchActivePostings = async () => {
        try {
            const res = await getMyPostedJobs();
            if (res.status == 200) {
                setActivePostings(res.data);
            } else {
                setActivePostings([]);
            }
        } catch (error) {
            console.error("Error fetching jobs", error);
        }
    };

    return (
        <section className="font-sans min-h-screen mb-2">
            <div className="space-y-2">
                <Header heading={`Hello, ${me.username} 👋`} subHeading="Your recruitment pipeline overview." />

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {hiringMetrics.map((metric, i) => {
                        const isPositive = metric.trend >= 0;
                        return (
                            <div
                                key={i}
                                className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 border border-gray-200 dark:border-neutral-800 p-5 shadow-lg hover:shadow-2xl transition cursor-pointer"
                            >
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    {metric.label}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                                    {metric.trend !== 0 && (
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full ${isPositive
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                                }`}
                                        >
                                            {isPositive ? "▲" : "▼"} {Math.abs(metric.trend)}%
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{metric.description}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2.5">
                    <div className="lg:col-span-2 space-y-2">

                        {/* PRIORITY CANDIDATE REVIEW */}
                        <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Candidate Review</h2>
                                    <p className="text-xs text-gray-500 mt-1">12 candidates match your AI criteria</p>
                                </div>
                                <div className="flex bg-gray-100 dark:bg-neutral-900 rounded-lg p-1">
                                    {["Unreviewed", "Shortlisted"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-1.5 text-xs font-medium rounded-md transition ${activeTab === tab ? "bg-white dark:bg-neutral-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {priorityCandidates.map((c) => (
                                    <div key={c.id} className="group flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 hover:border-indigo-100 dark:hover:border-indigo-900 bg-white dark:bg-neutral-900 hover:shadow-lg transition-all duration-300">
                                        {/* Left: Avatar & Basic Info */}
                                        <div className="flex gap-4 min-w-[200px] my-auto">
                                            <div className="relative">
                                                <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-xl object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white text-base">{c.name}</h3>
                                                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-0.5">{c.role}</p>
                                                <p className="text-[10px] text-gray-500 dark:text-gray-400">{c.applied}</p>
                                            </div>
                                        </div>

                                        {/* Middle: Stats & Highlights */}
                                        <div className="flex-1 grid grid-cols-2 gap-y-2 gap-x-4 text-sm border-l border-gray-100 dark:border-neutral-800 pl-0 md:pl-4">
                                            <div className="col-span-2 flex flex-wrap gap-2 mb-1">
                                                {c.highlights.map((tag, i) => (
                                                    <span key={i} className="text-[10px] font-semibold px-2 py-1 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded-md border border-green-100 dark:border-green-900/30">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-semibold">Current</p>
                                                <p className="text-xs text-gray-700 dark:text-gray-300 font-medium truncate">{c.current}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase font-semibold">Experience</p>
                                                <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">{c.experience}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {c.skills.map((skill, i) => (
                                                        <span key={i} className="text-[10px] text-gray-500 bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: Match & Actions */}
                                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 dark:border-neutral-800 pt-3 md:pt-0 pl-0 md:pl-4 min-w-[140px]">
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-gray-900 dark:text-white">{c.matchScore}%</span>
                                                <p className="text-[10px] text-gray-400">AI Match Score</p>
                                            </div>
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <button className="flex-1 md:flex-none p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                </button>
                                                <button className="flex-1 md:flex-none p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition flex items-center justify-center gap-2 px-4">
                                                    <span className="text-xs font-semibold">Shortlist</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-xs font-medium text-gray-500 hover:text-indigo-600 transition">View all 12 candidates</button>
                        </div>

                        {/* ACTIVE LISTINGS (UPDATED WITH API DATA) */}
                        <div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-neutral-900 p-6 shadow-sm border border-gray-100 dark:border-neutral-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Active Listings</h2>
                            <div className="flex gap-4 overflow-x-auto py-2 snap-x snap-mandatory scrollbar-hide pb-4">
                                {activePostings.map((job) => (
                                    <div
                                        key={job.id}
                                        className={`min-w-[280px] flex-shrink-0 bg-white dark:bg-neutral-900 rounded-xl border-l-4 ${getJobColor(job.id)} border-y border-r border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 snap-start cursor-pointer group relative overflow-hidden`}
                                    >
                                        <div className="p-5">
                                            <div className="flex justify-between items-start">
                                                <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">{job.employment}</span>
                                                {job.status === "OPEN" && (
                                                    <span className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                        OPEN
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mt-1 mb-1 truncate" title={job.title}>
                                                {job.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 mb-2">{job.location} • Posted {getDaysOpen(job.createdAt)}d ago</p>
                                            <p className="text-xs font-semibold text-gray-900 dark:text-white mb-4">
                                                {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                                            </p>

                                            <div className="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-neutral-800/50 rounded-lg p-2.5 mb-3">
                                                <div className="text-center border-r border-gray-200 dark:border-neutral-700">
                                                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                        {job.applications?.length || 0}
                                                    </div>
                                                    <div className="text-[10px] text-gray-500 uppercase">Applicants</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                                        {job.openings}
                                                    </div>
                                                    <div className="text-[10px] text-gray-500 uppercase">Slots Open</div>
                                                </div>
                                            </div>

                                            <button className="w-full py-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
                                                Manage Job
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="space-y-2">
                        <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 p-6 shadow-sm h-fit sticky top-4">

                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Today's Schedule</h3>
                                <button className="text-gray-400 hover:text-indigo-600 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </button>
                            </div>

                            <div className="space-y-6 relative mb-8">
                                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-neutral-800"></div>
                                {upcomingInterviews.map((meeting) => (
                                    <div key={meeting.id} className="relative pl-8">
                                        <div className="absolute left-0 top-1.5 w-4 h-4 bg-white dark:bg-neutral-900 border-2 border-indigo-500 rounded-full z-10"></div>
                                        <div className="flex flex-col group cursor-pointer">
                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{meeting.time}</span>
                                            <div className="p-3 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900 transition">
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{meeting.candidate}</h4>
                                                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">{meeting.type}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-gray-100 dark:border-neutral-800 mb-6" />

                            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                Role Fill Status
                                <span className="text-[10px] bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-gray-500">AI Estimates</span>
                            </h4>
                            <div className="space-y-3">
                                {velocityStats.map((stat, i) => (
                                    <CircularProgress
                                        key={i}
                                        percentage={stat.filled}
                                        label={stat.role}
                                        subLabel={stat.estTime}
                                    />
                                ))}
                            </div>

                            <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none">
                                Create New Job
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
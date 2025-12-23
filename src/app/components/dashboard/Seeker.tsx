"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import ProfilePreview from "@/app/components/ProfilePreview";
import { getMe } from "@/app/api/profile";

// --- 1. ORIGINAL METRICS (UNCHANGED) ---
const matchMetrics = [
    { label: "Profile Completion", value: 82, description: "Complete your profile to get better job matches", progress: 82, trend: 5 },
    { label: "Applications Sent", value: 136, description: "Number of applications you sent this month", progress: 70, trend: 10 },
    { label: "Responses Received", value: 98, description: "Companies that responded to your applications", progress: 98, trend: 3 },
    { label: "Job Matches", value: 12, description: "Jobs that match your profile this week", progress: 60, trend: -1 },
];

// --- DATA ---
const closestJobs = [
    { id: 1, company: "Google", role: "Frontend Engineer", location: "San Francisco", type: "Full-time", salary: "$150k - $180k", experience: "3-5y", logo: "https://logo.clearbit.com/google.com", tags: ["React", "TypeScript"], match: 98 },
    { id: 2, company: "Amazon", role: "AI Developer", location: "Seattle", type: "Full-time", salary: "$160k - $200k", experience: "5-7y", logo: "https://logo.clearbit.com/amazon.com", tags: ["Python", "AWS"], match: 95 },
    { id: 3, company: "Netflix", role: "Data Scientist", location: "Remote", type: "Contract", salary: "$110k - $140k", experience: "2-4y", logo: "https://logo.clearbit.com/netflix.com", tags: ["Data", "SQL"], match: 92 },
    { id: 4, company: "Airbnb", role: "Product Designer", location: "Remote", type: "Full-time", salary: "$130k - $150k", experience: "4-6y", logo: "https://logo.clearbit.com/airbnb.com", tags: ["Figma", "UX"], match: 88 },
    { id: 5, company: "Stripe", role: "Backend Engineer", location: "Remote", type: "Full-time", salary: "$170k - $190k", experience: "3-6y", logo: "https://logo.clearbit.com/stripe.com", tags: ["Go", "Java"], match: 85 },
];

const trendingJobs = [
    { id: 1, company: "Shopify", role: "Fullstack Developer", location: "Remote", salary: "$140k", type: "Full-time", logo: "https://logo.clearbit.com/shopify.com", applicants: 124 },
    { id: 2, company: "Amazon", role: "AI Engineer", location: "Seattle", salary: "$180k", type: "Full-time", logo: "https://logo.clearbit.com/amazon.com", applicants: 89 },
    { id: 3, company: "Netflix", role: "Data Scientist", location: "Remote", salary: "$150k", type: "Contract", logo: "https://logo.clearbit.com/netflix.com", applicants: 205 },
    { id: 4, company: "Airbnb", role: "Product Designer", location: "SF", salary: "$135k", type: "Full-time", logo: "https://logo.clearbit.com/airbnb.com", applicants: 56 },
];

export default function Dashboard() {
    const [isAnimated, setIsAnimated] = useState(false);
    const [me, setMe] = useState<any>({ id: -1, username: "", email: "", role: "" });
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        setIsAnimated(true);
        myDataFetch();
    }, []);

    const myDataFetch = async () => {
        const resp = await getMe();
        if (resp.status != 200) return;
        setMe(resp?.data);
    };

    return (
        <section className="font-sans min-h-screen mb-2">
            <div className="space-y-2">

                {/* Header */}
                <Header heading={`Welcome back, ${me.username} 👋`} subHeading="Here’s your personalized job search dashboard" />

                {/* --- METRICS (ORIGINAL) --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {matchMetrics.map((metric, i) => {
                        const isPositive = metric.trend >= 0;
                        return (
                            <div key={i} className="rounded-xl bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 border border-gray-200 dark:border-neutral-800 p-5 shadow-sm hover:shadow-md transition cursor-pointer">
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{metric.label}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"}`}>
                                        {isPositive ? "▲" : "▼"} {Math.abs(metric.trend)}%
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{metric.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Main layout */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2.5">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-2">

                        {/* --- 1. CLOSEST MATCH JOBS --- */}
                        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Closest Match</h2>
                                <button className="text-xs font-semibold text-indigo-600 hover:underline">View All</button>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                                {closestJobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="min-w-[280px] snap-start flex-shrink-0 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-4 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer group relative"
                                    >
                                        {/* Match Score */}
                                        <div className="absolute top-4 right-4">
                                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded-full border border-emerald-100 dark:border-emerald-900">
                                                {job.match}% Match
                                            </span>
                                        </div>

                                        <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg object-contain border border-gray-100 dark:border-neutral-700 bg-white mb-3" />

                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{job.role}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">{job.company}</p>

                                        <div className="flex gap-2 mb-4">
                                            {job.tags.map((tag, i) => (
                                                <span key={i} className="text-[10px] font-medium px-2 py-1 bg-slate-50 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 rounded border border-slate-100 dark:border-neutral-700">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="pt-3 border-t border-gray-100 dark:border-neutral-800 flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-900 dark:text-white">{job.salary}</span>
                                            <span className="text-[10px] text-slate-400">{job.location}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* --- 2. TRENDING JOBS (Standard Cards) --- */}
                        <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Trending Now</h2>
                            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                                {trendingJobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="min-w-[260px] snap-start flex-shrink-0 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-5 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-neutral-800 flex items-center justify-center border border-gray-100 dark:border-neutral-700">
                                                <img src={job.logo} alt={job.company} className="w-6 h-6 object-contain" />
                                            </div>
                                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-full flex items-center gap-1">
                                                🔥 {job.applicants} applied
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 truncate">{job.role}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{job.company}</p>

                                        <div className="flex gap-2">
                                            <span className="text-[10px] font-medium px-2 py-1 bg-slate-50 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 rounded border border-slate-100 dark:border-neutral-700">
                                                {job.type}
                                            </span>
                                            <span className="text-[10px] font-medium px-2 py-1 bg-slate-50 dark:bg-neutral-800 text-slate-600 dark:text-slate-300 rounded border border-slate-100 dark:border-neutral-700">
                                                {job.salary}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions (Unchanged) */}
                        <div className={`transform transition-all duration-1000 delay-500 ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                            <div className="relative rounded-xl p-6 overflow-hidden shadow-md bg-gradient-to-r from-indigo-600 to-purple-600">
                                <div className="relative z-10 text-white flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Complete your profile</h3>
                                        <p className="text-indigo-100 text-sm">Unlock 3x more job matches by adding your skills.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => setShowModal(true)} className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-50 transition shadow-sm">
                                            Edit Profile
                                        </button>
                                        <button className="border border-white/30 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/10 transition">
                                            Upload Resume
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right (Unchanged) */}
                    <aside className="space-y-2">
                        <ProfilePreview profile={me} />
                    </aside>
                </div>
            </div>
        </section>
    );
}
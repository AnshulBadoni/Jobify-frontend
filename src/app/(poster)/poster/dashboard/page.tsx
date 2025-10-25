"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { getMe } from "@/app/api/profile";
import ProfilePreview from "../../components/ProfilePreview";
import JobContainer from "@/app/components/JobContainer";

// Poster metrics with trend + profile completion
const posterMetrics = [
    {
        label: "Profile Completion",
        value: 76,
        description: "Complete your profile to attract better candidates",
        progress: 76,
        trend: 8,
    },
    {
        label: "Jobs Posted",
        value: 24,
        description: "Total jobs posted this month",
        progress: 70,
        trend: 15,
    },
    {
        label: "Applications Received",
        value: 412,
        description: "Candidates applied to your jobs",
        progress: 90,
        trend: 12,
    },
    {
        label: "Shortlisted",
        value: 58,
        description: "Candidates you shortlisted",
        progress: 60,
        trend: -2,
    },
];

// Posted jobs (by the poster)
const postedJobs = [
    { id: 1, logo: 'https://logo.clearbit.com/technova.com', company: "TechNova LTD", role: "Frontend Engineer", location: "Remote", applicants: 120, status: "Active", experience: "2+ yrs" },
    { id: 2, logo: 'https://logo.clearbit.com/technova.com', company: "TechNova LTD", role: "Cloud Engineer", type: "San Francisco, CA", applicants: 65, status: "Active", experience: "2+ yrs" },
    { id: 3, logo: 'https://logo.clearbit.com/technova.com', company: "TechNova LTD", role: "UI Designer", type: "Remote", applicants: 40, status: "Closed", experience: "2+ yrs" },
];

// Trending candidates (recommended to poster)
const trendingTalent = [
    { id: 1, name: "Alice Johnson", role: "Fullstack Developer", avatar: "https://i.pravatar.cc/100?img=11" },
    { id: 2, name: "Mark Lee", role: "AI Engineer", avatar: "https://i.pravatar.cc/100?img=22" },
    { id: 3, name: "Sophia Brown", role: "Product Designer", avatar: "https://i.pravatar.cc/100?img=33" },
    { id: 4, name: "John Carter", role: "Data Scientist", avatar: "https://i.pravatar.cc/100?img=44" },
];

export default function PosterDashboard() {
    const [isAnimated, setIsAnimated] = useState(false);
    const [me, setMe] = useState<any>({ id: -1, username: "", email: "", role: "poster" });
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        setIsAnimated(true);
        myDataFetch();
    }, []);

    const myDataFetch = async () => {
        const resp = await getMe();
        if (resp.status !== 200) return;
        setMe(resp?.data);

        if (!resp?.data?.profile || !resp?.data?.profile.fullName) {
            setShowModal(true);
        }
    };

    const profileCompletion = posterMetrics[0].value;
    const showProfileCTA = profileCompletion < 90;

    return (
        <section className="font-sans min-h-screen mb-2">
            {/* <ProfileSetupModal open={showModal} onClose={() => setShowModal(false)} onSave={handleSaveProfile} /> */}

            <div className="space-y-2">
                {/* Header */}
                <Header heading={`Welcome back, ${me.username} 👋`} subHeading="Here’s your personalized job search dashboard" />

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {posterMetrics.map((metric, i) => {
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
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full ${isPositive
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                            }`}
                                    >
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
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-2">
                        <JobContainer title="Posted Jobs" closestJobs={postedJobs} />

                        {/* Trending talents */}
                        <div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-neutral-900 backdrop-blur-md p-6 shadow-lg border border-gray-100 dark:border-neutral-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Trending Talents</h2>
                            <div className="flex gap-6 overflow-x-auto py-2 snap-x snap-mandatory scrollbar-hide">
                                {trendingTalent.map((job) => (
                                    <div
                                        key={job.id}
                                        className="min-w-[220px] flex-shrink-0 flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md hover:shadow-2xl hover:scale-105 transform transition-all duration-300 snap-start cursor-pointer"
                                    >
                                        <img src={job.avatar} alt={job.name} className="w-10 h-10 rounded-lg object-contain shadow-sm" />
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">{job.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{job.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className={`transform transition-all duration-1000 delay-500 ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                            <div className="relative rounded-2xl p-8 overflow-hidden shadow-2xl bg-gradient-to-r from-indigo-600 to-purple-600">
                                <div className="relative z-10 text-white">
                                    <h3 className="text-3xl font-bold mb-2">Ready to find your dream job?</h3>
                                    <p className="text-indigo-100 mb-6">Complete your profile and get personalized job recommendations.</p>
                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg"
                                        >
                                            {showProfileCTA ? "Complete Profile" : "Boost Profile"}
                                        </button>
                                        <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all">
                                            Browse Jobs
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <aside className="space-y-2">
                        <ProfilePreview profile={me} />
                    </aside>
                </div>
            </div>
        </section>
    );
}

"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import JobContainer from "@/app/components/JobContainer";
import ProfilePreview from "@/app/components/ProfilePreview";
import { getMe } from "@/app/api/profile";
import ProfileSetupModal from "@/app/components/ProfileSetupModal";

const matchMetrics = [
    {
        label: "Profile Completion",
        value: 82,
        description: "Complete your profile to get better job matches",
        progress: 82,
        trend: 5,
    },
    {
        label: "Applications Sent",
        value: 136,
        description: "Number of applications you sent this month",
        progress: 70,
        trend: 10,
    },
    {
        label: "Responses Received",
        value: 98,
        description: "Companies that responded to your applications",
        progress: 98,
        trend: 3,
    },
    {
        label: "Job Matches",
        value: 12,
        description: "Jobs that match your profile this week",
        progress: 60,
        trend: -1,
    },
];

const closestJobs = [
    { id: 1, company: "Google", role: "Frontend Engineer", location: "San Francisco, CA", type: "Full-time", salary: 150000, experience: "3-5 years", logo: "https://logo.clearbit.com/google.com" },
    { id: 2, company: "Amazon", role: "AI Developer", location: "Seattle, WA", type: "Full-time", salary: 160000, experience: "5-7 years", logo: "https://logo.clearbit.com/amazon.com" },
    { id: 3, company: "Netflix", role: "Data Scientist", location: "Remote", type: "Contract", salary: 110000, experience: "2-4 years", logo: "https://logo.clearbit.com/netflix.com" },
    { id: 4, company: "Airbnb", role: "Product Designer", location: "Remote", type: "Full-time", salary: 130000, experience: "4-6 years", logo: "https://logo.clearbit.com/airbnb.com" },
    { id: 5, company: "Stripe", role: "Backend Engineer", location: "Remote", type: "Full-time", salary: 170000, experience: "3-6 years", logo: "https://logo.clearbit.com/stripe.com" },
];;

const trendingJobs = [
    { id: 1, company: "Shopify", logo: "https://logo.clearbit.com/shopify.com", role: "Fullstack Developer" },
    { id: 2, company: "Amazon", logo: "https://logo.clearbit.com/amazon.com", role: "AI Engineer" },
    { id: 3, company: "Netflix", logo: "https://logo.clearbit.com/netflix.com", role: "Data Scientist" },
    { id: 4, company: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com", role: "Product Designer" },
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
        if (resp.status !== 200) return;
        setMe(resp?.data);

        // open modal if first login OR incomplete profile
        if (!resp?.data?.profile || !resp?.data?.profile.fullName) {
            setShowModal(true);
        }
    };

    const handleSaveProfile = async (form: any) => {
        // call API to save profile
        console.log("Saving profile...", form);
        // await updateProfile(form) // TODO: connect API
        setMe({ ...me, profile: form });
    };

    const profileCompletion = matchMetrics[0].value;
    const showProfileCTA = profileCompletion < 90;

    return (
        <section className="font-sans min-h-screen mb-2">
            {/* <ProfileSetupModal open={showModal} onClose={() => setShowModal(false)} onSave={handleSaveProfile} /> */}

            <div className="space-y-2">
                {/* Header */}
                <Header heading={`Welcome back, ${me.username} 👋`} subHeading="Here’s your personalized job search dashboard" />

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {matchMetrics.map((metric, i) => {
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
                        <JobContainer title="Closest Match Jobs" closestJobs={closestJobs} />

                        {/* Trending Jobs */}
                        <div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-neutral-900 backdrop-blur-md p-6 shadow-lg border border-gray-100 dark:border-neutral-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Trending Jobs</h2>
                            <div className="flex gap-6 overflow-x-auto py-2 snap-x snap-mandatory scrollbar-hide">
                                {trendingJobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="min-w-[220px] flex-shrink-0 flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md hover:shadow-2xl hover:scale-105 transform transition-all duration-300 snap-start cursor-pointer"
                                    >
                                        <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg object-contain shadow-sm" />
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">{job.role}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
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
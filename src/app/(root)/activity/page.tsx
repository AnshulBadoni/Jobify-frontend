"use client";
import React, { useEffect, useState } from "react";
import Bread from "@/app/components/Bread";
import Header from "@/app/components/Header";
import { Edit, Wallet, Briefcase, Clock, Languages } from "lucide-react";
import Link from "next/link";
import JobCard from "@/app/components/JobCard";

interface Activity {
    id: number;
    company: string;
    logo: string;
    role: string;
    status: "Pending" | "Interview" | "Rejected";
    date: string;
}

const activities: Activity[] = [
    { id: 1, company: "Google", logo: "https://logo.clearbit.com/google.com", role: "Cloud Engineer", status: "Pending", date: "2 days ago" },
    { id: 2, company: "Stripe", logo: "https://logo.clearbit.com/stripe.com", role: "Frontend Developer", status: "Interview", date: "5 days ago" },
    { id: 3, company: "Netflix", logo: "https://logo.clearbit.com/netflix.com", role: "Data Scientist", status: "Rejected", date: "1 week ago" },
    { id: 4, company: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com", role: "Product Designer", status: "Pending", date: "3 days ago" },
];

export default function ActivityPage() {
    const [isAnimated, setIsAnimated] = useState(false);
    const [filter, setFilter] = useState<"All" | "Pending" | "Interview" | "Rejected">("All");

    useEffect(() => setIsAnimated(true), []);

    const getStatusColor = (status: Activity["status"]) => {
        switch (status) {
            case "Pending": return "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
            case "Interview": return "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
            case "Rejected": return "bg-red-50 text-red-800 dark:bg-red-900/350 dark:text-red-300";
        }
    };

    const filteredActivities =
        filter === "All" ? activities : activities.filter((a) => a.status === filter);

    return (
        <section className="font-sans min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white">
            <div className="space-y-2 p-">
                <Header heading="Your Job Applications" subHeading="Track all applications and their statuses" />

                <div className="grid lg:grid-cols-3 gap-2">
                    {/* Left: Activity Feed */}
                    <div className="lg:col-span-2 space-y-2">
                        {/* Filter Bar */}
                        <div className="pb-2 bg-white dark:bg-neutral-900 rounded-xl px-1 py-2 border border-gray-200 dark:border-neutral-800 shadow-sm">
                            <div className="mx-2 flex overflow-x-auto  gap-2">
                                {["All", "Pending", "Interview", "Rejected"].map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setFilter(option as any)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${filter === option
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Scrollable Cards */}
                        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {filteredActivities.length > 0 ? (
                                filteredActivities.map((act) => (
                                    <div className="col-span-1">
                                        <JobCard
                                            key={act.id}
                                            logo="https://logo.clearbit.com/google.com"
                                            company="Google"
                                            title="Cloud Engineer"
                                            location="Bangalore, India"
                                            salary="₹18–22 LPA"
                                            type="Full-time"
                                            posted="2 days ago"
                                            status="Pending"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
                                    No applications found for {filter}.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right: Profile Summary */}
                    <aside className="space-y-2">
                        <div className="sticky top-20 rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-sm">
                            {/* Avatar */}
                            <div className="relative flex justify-center">
                                <div className="relative">
                                    <img
                                        // src="https://pbs.twimg.com/media/GiYWPZjXQAEo0k1?format=jpg&name=large"
                                        alt="User"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-neutral-800 shadow-sm"
                                    />
                                    <div className="absolute inset-0 rounded-full ring-2 ring-indigo-500/30 animate-pulse"></div>
                                </div>
                            </div>

                            <div className="mt-4 text-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">John Doe</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Model · Remote</p>
                            </div>

                            <div className="mt-4 flex justify-center">
                                <Link
                                    href="/profile"
                                    className="inline-flex items-center px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                                >
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit Profile
                                </Link>
                            </div>

                            <div className="mt-6 space-y-3">
                                <InfoRow icon={<Wallet className="w-4 h-4 text-indigo-500" />} label="Expected Salary" value="$80,000 / year" />
                                <InfoRow icon={<Briefcase className="w-4 h-4 text-indigo-500" />} label="Experience" value="5 years" />
                                <InfoRow icon={<Clock className="w-4 h-4 text-indigo-500" />} label="Employment Type" value="Full-time" />
                                <InfoRow icon={<Languages className="w-4 h-4 text-indigo-500" />} label="Languages" value="English, Spanish" />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="shrink-0">{icon}</div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
}

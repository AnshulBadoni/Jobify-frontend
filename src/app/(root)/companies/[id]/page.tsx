"use client";
import React, { useState } from "react";
import { MapPin, Globe, Users, Briefcase, Star } from "lucide-react";
import { useToast } from "@/app/hooks/useToast";

interface Company {
    name: string;
    logo: string;
    location: string;
    website: string;
    employees: string;
    industry: string;
    description: string;
    mission: string;
    values: string[];
    jobsPosted: number;
}

const companyData: Company = {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    location: "San Francisco, CA",
    website: "https://techcorp.com",
    employees: "500-1000",
    industry: "Software / AI / Cloud",
    description:
        "Google LLC is an American multinational corporation and technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics, and artificial intelligence.",
    mission:
        "Our mission is to build cutting-edge technology that simplifies enterprise operations and drives global innovation.",
    values: ["Innovation", "Integrity", "Customer Success", "Collaboration", "Diversity & Inclusion"],
    jobsPosted: 12,
};

const jobListings = [
    { id: 1, title: "Frontend Engineer", type: "Full-time", location: "San Francisco, CA" },
    { id: 2, title: "Backend Engineer", type: "Full-time", location: "Remote" },
    { id: 3, title: "Product Designer", type: "Contract", location: "Remote" },
];

const reviews = [
    { name: "John D.", rating: 5, comment: "Amazing culture and growth opportunities!" },
    { name: "Sara K.", rating: 4, comment: "Great team, flexible work, nice perks." },
];

const mediaImages = [
    "https://jexovp.png"
];

export default function CompanyDashboardPage() {
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState<"about" | "jobs" | "reviews" | "media">("about");
    const [followed, setFollowed] = useState(false);

    const tabs = [
        { key: "about", label: "About" },
        { key: "jobs", label: "Jobs" },
        { key: "reviews", label: "Reviews" },
        { key: "media", label: "Media" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 font-sans">
            {/* Banner */}
            <div className="relative h-40">
                <img src="https://w.n-r2lj81.jpg" className="w-full h-full rounded-2xl object-cover opacity-90" />
                <div className="absolute bottom-0 left-44 -translate-x-1/2 transform">
                    <img src={companyData.logo} alt={companyData.name} className="sm:w-32 w-24 object-contain rounded-full border-4 border-white dark:border-neutral-900 shadow-lg -mb-14 bg-white dark:bg-neutral-900 p-3" />
                </div>
            </div>

            <div className="mx-auto pt-2 lg:grid lg:grid-cols-12 space-x-2 space-y-2">
                {/* Left Sidebar */}
                <aside className="lg:col-span-3 space-y-2">
                    <div className="bg-white dark:bg-neutral-900 shadow rounded-2xl p-16 text-center space-y-2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{companyData.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{companyData.industry}</p>
                        <div className="flex justify-center gap-2 mt-3">
                            <button
                                onClick={() => {
                                    setFollowed(!followed);
                                    addToast(followed ? `Unfollowed ${companyData.name}` : `Followed ${companyData.name}`, "success");
                                }}
                                className={`px-4 py-2 rounded-2xl border font-medium transition ${followed ? "border-gray-400 text-gray-600" : "border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900"}`}
                            >
                                {followed ? "Following" : "Follow"}
                            </button>
                            <button onClick={() => addToast("Message sent to company", "success")} className="px-4 py-2 rounded-2xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
                                Contact
                            </button>
                        </div>
                        <div className="mt-4 text-sm space-y-1 text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {companyData.location}</div>
                            <div className="flex items-center gap-1"><Globe className="w-4 h-4" /> <a href={companyData.website} target="_blank" className="underline">{companyData.website}</a></div>
                            <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {companyData.employees} employees</div>
                            <div className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {companyData.jobsPosted} jobs posted</div>
                        </div>
                    </div>

                    {/* Related Companies */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Related Companies</h3>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {["InnoTech Solutions", "CloudNet Inc.", "AI Dynamics", "NextGen Labs"].map(c => (
                                <li key={c} className="hover:text-indigo-600 cursor-pointer">{c}</li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-6 space-y-2">
                    {/* Tabs */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow flex justify-around p-2 sticky top-6 z-10">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as any)}
                                className={`py-2 px-4 rounded-lg font-medium transition ${activeTab === tab.key ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-100" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800"}`}
                            >
                                {tab.label} {tab.key === "jobs" && `(${companyData.jobsPosted})`}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {/* About */}
                        {activeTab === "about" && (
                            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-6 space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mission</h3>
                                <p className="text-gray-700 dark:text-gray-300">{companyData.mission}</p>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Core Values</h3>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                                    {companyData.values.map(v => <li key={v}>{v}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Jobs */}
                        {activeTab === "jobs" && (
                            <div className="grid md:grid-cols-2 gap-2">
                                {jobListings.map(job => (
                                    <div key={job.id} onClick={() => addToast(`Applied to ${job.title}`, "success")} className="p-4 rounded-2xl bg-white dark:bg-neutral-900 shadow hover:shadow-xl transition cursor-pointer">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{job.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{job.location}</p>
                                        <span className="mt-2 inline-block px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100">{job.type}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Reviews */}
                        {activeTab === "reviews" && (
                            <div className="space-y-2">
                                {reviews.map((review, idx) => (
                                    <div key={idx} className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold text-gray-900 dark:text-white">{review.name}</span>
                                            <span className="flex text-yellow-500">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="w-4 h-4" />)}</span>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Media */}
                        {activeTab === "media" && (
                            <div className="columns-2 md:columns-3 gap-4 space-y-4 [&>img]:mb-4 [&>img]:break-inside-avoid">
                                {mediaImages.map((img, idx) => (
                                    <img key={idx} src={img} alt={`media-${idx}`} className="w-full rounded-lg object-cover shadow hover:scale-105 transition" />
                                ))}
                            </div>
                        )}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="lg:col-span-3 space-y-2">
                    {/* Team Members */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Team Members</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            {["Alice Johnson", "Bob Smith", "Clara Lee"].map((m, i) => (
                                <li key={i} className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                                    <img src={`https://source.unsplash.com/40x40/?face,${i + 1}`} className="w-6 h-6 rounded-full" />
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Upcoming Events</h3>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {["AI Conference 2025", "Tech Expo San Francisco", "Cloud Summit Online"].map(e => <li key={e} className="hover:text-indigo-600 cursor-pointer">{e}</li>)}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

"use client";
import { useState } from "react";
import Bread from "@/app/components/Bread";
import { MapPin, Briefcase, Clock, Wallet, Table, TableIcon, LayoutDashboardIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/useToast";
import { ToastContainer } from "@/app/components/Toast";
import Link from "next/link";

export default function JobDetailPage() {
    const router = useRouter();
    const { toasts, addToast, removeToast } = useToast();
    const [activeTab, setActiveTab] = useState<"job" | "company">("job");

    const [viewType, setViewType] = useState<"card" | "table">("card");

    // 👇 Central applicants array


    const companyReviews = [
        { name: "Ananya Roy", role: "Software Engineer", rating: 5, review: "Great work culture and learning opportunities!" },
        { name: "Rohit Mehra", role: "Product Manager", rating: 4, review: "Flexible hours and supportive management." },
        { name: "Sana Khan", role: "UX Designer", rating: 4, review: "Innovative projects and friendly colleagues." },
    ];

    const relatedJobs = [
        { title: "Frontend Developer", company: "PixelCraft", location: "Bangalore, India", salary: "₹12–15 LPA", type: "Full-time" },
        { title: "UI/UX Designer", company: "Designify", location: "Remote", salary: "₹10–14 LPA", type: "Contract" },
        { title: "React Native Engineer", company: "MobileHub", location: "Mumbai, India", salary: "₹14–18 LPA", type: "Full-time" },
    ];

    const activityFeed = [
        { id: 1, action: "You applied for Cloud Engineer @Google", date: "2 days ago" },
        { id: 2, action: "Your application to Stripe was viewed", date: "5 days ago" },
        { id: 3, action: "Recommended new role: AI Engineer @Amazon", date: "1 week ago" },
    ];

    return (
        <div className="bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white font-sans">
            {/* Breadcrumb */}
            <Bread
                company="Google"
                jobTitle="Senior Frontend Engineer"
                onBack={() => router.push("/jobs")}
                onApply={() => addToast("Job applied successfully!", "success")}
            />

            {/* Banner */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                <video src="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative h-full flex items-end px-6 pb-4">
                    <div className="flex items-center gap-4">
                        <Link href="/companies/1" className="w-16 h-16 rounded-lg bg-white dark:bg-neutral-900 flex items-center justify-center shadow">
                            <img src="https://static.vecteezy.com/system/resources/previews/029/284/964/original/google-logo-on-transparent-background-popular-search-engine-google-logotype-symbol-icon-google-sign-stock-free-vector.jpg" alt="" className="rounded-full p-2" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Google</h1>
                            <p className="text-sm text-gray-200">50,000+ Employees · AI & Cloud</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="mx-auto py-2 grid lg:grid-cols-12 gap-2">
                {/* Left Sidebar */}
                <aside className="lg:col-span-3 space-y-2">
                    {/* Quick Info */}
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                        <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
                        <ul className="space-y-2 text-base leading-relaxed">
                            <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-gray-500" /> Remote (India)</li>
                            <li className="flex items-center gap-3"><Wallet className="w-5 h-5 text-gray-500" /> ₹18–22 LPA</li>
                            <li className="flex items-center gap-3"><Clock className="w-5 h-5 text-gray-500" /> Full-time</li>
                            <li className="flex items-center gap-3"><Briefcase className="w-5 h-5 text-gray-500" /> 5+ years experience</li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-500">Posted 2 days ago</p>
                    </div>

                    {/* More Jobs */}
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                        <h2 className="text-lg font-semibold mb-4">More Jobs from Google</h2>
                        <div className="space-y-4">
                            {relatedJobs.map((job, i) => (
                                <div key={i} className="p-4 rounded-lg border bg-gray-50 dark:bg-neutral-800 border-gray-200 dark:border-neutral-800 hover:shadow-sm transition">
                                    <h3 className="text-base font-medium">{job.title}</h3>
                                    <p className="text-sm text-gray-500">{job.company}</p>
                                    <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                        <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</p>
                                        <p className="flex items-center gap-2"><Wallet className="w-4 h-4" /> {job.salary}</p>
                                        <p className="flex items-center gap-2"><Clock className="w-4 h-4" /> {job.type}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-6 space-y-2">
                    {/* Job Header */}
                    <header className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                        <h1 className="text-2xl font-bold">Senior Frontend Engineer</h1>
                        <p className="mt-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                            Build modern web applications with cutting-edge frontend technologies.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {["React", "Next.js", "TypeScript", "UI/UX", "Cypress"].map((tag) => (
                                <span key={tag} className="px-3 py-1 text-sm rounded-full border border-gray-200 dark:border-neutral-700 bg-blue-50 dark:bg-neutral-900 text-blue-700 dark:text-gray-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Tabs */}
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                        <div className="flex gap-6 border-b border-gray-200 dark:border-neutral-800 mb-4">
                            <button
                                className={`pb-2 font-medium ${activeTab === "job" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                                onClick={() => setActiveTab("job")}
                            >
                                Job Details
                            </button>
                            <button
                                className={`pb-2 font-medium ${activeTab === "company" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                                onClick={() => setActiveTab("company")}
                            >
                                Company Overview
                            </button>
                        </div>

                        {activeTab === "job" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        We are looking for a skilled frontend engineer to join our growing team.
                                        You will work closely with designers and backend developers to deliver
                                        delightful user experiences.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
                                    <ul className="list-disc list-inside text-base text-gray-600 dark:text-gray-400 space-y-1 leading-relaxed">
                                        <li>Develop high-quality, scalable web apps</li>
                                        <li>Collaborate with designers and backend engineers</li>
                                        <li>Ensure performance and responsiveness</li>
                                        <li>Write clean, maintainable code with tests</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                                    <ul className="list-disc list-inside text-base text-gray-600 dark:text-gray-400 space-y-1 leading-relaxed">
                                        <li>5+ years of frontend development experience</li>
                                        <li>Strong skills in React & TypeScript</li>
                                        <li>Experience with testing frameworks</li>
                                        <li>Understanding of UI/UX principles</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        {activeTab === "company" && (
                            <div className="space-y-6">
                                {/* About */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">About the Company</h3>
                                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Google is a global leader in AI, Cloud, and consumer technologies.
                                        With a focus on innovation, it empowers billions of users worldwide.
                                    </p>
                                </div>

                                {/* Culture & Perks */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Culture & Perks</h3>
                                    <ul className="list-disc list-inside text-base text-gray-600 dark:text-gray-400 space-y-1 leading-relaxed">
                                        <li>Flexible work hours & hybrid options</li>
                                        <li>Health insurance & wellness programs</li>
                                        <li>Learning budget & mentorship programs</li>
                                        <li>Stock options & performance bonuses</li>
                                    </ul>
                                </div>

                                {/* Reviews */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Employee Reviews</h3>
                                    <div className="space-y-4">
                                        {companyReviews.map((review, i) => (
                                            <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800">
                                                <p className="font-medium">{review.name} ({review.role})</p>
                                                <p className="text-yellow-500">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
                                                <p className="text-gray-600 dark:text-gray-400 mt-1">{review.review}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="lg:col-span-3 space-y-2 self-start sticky top-36">
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                        <h2 className="text-lg font-semibold mb-4">Hiring Team</h2>
                        <div className="space-y-2">
                            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg flex gap-4">
                                <img src="https://s-media-cache-ak0.pinimg.com/originals/c9/4b/49/c94b49ab19a1fe29d647b638981f5275.jpg" alt="" className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-medium text-base">Aditi Sharma</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">HR Manager</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg flex gap-4">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-medium text-base">Raj Mehta</p>
                                    <p className="text-sm text-gray-500">Engineering Lead</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                        <ul className="space-y-3">
                            {activityFeed.map((item) => (
                                <li key={item.id} className="text-base text-gray-700 dark:text-neutral-300 leading-relaxed">
                                    <span className="font-medium">{item.action}</span>
                                    <p className="text-sm text-gray-500 dark:text-neutral-400">{item.date}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>

            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
}

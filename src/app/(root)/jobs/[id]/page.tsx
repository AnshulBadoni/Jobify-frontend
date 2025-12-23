"use client";
import { useState } from "react";
import Bread from "@/app/components/Bread";
import {
    MapPin,
    Briefcase,
    Clock,
    Wallet,
    Users,
    BarChart,
    Filter,
    Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/useToast";
import { ToastContainer } from "@/app/components/Toast";

export default function JobPostDashboard() {
    const router = useRouter();
    const { toasts, addToast, removeToast } = useToast();

    const [activeTab, setActiveTab] = useState<"overview" | "applicants" | "company">("overview");
    const [viewType, setViewType] = useState<"card" | "table">("card");

    // 🔹 Dummy Data
    const applicants = [
        { name: "Sarah Chen", role: "Frontend Engineer", match: 92, experience: "6 yrs" },
        { name: "Michael Rodriguez", role: "React Developer", match: 87, experience: "5 yrs" },
        { name: "Emily Thompson", role: "UI Engineer", match: 83, experience: "4 yrs" },
    ];

    const recentActivity = [
        { id: 1, action: "New application received: Sarah Chen", date: "1 hour ago" },
        { id: 2, action: "Candidate shortlisted: Michael Rodriguez", date: "5 hours ago" },
        { id: 3, action: "Job performance updated", date: "Yesterday" },
    ];

    const jobMetrics = [
        { label: "Total Views", value: 612 },
        { label: "Total Applicants", value: 142 },
        { label: "Shortlisted", value: 18 },
        { label: "Interviews Scheduled", value: 9 },
    ];

    return (
        <div className="bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white font-sans">

            {/* Top Section (Breadcrumb + Actions) */}
            <Bread
                company="Google"
                jobTitle="Senior Frontend Engineer"
                onBack={() => router.push("/dashboard/jobs")}
                onApply={() => addToast("Job updated successfully!", "success")}
            // actionLabel="Edit Job"
            />

            {/* Banner */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                <img
                    src="/banner-tech.webp"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="banner"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative h-full flex items-end px-6 pb-4">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/029/284/964/original/google-logo-on-transparent-background-popular-search-engine-google-logotype-symbol-icon-google-sign-stock-free-vector.jpg"
                            className="w-16 h-16 rounded-lg bg-white p-2 shadow"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-white">Senior Frontend Engineer</h1>
                            <p className="text-sm text-gray-200">Posted 2 days ago · 142 Applicants</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="mx-auto py-6 grid lg:grid-cols-12 gap-6">

                {/* LEFT SIDEBAR */}
                <aside className="lg:col-span-3 space-y-6">
                    {/* Job Summary */}
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                        <h3 className="text-lg font-semibold mb-4">Job Summary</h3>
                        <ul className="space-y-3 text-sm leading-relaxed">
                            <li className="flex items-center gap-3"><MapPin /> Remote (India)</li>
                            <li className="flex items-center gap-3"><Wallet /> ₹18–22 LPA</li>
                            <li className="flex items-center gap-3"><Clock /> Full-time</li>
                            <li className="flex items-center gap-3"><Briefcase /> Senior Role</li>
                        </ul>
                    </div>

                    {/* Analytics */}
                    <div className="p-6 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                        <h3 className="text-lg font-semibold mb-4">Performance</h3>
                        <div className="space-y-4">
                            {jobMetrics.map((m, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">{m.label}</span>
                                    <span className="font-semibold">{m.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="lg:col-span-6 space-y-6">
                    {/* Tabs */}
                    <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
                        <div className="flex gap-6 border-b border-gray-200 dark:border-neutral-800 pb-2">
                            {["overview", "applicants", "company"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setActiveTab(t as any)}
                                    className={`pb-2 font-medium ${activeTab === t
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                                        }`}
                                >
                                    {t === "applicants" ? `Applicants (${applicants.length})` : t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* TAB: OVERVIEW */}
                        {activeTab === "overview" && (
                            <div className="mt-4 space-y-6">
                                <section>
                                    <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        This role focuses on building large-scale UI systems with React and Next.js.
                                        You'll collaborate with cross-functional teams to design scalable features.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["React", "Next.js", "TypeScript", "Cypress", "Design Systems"].map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 text-xs rounded-full border bg-blue-50 dark:bg-neutral-800 text-blue-700 dark:text-gray-300"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* TAB: APPLICANTS */}
                        {activeTab === "applicants" && (
                            <div className="mt-4 space-y-6">

                                {/* Toolbar */}
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                            <input
                                                placeholder="Search candidates..."
                                                className="w-full pl-10 py-2 rounded-lg border bg-gray-50 dark:bg-neutral-800 text-sm"
                                            />
                                        </div>
                                        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                                            <Filter size={16} /> Filter
                                        </button>
                                    </div>

                                    {/* Export Button */}
                                    <button
                                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Export CSV
                                    </button>
                                </div>

                                {/* Applicant Cards */}
                                <div className="space-y-4">
                                    {applicants.map((candidate, index) => (
                                        <div
                                            key={index}
                                            className="group p-5 rounded-xl border bg-gray-50 dark:bg-neutral-800 hover:shadow-xl hover:border-blue-500 transition duration-200"
                                        >
                                            <div className="flex justify-between items-center">

                                                {/* Candidate Info */}
                                                <div>
                                                    <h4 className="text-lg font-semibold">{candidate.name}</h4>
                                                    <p className="text-sm text-gray-500">
                                                        {candidate.role} · {candidate.experience}
                                                    </p>
                                                </div>

                                                {/* AI Score Badge */}
                                                <span
                                                    className="px-3 py-1 text-xs font-semibold bg-green-100 dark:bg-neutral-700 text-green-700 rounded-full"
                                                >
                                                    AI Match: {candidate.match}%
                                                </span>
                                            </div>

                                            {/* Divider */}
                                            <div className="h-[1px] my-4 w-full bg-gray-200 dark:bg-neutral-700"></div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3">
                                                <button className="px-4 py-2 rounded-lg text-sm border hover:bg-blue-50 dark:hover:bg-neutral-700 transition">
                                                    View Profile
                                                </button>

                                                <button className="px-4 py-2 rounded-lg text-sm border hover:bg-yellow-50 dark:hover:bg-neutral-700 transition">
                                                    Shortlist
                                                </button>

                                                <button className="px-4 py-2 rounded-lg text-sm border hover:bg-purple-50 dark:hover:bg-neutral-700 transition">
                                                    Schedule Interview
                                                </button>

                                                <button className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-200 dark:hover:bg-neutral-700 transition">
                                                    Message
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* TAB: COMPANY */}
                        {activeTab === "company" && (
                            <div className="mt-4 text-sm space-y-4 text-gray-600 dark:text-gray-400">
                                <p>Google is a global pioneer in AI and advanced engineering...</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* RIGHT SIDEBAR */}
                <aside className="lg:col-span-3 space-y-6 sticky top-32">
                    <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
                        <h3 className="text-lg font-semibold mb-4">Recent Hiring Activity</h3>
                        {recentActivity.map((item) => (
                            <div key={item.id} className="border-l-4 border-blue-500 pl-3 py-2 text-sm">
                                <p className="font-medium">{item.action}</p>
                                <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
}

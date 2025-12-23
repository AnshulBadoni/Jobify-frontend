"use client";
import React, { useState, useMemo } from "react";
import Header from "@/app/components/Header";
import {
    LayoutGrid, List, Search, Filter,
    ArrowUpRight, ArrowDownRight, Target,
    Briefcase, Calendar, MessageSquare,
    ChevronRight, CheckCircle2, XCircle,
    BarChart3, Clock, MapPin, DollarSign,
    PieChart, TrendingUp, Zap
} from "lucide-react";

// --- MOCK DATA ---

const kpiData = [
    { label: "Applications", value: 142, trend: "+12%", status: "up" },
    { label: "Response Rate", value: "18.5%", trend: "+2.4%", status: "up" },
    { label: "Active Interviews", value: 8, trend: "3 this week", status: "neutral" },
    { label: "Offers Received", value: 1, trend: "Pending", status: "success" },
];

// Weekly activity data
const activityData = [
    { day: "Mon", val: 4 }, { day: "Tue", val: 12 }, { day: "Wed", val: 8 },
    { day: "Thu", val: 6 }, { day: "Fri", val: 15 }, { day: "Sat", val: 3 }, { day: "Sun", val: 1 }
];

// Pipeline Funnel
const funnelData = [
    { label: "Applied", count: 142, percent: 100, color: "bg-slate-300 dark:bg-neutral-700" },
    { label: "Screening", count: 45, percent: 32, color: "bg-indigo-500" },
    { label: "Interview", count: 18, percent: 12, color: "bg-violet-500" },
    { label: "Offer", count: 1, percent: 0.7, color: "bg-emerald-500" },
];

const roleData = [
    { label: "Frontend Dev", percent: 45, color: "bg-blue-600" },
    { label: "Product Design", percent: 30, color: "bg-purple-500" },
    { label: "Backend Eng", percent: 25, color: "bg-gray-400" },
];

const applications = [
    { id: 1, company: "Linear", role: "Product Designer", logo: "https://logo.clearbit.com/linear.app", status: "Interview", salary: "$180k", updated: "2h ago", stage: "Portfolio Review", location: "Remote" },
    { id: 2, company: "Airbnb", role: "Frontend Engineer", logo: "https://logo.clearbit.com/airbnb.com", status: "Screening", salary: "$210k", updated: "5h ago", stage: "Recruiter Call", location: "San Francisco" },
    { id: 3, company: "Vercel", role: "DevRel Manager", logo: "https://logo.clearbit.com/vercel.com", status: "Offer", salary: "$160k + Equity", updated: "1d ago", stage: "Negotiation", location: "Remote" },
    { id: 4, company: "Stripe", role: "Backend Engineer", logo: "https://logo.clearbit.com/stripe.com", status: "Applied", salary: "$190k", updated: "2d ago", stage: "Resume Review", location: "New York" },
    { id: 5, company: "Netflix", role: "UX Researcher", logo: "https://logo.clearbit.com/netflix.com", status: "Rejected", salary: "-", updated: "3d ago", stage: "Archived", location: "Los Gatos" },
    { id: 6, company: "Notion", role: "Core Engineer", logo: "https://logo.clearbit.com/notion.so", status: "Interview", salary: "$185k", updated: "4d ago", stage: "System Design", location: "San Francisco" },
    { id: 7, company: "Shopify", role: "Fullstack Dev", logo: "https://logo.clearbit.com/shopify.com", status: "Applied", salary: "$140k", updated: "5d ago", stage: "Resume Review", location: "Remote" },
    { id: 8, company: "OpenAI", role: "Research Scientist", logo: "https://logo.clearbit.com/openai.com", status: "Screening", salary: "$350k", updated: "1w ago", stage: "Intro Call", location: "San Francisco" },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
    let styles = "";
    switch (status) {
        case "Applied": styles = "bg-slate-200 text-slate-700 dark:bg-neutral-700 dark:text-slate-300"; break;
        case "Screening": styles = "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"; break;
        case "Interview": styles = "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"; break;
        case "Offer": styles = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"; break;
        case "Rejected": styles = "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"; break;
    }
    return <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide ${styles}`}>{status}</span>;
};

// Fixed Velocity Chart Component
const VelocityChart = () => {
    // Find max value to scale the bars properly
    const maxVal = Math.max(...activityData.map(d => d.val));

    return (
        <div className="h-40 flex items-end gap-2 mt-4 pb-2 border-b border-gray-200 dark:border-neutral-800">
            {activityData.map((d, i) => {
                // Calculate height percentage, ensure at least 5% height so 0 isn't invisible
                const heightPercent = d.val > 0 ? (d.val / maxVal) * 100 : 5;

                return (
                    <div key={i} className="flex-1 flex flex-col justify-end group h-full">
                        <div className="relative w-full flex flex-col justify-end h-full">
                            {/* Tooltip */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded z-10 whitespace-nowrap">
                                {d.val} Apps
                            </div>

                            {/* The Bar */}
                            <div
                                className={`w-full rounded-t-md transition-all duration-500 ${d.val > 0 ? 'bg-indigo-500 dark:bg-indigo-600 group-hover:bg-indigo-400' : 'bg-gray-200 dark:bg-neutral-800'}`}
                                style={{ height: `${heightPercent}%` }}
                            ></div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 text-center mt-2 uppercase">{d.day}</span>
                    </div>
                )
            })}
        </div>
    );
};

export default function ActivityAnalyticsPage() {
    // State
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [timeRange, setTimeRange] = useState("7d");

    // Logic
    const filteredApps = useMemo(() => {
        return applications.filter(app => {
            const matchesStatus = filter === "All" || app.status === filter;
            const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.role.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [filter, searchQuery]);

    return (
        <section className="font-sans min-h-screen  dark:text-white">
            <div className="mx-auto space-y-2">


                {/* --- 1. ANALYTICS BENTO GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">

                    {/* KPI Cards - GREY BACKGROUND IN LIGHT MODE */}
                    {kpiData.map((kpi, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col justify-between h-36 shadow-sm">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{kpi.label}</span>
                                {kpi.status === 'up' && <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/20 rounded text-emerald-600"><ArrowUpRight className="w-5 h-5" /></div>}
                                {kpi.status === 'success' && <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/20 rounded text-indigo-600"><CheckCircle2 className="w-5 h-5" /></div>}
                            </div>
                            <div>
                                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{kpi.value}</h3>
                                <p className="text-sm text-gray-500 mt-1 font-medium">{kpi.trend}</p>
                            </div>
                        </div>
                    ))}

                    {/* Velocity Chart (Span 2) - GREY BACKGROUND */}
                    <div className="lg:col-span-2 bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg text-indigo-600">
                                    <BarChart3 className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-base text-gray-900 dark:text-white">Application Velocity</h3>
                            </div>
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-xs font-bold rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-gray-50 transition"
                            >
                                <option value="7d">Last 7 Days</option>
                                <option value="30d">Last 30 Days</option>
                            </select>
                        </div>

                        {/* The Fixed Chart */}
                        <VelocityChart />
                    </div>

                    {/* Funnel (Span 1) */}
                    <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600">
                                <Filter className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white">Pipeline</h3>
                        </div>
                        <div className="space-y-5">
                            {funnelData.map((stage, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs uppercase font-bold text-gray-500 mb-2">
                                        <span>{stage.label}</span>
                                        <span className="text-gray-900 dark:text-white">{stage.count}</span>
                                    </div>
                                    <div className="w-full bg-white dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden border border-gray-100 dark:border-neutral-700">
                                        <div className={`h-full ${stage.color} rounded-full`} style={{ width: `${stage.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Target Roles (Span 1) */}
                    <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg text-purple-600">
                                <Target className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-base text-gray-900 dark:text-white">Target Roles</h3>
                        </div>

                        <div className="space-y-4">
                            {roleData.map((role, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <span>{role.label}</span>
                                        <span className="font-bold">{role.percent}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white dark:bg-neutral-800 rounded-full overflow-hidden border border-gray-100 dark:border-neutral-700">
                                        <div className={`h-full ${role.color}`} style={{ width: `${role.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200 dark:border-neutral-800">
                            Based on your last 30 applications.
                        </p>
                    </div>
                </div>

                {/* --- 2. APPLICATION LIST --- */}
                <div className="flex flex-col lg:flex-row gap-2">

                    {/* MAIN CONTENT */}
                    <div className="flex-1 space-y-2">

                        {/* Toolbar - GREY CARD */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-2 bg-gray-50 dark:bg-[#111] p-3 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm">

                            {/* Status Tabs */}
                            <div className="flex p-1 bg-white dark:bg-neutral-900 rounded-xl overflow-x-auto max-w-full w-full md:w-auto scrollbar-hide border border-gray-100 dark:border-neutral-800">
                                {["All", "Applied", "Screening", "Interview", "Offer", "Rejected"].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setFilter(tab)}
                                        className={`px-5 py-2 text-sm font-bold rounded-lg transition whitespace-nowrap ${filter === tab
                                            ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white shadow-sm"
                                            : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 w-full md:w-auto">
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search company or role..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    />
                                </div>

                                <div className="hidden md:flex bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-gray-100 dark:bg-neutral-800 shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-neutral-800 shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        <LayoutGrid className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* View Container - GREY CARD */}
                        <div className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden min-h-[500px]">

                            {/* TABLE VIEW */}
                            <div className={`${viewMode === 'list' ? 'hidden md:block' : 'hidden'}`}>
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-neutral-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            <th className="px-6 py-4">Company & Role</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Stage Detail</th>
                                            <th className="px-6 py-4">Compensation</th>
                                            <th className="px-6 py-4 text-right">Last Update</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
                                        {filteredApps.map((app) => (
                                            <tr key={app.id} className="group hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-10 h-10 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white p-1.5 flex items-center justify-center shadow-sm">
                                                            <img src={app.logo} alt="" className="w-full h-full object-contain" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-sm text-gray-900 dark:text-white">{app.role}</div>
                                                            <div className="text-xs text-gray-500 font-medium">{app.company}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={app.status} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {app.status === 'Interview' && <Calendar className="w-4 h-4 text-indigo-500" />}
                                                        {app.status === 'Offer' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                                        {app.stage}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    {app.salary}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <span className="text-sm text-gray-500">{app.updated}</span>
                                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition" />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* GRID VIEW */}
                            <div className={`${viewMode === 'grid' ? 'block' : 'block md:hidden'} p-4`}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {filteredApps.map((app) => (
                                        <div key={app.id} className="p-5 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all cursor-pointer group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-2">
                                                    <img src={app.logo} className="w-12 h-12 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white p-2 object-contain shadow-sm" />
                                                    <div>
                                                        <h4 className="font-bold text-base text-gray-900 dark:text-white">{app.role}</h4>
                                                        <p className="text-sm text-gray-500">{app.company}</p>
                                                    </div>
                                                </div>
                                                <StatusBadge status={app.status} />
                                            </div>
                                            <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-neutral-800">
                                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center gap-2">
                                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                                        {app.salary}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-gray-400" />
                                                        {app.location}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pt-2">
                                                    <span className="text-xs font-medium text-gray-400">{app.stage}</span>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4 text-gray-400" />
                                                        <span className="text-xs">{app.updated}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Empty State */}
                            {filteredApps.length === 0 && (
                                <div className="p-16 text-center">
                                    <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100 dark:border-neutral-700">
                                        <Search className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white">No applications found</h3>
                                    <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search terms</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="w-full lg:w-80 max-h-96 space-y-2">
                        {/* Recent Activity - GREY CARD */}
                        <div className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm h-full sticky top-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-base text-gray-900 dark:text-white">Recent Activity</h3>
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                            </div>

                            <div className="space-y-2 relative pl-2">
                                <div className="absolute left-[16px] top-2 bottom-2 w-px bg-gray-200 dark:bg-neutral-800"></div>
                                {[
                                    { text: "Linear scheduled Review", time: "2h ago", icon: Calendar, color: "bg-indigo-500" },
                                    { text: "Vercel sent Offer", time: "1d ago", icon: CheckCircle2, color: "bg-emerald-500" },
                                    { text: "Airbnb Viewed App", time: "5h ago", icon: ArrowUpRight, color: "bg-blue-500" },
                                    { text: "Note added to Stripe", time: "2d ago", icon: MessageSquare, color: "bg-gray-400" },
                                ].map((item, i) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={i} className="relative pl-8 group cursor-pointer">
                                            <div className={`absolute left-0 top-0 w-5 h-5 rounded-full ${item.color} border-2 border-white dark:border-neutral-900 flex items-center justify-center z-10`}>
                                                <Icon className="w-2.5 h-2.5 text-white" />
                                            </div>
                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight group-hover:text-indigo-600 transition-colors">{item.text}</p>
                                            <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <button className="w-full mt-8 py-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                                View Full History
                            </button>
                        </div>
                    </aside>

                </div>
            </div>
        </section>
    );
}
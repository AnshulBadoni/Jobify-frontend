"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    MapPin, Briefcase, Clock, Wallet, TrendingUp, Users, Eye,
    ArrowLeft, Edit, Share2, MoreHorizontal, Search, Filter,
    Activity, ArrowUpRight, ArrowDownRight, Calendar, Building,
    CheckCircle, XCircle, Clock4, FileText, Mail, Phone, Download,
    ChevronRight, Star, Award, Target, Zap, BarChart3
} from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from "recharts";

export default function JobDetailPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "candidates" | "workflow">("overview");

    // Data
    const performanceData = [
        { day: "Mon", views: 45, applications: 12, interviews: 4 },
        { day: "Tue", views: 67, applications: 18, interviews: 6 },
        { day: "Wed", views: 89, applications: 24, interviews: 8 },
        { day: "Thu", views: 120, applications: 35, interviews: 12 },
        { day: "Fri", views: 156, applications: 45, interviews: 15 },
        { day: "Sat", views: 98, applications: 28, interviews: 9 },
        { day: "Sun", views: 76, applications: 19, interviews: 7 },
    ];

    const applicationStatusData = [
        { status: "Applied", count: 150, color: "#6366f1" },
        { status: "Screened", count: 98, color: "#8b5cf6" },
        { status: "Interview", count: 45, color: "#f59e0b" },
        { status: "Offer", count: 8, color: "#10b981" },
        { status: "Hired", count: 6, color: "#059669" },
    ];

    const candidates = [
        {
            id: 1,
            name: "Sarah Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            match: 95,
            experience: "6 years",
            status: "interview",
            location: "Bangalore",
            skills: ["React", "TypeScript", "Next.js"],
            lastActive: "2 hours ago",
            salary: "₹18-22 LPA",
            noticePeriod: "30 days",
            rating: 4.8
        },
        {
            id: 2,
            name: "Michael Rodriguez",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            match: 92,
            experience: "8 years",
            status: "screened",
            location: "Mumbai",
            skills: ["React", "Node.js", "AWS"],
            lastActive: "5 hours ago",
            salary: "₹20-25 LPA",
            noticePeriod: "15 days",
            rating: 4.6
        },
        {
            id: 3,
            name: "Emily Thompson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
            match: 88,
            experience: "5 years",
            status: "applied",
            location: "Delhi",
            skills: ["Vue.js", "JavaScript", "UI/UX"],
            lastActive: "1 day ago",
            salary: "₹15-18 LPA",
            noticePeriod: "60 days",
            rating: 4.4
        },
    ];

    const hiringStages = [
        { stage: "Applied", count: 150, active: true },
        { stage: "Screened", count: 98, active: true },
        { stage: "Round 1", count: 67, active: true },
        { stage: "Round 2", count: 45, active: true },
        { stage: "Final", count: 23, active: false },
        { stage: "Offer", count: 8, active: true },
        { stage: "Hired", count: 6, active: true },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "interview": return "from-blue-500 to-cyan-500";
            case "screened": return "from-purple-500 to-indigo-500";
            case "applied": return "from-gray-400 to-gray-500";
            default: return "from-gray-400 to-gray-500";
        }
    };

    const StatCard = ({ icon: Icon, label, value, trend, className = "" }: any) => (
        <div className={`group p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 hover:shadow-lg transition-all duration-300 ${className}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                    {trend && (
                        <p className={`text-xs font-medium mt-1 ${trend.includes('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {trend}
                        </p>
                    )}
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-neutral-950 dark:via-neutral-950 dark:to-blue-950/20">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
                <div className="relative">
                    <div className="px-6 pt-6">
                        <div className="flex items-center gap-4 mb-6">
                            <button
                                onClick={() => router.back()}
                                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-white">Senior Frontend Engineer</h1>
                                <p className="text-blue-100/80 text-sm">Google • Posted 2 days ago • 150 applicants</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm flex items-center gap-2 font-medium">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </button>
                                <button className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm flex items-center gap-2 font-medium">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 -mt-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-6 max-w-7xl mx-auto">

                    {/* Main Content */}
                    <main className="lg:col-span-8 space-y-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard
                                icon={Eye}
                                label="Total Views"
                                value="1,247"
                                trend="+12% this week"
                            />
                            <StatCard
                                icon={Users}
                                label="Applicants"
                                value="150"
                                trend="+8% this week"
                            />
                            <StatCard
                                icon={CheckCircle}
                                label="Shortlisted"
                                value="45"
                                trend="+15% this week"
                            />
                            <StatCard
                                icon={TrendingUp}
                                label="Match Rate"
                                value="78%"
                                trend="+5% this week"
                            />
                        </div>

                        {/* Content Card */}
                        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all duration-300">
                            {/* Tabs */}
                            <div className="border-b border-gray-100 dark:border-neutral-800">
                                <div className="flex gap-8 px-8">
                                    {[
                                        { id: "overview", label: "Overview", icon: BarChart3 },
                                        { id: "analytics", label: "Analytics", icon: Target },
                                        { id: "candidates", label: `Candidates`, icon: Users },
                                        { id: "workflow", label: "Workflow", icon: Zap }
                                    ].map((tab) => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={tab.id}
                                                className={`flex items-center gap-2 pb-4 font-medium border-b-2 transition-all duration-200 ${activeTab === tab.id
                                                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                                                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                                    }`}
                                                onClick={() => setActiveTab(tab.id as any)}
                                            >
                                                <Icon className="w-4 h-4" />
                                                {tab.label}
                                                {tab.id === "candidates" && (
                                                    <span className="px-1.5 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                                                        150
                                                    </span>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <div className="p-8">
                                {/* Overview Tab */}
                                {activeTab === "overview" && (
                                    <div className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                                        <Building className="w-5 h-5 text-blue-600" />
                                                        Job Details
                                                    </h3>
                                                    <div className="space-y-4">
                                                        {[
                                                            { icon: Building, label: "Department", value: "Engineering" },
                                                            { icon: MapPin, label: "Location", value: "Bangalore, India (Remote)" },
                                                            { icon: Wallet, label: "Salary Range", value: "₹18-30 LPA" },
                                                            { icon: Clock, label: "Employment Type", value: "Full-time" }
                                                        ].map((item, index) => (
                                                            <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/50">
                                                                <item.icon className="w-4 h-4 text-gray-500" />
                                                                <div>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                                                                    <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                                    <Award className="w-5 h-5 text-emerald-600" />
                                                    Key Metrics
                                                </h3>
                                                <div className="space-y-3">
                                                    {[
                                                        { label: "Time to Hire", value: "18 days", trend: "positive" },
                                                        { label: "Cost per Hire", value: "₹84,500", trend: "neutral" },
                                                        { label: "Offer Acceptance", value: "85%", trend: "positive" }
                                                    ].map((metric, index) => (
                                                        <div key={index} className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-neutral-800/50 dark:to-neutral-800 border border-gray-100 dark:border-neutral-700">
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.label}</span>
                                                            <span className={`font-bold ${metric.trend === 'positive' ? 'text-emerald-600' :
                                                                metric.trend === 'negative' ? 'text-rose-600' :
                                                                    'text-gray-900 dark:text-white'
                                                                }`}>
                                                                {metric.value}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Job Description</h3>
                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                    We are looking for a skilled frontend engineer to join our growing team.
                                                    You will work closely with designers and backend developers to deliver
                                                    delightful user experiences that push the boundaries of modern web applications.
                                                </p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                        <Target className="w-4 h-4 text-blue-600" />
                                                        Responsibilities
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {["Develop high-quality, scalable web applications", "Collaborate with designers and backend engineers", "Ensure performance and responsiveness", "Write clean, maintainable code with tests"].map((item, index) => (
                                                            <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                                        Requirements
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {["5+ years of frontend development experience", "Strong skills in React & TypeScript", "Experience with testing frameworks", "Understanding of UI/UX principles"].map((item, index) => (
                                                            <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Skills</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {["React", "Next.js", "TypeScript", "UI/UX", "Cypress", "Jest", "GraphQL", "AWS"].map((tag) => (
                                                        <span key={tag} className="px-3 py-1.5 text-sm rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Analytics Tab */}
                                {activeTab === "analytics" && (
                                    <div className="space-y-8">
                                        {/* Application Funnel */}
                                        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-neutral-800/50 dark:to-neutral-800 rounded-2xl p-6 border border-gray-100 dark:border-neutral-700">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Application Funnel</h3>
                                            <div className="h-64">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={applicationStatusData}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                                        <XAxis dataKey="status" stroke="#9ca3af" style={{ fontSize: '13px' }} />
                                                        <YAxis stroke="#9ca3af" style={{ fontSize: '13px' }} />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                                border: '1px solid #e5e7eb',
                                                                borderRadius: '12px',
                                                                backdropFilter: 'blur(8px)'
                                                            }}
                                                        />
                                                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                                            {applicationStatusData.map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                                            ))}
                                                        </Bar>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        {/* Performance Chart */}
                                        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-neutral-800/50 dark:to-neutral-800 rounded-2xl p-6 border border-gray-100 dark:border-neutral-700">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Weekly Performance</h3>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <LineChart data={performanceData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                                    <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '13px' }} />
                                                    <YAxis stroke="#9ca3af" style={{ fontSize: '13px' }} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                            border: '1px solid #e5e7eb',
                                                            borderRadius: '12px',
                                                            backdropFilter: 'blur(8px)'
                                                        }}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="views"
                                                        stroke="#6366f1"
                                                        strokeWidth={3}
                                                        dot={{ fill: '#6366f1', r: 4 }}
                                                        activeDot={{ r: 6, fill: '#6366f1' }}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="applications"
                                                        stroke="#8b5cf6"
                                                        strokeWidth={3}
                                                        dot={{ fill: '#8b5cf6', r: 4 }}
                                                        activeDot={{ r: 6, fill: '#8b5cf6' }}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="interviews"
                                                        stroke="#10b981"
                                                        strokeWidth={3}
                                                        dot={{ fill: '#10b981', r: 4 }}
                                                        activeDot={{ r: 6, fill: '#10b981' }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                )}

                                {/* Candidates Tab */}
                                {activeTab === "candidates" && (
                                    <div className="space-y-6">
                                        {/* Search and Filter */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 relative">
                                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Search candidates..."
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                            <button className="p-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-all">
                                                <Filter className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Candidates List */}
                                        <div className="space-y-4">
                                            {candidates.map((candidate) => (
                                                <div key={candidate.id} className="group p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:shadow-lg transition-all duration-300">
                                                    <div className="flex items-start gap-4">
                                                        <div className="relative">
                                                            <img src={candidate.avatar} alt="" className="w-14 h-14 rounded-2xl" />
                                                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${getStatusColor(candidate.status)} border-2 border-white dark:border-neutral-900`} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between mb-3">
                                                                <div>
                                                                    <div className="flex items-center gap-3 mb-1">
                                                                        <h4 className="font-semibold text-gray-900 dark:text-white">{candidate.name}</h4>
                                                                        <div className="flex items-center gap-1">
                                                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{candidate.rating}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                                        <span className="flex items-center gap-1">
                                                                            <MapPin className="w-4 h-4" />
                                                                            {candidate.location}
                                                                        </span>
                                                                        <span>{candidate.experience}</span>
                                                                        <span>{candidate.salary}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{candidate.match}%</div>
                                                                    <div className="text-xs text-gray-500">Match Score</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex flex-wrap gap-2">
                                                                    {candidate.skills.map((skill, index) => (
                                                                        <span key={index} className="px-3 py-1 text-xs rounded-lg bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300">
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <button className="p-2 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all">
                                                                        <Mail className="w-4 h-4" />
                                                                    </button>
                                                                    <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all flex items-center gap-2">
                                                                        View Profile
                                                                        <ChevronRight className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Hiring Team */}
                        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-600" />
                                Hiring Team
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: "Alex Johnson", role: "Hiring Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
                                    { name: "Maria Garcia", role: "Recruiter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" },
                                    { name: "David Kim", role: "Tech Lead", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" }
                                ].map((member, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all">
                                        <img src={member.avatar} alt="" className="w-10 h-10 rounded-xl" />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-gray-900 dark:text-white">{member.name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{member.role}</p>
                                        </div>
                                        <button className="p-2 rounded-lg bg-white dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-600 transition-all">
                                            <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Candidates */}
                        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-gray-100 dark:border-neutral-800 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-amber-600" />
                                Top Candidates
                            </h3>
                            <div className="space-y-4">
                                {candidates.slice(0, 3).map((candidate, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-neutral-800/50 dark:to-neutral-800 border border-gray-100 dark:border-neutral-700 hover:shadow-md transition-all">
                                        <div className="relative">
                                            <img src={candidate.avatar} alt="" className="w-12 h-12 rounded-xl" />
                                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r ${getStatusColor(candidate.status)} border-2 border-white dark:border-neutral-900`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm text-gray-900 dark:text-white">{candidate.name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{candidate.match}% match • {candidate.experience}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white">
                            <h3 className="font-semibold mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: Mail, label: "Email Team" },
                                    { icon: Calendar, label: "Schedule" },
                                    { icon: Download, label: "Export" },
                                    { icon: Share2, label: "Share" }
                                ].map((action, index) => (
                                    <button key={index} className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all flex flex-col items-center gap-2">
                                        <action.icon className="w-5 h-5" />
                                        <span className="text-xs font-medium">{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
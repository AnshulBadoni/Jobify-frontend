"use client";
import { getMe, getProfile } from "@/app/api/profile";
import Input from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";
import { cryptoId } from "@/app/utility";
import { Download, X, Eye, MessageCircle, Calendar, Briefcase, Users, Building } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

type Position = {
    id: number;
    title: string;
    department: string;
    status: "Open" | "Closed" | "On Hold";
    applicants: number;
    date: string;
};

type Activity = {
    id: number;
    action: string;
    date: string;
    candidate?: string;
};

type TeamMember = {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    email: string;
};

type Company = {
    name: string;
    logo: string;
    industry: string;
    size: string;
    location: string;
    website: string;
    description: string;
};

export interface User {
    id: number;
    username: string;
    email: string;
    avatar?: string | null;
    role: "ADMIN" | "SEEKER" | "POSTER";
}

export interface RecruiterProfile {
    id: number;
    userId: number;
    professionalTitle?: string | null;
    fullName?: string | null;
    bio?: string | null;
    location?: string | null;
    company?: string | null;
    department?: string | null;
    hiringAuthority?: string | null;
    hiringNeeds?: string | null;
    createdAt: string;
    updatedAt: string;
    user: User;
}

const STORAGE_KEY = "saas_recruiter_profile_v1";

const RecruiterProfilePage = () => {
    const initialPositions: Position[] = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            department: "Engineering",
            status: "Open",
            applicants: 24,
            date: "Posted on Aug 30, 2025",
        },
        {
            id: 2,
            title: "Product Manager",
            department: "Product",
            status: "Open",
            applicants: 18,
            date: "Posted on Aug 27, 2025",
        },
        {
            id: 3,
            title: "UX Designer",
            department: "Design",
            status: "Closed",
            applicants: 32,
            date: "Posted on Aug 20, 2025",
        },
    ];

    const initialActivity: Activity[] = [
        { id: 1, action: "Reviewed Sarah Johnson's application", candidate: "Sarah Johnson", date: "Aug 30, 2025" },
        { id: 2, action: "Scheduled interview with Michael Chen", candidate: "Michael Chen", date: "Aug 28, 2025" },
        { id: 3, action: "Posted new position: Senior Frontend Developer", date: "Aug 27, 2025" },
        { id: 4, action: "Contacted 5 candidates for Product Manager role", date: "Aug 25, 2025" },
    ];

    const initialTeam: TeamMember[] = [
        {
            id: cryptoId(),
            name: "Jessica Williams",
            role: "Senior Recruiter",
            email: "jessica@company.com",
        },
        {
            id: cryptoId(),
            name: "David Kim",
            role: "Talent Acquisition Specialist",
            email: "david@company.com",
        },
        {
            id: cryptoId(),
            name: "Maria Rodriguez",
            role: "HR Manager",
            email: "maria@company.com",
        },
    ];

    const initialCompany: Company = {
        name: "TechNova Solutions",
        logo: "https://logo.clearbit.com/technova.com",
        industry: "Software Development",
        size: "201-500 employees",
        location: "San Francisco, CA",
        website: "www.technova.com",
        description: "Leading provider of enterprise SaaS solutions with a focus on AI-driven analytics and automation tools."
    };

    const [activePositions, setActivePositions] = useState<Position[]>(initialPositions);
    const [activityFeed, setActivityFeed] = useState<Activity[]>(initialActivity);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeam);
    const [company, setCompany] = useState<Company>(initialCompany);

    const [profile, setProfile] = useState<RecruiterProfile>({
        id: 0,
        userId: 0,
        fullName: "",
        bio: "",
        professionalTitle: "",
        location: "",
        company: "",
        department: "",
        hiringAuthority: "",
        hiringNeeds: "",
        createdAt: "",
        updatedAt: "",
        user: {
            id: 0,
            username: "",
            email: "",
            avatar: "",
            role: "POSTER",
        },
    });

    // Load from localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const saved = JSON.parse(raw);
                if (saved.profile) setProfile((p) => ({ ...p, ...saved.profile }));
                if (Array.isArray(saved.activePositions)) setActivePositions(saved.activePositions);
                if (Array.isArray(saved.activityFeed)) setActivityFeed(saved.activityFeed);
                if (Array.isArray(saved.teamMembers)) setTeamMembers(saved.teamMembers);
                if (saved.company) setCompany(saved.company);
            }
            fetchProfile();
        } catch { }
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getProfile();
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    // Save to localStorage on change (debounced)
    useEffect(() => {
        const payload = {
            profile,
            activePositions,
            activityFeed,
            teamMembers,
            company,
        };
        const t = setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        }, 250);
        return () => clearTimeout(t);
    }, [profile, activePositions, activityFeed, teamMembers, company]);

    // Modal state
    const [open, setOpen] = useState(false);
    const tabs = ["Basic Info", "Company", "Team", "Hiring Needs"] as const;
    type Tab = typeof tabs[number];
    const [activeTab, setActiveTab] = useState<Tab>("Basic Info");

    // Handlers
    function handleProfileChange<K extends keyof RecruiterProfile>(key: K, value: RecruiterProfile[K]) {
        setProfile((p) => ({ ...p, [key]: value }));
    }

    const handleNestedProfileChange = (parent: string, key: string, value: string) => {
        setProfile((prev: any) => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [key]: value,
            },
        }));
    };

    function handleCompanyChange<K extends keyof Company>(key: K, value: Company[K]) {
        setCompany((c) => ({ ...c, [key]: value }));
    }

    function addTeamMember() {
        setTeamMembers((prev) => [
            ...prev,
            { id: cryptoId(), name: "", role: "", email: "" },
        ]);
    }

    function updateTeamMember(id: string, key: keyof TeamMember, value: any) {
        setTeamMembers((prev) => prev.map((m) => (m.id === id ? { ...m, [key]: value } : m)));
    }

    function removeTeamMember(id: string) {
        setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    }

    function addPosition() {
        setActivePositions((prev) => [
            ...prev,
            { id: Date.now(), title: "", department: "", status: "Open", applicants: 0, date: "" },
        ]);
    }

    function updatePosition(id: number, key: keyof Position, value: any) {
        setActivePositions((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
    }

    function removePosition(id: number) {
        setActivePositions((prev) => prev.filter((p) => p.id !== id));
    }

    return (
        <section className="font-sans min-h-screen flex justify-center">
            <div className="grid lg:grid-cols-3 gap-2 w-full mx-auto">
                {/* Main Profile */}
                <div className="relative lg:col-span-2 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow animate-fade-in">
                    {/* Cover */}
                    <div className="relative h-44 bg-gradient-to-r from-blue-600 to-indigo-700">
                        <video
                            // src=""
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                        {/* Avatar & Stats */}
                        <div className="flex items-center justify-between px-8 pt-6">
                            <div>
                                <img
                                    className="absolute -bottom-16 left-10 w-32 h-32 rounded-full ring-4 ring-white dark:ring-neutral-900 object-cover"
                                    alt="Profile Avatar"
                                    src={profile?.user?.avatar || "https://s-media-cache-ak0.pinimg.com/originals/c9/4b/49/c94b49ab19a1fe29d647b638981f5275.jpg"}
                                />
                            </div>
                            {/* <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    { value: "24", label: "Active Positions", icon: Briefcase },
                                    { value: "156", label: "Candidates", icon: Users },
                                    { value: "89%", label: "Fill Rate", icon: Eye },
                                ].map((stat, idx) => (
                                    <div key={idx} className="text-center transform transition hover:scale-105">
                                        <div className="flex justify-center">
                                            <stat.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="text-xl font-bold text-white mt-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-blue-100">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="pt-20 px-8 pb-8">
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {profile?.fullName || profile?.user?.username}
                                </h1>
                                <p className="text-indigo-600 dark:text-indigo-400 mt-2 text-lg font-medium">
                                    {profile.professionalTitle} {profile.company && `@ ${profile.company}`}
                                </p>
                                <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-neutral-400">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {profile.location || "Remote"}
                                </div>
                                {profile.department && (
                                    <div className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                        Department: {profile.department}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setOpen(true)}
                                    className="px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-700 hover:to-indigo-600 transition-all"
                                >
                                    Edit Profile
                                </button>
                                <button className="px-5 py-2 text-sm font-medium rounded-xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all">
                                    <MessageCircle className="w-4 h-4 inline mr-2" />
                                    Message
                                </button>
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-8 mt-8">
                            {/* Bio */}
                            <div className="animate-fade-up">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">About Me</h2>
                                <p className="mt-3 text-gray-600 dark:text-neutral-400 leading-relaxed">
                                    {profile.bio || "Experienced recruiter specializing in tech talent acquisition with a focus on software engineering and product roles."}
                                </p>
                            </div>

                            {/* Hiring Authority */}
                            {profile.hiringAuthority && (
                                <div className="animate-fade-up delay-200">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Hiring Authority</h2>
                                    <p className="mt-3 text-gray-600 dark:text-neutral-400">
                                        {profile.hiringAuthority}
                                    </p>
                                </div>
                            )}

                            {/* Hiring Needs */}
                            {profile.hiringNeeds && (
                                <div className="animate-fade-up delay-300">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Current Hiring Needs</h2>
                                    <p className="mt-3 text-gray-600 dark:text-neutral-400">
                                        {profile.hiringNeeds}
                                    </p>
                                </div>
                            )}

                            {/* Active Positions */}
                            <div className="animate-fade-up delay-400">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Active Positions</h2>
                                <div className="grid gap-4">
                                    {activePositions.slice(0, 3).map((position) => (
                                        <div key={position.id} className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">{position.title}</h3>
                                                    <p className="text-sm text-gray-600 dark:text-neutral-400">{position.department}</p>
                                                </div>
                                                <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${position.status === "Open"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                    : position.status === "On Hold"
                                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                                    }`}>
                                                    {position.status}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center mt-3">
                                                <span className="text-sm text-gray-500 dark:text-neutral-400">
                                                    {position.applicants} applicants
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-neutral-400">
                                                    {position.date}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-2">
                    {/* Company Info */}
                    <aside className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-sm animate-fade-in delay-300">
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                                <Building className="w-5 h-5 mr-2" />
                                Company
                            </h2>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="w-12 h-12 rounded-lg object-contain mr-4 border border-gray-200 dark:border-neutral-700"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{company.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-neutral-400">{company.industry}</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-neutral-400">Size</span>
                                    <span className="text-gray-900 dark:text-white">{company.size}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-neutral-400">Location</span>
                                    <span className="text-gray-900 dark:text-white">{company.location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-neutral-400">Website</span>
                                    <a href={`https://${company.website}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                        {company.website}
                                    </a>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
                                <p className="text-sm text-gray-600 dark:text-neutral-400">{company.description}</p>
                            </div>
                        </div>
                    </aside>

                    {/* Team Members */}
                    <aside className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-sm animate-fade-in delay-300">
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                                <Users className="w-5 h-5 mr-2" />
                                Team Members
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-neutral-400">Your recruitment team</p>
                        </div>

                        <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
                            {teamMembers.map((member, i) => (
                                <li
                                    key={member.id}
                                    className="p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition animate-fade-up"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                >
                                    <div className="flex-shrink-0">
                                        {member.avatar ? (
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-medium">
                                                {member.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white block">
                                            {member.name}
                                        </span>
                                        <span className="text-xs text-gray-600 dark:text-neutral-300 block">{member.role}</span>
                                        <span className="text-xs text-gray-500 dark:text-neutral-400 block">{member.email}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Recent Activity */}
                    <aside className="rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-sm animate-fade-in delay-300">
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                                <Calendar className="w-5 h-5 mr-2" />
                                Recent Activity
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-neutral-400">Your recruitment actions</p>
                        </div>

                        <div className="p-6">
                            <div className="relative border-l border-gray-200 dark:border-neutral-700 ml-3">
                                {activityFeed.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className="mb-6 ml-6 group hover:bg-gray-50 dark:hover:bg-neutral-800 p-3 rounded-lg transition"
                                    >
                                        <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-indigo-500 text-white rounded-full text-xs font-bold ring-4 ring-white dark:ring-neutral-900">
                                            {idx + 1}
                                        </span>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.action}</p>
                                        {item.candidate && (
                                            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">Candidate: {item.candidate}</p>
                                        )}
                                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{item.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl" onClick={() => setOpen(false)} />
                    <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-lg animate-fade-in">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Recruiter Profile</h3>
                            <button
                                className="text-sm p-2 border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-full"
                                onClick={() => setOpen(false)}
                            >
                                <X className="size-4 text-black dark:text-white" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="px-6 pt-4">
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTab(t)}
                                        className={`px-3 py-1.5 rounded-md text-sm border ${activeTab === t
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto space-y-6">
                            {activeTab === "Basic Info" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label="Full Name"
                                        value={profile.fullName || ""}
                                        onChange={(v) => handleProfileChange("fullName", v)}
                                    />
                                    <Input
                                        label="Professional Title"
                                        value={profile.professionalTitle || ""}
                                        onChange={(v) => handleProfileChange("professionalTitle", v)}
                                    />
                                    <Input
                                        label="Location"
                                        value={profile.location || ""}
                                        onChange={(v) => handleProfileChange("location", v)}
                                    />
                                    <Input
                                        label="Department"
                                        value={profile.department || ""}
                                        onChange={(v) => handleProfileChange("department", v)}
                                    />
                                    <TextArea
                                        className="sm:col-span-2"
                                        label="Bio"
                                        value={profile.bio || ""}
                                        onChange={(v) => handleProfileChange("bio", v)}
                                    />
                                </div>
                            )}

                            {activeTab === "Company" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label="Company Name"
                                        value={company.name}
                                        onChange={(v) => handleCompanyChange("name", v)}
                                    />
                                    <Input
                                        label="Industry"
                                        value={company.industry}
                                        onChange={(v) => handleCompanyChange("industry", v)}
                                    />
                                    <Input
                                        label="Company Size"
                                        value={company.size}
                                        onChange={(v) => handleCompanyChange("size", v)}
                                    />
                                    <Input
                                        label="Location"
                                        value={company.location}
                                        onChange={(v) => handleCompanyChange("location", v)}
                                    />
                                    <Input
                                        label="Website"
                                        value={company.website}
                                        onChange={(v) => handleCompanyChange("website", v)}
                                    />
                                    <TextArea
                                        className="sm:col-span-2"
                                        label="Company Description"
                                        value={company.description}
                                        onChange={(v) => handleCompanyChange("description", v)}
                                    />
                                </div>
                            )}

                            {activeTab === "Team" && (
                                <div className="space-y-4">
                                    {teamMembers.map((member) => (
                                        <div key={member.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border border-gray-200 dark:border-neutral-800">
                                            <Input
                                                label="Name"
                                                value={member.name}
                                                onChange={(v) => updateTeamMember(member.id, "name", v)}
                                            />
                                            <Input
                                                label="Role"
                                                value={member.role}
                                                onChange={(v) => updateTeamMember(member.id, "role", v)}
                                            />
                                            <Input
                                                className="sm:col-span-2"
                                                label="Email"
                                                value={member.email}
                                                onChange={(v) => updateTeamMember(member.id, "email", v)}
                                            />
                                            <div className="sm:col-span-2 flex justify-end">
                                                <button
                                                    onClick={() => removeTeamMember(member.id)}
                                                    className="text-sm px-3 py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/30"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={addTeamMember}
                                        className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm"
                                    >
                                        + Add Team Member
                                    </button>
                                </div>
                            )}

                            {activeTab === "Hiring Needs" && (
                                <div className="space-y-4">
                                    <TextArea
                                        label="Hiring Authority"
                                        value={profile.hiringAuthority || ""}
                                        onChange={(v) => handleProfileChange("hiringAuthority", v)}
                                        placeholder="Describe your hiring authority and decision-making power"
                                    />
                                    <TextArea
                                        label="Current Hiring Needs"
                                        value={profile.hiringNeeds || ""}
                                        onChange={(v) => handleProfileChange("hiringNeeds", v)}
                                        placeholder="Describe the roles you're currently hiring for and specific requirements"
                                    />

                                    <div className="pt-4">
                                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Active Positions</h4>
                                        {activePositions.map((position) => (
                                            <div key={position.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border border-gray-200 dark:border-neutral-800 mb-3">
                                                <Input
                                                    label="Position Title"
                                                    value={position.title}
                                                    onChange={(v) => updatePosition(position.id, "title", v)}
                                                />
                                                <Input
                                                    label="Department"
                                                    value={position.department}
                                                    onChange={(v) => updatePosition(position.id, "department", v)}
                                                />
                                                <div className="sm:col-span-2 flex justify-end">
                                                    <button
                                                        onClick={() => removePosition(position.id)}
                                                        className="text-sm px-3 py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/30"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={addPosition}
                                            className="px-4 py-2 rounded-md border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-sm"
                                        >
                                            + Add Position
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <button
                                onClick={() => {
                                    localStorage.removeItem(STORAGE_KEY);
                                    window.location.reload();
                                }}
                                className="text-sm px-3 py-2 rounded-md border text-black dark:text-white border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
                            >
                                Reset to Defaults
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-sm px-3 py-2 rounded-md text-black dark:text-white border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-sm px-4 py-2 rounded-md bg-indigo-600 text-white"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Animations */}
            <style jsx>{`
            @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fade-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.6s ease-out both; }
            .animate-fade-up { animation: fade-up 0.6s ease-out both; }
            .delay-200 { animation-delay: 0.2s; }
            .delay-300 { animation-delay: 0.3s; }
            .delay-400 { animation-delay: 0.4s; }
        `}</style>
        </section>
    );
};

export default RecruiterProfilePage;

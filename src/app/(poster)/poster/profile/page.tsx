"use client";
import { getProfile, getSummary, updateProfile } from "@/app/api/profile";
import Input from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";
import { cryptoId } from "@/app/lib";
import { Download, RefreshCw, X, Briefcase, Target } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";

type PostedJob = {
    id: number;
    title: string;
    department: string;
    applicants: number;
    posted: string;
    status: "Active" | "Closed" | "Draft";
};

type Candidate = {
    id: number;
    name: string;
    avatar: string;
    position: string;
    status: "Reviewing" | "Shortlisted" | "Interview" | "Offered";
    date: string;
};

type Activity = {
    id: number;
    action: string;
    date: string;
};

type RecruitingExperience = {
    id: string;
    role: string;
    company: string;
    period: string;
    details: string;
};

type Specialization = {
    id: string;
    area: string;
    level: string; // Beginner, Intermediate, Expert
};

type SuccessfulHire = {
    id: string;
    position: string;
    description: string;
    timeToHire?: string;
    candidatesFunneled?: string;
};

interface User {
    id: number;
    username: string;
    email: string;
    avatar?: string | null;
    role: "ADMIN" | "SEEKER" | "POSTER";
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

interface RecruiterProfileState {
    id: number;
    userId: number;
    professionalRole?: string | null;
    fullName?: string | null;
    bio?: string | null;
    location?: string | null;
    companyName?: string | null;
    linkedinUrl?: string | null;
    phoneNumber?: string | null;
    rating?: number | null;
    specializations: string[];
    industries: string[];
    recruitingExperiences: any[];
    successfulHires: any[];
    yearsOfExperience?: string | null;
    recruitingPhilosophy?: string | null;
    preferredCommunication?: string | null;
    responseTime?: string | null;
    createdAt: string;
    updatedAt: string;
    user: User;
}

const RecruiterProfilePage = () => {
    const initialPostedJobs: PostedJob[] = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            department: "Engineering",
            applicants: 45,
            posted: "Posted 3 days ago",
            status: "Active",
        },
        {
            id: 2,
            title: "Product Manager",
            department: "Product",
            applicants: 28,
            posted: "Posted 1 week ago",
            status: "Active",
        },
        {
            id: 3,
            title: "UX Designer",
            department: "Design",
            applicants: 67,
            posted: "Posted 2 weeks ago",
            status: "Closed",
        },
    ];

    const initialCandidates: Candidate[] = [
        {
            id: 1,
            name: "Sarah Johnson",
            avatar: "https://i.pravatar.cc/150?img=1",
            position: "Senior Frontend Developer",
            status: "Interview",
            date: "2 hours ago",
        },
        {
            id: 2,
            name: "Michael Chen",
            avatar: "https://i.pravatar.cc/150?img=2",
            position: "Product Manager",
            status: "Shortlisted",
            date: "5 hours ago",
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            avatar: "https://i.pravatar.cc/150?img=3",
            position: "UX Designer",
            status: "Reviewing",
            date: "1 day ago",
        },
    ];

    const initialActivity: Activity[] = [
        { id: 1, action: "Scheduled interview with Sarah Johnson", date: "2 hours ago" },
        { id: 2, action: "Shortlisted 3 candidates for Product Manager", date: "1 day ago" },
        { id: 3, action: "Posted new job: Senior Frontend Developer", date: "3 days ago" },
        { id: 4, action: "Made offer to candidate for UX Designer", date: "1 week ago" },
    ];

    // State
    const [postedJobs] = useState<PostedJob[]>(initialPostedJobs);
    const [activeCandidates] = useState<Candidate[]>(initialCandidates);
    const [activityFeed] = useState<Activity[]>(initialActivity);
    const [specializations, setSpecializations] = useState<string[]>([]);
    const [industries, setIndustries] = useState<string[]>([]);
    const [recruitingExperiences, setRecruitingExperiences] = useState<RecruitingExperience[]>([]);
    const [successfulHires, setSuccessfulHires] = useState<SuccessfulHire[]>([]);
    const [summary, setSummary] = useState<string>("");

    const [profile, setProfile] = useState<RecruiterProfileState>({
        id: 0,
        userId: 0,
        fullName: "",
        bio: "",
        professionalRole: "",
        location: "",
        companyName: "",
        linkedinUrl: "",
        phoneNumber: "",
        rating: 0,
        specializations: [],
        industries: [],
        recruitingExperiences: [],
        successfulHires: [],
        yearsOfExperience: "",
        recruitingPhilosophy: "",
        preferredCommunication: "",
        responseTime: "",
        createdAt: "",
        updatedAt: "",
        user: {
            id: 0,
            username: "",
            email: "",
            avatar: "",
            role: "POSTER",
            isVerified: false,
            createdAt: "",
            updatedAt: "",
        },
    });

    const [open, setOpen] = useState(false);
    const tabs = ["Basic Info", "Specializations", "Experience", "Success Stories", "Preferences"] as const;
    type Tab = typeof tabs[number];
    const [activeTab, setActiveTab] = useState<Tab>("Basic Info");
    const [newSpecialization, setNewSpecialization] = useState("");
    const [newIndustry, setNewIndustry] = useState("");

    // Fetch profile on mount
    useEffect(() => {
        fetchProfile();
        fetchSummary();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getProfile();
            if (response.status !== 200) return;

            const profileData = response.data;
            setProfile(profileData);
            setSpecializations(profileData.specializations || []);
            setIndustries(profileData.industries || []);
            setRecruitingExperiences(profileData.recruitingExperiences || []);
            setSuccessfulHires(profileData.successfulHires || []);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchSummary = async () => {
        try {
            const response = await getSummary("recruiter-username");
            if (response.status !== 200) return;

            const data = response.data;
            setSummary(data.summary);
        } catch (error) {
            console.error('Error fetching summary:', error);
        }
    };

    async function generateSummary() {
        try {
            const result = await getSummary("recruiter-username", true);
            setSummary(result.data.summary);
        } catch (error) {
            console.error("Error generating summary:", error);
        }
    }

    const handleProfileChange = useCallback(<K extends keyof RecruiterProfileState>(key: K, value: RecruiterProfileState[K]) => {
        setProfile((p) => ({ ...p, [key]: value }));
    }, []);

    const handleNestedProfileChange = useCallback((parent: string, key: string, value: string) => {
        setProfile((prev: any) => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [key]: value,
            },
        }));
    }, []);

    // Specializations management
    const addSpecialization = useCallback(() => {
        const s = newSpecialization.trim();
        if (!s || specializations.includes(s)) return;
        setSpecializations((prev) => [...prev, s]);
        setNewSpecialization("");
    }, [newSpecialization, specializations]);

    const removeSpecialization = useCallback((s: string) => {
        setSpecializations((prev) => prev.filter((x) => x !== s));
    }, []);

    // Industries management
    const addIndustry = useCallback(() => {
        const i = newIndustry.trim();
        if (!i || industries.includes(i)) return;
        setIndustries((prev) => [...prev, i]);
        setNewIndustry("");
    }, [newIndustry, industries]);

    const removeIndustry = useCallback((i: string) => {
        setIndustries((prev) => prev.filter((x) => x !== i));
    }, []);

    // Recruiting Experience management
    const addRecruitingExperience = useCallback(() => {
        setRecruitingExperiences((prev) => [
            ...prev,
            { id: cryptoId(), role: "", company: "", period: "", details: "" },
        ]);
    }, []);

    const updateRecruitingExperience = useCallback((id: string, key: keyof RecruitingExperience, value: any) => {
        setRecruitingExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
    }, []);

    const removeRecruitingExperience = useCallback((id: string) => {
        setRecruitingExperiences((prev) => prev.filter((e) => e.id !== id));
    }, []);

    // Successful Hires management
    const addSuccessfulHire = useCallback(() => {
        setSuccessfulHires((prev) => [
            ...prev,
            { id: cryptoId(), position: "", description: "", timeToHire: "", candidatesFunneled: "" },
        ]);
    }, []);

    const updateSuccessfulHire = useCallback((id: string, key: keyof SuccessfulHire, value: any) => {
        setSuccessfulHires((prev) => prev.map((h) => (h.id === id ? { ...h, [key]: value } : h)));
    }, []);

    const removeSuccessfulHire = useCallback((id: string) => {
        setSuccessfulHires((prev) => prev.filter((h) => h.id !== id));
    }, []);

    async function handleProfileUpdate() {
        try {
            const payload = {
                fullName: profile.fullName,
                professionalRole: profile.professionalRole,
                bio: profile.bio,
                location: profile.location,
                companyName: profile.companyName,
                linkedinUrl: profile.linkedinUrl,
                phoneNumber: profile.phoneNumber,
                yearsOfExperience: profile.yearsOfExperience,
                recruitingPhilosophy: profile.recruitingPhilosophy,
                preferredCommunication: profile.preferredCommunication,
                responseTime: profile.responseTime,

                username: profile.user.username,
                email: profile.user.email,
                avatar: profile.user.avatar,

                specializations: specializations,
                industries: industries,

                recruitingExperiences: recruitingExperiences.map(exp => ({
                    role: exp.role,
                    company: exp.company,
                    period: exp.period,
                    details: exp.details,
                })),

                successfulHires: successfulHires.map(hire => ({
                    position: hire.position,
                    description: hire.description,
                    timeToHire: hire.timeToHire,
                    candidatesFunneled: hire.candidatesFunneled,
                })),
            };

            console.log("Sending payload:", payload);

            const response = await updateProfile(payload);

            if (response.status === 200) {
                await fetchProfile();
                setOpen(false);
                alert("✅ Profile updated successfully!");
            } else {
                console.error("Failed to update profile:", response);
                alert("❌ Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("❌ An error occurred while updating your profile.");
        }
    }

    return (
        <section className="font-sans min-h-screen flex justify-center">
            <div className="grid lg:grid-cols-3 gap-2 w-full">
                {/* Main Profile */}
                <div className="relative lg:col-span-2 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow animate-fade-in">
                    {/* Cover */}
                    <div className="relative h-44">
                        <img
                            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=400&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                        {/* Avatar */}
                        <img
                            className="absolute -bottom-16 left-5 lg:left-10 lg:size-36 size-28 rounded-full ring-4 ring-white dark:ring-neutral-900 object-cover"
                            alt="Profile Avatar"
                            src={profile.user.avatar || "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833548.jpg"}
                        />

                        {/* Stats */}
                        <div className="absolute -bottom-16 right-6 mt-2 sm:mt-5 grid grid-cols-3 gap-6">
                            {[
                                { value: "24", label: "Jobs Posted" },
                                { value: "1.2K", label: "Reviewed" },
                                { value: "156", label: "Hired" },
                            ].map((stat, idx) => (
                                <div key={idx} className="text-center transform transition hover:scale-105">
                                    <div className="mt-1 text-gray-600 dark:text-neutral-400 sm:text-sm text-xs">
                                        {stat.label}
                                    </div>
                                    <div className="sm:text-xl text-lg font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="pt-20 pr-4 pl-6 sm:pl-12 pb-12">
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                        {profile?.fullName || profile?.user?.username || "Recruiter Name"}
                                    </h1>
                                    {profile.user.isVerified && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Verified Recruiter
                                        </span>
                                    )}
                                </div>
                                <p className="text-indigo-600 dark:text-indigo-400 mt-2 text-lg font-medium">
                                    {profile?.professionalRole || "Senior Technical Recruiter"}
                                </p>
                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-neutral-400">
                                    {profile.companyName && (
                                        <div className="flex items-center">
                                            <Briefcase className="w-4 h-4 mr-1" />
                                            {profile.companyName}
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {profile.location || "San Francisco, CA"}
                                    </div>
                                    {profile.yearsOfExperience && (
                                        <div className="flex items-center">
                                            <Target className="w-4 h-4 mr-1" />
                                            {profile.yearsOfExperience} years experience
                                        </div>
                                    )}
                                </div>
                                {profile.phoneNumber && (
                                    <div className="mt-2 text-sm">
                                        <span className="text-gray-600 dark:text-neutral-400">Contact: </span>
                                        <span className="text-indigo-600 dark:text-indigo-400">{profile.phoneNumber}</span>
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
                                <button
                                    className="flex px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 transition-all"
                                >
                                    <Briefcase className="w-4 h-4 mr-2 mt-0.5" />
                                    Post New Job
                                </button>
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-10 mt-10">
                            {/* Bio */}
                            {profile.bio && (
                                <div className="animate-fade-up">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">About Me</h2>
                                    <p className="mt-3 text-gray-600 dark:text-neutral-400 leading-relaxed">
                                        {profile.bio}
                                    </p>
                                </div>
                            )}

                            {/* Recruiting Philosophy */}
                            {profile.recruitingPhilosophy && (
                                <div className="animate-fade-up delay-100">
                                    <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-800/30">
                                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                            <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                            My Recruiting Philosophy
                                        </h3>
                                        <p className="mt-2 text-gray-600 dark:text-neutral-400">
                                            {profile.recruitingPhilosophy}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Specializations */}
                            {specializations?.length > 0 && (
                                <div className="animate-fade-up delay-200">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recruiting Specializations</h2>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {specializations.map((spec, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200 shadow-sm"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Industries */}
                            {industries?.length > 0 && (
                                <div className="animate-fade-up delay-300">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Industries I Recruit For</h2>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {industries.map((ind, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200 shadow-sm"
                                            >
                                                {ind}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recruiting Experience */}
                            {profile.recruitingExperiences?.length > 0 && (
                                <div className="animate-fade-up delay-400">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recruiting Experience</h2>
                                    <div className="mt-3 space-y-4">
                                        {profile.recruitingExperiences.map((exp: any) => (
                                            <div key={exp.id} className="border-l-4 border-indigo-500 pl-4">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {exp.role} – {exp.company}
                                                </h3>
                                                <span className="text-sm text-gray-500 dark:text-neutral-400">
                                                    {exp.period}
                                                </span>
                                                <p className="mt-1 text-gray-600 dark:text-neutral-300">{exp.details}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Successful Hires */}
                            {profile.successfulHires?.length > 0 && (
                                <div className="animate-fade-up delay-500">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Success Stories</h2>
                                    <div className="mt-3 space-y-4">
                                        {profile.successfulHires.map((hire: any) => (
                                            <div key={hire.id} className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-800">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {hire.position}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
                                                    {hire.description}
                                                </p>
                                                <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-neutral-500">
                                                    {hire.timeToHire && (
                                                        <span>⏱️ Time to hire: {hire.timeToHire}</span>
                                                    )}
                                                    {hire.candidatesFunneled && (
                                                        <span>👥 Candidates reviewed: {hire.candidatesFunneled}</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Communication Preferences */}
                            {(profile.preferredCommunication || profile.responseTime) && (
                                <div className="animate-fade-up delay-600">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Communication</h2>
                                    {profile.preferredCommunication && (
                                        <p className="mt-2 text-gray-600 dark:text-neutral-400">
                                            <strong>Preferred method:</strong> {profile.preferredCommunication}
                                        </p>
                                    )}
                                    {profile.responseTime && (
                                        <p className="text-gray-600 dark:text-neutral-400">
                                            <strong>Avg. response time:</strong> {profile.responseTime}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-2">
                    {/* AI Summary Card */}
                    <aside className="lg:col-span-1 rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow animate-fade-in delay-300">
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Summary</h2>
                                <p className="text-sm text-gray-500 dark:text-neutral-400">
                                    AI generated profile summary
                                </p>
                            </div>
                            <RefreshCw
                                onClick={() => generateSummary()}
                                className="w-5 h-5 my-auto text-gray-500 dark:text-neutral-400 hover:text-blue-500 hover:cursor-pointer hover:rotate-180 duration-200"
                            />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4 p-6 border-b border-gray-200 dark:border-neutral-800">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Recruiter Rating
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-neutral-400">
                                    Based on candidate feedback
                                </p>

                                <span
                                    className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full font-medium ${(profile.rating || 4.8) >= 4.5
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                        : (profile.rating || 4.8) >= 3.5
                                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                                            : (profile.rating || 4.8) >= 2.5
                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                        }`}
                                >
                                    {(profile.rating || 4.8) >= 4.5
                                        ? "Excellent"
                                        : (profile.rating || 4.8) >= 3.5
                                            ? "Good"
                                            : (profile.rating || 4.8) >= 2.5
                                                ? "Average"
                                                : "Needs Improvement"}
                                </span>
                            </div>

                            <div className="ml-auto relative w-16 h-16">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="28"
                                        className="stroke-gray-200 dark:stroke-neutral-700"
                                        strokeWidth="6"
                                        fill="transparent"
                                    />
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="28"
                                        className="stroke-emerald-500 transition-all duration-700 ease-out"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 28}
                                        strokeDashoffset={(1 - (profile.rating || 4.8) / 5) * 2 * Math.PI * 28}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-900 dark:text-white">
                                    {profile.rating || 4.8}
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-neutral-400">
                                {summary || "Click refresh to generate AI summary"}
                            </p>
                        </div>
                    </aside>

                    {/* Posted Jobs */}
                    <aside className="lg:col-span-1 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 animate-fade-in delay-300">
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">My Job Posts</h2>
                            <p className="text-sm text-gray-500 dark:text-neutral-400">Active and recent postings</p>
                        </div>

                        <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
                            {postedJobs.map((job, i) => (
                                <li
                                    key={job.id}
                                    className="p-5 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition animate-fade-up"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {job.title}
                                                </span>
                                                <span
                                                    className={`px-2 py-0.5 text-xs rounded-full font-medium ${job.status === "Active"
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                                        : job.status === "Draft"
                                                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                                            : "bg-gray-100 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300"
                                                        }`}
                                                >
                                                    {job.status}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-600 dark:text-neutral-300">{job.department}</span>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-xs text-gray-500 dark:text-neutral-400">
                                                    👥 {job.applicants} applicants
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-neutral-400">{job.posted}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Active Candidates */}
                    <aside className="lg:col-span-1 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 animate-fade-in delay-300">
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active Candidates</h2>
                            <p className="text-sm text-gray-500 dark:text-neutral-400">Currently in pipeline</p>
                        </div>

                        <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
                            {activeCandidates.map((candidate, i) => (
                                <li
                                    key={candidate.id}
                                    className="p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition animate-fade-up"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                >
                                    <img
                                        src={candidate.avatar}
                                        alt={candidate.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white block">
                                            {candidate.name}
                                        </span>
                                        <span className="text-xs text-gray-600 dark:text-neutral-300">{candidate.position}</span>
                                        <span className="text-xs text-gray-500 dark:text-neutral-400 block mt-1">
                                            {candidate.date}
                                        </span>
                                    </div>
                                    <span
                                        className={`px-2 py-0.5 text-xs rounded-full font-medium ${candidate.status === "Offered"
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                            : candidate.status === "Interview"
                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                                : candidate.status === "Shortlisted"
                                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                            }`}
                                    >
                                        {candidate.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Recent Activity */}
                    <aside className="lg:col-span-1 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 animate-fade-in delay-300">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Activity</h3>
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
                                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{item.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Edit Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

                    <div className="relative z-10 w-full max-w-5xl max-h-[90vh] rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl animate-fade-in flex flex-col overflow-hidden">
                        {/* Fixed Header */}
                        <div className="flex-shrink-0 px-8 py-6 border-b border-gray-200 dark:border-neutral-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-neutral-900 dark:to-neutral-900">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Edit Your Profile
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Update your information to connect better with candidates
                                    </p>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-2 hover:bg-white dark:hover:bg-neutral-800 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex-shrink-0 px-8 py-4 border-b border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50">
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                                {tabs.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTab(t)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === t
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                                            : "bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-700"
                                            }`}
                                    >
                                        <span>{t}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto px-8 py-6">
                            {/* Basic Info Tab */}
                            {activeTab === "Basic Info" && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Input
                                                label="Full Name"
                                                value={profile.fullName || ""}
                                                onChange={(v) => handleProfileChange("fullName", v)}
                                            />
                                            <Input
                                                label="Username"
                                                value={profile.user.username || ""}
                                                onChange={(v) => handleNestedProfileChange("user", "username", v)}
                                            />
                                            <Input
                                                label="Professional Role"
                                                value={profile.professionalRole || ""}
                                                onChange={(v) => handleProfileChange("professionalRole", v)}
                                                placeholder="e.g., Senior Technical Recruiter"
                                            />
                                            <Input
                                                label="Email"
                                                value={profile.user.email || ""}
                                                onChange={(v) => handleNestedProfileChange("user", "email", v)}
                                            />
                                            <Input
                                                label="Company"
                                                value={profile.companyName || ""}
                                                onChange={(v) => handleProfileChange("companyName", v)}
                                            />
                                            <Input
                                                label="Phone Number"
                                                value={profile.phoneNumber || ""}
                                                onChange={(v) => handleProfileChange("phoneNumber", v)}
                                            />
                                            <Input
                                                label="Location"
                                                value={profile.location || ""}
                                                onChange={(v) => handleProfileChange("location", v)}
                                            />
                                            <Input
                                                label="Years of Experience"
                                                value={profile.yearsOfExperience || ""}
                                                onChange={(v) => handleProfileChange("yearsOfExperience", v)}
                                                placeholder="e.g., 5+"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <TextArea
                                            label="Bio"
                                            value={profile.bio || ""}
                                            onChange={(v) => handleProfileChange("bio", v)}
                                            placeholder="Tell candidates about yourself..."
                                            rows={4}
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            label="LinkedIn URL"
                                            value={profile.linkedinUrl || ""}
                                            onChange={(v) => handleProfileChange("linkedinUrl", v)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Specializations Tab */}
                            {activeTab === "Specializations" && (
                                <div className="space-y-6">
                                    {/* Recruiting Specializations */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recruiting Specializations</h4>
                                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
                                            <div className="flex gap-2">
                                                <input
                                                    value={newSpecialization}
                                                    onChange={(e) => setNewSpecialization(e.target.value)}
                                                    onKeyPress={(e) => e.key === "Enter" && addSpecialization()}
                                                    placeholder="e.g., Technical Recruiting, Executive Search"
                                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                                                />
                                                <button
                                                    onClick={addSpecialization}
                                                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {specializations.length === 0 ? (
                                                <div className="w-full text-center py-12 text-gray-500">
                                                    <p>No specializations added yet</p>
                                                </div>
                                            ) : (
                                                specializations.map((s) => (
                                                    <span
                                                        key={s}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                                                    >
                                                        {s}
                                                        <button
                                                            onClick={() => removeSpecialization(s)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    </div>

                                    {/* Industries */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Industries</h4>
                                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
                                            <div className="flex gap-2">
                                                <input
                                                    value={newIndustry}
                                                    onChange={(e) => setNewIndustry(e.target.value)}
                                                    onKeyPress={(e) => e.key === "Enter" && addIndustry()}
                                                    placeholder="e.g., Technology, Healthcare, Finance"
                                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                                                />
                                                <button
                                                    onClick={addIndustry}
                                                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {industries.length === 0 ? (
                                                <div className="w-full text-center py-12 text-gray-500">
                                                    <p>No industries added yet</p>
                                                </div>
                                            ) : (
                                                industries.map((i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100"
                                                    >
                                                        {i}
                                                        <button
                                                            onClick={() => removeIndustry(i)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Experience Tab */}
                            {activeTab === "Experience" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Recruiting Experience</h4>
                                        <button
                                            onClick={addRecruitingExperience}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold"
                                        >
                                            Add Experience
                                        </button>
                                    </div>

                                    {recruitingExperiences.length === 0 ? (
                                        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-xl">
                                            <p className="text-gray-500">No experience added yet</p>
                                        </div>
                                    ) : (
                                        recruitingExperiences.map((exp, idx) => (
                                            <div key={exp.id} className="p-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/50 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-indigo-600">Experience #{idx + 1}</span>
                                                    <button
                                                        onClick={() => removeRecruitingExperience(exp.id)}
                                                        className="text-red-600 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <Input
                                                        label="Role"
                                                        value={exp.role}
                                                        onChange={(v) => updateRecruitingExperience(exp.id, "role", v)}
                                                    />
                                                    <Input
                                                        label="Company"
                                                        value={exp.company}
                                                        onChange={(v) => updateRecruitingExperience(exp.id, "company", v)}
                                                    />
                                                    <Input
                                                        label="Period"
                                                        value={exp.period}
                                                        onChange={(v) => updateRecruitingExperience(exp.id, "period", v)}
                                                        placeholder="2020 – Present"
                                                        className="sm:col-span-2"
                                                    />
                                                    <TextArea
                                                        className="sm:col-span-2"
                                                        label="Description"
                                                        value={exp.details}
                                                        onChange={(v) => updateRecruitingExperience(exp.id, "details", v)}
                                                        rows={3}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Success Stories Tab */}
                            {activeTab === "Success Stories" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Successful Hires</h4>
                                        <button
                                            onClick={addSuccessfulHire}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold"
                                        >
                                            Add Success Story
                                        </button>
                                    </div>

                                    {successfulHires.length === 0 ? (
                                        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-xl">
                                            <p className="text-gray-500">No success stories added yet</p>
                                        </div>
                                    ) : (
                                        successfulHires.map((hire, idx) => (
                                            <div key={hire.id} className="p-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/50 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-indigo-600">Success Story #{idx + 1}</span>
                                                    <button
                                                        onClick={() => removeSuccessfulHire(hire.id)}
                                                        className="text-red-600 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <Input
                                                        label="Position Filled"
                                                        value={hire.position}
                                                        onChange={(v) => updateSuccessfulHire(hire.id, "position", v)}
                                                        className="sm:col-span-2"
                                                    />
                                                    <TextArea
                                                        className="sm:col-span-2"
                                                        label="Description"
                                                        value={hire.description}
                                                        onChange={(v) => updateSuccessfulHire(hire.id, "description", v)}
                                                        placeholder="Describe the challenge and how you succeeded..."
                                                        rows={3}
                                                    />
                                                    <Input
                                                        label="Time to Hire"
                                                        value={hire.timeToHire || ""}
                                                        onChange={(v) => updateSuccessfulHire(hire.id, "timeToHire", v)}
                                                        placeholder="e.g., 30 days"
                                                    />
                                                    <Input
                                                        label="Candidates Reviewed"
                                                        value={hire.candidatesFunneled || ""}
                                                        onChange={(v) => updateSuccessfulHire(hire.id, "candidatesFunneled", v)}
                                                        placeholder="e.g., 150"
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Preferences Tab */}
                            {activeTab === "Preferences" && (
                                <div className="space-y-6">
                                    <TextArea
                                        label="Recruiting Philosophy"
                                        value={profile.recruitingPhilosophy || ""}
                                        onChange={(v) => handleProfileChange("recruitingPhilosophy", v)}
                                        placeholder="Describe your approach to recruiting..."
                                        rows={5}
                                    />
                                    <Input
                                        label="Preferred Communication Method"
                                        value={profile.preferredCommunication || ""}
                                        onChange={(v) => handleProfileChange("preferredCommunication", v)}
                                        placeholder="e.g., Email, LinkedIn, Phone"
                                    />
                                    <Input
                                        label="Average Response Time"
                                        value={profile.responseTime || ""}
                                        onChange={(v) => handleProfileChange("responseTime", v)}
                                        placeholder="e.g., Within 24 hours"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex-shrink-0 px-8 py-5 border-t border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50">
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-5 py-2.5 border border-gray-300 dark:border-neutral-700 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleProfileUpdate}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default RecruiterProfilePage;
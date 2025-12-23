"use client";
import { getProfile, getSummary, updateProfile } from "@/app/api/profile";
import Input from "@/app/components/Input";
import TextArea from "@/app/components/TextArea";
import { cryptoId } from "@/app/lib";
import { Download, RefreshCw, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

type Application = {
    id: number;
    company: string;
    logo: string;
    title: string;
    date: string;
    status: "In Review" | "Approved" | "Pending";
};

type Activity = {
    id: number;
    action: string;
    date: string;
};

type Experience = {
    id: string;
    role: string;
    company: string;
    period: string;
    details: string;
};

type Education = {
    id: string;
    degree: string;
    institution: string;
    year: string;
};

type Project = {
    id: string;
    name: string;
    description: string;
    link?: string;
    img?: string[];
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

interface ProfileState {
    id: number;
    userId: number;
    professionalRole?: string | null;
    fullName?: string | null;
    bio?: string | null;
    location?: string | null;
    background?: string | null;
    githubUrl?: string | null;
    resumeUrl?: string | null;
    rating?: number | null;
    skills: string[];
    experiences: any[];
    educations: any[];
    projects: any[];
    currentCTC?: string | null;
    expectedCTC?: string | null;
    currentLocation?: string | null;
    expectedLocation?: string | null;
    createdAt: string;
    updatedAt: string;
    user: User;
}

const SaaSProfilePage = () => {
    const initialApplications: Application[] = [
        {
            id: 1,
            company: "Salesly",
            logo: "https://logo.clearbit.com/salesforce.com",
            title: "CRM Dashboard",
            date: "Applied on Aug 30, 2025",
            status: "In Review",
        },
        {
            id: 2,
            company: "InsightIQ",
            logo: "https://logo.clearbit.com/google.com",
            title: "Analytics Portal",
            date: "Applied on Aug 27, 2025",
            status: "Approved",
        },
        {
            id: 3,
            company: "ShopEase",
            logo: "https://logo.clearbit.com/shopify.com",
            title: "E-commerce API",
            date: "Applied on Aug 20, 2025",
            status: "Pending",
        },
    ];

    const initialActivity: Activity[] = [
        { id: 1, action: "Applied to ShopEase", date: "Aug 20, 2025" },
        { id: 2, action: "Received reply from InsightIQ", date: "Aug 28, 2025" },
        { id: 3, action: "Profile viewed by 12 recruiters", date: "Aug 30, 2025" },
    ];

    // State
    const [latestApplications] = useState<Application[]>(initialApplications);
    const [activityFeed] = useState<Activity[]>(initialActivity);
    const [skills, setSkills] = useState<string[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [education, setEducation] = useState<Education[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [summary, setSummary] = useState<string>("");

    const [profile, setProfile] = useState<ProfileState>({
        id: 0,
        userId: 0,
        fullName: "",
        bio: "",
        professionalRole: "",
        location: "",
        background: "",
        githubUrl: "",
        resumeUrl: "",
        rating: 0,
        skills: [],
        experiences: [],
        educations: [],
        projects: [],
        currentCTC: "",
        expectedCTC: "",
        currentLocation: "",
        expectedLocation: "",
        createdAt: "",
        updatedAt: "",
        user: {
            id: 0,
            username: "",
            email: "",
            avatar: "",
            role: "SEEKER",
            isVerified: false,
            createdAt: "",
            updatedAt: "",
        },
    });

    const [open, setOpen] = useState(false);
    const tabs = ["Basic Info", "Resume", "Skills", "Experience", "Education", "Projects"] as const;
    type Tab = typeof tabs[number];
    const [activeTab, setActiveTab] = useState<Tab>("Basic Info");
    const [newSkill, setNewSkill] = useState("");

    // Fetch profile on mount
    useEffect(() => {
        fetchProfile();
        fetchSummary();
    }, []);

    const fetchProfile = async () => {
        try {
            const [response, summary] = await Promise.all([getProfile(), getSummary("anshulbadoni")]);

            if (response.status !== 200) return;

            const profileData = response.data;
            const summaryData = summary.data;

            setProfile(profileData);
            setSummary(summaryData.summary);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };
    const fetchSummary = async () => {
        try {
            const response = await getSummary("anshulbadoni");
            if (response.status !== 200) return;

            const data = response.data;
            setSummary(data.summary);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    async function generateSummary() {
        try {
            const result = await getSummary("anshulbadoni", true);
            setSummary(result.data.summary);

        } catch (error) {
            console.error("Error generating summary:", error);
        }
    }

    const handleProfileChange = useCallback(<K extends keyof ProfileState>(key: K, value: ProfileState[K]) => {
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

    // Skills management
    const addSkill = useCallback(() => {
        const s = newSkill.trim();
        if (!s || skills.includes(s)) return;
        setSkills((prev) => [...prev, s]);
        setNewSkill("");
    }, [newSkill, skills]);

    const removeSkill = useCallback((s: string) => {
        setSkills((prev) => prev.filter((x) => x !== s));
    }, []);

    // Experience management
    const addExperience = useCallback(() => {
        setExperiences((prev) => [
            ...prev,
            { id: cryptoId(), role: "", company: "", period: "", details: "" },
        ]);
    }, []);

    const updateExperience = useCallback((id: string, key: keyof Experience, value: any) => {
        setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
    }, []);

    const removeExperience = useCallback((id: string) => {
        setExperiences((prev) => prev.filter((e) => e.id !== id));
    }, []);

    // Education management
    const addEducation = useCallback(() => {
        setEducation((prev) => [
            ...prev,
            { id: cryptoId(), degree: "", institution: "", year: "" },
        ]);
    }, []);

    const updateEducation = useCallback((id: string, key: keyof Education, value: any) => {
        setEducation((prev) => prev.map((e) => (e.id === id ? { ...e, [key]: value } : e)));
    }, []);

    const removeEducation = useCallback((id: string) => {
        setEducation((prev) => prev.filter((e) => e.id !== id));
    }, []);

    // Project management
    const addProject = useCallback(() => {
        setProjects((prev) => [...prev, { id: cryptoId(), name: "", description: "", link: "", img: [] }]);
    }, []);

    const updateProject = useCallback((id: string, key: keyof Project, value: any) => {
        setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
    }, []);

    const removeProject = useCallback((id: string) => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const handleResumeUpload = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            // TODO: Upload to server
            const url = URL.createObjectURL(file);
            handleProfileChange("resumeUrl", url);
        },
        [handleProfileChange]
    );

    async function handleProfileUpdate() {
        try {
            const payload = {
                // Basic profile fields
                fullName: profile.fullName,
                professionalRole: profile.professionalRole,
                bio: profile.bio,
                background: profile.background,
                currentLocation: profile.currentLocation,
                expectedLocation: profile.expectedLocation,
                currentCTC: profile.currentCTC,
                expectedCTC: profile.expectedCTC,
                githubUrl: profile.githubUrl,
                resumeUrl: profile.resumeUrl,

                // User fields
                username: profile.user.username,
                email: profile.user.email,
                avatar: profile.user.avatar,

                // Skills (already in correct format)
                skills: skills,

                // Transform experiences from local state to API format
                experiences: experiences.map(exp => ({
                    role: exp.role,
                    company: exp.company, // Backend will map to companyName
                    period: exp.period, // Backend will parse into startDate/endDate
                    details: exp.details, // Backend will map to description
                })),

                // Transform educations from local state to API format
                educations: education.map(edu => ({
                    degree: edu.degree,
                    institution: edu.institution,
                    year: edu.year, // Backend will parse into startYear/endYear
                })),

                // Transform projects from local state to API format
                projects: projects.map(proj => ({
                    name: proj.name,
                    description: proj.description,
                    link: proj.link || null,
                    img: proj.img || [], // Backend will map to imgs
                })),
            };

            console.log("Sending payload:", payload);

            const response = await updateProfile(payload);

            if (response.status === 200) {
                await fetchProfile(); // Refresh data from API
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
                            src="https://static.vecteezy.com/system/resources/previews/003/031/764/original/blue-wide-background-with-linear-blurred-gradient-free-vector.jpg"
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
                                { value: "245", label: "Viewed" },
                                { value: "136", label: "Applied" },
                                { value: "98", label: "Replies" },
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
                                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                    {profile?.user?.username || "Unknown"}
                                </h1>
                                <p className="text-indigo-600 dark:text-indigo-400 mt-2 text-lg font-medium">
                                    {profile?.professionalRole}
                                </p>
                                <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-neutral-400">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {profile.currentLocation || "Remote"}
                                </div>
                                {profile.resumeUrl && (
                                    <div className="mt-2 text-sm">
                                        <span className="text-gray-600 dark:text-neutral-400">Resume: </span>
                                        <a
                                            href={profile.resumeUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline text-indigo-600 dark:text-indigo-400"
                                        >
                                            View Resume
                                        </a>
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
                                    className="flex px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-neutral-600 to-neutral-500 text-white hover:from-indigo-700 hover:to-indigo-600 transition-all"
                                >
                                    <Download className="w-4 h-4 mr-2 mt-0.5" />
                                    Generate Resume
                                </button>
                            </div>
                        </div>

                        {/* Sections */}
                        <div className="space-y-10 mt-10">
                            {/* Bio */}
                            {profile.bio && (
                                <div className="animate-fade-up">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Bio</h2>
                                    <p className="mt-3 text-gray-600 dark:text-neutral-400 leading-relaxed">
                                        {profile.bio}
                                    </p>
                                </div>
                            )}

                            {/* Skills */}
                            {profile.skills?.length > 0 && (
                                <div className="animate-fade-up delay-200">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills</h2>
                                    <div className="flex flex-wrap gap-3 mt-3">
                                        {profile.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-gray-200 shadow-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Work Experience */}
                            {profile.experiences?.length > 0 && (
                                <div className="animate-fade-up delay-300">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Work Experience</h2>
                                    <div className="mt-3 space-y-4">
                                        {profile.experiences.map((exp: any) => (
                                            <div key={exp.id} className="border-l-4 border-indigo-500 pl-4">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {exp.role} – {exp.companyName}
                                                </h3>
                                                <span className="text-sm text-gray-500 dark:text-neutral-400">
                                                    {exp.startDate} {exp.endDate && `– ${exp.endDate}`}
                                                </span>
                                                <p className="mt-1 text-gray-600 dark:text-neutral-300">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education */}
                            {profile?.educations?.length > 0 && (
                                <div className="animate-fade-up delay-400">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h2>
                                    <div className="mt-3 space-y-3">
                                        {profile.educations.map((edu: any) => (
                                            <div key={edu.id}>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                                                <p className="text-sm text-gray-600 dark:text-neutral-400">
                                                    {edu.institution} ({edu.startYear} {edu.endYear && `– ${edu.endYear}`})
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects */}
                            {profile.projects?.length > 0 && (
                                <div className="animate-fade-up delay-500">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
                                    <div className="mt-3 space-y-4">
                                        {profile.projects.map((proj: any) => (
                                            <div key={proj.id} className="p-4 rounded-lg bg-gray-50 dark:bg-neutral-800">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {proj.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
                                                    {proj.description}
                                                </p>
                                                {proj.link && (
                                                    <a
                                                        href={proj.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-sm underline text-indigo-600 dark:text-indigo-400 mt-1 inline-block"
                                                    >
                                                        View Project
                                                    </a>
                                                )}
                                                {proj.imgs?.length > 0 && (
                                                    <div className="flex overflow-x-auto mt-2 space-x-2 snap-x snap-mandatory scrollbar-hide">
                                                        {proj.imgs.map((img: string, index: number) => (
                                                            <div key={index} className="flex-shrink-0">
                                                                {img.endsWith(".mp4") || img.endsWith(".webm") ? (
                                                                    <video
                                                                        src={img}
                                                                        muted
                                                                        className="w-80 rounded-md"
                                                                        onMouseEnter={(e) => e.currentTarget.play()}
                                                                        onMouseLeave={(e) => e.currentTarget.pause()}
                                                                    />
                                                                ) : (
                                                                    <img src={img} alt={proj.name} className="w-48 rounded-md" />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTC */}
                            {(profile.currentCTC || profile.expectedCTC) && (
                                <div className="animate-fade-up delay-600">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Compensation</h2>
                                    {profile.currentCTC && (
                                        <p className="mt-2 text-gray-600 dark:text-neutral-400">
                                            Current CTC: <strong>{profile.currentCTC}</strong>
                                        </p>
                                    )}
                                    {profile.expectedCTC && (
                                        <p className="text-gray-600 dark:text-neutral-400">
                                            Expected CTC: <strong>{profile.expectedCTC}</strong>
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
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Summary</h2>
                                <p className="text-sm text-gray-500 dark:text-neutral-400">
                                    AI generated summary
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
                                    Rating
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-neutral-400">
                                    AI profile score (out of 5)
                                </p>

                                <span
                                    className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full font-medium ${(profile.rating || 4.3) >= 4.5
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                        : (profile.rating || 4.3) >= 3.5
                                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                                            : (profile.rating || 4.3) >= 2.5
                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                                : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                        }`}
                                >
                                    {(profile.rating || 4.3) >= 4.5
                                        ? "Excellent"
                                        : (profile.rating || 4.3) >= 3.5
                                            ? "Good"
                                            : (profile.rating || 4.3) >= 2.5
                                                ? "Average"
                                                : "Needs Improvement"}
                                </span>
                            </div>

                            {/* Circle Rating */}
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
                                        className="stroke-indigo-500 transition-all duration-700 ease-out"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 28}
                                        strokeDashoffset={(1 - (profile.rating || 4.3) / 5) * 2 * Math.PI * 28}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-900 dark:text-white">
                                    {profile.rating || 0.0}
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-neutral-400">
                                {summary || "Click refresh to generate AI summary"}
                            </p>
                        </div>
                    </aside>

                    {/* Latest Applications */}
                    <aside className="lg:col-span-1 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 animate-fade-in delay-300">
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Latest Applications</h2>
                            <p className="text-sm text-gray-500 dark:text-neutral-400">Your most recent submissions</p>
                        </div>

                        <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
                            {latestApplications.map((app, i) => (
                                <li
                                    key={app.id}
                                    className="p-5 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition animate-fade-up"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                >
                                    <div className="flex-shrink-0">
                                        <img
                                            src={app.logo}
                                            alt={app.company}
                                            className="w-12 h-12 rounded-xl border border-gray-200 dark:border-neutral-700 object-contain bg-white p-1"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {app.company}
                                            </span>
                                            <span className="text-sm text-gray-600 dark:text-neutral-300">{app.title}</span>
                                            <span className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{app.date}</span>
                                        </div>
                                        <span
                                            className={`px-2 py-0.5 text-xs rounded-full font-medium ${app.status === "Approved"
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                                : app.status === "In Review"
                                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                                }`}
                                        >
                                            {app.status}
                                        </span>
                                    </div>
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
                                        Update your information to get better job matches
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
                                                placeholder="e.g., Senior Software Engineer"
                                            />
                                            <Input
                                                label="Email"
                                                value={profile.user.email || ""}
                                                onChange={(v) => handleNestedProfileChange("user", "email", v)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Location</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Input
                                                label="Current Location"
                                                value={profile.currentLocation || ""}
                                                onChange={(v) => handleProfileChange("currentLocation", v)}
                                            />
                                            <Input
                                                label="Expected Location"
                                                value={profile.expectedLocation || ""}
                                                onChange={(v) => handleProfileChange("expectedLocation", v)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Compensation</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Input
                                                label="Current CTC"
                                                value={profile.currentCTC || ""}
                                                onChange={(v) => handleProfileChange("currentCTC", v)}
                                            />
                                            <Input
                                                label="Expected CTC"
                                                value={profile.expectedCTC || ""}
                                                onChange={(v) => handleProfileChange("expectedCTC", v)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <TextArea
                                            label="Bio"
                                            value={profile.bio || ""}
                                            onChange={(v) => handleProfileChange("bio", v)}
                                            placeholder="Tell us about yourself..."
                                            rows={4}
                                        />
                                    </div>

                                    <div>
                                        <Input
                                            label="GitHub URL"
                                            value={profile.githubUrl || ""}
                                            onChange={(v) => handleProfileChange("githubUrl", v)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Resume Tab */}
                            {activeTab === "Resume" && (
                                <div className="space-y-6">
                                    <div className="border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-xl p-8 text-center">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Your Resume</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">PDF, DOC, or DOCX (Max 5MB)</p>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleResumeUpload}
                                            className="hidden"
                                            id="resume-upload"
                                        />
                                        <label
                                            htmlFor="resume-upload"
                                            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold cursor-pointer"
                                        >
                                            Choose File
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Skills Tab */}
                            {activeTab === "Skills" && (
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
                                        <div className="flex gap-2">
                                            <input
                                                value={newSkill}
                                                onChange={(e) => setNewSkill(e.target.value)}
                                                onKeyPress={(e) => e.key === "Enter" && addSkill()}
                                                placeholder="Add a skill..."
                                                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                                            />
                                            <button
                                                onClick={addSkill}
                                                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {skills.length === 0 ? (
                                            <div className="w-full text-center py-12 text-gray-500">
                                                <p>No skills added yet</p>
                                            </div>
                                        ) : (
                                            skills.map((s) => (
                                                <span
                                                    key={s}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100"
                                                >
                                                    {s}
                                                    <button
                                                        onClick={() => removeSkill(s)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Experience Tab */}
                            {activeTab === "Experience" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Work Experience</h4>
                                        <button
                                            onClick={addExperience}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold"
                                        >
                                            Add Experience
                                        </button>
                                    </div>

                                    {experiences.length === 0 ? (
                                        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-xl">
                                            <p className="text-gray-500">No experience added yet</p>
                                        </div>
                                    ) : (
                                        experiences.map((exp, idx) => (
                                            <div key={exp.id} className="p-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/50 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-indigo-600">Experience #{idx + 1}</span>
                                                    <button
                                                        onClick={() => removeExperience(exp.id)}
                                                        className="text-red-600 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <Input
                                                        label="Role"
                                                        value={exp.role}
                                                        onChange={(v) => updateExperience(exp.id, "role", v)}
                                                    />
                                                    <Input
                                                        label="Company"
                                                        value={exp.company}
                                                        onChange={(v) => updateExperience(exp.id, "company", v)}
                                                    />
                                                    <Input
                                                        label="Period"
                                                        value={exp.period}
                                                        onChange={(v) => updateExperience(exp.id, "period", v)}
                                                        placeholder="2020 – Present"
                                                        className="sm:col-span-2"
                                                    />
                                                    <TextArea
                                                        className="sm:col-span-2"
                                                        label="Description"
                                                        value={exp.details}
                                                        onChange={(v) => updateExperience(exp.id, "details", v)}
                                                        rows={3}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Education Tab */}
                            {activeTab === "Education" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h4>
                                        <button
                                            onClick={addEducation}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold"
                                        >
                                            Add Education
                                        </button>
                                    </div>

                                    {education.length === 0 ? (
                                        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-xl">
                                            <p className="text-gray-500">No education added yet</p>
                                        </div>
                                    ) : (
                                        education.map((edu, idx) => (
                                            <div key={edu.id} className="p-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/50 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-indigo-600">Education #{idx + 1}</span>
                                                    <button
                                                        onClick={() => removeEducation(edu.id)}
                                                        className="text-red-600 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <Input
                                                        label="Degree"
                                                        value={edu.degree}
                                                        onChange={(v) => updateEducation(edu.id, "degree", v)}
                                                        className="sm:col-span-2"
                                                    />
                                                    <Input
                                                        label="Institution"
                                                        value={edu.institution}
                                                        onChange={(v) => updateEducation(edu.id, "institution", v)}
                                                    />
                                                    <Input
                                                        label="Year"
                                                        value={edu.year}
                                                        onChange={(v) => updateEducation(edu.id, "year", v)}
                                                        placeholder="2015 – 2019"
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Projects Tab */}
                            {activeTab === "Projects" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h4>
                                        <button
                                            onClick={addProject}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold"
                                        >
                                            Add Project
                                        </button>
                                    </div>

                                    {projects.length === 0 ? (
                                        <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-xl">
                                            <p className="text-gray-500">No projects added yet</p>
                                        </div>
                                    ) : (
                                        projects.map((proj, idx) => (
                                            <div key={proj.id} className="p-5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/50 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-indigo-600">Project #{idx + 1}</span>
                                                    <button
                                                        onClick={() => removeProject(proj.id)}
                                                        className="text-red-600 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <Input
                                                        label="Name"
                                                        value={proj.name}
                                                        onChange={(v) => updateProject(proj.id, "name", v)}
                                                    />
                                                    <Input
                                                        label="Link"
                                                        value={proj.link || ""}
                                                        onChange={(v) => updateProject(proj.id, "link", v)}
                                                    />
                                                    <TextArea
                                                        className="sm:col-span-2"
                                                        label="Description"
                                                        value={proj.description}
                                                        onChange={(v) => updateProject(proj.id, "description", v)}
                                                        rows={3}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
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

export default SaaSProfilePage;
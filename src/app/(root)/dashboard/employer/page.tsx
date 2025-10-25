"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import JobContainer from "@/app/components/JobContainer";
import ProfilePreview from "@/app/components/ProfilePreview";
import { getMe } from "@/app/api/profile";
import ProfileSetupModal from "@/app/components/ProfileSetupModal";
import Banner from "@/app/components/Banner";
import CandidateContainer from "@/app/components/Candidate";

export default function Dashboard() {
    const [me, setMe] = useState<any>({ id: -1, username: "", role: "" });
    const [showModal, setShowModal] = useState(true);
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        setIsAnimated(true);
        fetchMe();
    }, []);

    const fetchMe = async () => {
        const resp = await getMe();
        if (resp.status !== 200) return;
        setMe(resp.data);

        if (!resp.data?.profile || !resp.data.profile.fullName) setShowModal(true);
    };

    const handleSaveProfile = async (form: any) => setMe({ ...me, profile: form });

    // Role-specific metrics
    const metrics = () => {
        switch (me.role) {
            case "SEEKER":
                return [
                    { label: "Profile Completion", value: 82, description: "Complete your profile to get better job matches", trend: 5 },
                    { label: "Applications Sent", value: 136, description: "Applications sent this month", trend: 10 },
                    { label: "Responses Received", value: 98, description: "Companies responded", trend: 3 },
                    { label: "Job Matches", value: 12, description: "Jobs matching your profile", trend: -1 },
                ];
            case "POSTER":
                return [
                    { label: "Profile Completion", value: 75, description: "Complete your profile for better reach", trend: 4 },
                    { label: "Jobs Posted", value: 15, description: "Active jobs posted", trend: 2 },
                    { label: "Applicants Received", value: 42, description: "Applicants for your jobs", trend: 5 },
                    { label: "Top Candidates", value: 8, description: "Highly matching candidates", trend: 1 },
                ];
            case "ADMIN":
                return [
                    { label: "Profile Completion", value: 100, description: "Admin profile", trend: 0 },
                    { label: "Total Users", value: 452, description: "Registered users", trend: 5 },
                    { label: "Pending Requests", value: 12, description: "Pending approvals", trend: 2 },
                    { label: "Total Jobs", value: 321, description: "Jobs posted platform-wide", trend: 8 },
                ];
            default:
                return [];
        }
    };

    // Role-specific main content
    const mainContent = () => {
        switch (me.role) {
            case "SEEKER":
                return (
                    <>
                        <JobContainer title="Closest Match Jobs" closestJobs={[ /*...Seeker jobs*/]} />
                        <JobContainer title="Trending Jobs" closestJobs={[ /*...Trending jobs*/]} />
                        <Banner title="Ready to find your dream job?" subtitle="Complete your profile and get personalized recommendations." showProfileCTA={true} />
                    </>
                );

            case "POSTER":
                return (
                    <>
                        <JobContainer title="Your Posted Jobs" closestJobs={[ /*...Jobs posted*/]} />
                        <CandidateContainer title="Closest Candidates" candidates={[
                            { id: 1, name: "Alice Johnson", role: "SEEKER", avatar: "https://i.pravatar.cc/150?img=1", match: "95%" },
                            { id: 2, name: "Bob Smith", role: "SEEKER", avatar: "https://i.pravatar.cc/150?img=2", match: "90%" },
                            { id: 3, name: "Charlie Davis", role: "SEEKER", avatar: "https://i.pravatar.cc/150?img=3", match: "88%" },
                        ]} />
                        <JobContainer title="Top Candidates" closestJobs={[ /*...Top candidates*/]} />
                        <Banner title="Ready to hire top talent?" subtitle="Post a job and attract best candidates." showProfileCTA={false} />
                    </>
                );

            case "ADMIN":
                return (
                    <>
                        <JobContainer title="Recent Users" closestJobs={[ /*...Users*/]} />
                        <JobContainer title="Pending Requests" closestJobs={[ /*...Requests*/]} />
                        <JobContainer title="Top Jobs" closestJobs={[ /*...Top jobs*/]} />
                        <Banner title="Manage platform effectively" subtitle="Keep track of users, jobs, and requests." showProfileCTA={false} />
                    </>
                );
        }
    };

    return (
        <section className="font-sans min-h-screen mb-2">
            <ProfileSetupModal open={showModal} onClose={() => setShowModal(false)} onSave={handleSaveProfile} />
            <div className="space-y-2">
                <Header heading={`Welcome back, ${me.username} 👋`} subHeading={`Here’s your personalized ${me.role?.toLowerCase()} dashboard`} />

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {metrics().map((metric, i) => (
                        <div key={i} className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 border border-gray-200 dark:border-neutral-800 p-5 hover:shadow-md transition cursor-pointer">
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{metric.label}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${metric.trend >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    {metric.trend >= 0 ? "▲" : "▼"} {Math.abs(metric.trend)}%
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{metric.description}</p>
                        </div>
                    ))}
                </div>

                {/* Main Layout */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2.5">
                    <div className="lg:col-span-2 space-y-2">{mainContent()}</div>
                    <aside className="space-y-2"><ProfilePreview profile={me} /></aside>
                </div>
            </div>
        </section>
    );
}

"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import JobContainer from "@/app/components/JobContainer";
import ProfilePreview from "@/app/components/ProfilePreview";
import { getMe } from "@/app/api/profile";
import ProfileSetupModal from "@/app/components/ProfileSetupModal";
import Banner from "@/app/components/Banner";

export default function Dashboard() {
    const [isAnimated, setIsAnimated] = useState(false);
    const [me, setMe] = useState<any>({ id: -1, username: "", email: "", role: "" });
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        setIsAnimated(true);
        fetchMe();
    }, []);

    const fetchMe = async () => {
        const resp = await getMe();
        if (resp.status !== 200) return;
        setMe(resp.data);

        // Show profile modal if incomplete profile
        if (!resp.data?.profile || !resp.data.profile.fullName) {
            setShowModal(true);
        }
    };

    const handleSaveProfile = async (form: any) => {
        console.log("Saving profile...", form);
        setMe({ ...me, profile: form });
    };

    /** Role-based metrics */
    const metrics = () => {
        switch (me.role) {
            case "SEEKER":
                return [
                    { label: "Profile Completion", value: 82, description: "Complete your profile to get better job matches", trend: 5 },
                    { label: "Applications Sent", value: 136, description: "Number of applications you sent this month", trend: 10 },
                    { label: "Responses Received", value: 98, description: "Companies that responded to your applications", trend: 3 },
                    { label: "Job Matches", value: 12, description: "Jobs that match your profile this week", trend: -1 },
                ];
            case "POSTER":
                return [
                    { label: "Profile Completion", value: 75, description: "Complete your profile for better reach", trend: 4 },
                    { label: "Jobs Posted", value: 15, description: "Active jobs posted this month", trend: 2 },
                    { label: "Applicants Received", value: 42, description: "Total applicants for your jobs", trend: 5 },
                    { label: "Active Jobs", value: 8, description: "Jobs currently live", trend: 1 },
                ];
            case "ADMIN":
                return [
                    { label: "Profile Completion", value: 100, description: "Admin profile", trend: 0 },
                    { label: "Total Users", value: 452, description: "Registered users on platform", trend: 5 },
                    { label: "Total Jobs", value: 321, description: "Jobs posted on platform", trend: 2 },
                    { label: "Total Applications", value: 980, description: "Applications submitted", trend: 8 },
                ];
            default:
                return [];
        }
    };

    /** Role-based main content */
    const mainContent = () => {
        switch (me.role) {
            case "SEEKER":
                return (
                    <>
                        <JobContainer
                            title="Closest Match Jobs"
                            closestJobs={[
                                { id: 1, company: "Stripe", logo: "https://logo.clearbit.com/stripe.com", role: "Frontend Engineer", location: "Remote", match: "92%" },
                                { id: 2, company: "Google", logo: "https://logo.clearbit.com/google.com", role: "Cloud Engineer", location: "San Francisco, CA", match: "87%" },
                                { id: 3, company: "Figma", logo: "https://logo.clearbit.com/figma.com", role: "UI Engineer", location: "Remote", match: "85%" },
                            ]}
                        />
                        <TrendingJobs />
                        <Banner showProfileCTA={false} title="Ready to find your dream job?" subtitle="Complete your profile and get personalized job recommendations." />
                    </>
                );
            case "POSTER":
                return (
                    <>
                        <JobContainer
                            title="Your Posted Jobs"
                            closestJobs={[
                                { id: 1, company: "Your Company A", logo: "https://logo.clearbit.com/example.com", role: "Backend Engineer", location: "Remote" },
                                { id: 2, company: "Your Company B", logo: "https://logo.clearbit.com/example.com", role: "Fullstack Developer", location: "New York" },
                            ]}
                        />
                        <TrendingJobs />
                    </>
                );
            case "ADMIN":
                return (
                    <>
                        <JobContainer
                            title="Top Jobs"
                            closestJobs={[
                                { id: 1, company: "Shopify", logo: "https://logo.clearbit.com/shopify.com", role: "Fullstack Developer" },
                                { id: 2, company: "Amazon", logo: "https://logo.clearbit.com/amazon.com", role: "AI Engineer" },
                                { id: 3, company: "Netflix", logo: "https://logo.clearbit.com/netflix.com", role: "Data Scientist" },
                            ]}
                        />
                        <JobContainer
                            title="Recent Users"
                            closestJobs={[
                                { id: 1, company: "User: Alice", logo: "", role: "SEEKER" },
                                { id: 2, company: "User: Bob", logo: "", role: "POSTER" },
                            ]}
                        />
                    </>
                );
        }
    };

    /** Trending Jobs Component reused for all roles */
    const TrendingJobs = () => (
        <div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-neutral-900 backdrop-blur-md p-6 shadow-lg border border-gray-100 dark:border-neutral-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Trending Jobs</h2>
            <div className="flex gap-6 overflow-x-auto py-2 snap-x snap-mandatory scrollbar-hide">
                {[
                    { id: 1, company: "Shopify", logo: "https://logo.clearbit.com/shopify.com", role: "Fullstack Developer" },
                    { id: 2, company: "Amazon", logo: "https://logo.clearbit.com/amazon.com", role: "AI Engineer" },
                    { id: 3, company: "Netflix", logo: "https://logo.clearbit.com/netflix.com", role: "Data Scientist" },
                    { id: 4, company: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com", role: "Product Designer" },
                ].map((job) => (
                    <div
                        key={job.id}
                        className="min-w-[220px] flex-shrink-0 flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md hover:shadow-2xl hover:scale-105 transform transition-all duration-300 snap-start cursor-pointer"
                    >
                        {job.logo && <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg object-contain shadow-sm" />}
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{job.role}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const profileCompletion = metrics()[0]?.value || 0;
    const showProfileCTA = profileCompletion < 90;

    return (
        <section className="font-sans min-h-screen mb-2">
            <ProfileSetupModal open={showModal} onClose={() => setShowModal(false)} onSave={handleSaveProfile} />

            <div className="space-y-2">
                {/* Header */}
                <Header heading={`Welcome back, ${me.username} 👋`} subHeading={`Here’s your personalized ${me.role?.toLowerCase()} dashboard`} />

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {metrics().map((metric, i) => {
                        const isPositive = metric.trend >= 0;
                        return (
                            <div
                                key={i}
                                className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 border border-gray-200 dark:border-neutral-800 p-5 hover:shadow-md transition cursor-pointer"
                            >
                                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{metric.label}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full ${isPositive
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                            }`}
                                    >
                                        {isPositive ? "▲" : "▼"} {Math.abs(metric.trend)}%
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{metric.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Main layout */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2.5">
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-2">{mainContent()}</div>

                    {/* Right */}
                    <aside className="space-y-2">
                        <ProfilePreview profile={me} />
                    </aside>
                </div>

            </div>
        </section>
    );
}

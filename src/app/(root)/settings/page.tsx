"use client";
import React, { useEffect, useState } from "react";
import {
    User,
    Lock,
    Bell,
    Briefcase,
    Github,
    Linkedin,
    CreditCard,
    Moon,
    HelpCircle,
} from "lucide-react";
import Header from "@/app/components/Header";

const navItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Account & Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Job Preferences", icon: Briefcase },
    { id: "accounts", label: "Connected Accounts", icon: Github },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "personalization", label: "Personalization", icon: Moon },
    { id: "support", label: "Support", icon: HelpCircle },
];

export default function SettingsPage() {
    const [active, setActive] = useState<string>("profile");

    // Track active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { threshold: 0.3 }
        );

        navItems.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Smooth scroll with offset for fixed headers
    const handleNavClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const yOffset = -80; // adjust if Header is taller
            const y =
                el.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    // 🔥 Card wrapper style
    const cardClasses =
        "rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 p-6 shadow-lg border border-gray-200 dark:border-neutral-800 hover:shadow-xl transition";

    return (
        <section className="font-sans space-y-2">
            <Header
                heading="Settings"
                subHeading="Manage your profile, account, and preferences"
            />

            <div className="mx-auto flex gap-2">
                {/* Sidebar */}
                <aside className="w-64 hidden md:block bg-white dark:bg-neutral-900 p-4 border-r border-gray-200 dark:border-neutral-800 rounded-2xl">
                    <nav className="sticky top-24 space-y-1">
                        {navItems.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => handleNavClick(id)}
                                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${active === id
                                    ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-neutral-800"
                                    }`}
                            >
                                <Icon
                                    className={`w-4 h-4 ${active === id
                                        ? "text-indigo-600 dark:text-indigo-400"
                                        : "text-indigo-500"
                                        }`}
                                />
                                <span className="text-sm font-medium">{label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content */}
                <div className="flex-1 space-y-2">
                    {/* Profile */}
                    <div id="profile" className={cardClasses}>
                        <div className="flex items-center gap-3 mb-4">
                            <User className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Profile Settings
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800"
                            />
                            <input
                                type="text"
                                placeholder="Headline (e.g. Fullstack Developer)"
                                className="w-full px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800 md:col-span-2"
                            />
                            <textarea
                                placeholder="Short Bio"
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800 md:col-span-2"
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Security */}
                    <div id="security" className={cardClasses}>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Account & Security
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {[
                                "Change Password",
                                "Enable Two-Factor Authentication",
                                "Deactivate Account",
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    className={`w-full text-left px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 transition ${action === "Deactivate Account"
                                        ? "text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40"
                                        : ""
                                        }`}
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notifications */}
                    <div id="notifications" className={cardClasses}>
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Notifications
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {["Job Alerts", "Application Updates", "Newsletters"].map(
                                (item, i) => (
                                    <label
                                        key={i}
                                        className="flex items-center justify-between px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800"
                                    >
                                        <span>{item}</span>
                                        <input type="checkbox" className="accent-indigo-600" />
                                    </label>
                                )
                            )}
                        </div>
                    </div>

                    {/* Preferences */}
                    <div id="preferences" className={cardClasses}>
                        <div className="flex items-center gap-3 mb-4">
                            <Briefcase className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Job Preferences
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <select className="w-full px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800">
                                <option>Remote</option>
                                <option>Hybrid</option>
                                <option>Onsite</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Expected Salary"
                                className="w-full px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800"
                            />
                            <input
                                type="text"
                                placeholder="Preferred Industries"
                                className="w-full px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800 md:col-span-2"
                            />
                        </div>
                    </div>

                    {/* Connected Accounts */}
                    <div id="accounts" className={cardClasses}>
                        <div className="flex items-center gap-3 mb-4">
                            <Github className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Connected Accounts
                            </h2>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 transition">
                                <Github className="w-4 h-4" /> GitHub
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 transition">
                                <Linkedin className="w-4 h-4" /> LinkedIn
                            </button>
                        </div>
                    </div>

                    {/* Billing */}
                    <div id="billing" className={cardClasses}>
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Billing & Subscription
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Current Plan: <span className="font-semibold">Pro</span> ·
                            <span className="text-indigo-600 dark:text-indigo-400">
                                {" "}
                                $29/month
                            </span>
                        </p>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                                Upgrade
                            </button>
                            <button className="px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 transition">
                                View Invoices
                            </button>
                        </div>
                    </div>

                    {/* Personalization */}
                    <div id="personalization" className={cardClasses}>
                        <div className="flex items-center gap-3 mb-4">
                            <Moon className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Personalization
                            </h2>
                        </div>
                        <label className="flex items-center justify-between px-4 py-2 rounded-lg border text-gray-900 dark:text-white dark:border-neutral-700 dark:bg-neutral-800">
                            <span>Dark Mode</span>
                            <input type="checkbox" className="accent-indigo-600" />
                        </label>
                    </div>

                    {/* Support */}
                    <div id="support" className={cardClasses}>
                        <div className="flex items-center gap-3 mb-4">
                            <HelpCircle className="w-5 h-5 text-indigo-500" />
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Support & Help
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Need help? Our support team is here for you.
                        </p>
                        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

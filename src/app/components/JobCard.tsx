"use client";
import React from "react";
import { MapPin, Briefcase, Wallet, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
    logo: string;
    company: string;
    title: string;
    location: string;
    salary: string;
    type: string;
    posted: string;
    status?: "Pending" | "Interview" | "Rejected";
    href?: string;
}

export default function JobCard({
    logo,
    company,
    title,
    location,
    salary,
    type,
    posted,
    status,
    href = "#",
}: JobCardProps) {
    const getStatusColor = (status: JobCardProps["status"]) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100/60 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";
            case "Interview":
                return "bg-blue-100/60 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
            case "Rejected":
                return "bg-red-100/60 text-red-700 dark:bg-red-900/40 dark:text-red-300";
            default:
                return "";
        }
    };

    return (
        <div className="group flex flex-col justify-between h-full rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-sm hover:shadow-lg transition-all duration-500">
            {/* Header */}
            <div className="flex items-start gap-4 p-6 border-b border-gray-100 dark:border-neutral-800">
                <img
                    src={logo}
                    alt={company}
                    className="w-12 h-12 rounded-xl object-contain border border-gray-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-1"
                />
                <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>
                </div>
                {status && (
                    <span
                        className={`text-xs px-2 py-0.5 font-medium rounded-full ${getStatusColor(
                            status
                        )}`}
                    >
                        {status}
                    </span>
                )}
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-6 py-4 text-sm">
                <InfoRow icon={<MapPin className="w-4 h-4 text-gray-400" />} label={location} />
                <InfoRow icon={<Wallet className="w-4 h-4 text-gray-400" />} label={salary} />
                <InfoRow icon={<Briefcase className="w-4 h-4 text-gray-400" />} label={type} />
                <InfoRow icon={<Clock className="w-4 h-4 text-gray-400" />} label={`Posted ${posted}`} />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 dark:border-neutral-800">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    Updated recently
                </span>
                <Link
                    href={href}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 hover:shadow-md transition"
                >
                    View Job
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

function InfoRow({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 truncate">
            {icon}
            <span>{label}</span>
        </div>
    );
}

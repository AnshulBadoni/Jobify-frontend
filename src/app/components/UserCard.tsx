import { Edit, Wallet, Briefcase, Clock, Languages } from "lucide-react";
import Link from "next/link";

interface Profile {
    id: number;
    username: string;
    email: string;
    role: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
}

const ProfilePreview = ({ profile }: { profile: Profile }) => {
    return (
        <div className="sticky top-20 bg-white dark:bg-neutral-950 rounded-2xl p-8 border border-gray-200 dark:border-neutral-800">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Left: Avatar + Info */}
                <div className="flex items-center gap-5">
                    <img
                        src={
                            profile.avatar ||
                            "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833548.jpg"
                        }
                        alt="User"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {profile.username || "John Doe"}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Software Engineer · Remote
                        </p>
                    </div>
                </div>

                {/* Right: Edit Button */}
                <Link
                    href="/profile/1"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                    <Edit className="w-4 h-4" />
                    Edit
                </Link>
            </div>

            {/* Stats Row */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6 text-sm">
                <StatItem
                    icon={<Wallet className="w-4 h-4 text-gray-400" />}
                    label="Expected Salary"
                    value="$80,000 / yr"
                />
                <StatItem
                    icon={<Briefcase className="w-4 h-4 text-gray-400" />}
                    label="Experience"
                    value="5 years"
                />
                <StatItem
                    icon={<Clock className="w-4 h-4 text-gray-400" />}
                    label="Employment"
                    value="Full-time"
                />
                <StatItem
                    icon={<Languages className="w-4 h-4 text-gray-400" />}
                    label="Languages"
                    value="English, Spanish"
                />
                <span className="text-xs text-gray-400 dark:text-gray-500">
                    • Updated {new Date(profile.updatedAt || Date.now()).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
};

export default ProfilePreview;

// --- Minimal, Typography-First Stat Block ---
function StatItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-2 min-w-[150px]">
            {icon}
            <span className="text-gray-900 dark:text-gray-100 font-medium">{value}</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">{label}</span>
        </div>
    );
}

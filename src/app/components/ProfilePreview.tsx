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
        <div className="sticky top-20 bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 rounded-2xl p-8 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Avatar */}
            <div className="relative flex justify-center">
                <div className="relative">
                    <img
                        src={
                            profile.avatar ||
                            "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833548.jpg"
                        }
                        alt="User"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-neutral-800 shadow"
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-indigo-500/30 animate-pulse" />
                </div>

                {/* Match Tag */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-medium shadow-md">
                    80% Match
                </span>
            </div>

            {/* Name */}
            <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
                    {profile?.username || "John Doe"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Engineer · Remote
                </p>
            </div>

            {/* Button */}
            <div className="mt-5 flex justify-center">
                <Link
                    href="/profile/1"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all"
                >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                </Link>
            </div>

            {/* Info Rows */}
            <div className="mt-8 grid grid-cols-2 gap-5">
                <InfoRow
                    icon={<Wallet className="w-4 h-4 text-indigo-500" />}
                    label="Expected Salary"
                    value="$80,000 / year"
                />
                <InfoRow
                    icon={<Briefcase className="w-4 h-4 text-indigo-500" />}
                    label="Experience"
                    value="5 years"
                />
                <InfoRow
                    icon={<Clock className="w-4 h-4 text-indigo-500" />}
                    label="Employment Type"
                    value="Full-time"
                />
                <InfoRow
                    icon={<Languages className="w-4 h-4 text-indigo-500" />}
                    label="Languages"
                    value="English, Spanish"
                />
            </div>
        </div>
    );
};

export default ProfilePreview;

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20 transition-colors">
            <div className="shrink-0 p-2 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300">
                {icon}
            </div>
            <div className="leading-tight">
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {label}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {value}
                </p>
            </div>
        </div>
    );
}

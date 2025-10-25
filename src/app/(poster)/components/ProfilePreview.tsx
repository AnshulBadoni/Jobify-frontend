import { Edit, Briefcase, Calendar, Users } from "lucide-react";
import Link from "next/link";

interface PosterProfile {
    id: number;
    username: string;
    email: string;
    role: string;
    avatar?: string;
    postedJobsCount?: number;
    applicationsReceived?: number;
    shortlisted?: number;
}

const ProfilePreviewPoster = ({ profile }: { profile: PosterProfile }) => {
    return (
        <div className="sticky top-20 bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 rounded-2xl p-8 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300">

            {/* Avatar / Logo */}
            <div className="flex flex-col items-center">
                <div className="relative">
                    <img
                        src={
                            profile.avatar ||
                            "https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833548.jpg"
                        }
                        alt="Company"
                        className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-neutral-800 shadow"
                    />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
                    {profile.username || "Your Company"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{profile.role || "Poster"}</p>

                <Link
                    href="/profile"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all"
                >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                </Link>
            </div>

            {/* Info Section */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <StatBlock
                    icon={<Briefcase className="w-4 h-4 text-indigo-500" />}
                    label="Jobs Posted"
                    value={profile.postedJobsCount || 0}
                />
                <StatBlock
                    icon={<Users className="w-4 h-4 text-indigo-500" />}
                    label="Applications"
                    value={profile.applicationsReceived || 0}
                />
                <StatBlock
                    icon={<Calendar className="w-4 h-4 text-indigo-500" />}
                    label="Shortlisted"
                    value={profile.shortlisted || 0}
                />
            </div>
        </div>
    );
};

export default ProfilePreviewPoster;

function StatBlock({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
}) {
    return (
        <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-colors">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 mb-1">
                {icon}
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
        </div>
    );
}

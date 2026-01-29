import React from 'react';
import {
    User,
    MessageSquare,
    CreditCard,
    Settings,
    HelpCircle,
    LogOut,
    Plus,
    CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileDropdownProps {
    user: UserProfile;
    isOpen: boolean;
    direction?: 'up' | 'down';
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, isOpen, direction = 'down' }) => {
    const positionClasses = direction === 'up'
        ? 'bottom-full right-0 mb-4 origin-bottom-right'
        : 'top-full right-0 mt-3 origin-top-right';

    return (
        <div
            className={`
        absolute w-64 
        bg-white dark:bg-neutral-900 
        rounded-2xl shadow-xl shadow-neutral-200/50 dark:shadow-neutral-900/50 
        border border-neutral-100 dark:border-neutral-800 p-2 
        transform 
        transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        z-50
        ${positionClasses}
        ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0 visible'
                    : `opacity-0 scale-95 ${direction === 'up' ? 'translate-y-2' : '-translate-y-2'} invisible pointer-events-none`}
      `}
            aria-hidden={!isOpen}
        >

            {/* Header Section */}
            <div className="p-4 bg-white dark:bg-neutral-900 rounded-t-xl mb-1 relative">
                <div className="flex items-start justify-between">
                    <div className="pr-4">
                        <h3 className="text-md font-bold text-neutral-900 dark:text-white leading-tight">{user.name}</h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 break-all">{user.email}</p>
                    </div>

                    <div className="relative flex-shrink-0">
                        {/* Gradient Ring Avatar */}
                        <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-pink-500">
                            <div className="w-full h-full rounded-full border-2 border-white dark:border-neutral-900 overflow-hidden bg-white">
                                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1 text-sm">
                {/* Profile */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium transition-colors">
                    <User size={18} />
                    <span>Profile</span>
                </button>

                {/* Subscription */}
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                    <div className="flex items-center gap-3">
                        <CreditCard size={18} />
                        <span className="font-medium">Subscription</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-md">
                        <CheckCircle2 size={12} className="fill-current" />
                        PRO
                    </div>
                </button>

                {/* Settings */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                    <Settings size={18} />
                    <span className="font-medium">Settings</span>
                </button>

                {/* Help Center */}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                    <HelpCircle size={18} />
                    <span className="font-medium">Help Center</span>
                </button>

                {/* Sign Out */}
                <div className="pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <LogOut size={18} />
                        <span className="font-medium">Sign out</span>
                    </button>
                </div>

            </div>
        </div>
    );
};
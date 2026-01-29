export interface Job {
    id: number | string;
    title: string;
    company: string;
    description?: string;
    type: string;
    location: string;
    date: string;
    tags: string[];
    color: string;
    salary?: string;
    companyIcon: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: "SEEKER" | "POSTER" | "ADMIN";
    avatar?: string;
    profile?: {
        fullName?: string;
        avatar?: string;
        phone?: string;
    };
    company?: {
        name?: string;
        logo?: string;
    };
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface Session {
    user: User;
    accessToken: string;
    expiresAt: number;
}

export type AuthError =
    | "UNAUTHORIZED"
    | "TOKEN_EXPIRED"
    | "INVALID_TOKEN"
    | "SESSION_NOT_FOUND"
    | "NETWORK_ERROR";

export class AuthenticationError extends Error {
    constructor(
        public code: AuthError,
        message: string
    ) {
        super(message);
        this.name = "AuthenticationError";
    }
}


export type Application = {
    id: number;
    company: string;
    logo: string;
    title: string;
    date: string;
    status: "In Review" | "Approved" | "Pending";
};

export type Activity = { id: number; action: string; date: string };

export type Experience = {
    id: string;
    role: string;
    company: string;
    period: string;
    details: string;
};

export type Education = {
    id: string;
    degree: string;
    institution: string;
    fieldOfStudy?: string | null;
    startYear: string;
    endYear: string;
    grade?: string | null;
    description?: string | null;
};

export type Project = {
    id: string;
    name: string;
    description: string;
    link?: string;
    img?: string[];
};

export interface ProfileState {
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
    experiences: Experience[];
    educations: Education[];
    projects: Project[];
    currentCTC?: string | null;
    expectedCTC?: string | null;
    currentLocation?: string | null;
    expectedLocation?: string | null;
    createdAt: string;
    updatedAt: string;
    user: User;
}
import { ReactNode } from "react";

// Column configuration types
export type ColumnType = "text" | "number" | "date" | "badge" | "avatar" | "progress" | "custom";

export interface Column<T = any> {
    key: string;
    label?: string;
    type?: ColumnType;
    sortable?: boolean;
    hidden?: boolean;
    width?: string;
    align?: "left" | "center" | "right";
    render?: (row: T, value: any) => ReactNode;
    // Badge specific
    badgeVariants?: Record<string, { bg: string; text: string }>;
    // Avatar specific
    avatarNameKey?: string;
    avatarSubtitleKey?: string;
    // Progress specific
    progressMax?: number;
    progressColor?: string;
}

export interface RowAction<T = any> {
    label: string;
    icon?: ReactNode;
    danger?: boolean;
    disabled?: boolean | ((row: T) => boolean);
    hidden?: (row: T) => boolean;
    onClick: (row: T) => void;
}

export interface TableProps<T extends Record<string, any> = any> {
    data: T[];
    columns?: Column<T>[];
    // Features
    searchable?: boolean;
    filterable?: boolean;
    pagination?: boolean;
    pageSize?: number;
    pageSizeOptions?: number[];
    selectable?: boolean;
    view?: "table" | "grid";
    actions?: RowAction<T>[];
    // Callbacks
    onSelectionChange?: (selectedRows: T[]) => void;
    onRowClick?: (row: T) => void;
    // UI
    title?: string;
    emptyMessage?: string;
    emptyIcon?: ReactNode;
    loading?: boolean;
    // Bonus features
    columnToggle?: boolean;
    exportable?: boolean;
    stickyHeader?: boolean;
    striped?: boolean;
    bordered?: boolean;
    compact?: boolean;
    // Custom rendering
    gridRenderer?: (row: T, index: number) => ReactNode;
    rowClassName?: string | ((row: T) => string);
    // Unique identifier
    rowKey?: keyof T | ((row: T) => string | number);
}

export interface SortConfig {
    key: string;
    direction: "asc" | "desc";
}







// remove later
import { LucideIcon } from 'lucide-react';

export interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
    href?: string;
}

export interface UserProfile {
    name: string;
    email: string;
    avatarUrl: string;
    status: 'online' | 'offline' | 'busy';
}

export interface Candidate {
    id: string;
    name: string;
    handle: string;
    avatarUrl: string;
    role: string;
}

export interface Company {
    id: string;
    name: string;
    logo: LucideIcon;
}
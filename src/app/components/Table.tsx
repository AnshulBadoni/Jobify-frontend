"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect, ReactNode } from "react";

// ============================================================================
// TYPES
// ============================================================================

export type ColumnType = "text" | "number" | "date" | "badge" | "avatar" | "progress" | "custom";

export type FilterFieldType = "text" | "select" | "multiselect" | "date" | "daterange" | "number" | "numberrange" | "checkbox";

export interface FilterField {
    key: string;
    label: string;
    type: FilterFieldType;
    placeholder?: string;
    options?: { label: string; value: string | number | boolean }[];
    min?: number;
    max?: number;
}

export interface FilterValues {
    [key: string]: any;
}

export interface Column<T = any> {
    key: string;
    label?: string;
    type?: ColumnType;
    sortable?: boolean;
    filterable?: boolean;
    hidden?: boolean;
    width?: string;
    align?: "left" | "center" | "right";
    render?: (row: T, value: any) => ReactNode;
    badgeVariants?: Record<string, { bg: string; text: string }>;
    avatarNameKey?: string;
    avatarSubtitleKey?: string;
    progressMax?: number;
    progressColor?: string;
    filterOptions?: { label: string; value: string }[];
}

export interface RowAction<T = any> {
    label: string;
    icon?: ReactNode;
    danger?: boolean;
    warning?: boolean;
    disabled?: boolean | ((row: T) => boolean);
    hidden?: (row: T) => boolean;
    onClick: (row: T) => void;
    divider?: boolean;
}

export interface BulkAction {
    label: string;
    icon?: ReactNode;
    danger?: boolean;
    onClick: (selectedIds: (string | number)[]) => void;
}

export interface TableProps<T extends Record<string, any> = any> {
    data: T[];
    columns?: Column<T>[];
    // Features
    searchable?: boolean;
    searchPlaceholder?: string;
    pagination?: boolean;
    pageSize?: number;
    pageSizeOptions?: number[];
    selectable?: boolean;
    actions?: RowAction<T>[];
    bulkActions?: BulkAction[];
    // Filtering
    filterable?: boolean;
    advancedFilter?: boolean;
    filterFields?: FilterField[];
    onFilterChange?: (filters: FilterValues) => void;
    // Toolbar
    toolbarActions?: ReactNode;
    // Callbacks
    onSelectionChange?: (selectedRows: T[]) => void;
    onRowClick?: (row: T) => void;
    // UI
    title?: string;
    emptyMessage?: string;
    emptyIcon?: ReactNode;
    loading?: boolean;
    stickyHeader?: boolean;
    // Unique identifier
    rowKey?: keyof T | ((row: T) => string | number);
}

interface SortConfig {
    key: string;
    direction: "asc" | "desc";
}

// ============================================================================
// UTILITIES
// ============================================================================

const camelToTitle = (str: string): string => {
    if (!str) return "";
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim();
};

const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
};

const formatDate = (value: any): string => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const formatNumber = (value: any): string => {
    if (value === null || value === undefined) return "-";
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return num.toLocaleString();
};

const filterBySearch = <T extends Record<string, any>>(data: T[], searchTerm: string, keys: string[]): T[] => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((row) => keys.some((key) => {
        const value = getNestedValue(row, key);
        if (value === null || value === undefined) return false;
        if (typeof value === "object") return false;
        return String(value).toLowerCase().includes(term);
    }));
};

const sortData = <T,>(data: T[], key: string, direction: "asc" | "desc"): T[] => {
    return [...data].sort((a, b) => {
        const aVal = getNestedValue(a, key);
        const bVal = getNestedValue(b, key);
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        const comparison = aVal < bVal ? -1 : 1;
        return direction === "asc" ? comparison : -comparison;
    });
};

const applyFilters = <T extends Record<string, any>>(data: T[], filters: FilterValues, filterFields: FilterField[]): T[] => {
    return data.filter((row) => {
        return Object.entries(filters).every(([key, value]) => {
            if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
                return true;
            }

            const field = filterFields.find((f) => f.key === key);
            const rowValue = getNestedValue(row, key);

            if (!field) {
                return String(rowValue) === String(value);
            }

            switch (field.type) {
                case "text":
                    return String(rowValue || "").toLowerCase().includes(String(value).toLowerCase());
                case "select":
                    return String(rowValue) === String(value);
                case "multiselect":
                    if (!Array.isArray(value)) return true;
                    return value.includes(rowValue);
                case "checkbox":
                    return Boolean(rowValue) === Boolean(value);
                case "number":
                    return Number(rowValue) === Number(value);
                case "numberrange":
                    const numVal = Number(rowValue);
                    const { min, max } = value as { min?: number; max?: number };
                    if (min !== undefined && numVal < min) return false;
                    if (max !== undefined && numVal > max) return false;
                    return true;
                case "date":
                    const dateVal = new Date(rowValue).toDateString();
                    const filterDate = new Date(value).toDateString();
                    return dateVal === filterDate;
                case "daterange":
                    const rowDate = new Date(rowValue);
                    const { start, end } = value as { start?: string; end?: string };
                    if (start && rowDate < new Date(start)) return false;
                    if (end && rowDate > new Date(end)) return false;
                    return true;
                default:
                    return true;
            }
        });
    });
};

const countActiveFilters = (filters: FilterValues): number => {
    return Object.values(filters).filter((v) => {
        if (v === undefined || v === null || v === "") return false;
        if (Array.isArray(v) && v.length === 0) return false;
        if (typeof v === "object" && !Array.isArray(v)) {
            return Object.values(v).some((val) => val !== undefined && val !== null && val !== "");
        }
        return true;
    }).length;
};

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
    Search: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    Sort: () => (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
    ),
    ChevronLeft: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    ),
    ChevronRight: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    ),
    Dots: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
    ),
    Trash: () => (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    ),
    Archive: () => (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
    ),
    Filter: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
    ),
    X: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    Sliders: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
    ),
    Refresh: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
    Empty: () => (
        <svg className="w-16 h-16 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
    ),
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const Badge = ({ value, variants }: { value: string; variants?: Record<string, { bg: string; text: string }> }) => {
    const defaultVariants: Record<string, { bg: string; text: string }> = {
        active: { bg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900", text: "" },
        open: { bg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900", text: "" },
        inactive: { bg: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700", text: "" },
        closed: { bg: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700", text: "" },
        pending: { bg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900", text: "" },
        paused: { bg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900", text: "" },
        draft: { bg: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700", text: "" },
        default: { bg: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700", text: "" },
    };
    const allVariants = { ...defaultVariants, ...variants };
    const key = value?.toLowerCase() || "default";
    const variant = allVariants[key] || allVariants.default;

    return (
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${variant.bg}`}>
            {value}
        </span>
    );
};

const Avatar = ({ src, name, subtitle }: { src?: string; name: string; subtitle?: string }) => {
    const initials = name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    return (
        <div className="flex items-center gap-3">
            {src ? (
                <img src={src} alt={name} className="w-9 h-9 rounded-full object-cover ring-2 ring-white dark:ring-neutral-900" />
            ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-white dark:ring-neutral-900">
                    <span className="text-xs font-bold text-white">{initials}</span>
                </div>
            )}
            <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{name}</p>
                {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
            </div>
        </div>
    );
};

const ProgressBar = ({ value, max = 100, label, sublabel }: { value: number; max?: number; label?: string; sublabel?: string }) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    return (
        <div className="w-full max-w-[140px]">
            <div className="flex justify-between text-[11px] mb-1 font-medium">
                {label && <span className="text-slate-900 dark:text-white">{label}</span>}
                {sublabel && <span className="text-slate-500">{sublabel}</span>}
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

const AvatarGroup = ({ avatars, max = 4 }: { avatars: string[]; max?: number }) => {
    const visible = avatars.slice(0, max);
    const remaining = avatars.length - max;

    if (avatars.length === 0) {
        return <span className="text-xs text-slate-400 italic">--</span>;
    }

    return (
        <div className="flex -space-x-2">
            {visible.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 hover:z-10 hover:scale-110 transition-transform cursor-pointer object-cover"
                />
            ))}
            {remaining > 0 && (
                <div className="w-8 h-8 rounded-full border-2 border-white dark:border-neutral-900 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">+{remaining}</span>
                </div>
            )}
        </div>
    );
};

const DropdownMenu = ({ trigger, items, row }: { trigger: React.ReactNode; items: RowAction[]; row: any }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const visibleItems = items.filter((item) => !item.hidden?.(row));
    if (visibleItems.length === 0) return null;

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className={`p-2 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-neutral-700 text-slate-400 hover:text-slate-600 dark:hover:text-white transition ${open ? 'bg-gray-100 dark:bg-neutral-800 text-indigo-600' : ''}`}
            >
                {trigger}
            </button>
            {open && (
                <div className="absolute right-10 top-8 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-gray-100 dark:border-neutral-800 z-50 py-1 text-left animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                    {visibleItems.map((item, i) => {
                        const isDisabled = typeof item.disabled === "function" ? item.disabled(row) : item.disabled;
                        return (
                            <React.Fragment key={i}>
                                {item.divider && <div className="h-px bg-gray-100 dark:bg-neutral-800 my-1" />}
                                <button
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={(e) => { e.stopPropagation(); item.onClick(row); setOpen(false); }}
                                    className={`w-full px-4 py-2.5 text-left text-xs font-bold flex items-center gap-3 transition-colors ${isDisabled
                                        ? "opacity-50 cursor-not-allowed text-slate-400"
                                        : item.danger
                                            ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                                            : item.warning
                                                ? "text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                                                : "text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-neutral-800"
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            </React.Fragment>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

// Advanced Filter Offcanvas (keeping the same as before)
const AdvancedFilterOffcanvas = ({
    isOpen,
    onClose,
    filterFields,
    filters,
    onChange,
    onClear,
}: {
    isOpen: boolean;
    onClose: () => void;
    filterFields: FilterField[];
    filters: FilterValues;
    onChange: (filters: FilterValues) => void;
    onClear: () => void;
}) => {
    const [localFilters, setLocalFilters] = useState<FilterValues>(filters);

    useEffect(() => {
        if (isOpen) {
            setLocalFilters(filters);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, filters]);

    const handleFieldChange = (key: string, value: any) => {
        setLocalFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        onChange(localFilters);
        onClose();
    };

    const handleClear = () => {
        setLocalFilters({});
        onClear();
    };

    const activeCount = countActiveFilters(localFilters);

    const renderFilterField = (field: FilterField) => {
        const value = localFilters[field.key];

        switch (field.type) {
            case "text":
                return (
                    <input
                        type="text"
                        placeholder={field.placeholder || `Search ${field.label.toLowerCase()}...`}
                        value={value || ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                );

            case "select":
                return (
                    <select
                        value={value || ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value || undefined)}
                        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                        <option value="">All {field.label}</option>
                        {field.options?.map((opt) => (
                            <option key={String(opt.value)} value={String(opt.value)}>{opt.label}</option>
                        ))}
                    </select>
                );

            case "multiselect":
                const selectedValues = Array.isArray(value) ? value : [];
                return (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {field.options?.map((opt) => (
                            <label
                                key={String(opt.value)}
                                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
                            >
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    checked={selectedValues.includes(opt.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            handleFieldChange(field.key, [...selectedValues, opt.value]);
                                        } else {
                                            handleFieldChange(field.key, selectedValues.filter((v: any) => v !== opt.value));
                                        }
                                    }}
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">{opt.label}</span>
                            </label>
                        ))}
                    </div>
                );

            case "checkbox":
                return (
                    <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 transition">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={Boolean(value)}
                            onChange={(e) => handleFieldChange(field.key, e.target.checked ? true : undefined)}
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{field.placeholder || field.label}</span>
                    </label>
                );

            case "number":
                return (
                    <input
                        type="number"
                        placeholder={field.placeholder || "Enter value..."}
                        value={value || ""}
                        min={field.min}
                        max={field.max}
                        onChange={(e) => handleFieldChange(field.key, e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                );

            case "numberrange":
                const rangeValue = (value as { min?: number; max?: number }) || {};
                return (
                    <div className="flex gap-3 items-center">
                        <input
                            type="number"
                            placeholder="Min"
                            value={rangeValue.min ?? ""}
                            min={field.min}
                            onChange={(e) => handleFieldChange(field.key, {
                                ...rangeValue,
                                min: e.target.value ? Number(e.target.value) : undefined
                            })}
                            className="flex-1 px-4 py-3 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        <span className="text-gray-400 font-medium">—</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={rangeValue.max ?? ""}
                            max={field.max}
                            onChange={(e) => handleFieldChange(field.key, {
                                ...rangeValue,
                                max: e.target.value ? Number(e.target.value) : undefined
                            })}
                            className="flex-1 px-4 py-3 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>
                );

            case "date":
                return (
                    <input
                        type="date"
                        value={value || ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value || undefined)}
                        className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                );

            case "daterange":
                const dateRangeValue = (value as { start?: string; end?: string }) || {};
                return (
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">From</label>
                            <input
                                type="date"
                                value={dateRangeValue.start || ""}
                                onChange={(e) => handleFieldChange(field.key, {
                                    ...dateRangeValue,
                                    start: e.target.value || undefined
                                })}
                                className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">To</label>
                            <input
                                type="date"
                                value={dateRangeValue.end || ""}
                                onChange={(e) => handleFieldChange(field.key, {
                                    ...dateRangeValue,
                                    end: e.target.value || undefined
                                })}
                                className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="shrink-0 px-6 py-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-neutral-900">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <Icons.Sliders />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Advanced Filters</h3>
                            <p className="text-xs text-slate-500">
                                {activeCount > 0 ? `${activeCount} filter${activeCount > 1 ? "s" : ""} applied` : "Refine your results"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:text-slate-600 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-neutral-800 transition"
                    >
                        <Icons.X />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {filterFields.length > 0 ? (
                        filterFields.map((field) => (
                            <div key={field.key} className="space-y-2">
                                <label className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                        {field.label}
                                    </span>
                                    {localFilters[field.key] !== undefined && localFilters[field.key] !== "" && (
                                        !(typeof localFilters[field.key] === 'object' && Object.keys(localFilters[field.key] || {}).length === 0) && (
                                            <button
                                                onClick={() => handleFieldChange(field.key, undefined)}
                                                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase"
                                            >
                                                Clear
                                            </button>
                                        )
                                    )}
                                </label>
                                {renderFilterField(field)}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-gray-400">
                                <Icons.Sliders />
                            </div>
                            <p className="text-sm font-medium text-slate-500">No filters configured</p>
                            <p className="text-xs text-gray-400 mt-1">Pass filterFields prop to enable filtering</p>
                        </div>
                    )}
                </div>

                <div className="shrink-0 px-6 py-4 border-t border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    <div className="flex gap-3">
                        <button
                            onClick={handleClear}
                            className="flex-1 py-3 px-4 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-neutral-800 transition flex items-center justify-center gap-2"
                        >
                            <Icons.Refresh />
                            Reset All
                        </button>
                        <button
                            onClick={handleApply}
                            className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition flex items-center justify-center gap-2"
                        >
                            Apply Filters
                            {activeCount > 0 && (
                                <span className="w-5 h-5 rounded-full bg-white/20 text-[10px] font-bold flex items-center justify-center">
                                    {activeCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const EmptyState = ({ message, icon }: { message: string; icon?: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        {icon || <Icons.Empty />}
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-medium">{message}</p>
    </div>
);

const LoadingSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
    <div className="animate-pulse p-4">
        {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex gap-4 py-4 border-b border-gray-50 dark:border-neutral-800 last:border-0">
                <div className="w-4 h-4 bg-gray-200 dark:bg-neutral-700 rounded" />
                {Array.from({ length: columns }).map((_, j) => (
                    <div key={j} className="flex-1 h-4 bg-gray-200 dark:bg-neutral-700 rounded" />
                ))}
            </div>
        ))}
    </div>
);

// ============================================================================
// MAIN TABLE COMPONENT
// ============================================================================

function Table<T extends Record<string, any>>({
    data,
    columns: columnsProp,
    searchable = false,
    searchPlaceholder = "Search...",
    pagination = true,
    pageSize: initialPageSize = 10,
    pageSizeOptions = [5, 10, 25, 50],
    selectable = false,
    actions,
    bulkActions,
    filterable = false,
    advancedFilter = false,
    filterFields = [],
    onFilterChange,
    toolbarActions,
    onSelectionChange,
    onRowClick,
    title,
    emptyMessage = "No data available",
    emptyIcon,
    loading = false,
    stickyHeader = true,
    rowKey = "id",
}: TableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
    const [filters, setFilters] = useState<FilterValues>({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Generate columns from data if not provided
    const columns: Column<T>[] = useMemo(() => {
        if (columnsProp) return columnsProp.filter((c) => !c.hidden);
        if (data.length === 0) return [];
        return Object.keys(data[0])
            .filter((key) => {
                const value = data[0][key];
                return typeof value !== "object" || value === null;
            })
            .map((key) => ({
                key,
                label: camelToTitle(key),
                type: "text" as const,
                sortable: true,
            }));
    }, [columnsProp, data]);

    const getRowKey = useCallback((row: T): string | number => {
        if (typeof rowKey === "function") return rowKey(row);
        return row[rowKey as keyof T] as string | number;
    }, [rowKey]);

    // Data processing pipeline
    const filteredBySearch = useMemo(() => {
        if (!searchTerm) return data;
        return filterBySearch(data, searchTerm, columns.map((c) => c.key));
    }, [data, searchTerm, columns]);

    const filteredData = useMemo(() => {
        if (Object.keys(filters).length === 0) return filteredBySearch;
        return applyFilters(filteredBySearch, filters, filterFields);
    }, [filteredBySearch, filters, filterFields]);

    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData;
        return sortData(filteredData, sortConfig.key, sortConfig.direction);
    }, [filteredData, sortConfig]);

    const paginatedData = useMemo(() => {
        if (!pagination) return sortedData;
        const start = (currentPage - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize, pagination]);

    const totalPages = Math.ceil(sortedData.length / pageSize);

    // Selection
    const isAllSelected = paginatedData.length > 0 && paginatedData.every((row) => selectedRows.has(getRowKey(row)));

    const handleSelectAll = (checked: boolean) => {
        const newSelected = new Set(selectedRows);
        paginatedData.forEach((row) => {
            const key = getRowKey(row);
            if (checked) newSelected.add(key);
            else newSelected.delete(key);
        });
        setSelectedRows(newSelected);
        onSelectionChange?.(data.filter((row) => newSelected.has(getRowKey(row))));
    };

    const handleSelectRow = (row: T, checked: boolean) => {
        const newSelected = new Set(selectedRows);
        const key = getRowKey(row);
        if (checked) newSelected.add(key);
        else newSelected.delete(key);
        setSelectedRows(newSelected);
        onSelectionChange?.(data.filter((r) => newSelected.has(getRowKey(r))));
    };

    const clearSelection = () => {
        setSelectedRows(new Set());
        onSelectionChange?.([]);
    };

    // Sorting
    const handleSort = (key: string) => {
        setSortConfig((prev) => {
            if (prev?.key !== key) return { key, direction: "asc" };
            if (prev.direction === "asc") return { key, direction: "desc" };
            return null;
        });
    };

    // Filtering
    const handleFilterChange = (newFilters: FilterValues) => {
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({});
        onFilterChange?.({});
    };

    // Render cell
    const renderCell = (row: T, column: Column<T>) => {
        const value = getNestedValue(row, column.key);
        if (column.render) return column.render(row, value);
        if (value === null || value === undefined) return <span className="text-slate-400">-</span>;
        if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
                if (value.every((v) => typeof v === "string" && v.startsWith("http"))) {
                    return <AvatarGroup avatars={value} />;
                }
                return <span className="text-slate-400">{value.length} items</span>;
            }
            return <span className="text-slate-400">[Object]</span>;
        }

        switch (column.type) {
            case "number":
                return <span className="font-mono text-sm">{formatNumber(value)}</span>;
            case "date":
                return <span className="text-sm">{formatDate(value)}</span>;
            case "badge":
                return <Badge value={String(value)} variants={column.badgeVariants} />;
            case "avatar":
                const name = column.avatarNameKey ? getNestedValue(row, column.avatarNameKey) : value;
                const subtitle = column.avatarSubtitleKey ? getNestedValue(row, column.avatarSubtitleKey) : undefined;
                return <Avatar src={value} name={name} subtitle={subtitle} />;
            case "progress":
                return <ProgressBar value={Number(value) || 0} max={column.progressMax} />;
            default:
                return <span className="text-sm truncate">{String(value)}</span>;
        }
    };

    const getAlignClass = (align?: string) => {
        switch (align) {
            case "center": return "text-center";
            case "right": return "text-right";
            default: return "text-left";
        }
    };

    // Reset page on data/search/filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, data.length, filters]);

    const selectedArray = Array.from(selectedRows);
    const showFilterButton = filterable || advancedFilter || filterFields.length > 0;

    return (
        <>
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col flex-1">

                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-2 bg-white dark:bg-neutral-900 shrink-0">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        {selectedRows.size > 0 && bulkActions ? (
                            <div className="flex items-center gap-3 animate-in fade-in duration-200 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-800">
                                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">{selectedRows.size} Selected</span>
                                <div className="h-4 w-px bg-indigo-200 dark:bg-indigo-700"></div>
                                {bulkActions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => action.onClick(selectedArray)}
                                        className={`text-xs font-bold hover:underline flex items-center gap-1 ${action.danger ? "text-rose-600" : "text-slate-600 dark:text-slate-300"}`}
                                    >
                                        {action.icon}
                                        {action.label}
                                    </button>
                                ))}
                                <button onClick={clearSelection} className="ml-auto text-xs font-bold text-slate-500 hover:text-slate-800 px-3">Cancel</button>
                            </div>
                        ) : (
                            <>
                                {searchable && (
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder={searchPlaceholder}
                                            className="pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-72 transition-all"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <div className="absolute left-3 top-3 text-gray-400 group-hover:text-indigo-500 transition-colors"><Icons.Search /></div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="flex gap-3">
                        {showFilterButton && (
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="px-4 py-2.5 border border-gray-200 dark:border-neutral-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
                            >
                                <Icons.Filter /> Filters
                            </button>
                        )}
                        {toolbarActions}
                    </div>
                </div>

                {/* Table (Scrollable Area) */}
                <div className="overflow-y-auto flex-1 relative scrollbar-hide">
                    {loading ? (
                        <LoadingSkeleton rows={pageSize} columns={columns.length} />
                    ) : paginatedData.length === 0 ? (
                        <EmptyState message={emptyMessage} icon={emptyIcon} />
                    ) : (
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead className="bg-gray-50/95 dark:bg-neutral-950/95 border-b border-gray-100 dark:border-neutral-800 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider sticky top-0 z-10 backdrop-blur-sm">
                                <tr>
                                    {selectable && (
                                        <th className="px-6 py-4 w-14 text-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer dark:bg-neutral-800 dark:border-neutral-700"
                                                checked={isAllSelected}
                                                onChange={(e) => handleSelectAll(e.target.checked)}
                                            />
                                        </th>
                                    )}
                                    {columns.map((column) => (
                                        <th
                                            key={column.key}
                                            className={`px-6 py-4 ${column.sortable ? "cursor-pointer hover:text-indigo-600 group select-none" : ""} ${getAlignClass(column.align)}`}
                                            style={{ width: column.width }}
                                            onClick={() => column.sortable && handleSort(column.key)}
                                        >
                                            <div className={`flex items-center gap-1 ${column.align === "right" ? "justify-end" : column.align === "center" ? "justify-center" : ""}`}>
                                                {column.label || camelToTitle(column.key)}
                                                {column.sortable && <Icons.Sort />}
                                            </div>
                                        </th>
                                    ))}
                                    {actions && actions.length > 0 && <th className="px-6 py-4 w-20 text-right"></th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-neutral-800">
                                {paginatedData.map((row) => {
                                    const key = getRowKey(row);
                                    const isSelected = selectedRows.has(key);
                                    return (
                                        <tr
                                            key={key}
                                            onClick={() => onRowClick?.(row)}
                                            className={`group transition-colors ${onRowClick ? "cursor-pointer" : ""} ${isSelected ? "bg-indigo-50/30 dark:bg-indigo-900/10" : "hover:bg-gray-50 dark:hover:bg-neutral-800/50"}`}
                                        >
                                            {selectable && (
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                                        checked={isSelected}
                                                        onChange={(e) => handleSelectRow(row, e.target.checked)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </td>
                                            )}
                                            {columns.map((column) => (
                                                <td key={column.key} className={`px-6 py-4 ${getAlignClass(column.align)}`}>
                                                    {renderCell(row, column)}
                                                </td>
                                            ))}
                                            {actions && actions.length > 0 && (
                                                <td className="px-6 py-4 text-right relative">
                                                    <DropdownMenu trigger={<Icons.Dots />} items={actions} row={row} />
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                {pagination && sortedData.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-neutral-900 shrink-0 rounded-b-xl">
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Showing <span className="font-bold text-slate-900 dark:text-white">{(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, sortedData.length)}</span> of <span className="font-bold text-slate-900 dark:text-white">{sortedData.length}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                <Icons.ChevronLeft /> Prev
                            </button>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                Next <Icons.ChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Advanced Filter Offcanvas */}
            {(advancedFilter || filterFields.length > 0) && (
                <AdvancedFilterOffcanvas
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    filterFields={filterFields}
                    filters={filters}
                    onChange={handleFilterChange}
                    onClear={handleClearFilters}
                />
            )}
        </>
    );
}

export default Table; 
// Convert camelCase to Title Case
export const camelToTitle = (str: string): string => {
    if (!str) return "";
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase())
        .trim();
};

// Get nested value from object using dot notation
export const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
};

// Format date
export const formatDate = (value: any): string => {
    if (!value) return "-";
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

// Format number
export const formatNumber = (value: any): string => {
    if (value === null || value === undefined) return "-";
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return num.toLocaleString();
};

// Export to CSV
export const exportToCSV = <T extends Record<string, any>>(
    data: T[],
    columns: { key: string; label: string }[],
    filename: string = "export"
): void => {
    const headers = columns.map((c) => c.label).join(",");
    const rows = data.map((row) =>
        columns
            .map((col) => {
                const value = getNestedValue(row, col.key);
                const stringValue = String(value ?? "");
                // Escape quotes and wrap in quotes if contains comma
                if (stringValue.includes(",") || stringValue.includes('"')) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            })
            .join(",")
    );

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
};

// Search filter
export const filterBySearch = <T extends Record<string, any>>(
    data: T[],
    searchTerm: string,
    keys: string[]
): T[] => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((row) =>
        keys.some((key) => {
            const value = getNestedValue(row, key);
            return String(value ?? "").toLowerCase().includes(term);
        })
    );
};

// Sort data
export const sortData = <T>(
    data: T[],
    key: string,
    direction: "asc" | "desc"
): T[] => {
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
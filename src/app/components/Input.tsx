export default function Input({
    label,
    value,
    onChange,
    className = "",
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    className?: string;
    placeholder?: string;
}) {
    return (
        <label className={`block ${className}`}>
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</span>
            <input
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </label>
    );
}

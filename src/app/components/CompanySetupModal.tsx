"use client";
import { useState } from "react";

interface CompanySetupModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

export default function CompanySetupModal({ open, onClose, onSave }: CompanySetupModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        location: "",
        website: "",
        size: "",
        description: "",
    });

    if (!open) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Company Profile Setup
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Company Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-800 dark:text-white"
                            required
                        />
                    </div>
                    {/* Add more form fields as needed */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
                        >
                            Save Profile
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-xl font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ProfileSetupModal() {
    const [isOpen, setIsOpen] = useState(true); // controls modal visibility
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        location: "",
        skills: [] as string[],
    });
    const [newSkill, setNewSkill] = useState("");
    const [completion, setCompletion] = useState(0);

    const steps = [
        { id: 1, title: "Personal Info" },
        { id: 2, title: "Skills" },
        { id: 3, title: "Preview" },
    ];

    const suggestedSkills = [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "SQL",
        "Tailwind CSS",
        "TypeScript",
    ];

    useEffect(() => {
        const totalFields = 4;
        const filled =
            (formData.name ? 1 : 0) +
            (formData.email ? 1 : 0) +
            (formData.title ? 1 : 0) +
            (formData.location ? 1 : 0);
        setCompletion(Math.round((filled / totalFields) * 100));
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const addSkill = (skill: string) => {
        if (skill && !formData.skills.includes(skill)) {
            setFormData({ ...formData, skills: [...formData.skills, skill] });
            setNewSkill("");
        }
    };

    const removeSkill = (skill: string) =>
        setFormData({
            ...formData,
            skills: formData.skills.filter((s) => s !== skill),
        });

    const nextStep = () => step < steps.length && setStep(step + 1);
    const prevStep = () => step > 1 && setStep(step - 1);

    if (!isOpen) return null; // don’t render if closed

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative">
                {/* Close button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-200 dark:bg-gray-800 rounded-full absolute top-6 right-6 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X className="size-8 p-2" />
                </button>

                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                        Profile Setup
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Step {step} of {steps.length}
                    </p>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded mt-4">
                        <div
                            className="h-2 bg-blue-600 dark:bg-blue-500 rounded transition-all"
                            style={{ width: `${completion}%` }}
                        />
                    </div>
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-between px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                    {steps.map((s) => (
                        <div
                            key={s.id}
                            className={`flex-1 text-center ${step === s.id
                                ? "text-blue-600 dark:text-blue-400 font-semibold"
                                : ""
                                }`}
                        >
                            {s.title}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 min-h-[240px]">
                    {step === 1 && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                            />
                            <input
                                type="text"
                                name="title"
                                placeholder="Job Title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    placeholder="Add a skill"
                                    className="flex-1 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                                />
                                <button
                                    onClick={() => addSkill(newSkill)}
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {formData.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            className="text-xs text-red-500 hover:text-red-600"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    Suggested Skills:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedSkills.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => addSkill(s)}
                                            className="px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Profile Preview
                            </h3>
                            <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Full Name
                                    </p>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        {formData.name || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Email
                                    </p>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        {formData.email || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Job Title
                                    </p>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        {formData.title || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Location
                                    </p>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        {formData.location || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Skills
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {formData.skills.length ? (
                                            formData.skills.map((s) => (
                                                <span
                                                    key={s}
                                                    className="px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs"
                                                >
                                                    {s}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                None added
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                    >
                        Back
                    </button>
                    <button
                        onClick={nextStep}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {step === steps.length ? "Finish" : "Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Briefcase, FileText, Building } from "lucide-react";

export default function OnboardingWizard({ user }: { user: any }) {
    const router = useRouter();

    const steps = user?.userType === "seeker"
        ? ["Basic Info", "Skills", "Resume"]
        : ["Basic Info", "Company"];

    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        location: "",
        headline: "",
        skills: [] as string[],
        newSkill: "",
        resumeUrl: "",
        companyName: "",
        companyWebsite: "",
    });

    const progress = Math.round(((step + 1) / steps.length) * 100);

    const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const prevStep = () => setStep((s) => Math.max(s - 1, 0));

    const handleSubmit = async () => {
        await fetch("/api/complete-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, userId: user.id }),
        });
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white px-6">

            {/* Stepper Header */}
            <div className="w-full max-w-2xl mb-6">
                <div className="flex justify-between mb-2 text-sm font-medium">
                    {steps.map((label, i) => (
                        <span key={i} className={`${i <= step ? "text-white" : "text-gray-300"}`}>
                            {label}
                        </span>
                    ))}
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full">
                    <div
                        className="h-2 bg-white rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Card Container */}
            <div className="w-full max-w-2xl bg-white text-gray-800 rounded-2xl shadow-2xl p-8">

                {/* Step 1 – Basic Info */}
                {step === 0 && (
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <User className="text-indigo-600" /> Basic Info
                        </h2>
                        <label className="block mb-2 font-medium">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full border px-3 py-2 rounded-lg"
                            placeholder="e.g. Bangalore, India"
                        />

                        {user?.userType === "seeker" && (
                            <>
                                <label className="block mt-6 mb-2 font-medium">Headline</label>
                                <input
                                    type="text"
                                    value={formData.headline}
                                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                                    className="w-full border px-3 py-2 rounded-lg"
                                    placeholder="e.g. Full-stack Developer"
                                />
                            </>
                        )}
                    </div>
                )}

                {/* Step 2 – Skills (seeker) */}
                {step === 1 && user?.userType === "seeker" && (
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <Briefcase className="text-indigo-600" /> Skills
                        </h2>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={formData.newSkill}
                                onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
                                className="flex-grow border px-3 py-2 rounded-lg"
                                placeholder="Add a skill"
                            />
                            <button
                                onClick={() => {
                                    if (formData.newSkill) {
                                        setFormData({
                                            ...formData,
                                            skills: [...formData.skills, formData.newSkill],
                                            newSkill: "",
                                        });
                                    }
                                }}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill, i) => (
                                <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2 – Company (poster) */}
                {step === 1 && user?.userType === "poster" && (
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <Building className="text-indigo-600" /> Company Info
                        </h2>
                        <label className="block mb-2 font-medium">Company Name</label>
                        <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className="w-full border px-3 py-2 rounded-lg"
                            placeholder="e.g. Acme Corp"
                        />

                        <label className="block mt-6 mb-2 font-medium">Company Website</label>
                        <input
                            type="text"
                            value={formData.companyWebsite}
                            onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                            className="w-full border px-3 py-2 rounded-lg"
                            placeholder="https://company.com"
                        />
                    </div>
                )}

                {/* Step 3 – Resume (seeker) */}
                {step === 2 && user?.userType === "seeker" && (
                    <div>
                        <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <FileText className="text-indigo-600" /> Resume
                        </h2>
                        <label className="block mb-2 font-medium">Resume URL</label>
                        <input
                            type="text"
                            value={formData.resumeUrl}
                            onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                            className="w-full border px-3 py-2 rounded-lg"
                            placeholder="https://myportfolio.com/resume.pdf"
                        />
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    {step > 0 && (
                        <button
                            onClick={prevStep}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                        >
                            Back
                        </button>
                    )}
                    {step < steps.length - 1 ? (
                        <button
                            onClick={nextStep}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                        >
                            Finish 🎉
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

"use client"
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navabr";
import { signup } from "@/app/api/auth";
import { redirect } from "next/navigation";

export default function Register() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: "SEEKER",
        avatar: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await signup(formData);
            console.log(response, "response");
            if (response.status != "201") {
                setError(response.message || "Something went wrong");
            } else {
                redirect("/signin");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to register. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Demat Bank - Register</title>
                <meta
                    name="description"
                    content="Open your digital account with Demat Bank Lithuania"
                />
            </Head>

            <main className="min-h-screen bg-[#f8dfd7] flex flex-col justify-between font-sans">
                <Navbar page="register" />
                <div className="absolute top-6 -left-40 flex flex-col gap-4">
                    <div className="w-20 h-3 bg-black transform -skew-x-12 rounded-r-none rounded-l-2xl -rotate-45"></div>
                    <div className="w-20 h-3 bg-black transform -skew-x-12 rounded-r-none rounded-l-md -rotate-45"></div>
                    <div className="w-20 h-3 bg-black transform -skew-x-12 rounded-r-none rounded-l-md -rotate-45"></div>
                </div>

                <section className="flex flex-row md:flex-row items-center lg:justify-between justify-center flex-grow px-6 md:px-12 lg:px-36 gap-20 my-auto sm:py-auto">
                    <div className="fixed size-96 left-0 top-20 bg-[#fed4c0] rounded-full" />

                    {/* Form Card */}
                    <div className="bg-black text-white p-10 rounded-3xl shadow-2xl max-w-lg w-full relative">
                        <div className="flex gap-3 mb-10 justify-center">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    onClick={() => setStep(s)}
                                    className={`w-3 h-3 rounded-full ${s <= step ? "bg-[#f8bda4]" : "bg-gray-600"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Step 1 */}
                        {step === 1 && (
                            <form className="space-y-6">
                                <h3 className="text-xl font-semibold mb-4">Step 1: Your Details</h3>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="w-full p-3 rounded-md bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#f8bda4]"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="w-full p-3 rounded-md bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#f8bda4]"
                                />

                                <div className="flex gap-8">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="w-64 bg-[#f8bda4] text-black font-semibold py-3 rounded-md mt-4 shadow hover:bg-[#f7a98c] transition"
                                    >
                                        Next →
                                    </button>
                                    <Link
                                        href={"/signin"}
                                        className="text-[#f8bda4] text-nowrap underline py-3 rounded-md mt-4 transition"
                                    >
                                        Login instead
                                    </Link>
                                </div>
                            </form>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <form className="space-y-6">
                                <h3 className="text-xl font-semibold mb-4">Step 2: Security</h3>
                                <input
                                    type="text"
                                    name="avatar"
                                    value={formData.avatar}
                                    onChange={handleChange}
                                    placeholder="Avatar URL (optional)"
                                    className="w-full p-3 rounded-md bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#f8bda4]"
                                />
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-md bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#f8bda4]"
                                >
                                    <option value="SEEKER">Seeker</option>
                                    <option value="POSTER">Employer</option>
                                </select>

                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <div className="flex gap-8">
                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        className="w-64 bg-[#f8bda4] text-black font-semibold py-3 rounded-md mt-4 shadow hover:bg-[#f7a98c] transition"
                                    >
                                        Next →
                                    </button>
                                    <button
                                        onClick={() => setStep(1)}
                                        type="button"
                                        className="text-[#f8bda4] underline py-3 rounded-md mt-4 transition"
                                    >
                                        go back
                                    </button>
                                </div>
                            </form>
                        )}
                        {step === 3 && (
                            <form className="space-y-6">
                                <h3 className="text-xl font-semibold mb-4">Step 2: Security</h3>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Set Passcode"
                                    className="w-full p-3 rounded-md bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#f8bda4]"
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Passcode"
                                    className="w-full p-3 rounded-md bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#f8bda4]"
                                />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <div className="flex gap-8">
                                    <button
                                        type="button"
                                        onClick={() => setStep(4)}
                                        className="w-64 bg-[#f8bda4] text-black font-semibold py-3 rounded-md mt-4 shadow hover:bg-[#f7a98c] transition"
                                    >
                                        Next →
                                    </button>
                                    <button
                                        onClick={() => setStep(2)}
                                        type="button"
                                        className="text-[#f8bda4] underline py-3 rounded-md mt-4 transition"
                                    >
                                        go back
                                    </button>
                                </div>
                            </form>
                        )}
                        {/* Step 3 */}
                        {step === 4 && (
                            <div className="space-y-6 text-center">
                                <h3 className="text-xl font-semibold mb-4">Step 3: Confirm</h3>
                                <p className="text-gray-300 text-sm">
                                    By creating your account, you agree to Demat Bank’s{" "}
                                    <a href="#" className="underline">Terms & Conditions</a>.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleRegister}
                                    className="w-full bg-[#f8bda4] text-black font-semibold py-3 rounded-md mt-4 shadow hover:bg-[#f7a98c] transition"
                                    disabled={loading}
                                >
                                    {loading ? "Creating..." : "Create Account"}
                                </button>
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                <p className="text-sm text-gray-400">
                                    Already have an account?{" "}
                                    <Link href="/signin" className="underline">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        )}

                        <p className="text-xs text-center mt-6 text-gray-400">
                            By Register, you agree to our{" "}
                            <a href="#" className="underline">Terms & Conditions</a>
                        </p>
                    </div>

                    {/* Hero Circle */}
                    <div
                        className="w-[30rem] h-[30rem] mt-6 rounded-full lg:flex flex-col items-end justify-items-end hidden bg-cover bg-center"
                        style={{
                            backgroundColor: formData.avatar ? undefined : "#fed4c0",
                            backgroundImage: formData.avatar ? `url(${formData.avatar})` : undefined,
                        }}
                    >
                        <div className="fixed -right-5 flex flex-col gap-4">
                            <div className="w-20 h-3 bg-black transform -skew-x-12 -rotate-45"></div>
                            <div className="w-20 h-3 bg-black transform -skew-x-12 -rotate-45"></div>
                            <div className="w-20 h-3 bg-black transform -skew-x-12 -rotate-45"></div>
                        </div>
                        <div className="flex gap-4 items-center p-10 ">
                            <div className="w-16 h-0.5 bg-black rounded" />
                            <h3 className="text-xs tracking-wide uppercase text-gray-700">Why Register?</h3>
                        </div>
                        <h1 className="text-6xl text-nowrap font-extrabold text-gray-900 leading-tight text-center">
                            Job Opportunities
                        </h1>
                        <h2
                            className="text-6xl font-extrabold text-transparent mt-4"
                            style={{
                                WebkitTextStroke: "2px #1f2937",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Devmind
                        </h2>
                        <button className="flex mt-8 w-44 p-4 gap-6 bg-neutral-900 text-white rounded-md text-sm shadow hover:bg-gray-800 transition">
                            Learn More
                            <div className="w-10 h-0.5 my-auto bg-white rounded-full" />
                        </button>
                    </div>

                </section>

                <footer className="flex justify-between items-center px-12 py-6 text-sm text-gray-700">
                    <div className="flex gap-6">
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                    <div className="flex gap-6">
                        <a href="#">Instagram</a>
                        <a href="#">Facebook</a>
                    </div>
                </footer>
            </main>
        </>
    );
}

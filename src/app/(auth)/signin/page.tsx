    "use client";
    import { signin } from "@/app/api/auth";
    import Navbar from "../components/Navabr";
    import Head from "next/head";
    import Link from "next/link";
    import { useState } from "react";
    import { useRouter } from "next/navigation";

    export default function Home() {
        const [email, setEmail] = useState(""); // maps to Customer ID input
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        const [loading, setLoading] = useState(false);
        const router = useRouter();

        const handleLogin = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await signin({ email, password });
                const data = res.data
                if (res.status !== 200) {
                    setError(data.message || "Login Failed");
                    return;
                }

                setTimeout(() => router.push("/dashboard"), 100);
            } catch (err) {
                console.error(err);
                setError("Server Error. Try again later.");
            } finally {
                setLoading(false);
            }
        };

        return (
            <>
                <Head>
                    <title>Demat Bank - Lithuania</title>
                    <meta
                        name="description"
                        content="Net Banking Login - Demat Bank Lithuania"
                    />
                </Head>

                <main className="min-h-screen bg-[#f8dfd7] flex flex-col justify-between font-sans overflow-hidden">
                    {/* Header */}
                    {/* <div className="animate-fade-down z-50"> */}
                    <Navbar page="signin" />
                    {/* </div> */}

                    {/* Decorative Circle */}
                    <div className="absolute text-2xl size-64 top-64 right-[28%] -translate-x-1/2 -translate-y-1/2 bg-[#fed4c0] rounded-full animate-scale-in" />

                    {/* Main Section */}
                    <section className=" flex flex-col md:flex-row items-center justify-between flex-grow px-6 md:px-12 lg:px-36">
                        {/* Left Circle Branding */}
                        <div className="relative lg:flex hidden items-center justify-center animate-slide-left">
                            <div className="absolute top-6 -left-40 flex flex-col gap-4">
                                <div className="w-20 h-3 bg-black transform -skew-x-12 rounded-r-none rounded-l-2xl -rotate-45"></div>
                                <div className="w-20 h-3 bg-black transform -skew-x-12 rounded-r-none rounded-l-md -rotate-45"></div>
                                <div className="w-20 h-3 bg-black transform -skew-x-12 rounded-r-none rounded-l-md -rotate-45"></div>
                            </div>

                            <div>
                                <div className="flex items-baseline gap-3 mt-4 ">
                                    <p className="text-black text-7xl font-extrabold">10</p>
                                    <h1 className="text-4xl font-bold text-gray-700 max-w-2xl text-wrap">
                                        K+ organizations
                                    </h1>
                                </div>
                                <div className="text-2xl size-[30rem] bg-[#fed4c0] rounded-full flex flex-col p-8">
                                    <div className="flex mb-10 mt-24 gap-4 items-center">
                                        <div className="w-20 h-0.5 bg-black rounded" />
                                        <h3 className="text-xs tracking-wide uppercase text-gray-700">
                                            login
                                        </h3>
                                    </div>

                                    <h1 className="text-6xl font-extrabold text-gray-900 text-nowrap">
                                        Job Opportunities
                                    </h1>

                                    <div className="mt-4">
                                        <h2
                                            className="text-7xl font-extrabold text-transparent stroke-text"
                                            style={{
                                                WebkitTextStroke: "2px #1f2937",
                                                WebkitTextFillColor: "transparent",
                                            }}
                                        >
                                            Devmind
                                        </h2>
                                    </div>

                                    <button className="flex mt-6 w-44 p-4 gap-6 bg-neutral-900 text-white rounded-md text-sm shadow hover:bg-gray-800 transition">
                                        Learn Now
                                        <div className="w-10 h-0.5 my-auto bg-white rounded-full" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Login Card */}
                        <div className="bg-black my-auto text-white p-8 rounded-3xl shadow-2xl max-w-md w-full animate-slide-up">
                            <h3 className="text-xl font-semibold mb-6">Login Now</h3>
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-sm mb-2">Email</label>
                                    <input
                                        type="text"
                                        placeholder="John@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 rounded-md bg-white text-xl text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#f8bda4]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-3 rounded-md bg-white text-xl text-black font-bold focus:outline-none focus:ring-2 focus:ring-[#f8bda4]"
                                    />
                                </div>
                                <p className="text-xs text-gray-400">
                                    By login, you agree to our{" "}
                                    <a href="#" className="underline">
                                        Terms & Conditions
                                    </a>
                                </p>
                                <div className="flex my-6 gap-4 justify-between">
                                    <button
                                        type="button"
                                        onClick={handleLogin}
                                        disabled={loading}
                                        className="w-50 bg-[#f8bda4] text-neutral-800 font-semibold flex gap-4 items-center justify-center py-3 rounded-md mt-2 shadow hover:bg-[#f7a98c] transition"
                                    >
                                        {loading ? "Logging in..." : "Login Now"}
                                        <div className="w-10 h-0.5 my-auto bg-neutral-800 rounded-full" />
                                    </button>
                                    <Link href="/register" className="flex justify-end">
                                        <p className="text-md my-auto underline text-gray-400">
                                            Create your Account
                                        </p>
                                    </Link>
                                </div>

                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </form>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="flex justify-between items-center px-12 py-6 text-sm text-gray-700 animate-fade-up">
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

"use client";

import { useState, useEffect } from "react";
import { Check, X, Sparkles, Zap, Crown, ChevronDown } from "lucide-react";
import Header from "@/app/components/Header";

type PricingTier = {
    id: string;
    name: string;
    tagline: string;
    price: number;
    yearlyPrice: number;
    icon: any;
    popular?: boolean;
    tier: number;
    features: {
        name: string;
        included: boolean;
    }[];
};

const pricingTiers: PricingTier[] = [
    {
        id: "free",
        name: "Free Tier",
        tagline: "Perfect for getting started",
        price: 0,
        yearlyPrice: 0,
        tier: 1,
        icon: Sparkles,
        features: [
            { name: "Basic job search", included: true },
            { name: "5 job applications per month", included: true },
            { name: "Basic profile", included: true },
            { name: "Email notifications", included: true },
            { name: "AI resume builder", included: false },
            { name: "Priority support", included: false },
            { name: "Advanced analytics", included: false },
            { name: "Unlimited applications", included: false },
        ],
    },
    {
        id: "pro",
        name: "Pro",
        tagline: "For serious job seekers",
        price: 499,
        yearlyPrice: 4990,
        tier: 2,
        icon: Zap,
        popular: true,
        features: [
            { name: "Everything in Free", included: true },
            { name: "Unlimited job applications", included: true },
            { name: "AI resume builder", included: true },
            { name: "Profile analytics", included: true },
            { name: "Priority listings", included: true },
            { name: "Email support", included: true },
            { name: "Advanced filters", included: true },
            { name: "Dedicated account manager", included: false },
        ],
    },
    {
        id: "pro-plus",
        name: "Pro Plus",
        tagline: "Maximum career acceleration",
        price: 999,
        yearlyPrice: 9990,
        tier: 3,
        icon: Crown,
        features: [
            { name: "Everything in Pro", included: true },
            { name: "Dedicated account manager", included: true },
            { name: "Career coaching sessions", included: true },
            { name: "Interview preparation", included: true },
            { name: "Resume review by experts", included: true },
            { name: "Direct recruiter contact", included: true },
            { name: "LinkedIn optimization", included: true },
            { name: "Salary negotiation guide", included: true },
        ],
    },
];

const faqs = [
    {
        question: "Can I cancel anytime?",
        answer: "Yes. You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit and debit cards, UPI, net banking, and digital wallets through Razorpay.",
    },
    {
        question: "Can I upgrade or downgrade?",
        answer: "You can upgrade or downgrade your plan at any time. Changes will be reflected immediately in your account.",
    },
    {
        question: "Is there a refund policy?",
        answer: "We offer a 7-day money-back guarantee if you're not satisfied with our service.",
    },
    {
        question: "What happens when I upgrade?",
        answer: "When you upgrade, you get immediate access to all new features. We'll prorate the cost based on your current billing cycle.",
    },
    {
        question: "How does yearly billing work?",
        answer: "With yearly billing, you pay upfront for 12 months and save 17%. You can still cancel anytime and get a prorated refund.",
    },
];

export default function PaymentPage() {
    const [loading, setLoading] = useState(false);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const [currentPlan, setCurrentPlan] = useState<string>("free");

    useEffect(() => {
        fetchCurrentPlan();
    }, []);

    const fetchCurrentPlan = async () => {
        try {
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/subscription`);
            // const data = await response.json();
            // setCurrentPlan(data.planId);
            // For now, mock data
            setCurrentPlan("free");
        } catch (error) {
            console.error("Error fetching plan:", error);
        }
    };

    const getCurrentTier = () => {
        return pricingTiers.find(t => t.id === currentPlan)?.tier || 1;
    };

    const getButtonText = (tier: PricingTier) => {
        const currentTierLevel = getCurrentTier();

        if (tier.id === currentPlan) {
            return "Current Plan";
        } else if (tier.tier > currentTierLevel) {
            return `Upgrade to ${tier.name}`;
        } else {
            return `Downgrade to ${tier.name}`;
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const startPayment = async (tier: PricingTier) => {
        if (tier.id === currentPlan) {
            return; // Already on this plan
        }

        setLoading(true);
        setSelectedTier(tier.id);

        const res = await loadRazorpayScript();
        if (!res) {
            alert("Razorpay SDK failed to load. Please check your internet connection.");
            setLoading(false);
            setSelectedTier(null);
            return;
        }

        const amount = billingCycle === "monthly" ? tier.price : tier.yearlyPrice;

        try {
            const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    amount,
                    planId: tier.id,
                    billingCycle,
                }),
            });

            const { orderId, amount: orderAmount, currency, key } = await orderRes.json();

            const options: any = {
                key,
                amount: orderAmount,
                currency,
                name: "FindMeJob",
                description: `${tier.name} - ${billingCycle === "monthly" ? "Monthly" : "Yearly"} Subscription`,
                order_id: orderId,

                handler: async function (response: any) {
                    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({
                            ...response,
                            planId: tier.id,
                            billingCycle,
                        }),
                    });

                    alert("Payment successful! Welcome to " + tier.name);
                    setCurrentPlan(tier.id);
                    window.location.href = "/dashboard";
                },

                prefill: {
                    name: "User Name",
                    email: "email@example.com",
                    contact: "9999999999",
                },

                theme: {
                    color: "#4F46E5",
                },

                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        setSelectedTier(null);
                    },
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Failed to initiate payment. Please try again.");
            setLoading(false);
            setSelectedTier(null);
        }
    };

    return (
        <section className="font-sans min-h-screen mb-2">
            <div className="space-y-2">
                {/* Header */}
                <Header heading={`Payment Plans`} subHeading="Check out our affordable plans" />

                {/* Billing Toggle */}
                <div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 border border-gray-200 dark:border-neutral-800 p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Billing Cycle</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Save up to 17% with yearly billing</p>
                        </div>
                        <div className="flex gap-2 bg-gray-100 dark:bg-neutral-800 p-1 rounded-xl">
                            <button
                                onClick={() => setBillingCycle("monthly")}
                                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${billingCycle === "monthly"
                                    ? "bg-white dark:bg-neutral-900 text-gray-900 dark:text-white shadow-md"
                                    : "text-gray-600 dark:text-gray-400"
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle("yearly")}
                                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all relative ${billingCycle === "yearly"
                                    ? "bg-white dark:bg-neutral-900 text-gray-900 dark:text-white shadow-md"
                                    : "text-gray-600 dark:text-gray-400"
                                    }`}
                            >
                                Yearly
                                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                    -17%
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-2">
                    {pricingTiers.map((tier) => {
                        const Icon = tier.icon;
                        const price = billingCycle === "monthly" ? tier.price : tier.yearlyPrice;
                        const isLoading = loading && selectedTier === tier.id;
                        const isCurrent = tier.id === currentPlan;
                        const currentTierLevel = getCurrentTier();
                        const isUpgrade = tier.tier > currentTierLevel;

                        return (
                            <div
                                key={tier.id}
                                className={`relative rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 border shadow-lg hover:shadow-2xl transition-all ${tier.popular && !isCurrent
                                    ? "border-indigo-500 dark:border-indigo-400"
                                    : isCurrent
                                        ? "border-green-500 dark:border-green-400"
                                        : "border-gray-200 dark:border-neutral-800"
                                    } ${isCurrent ? "opacity-75" : ""}`}
                            >
                                {/* Popular Badge */}
                                {tier.popular && !isCurrent && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                            MOST POPULAR
                                        </div>
                                    </div>
                                )}

                                {/* Current Plan Badge */}
                                {isCurrent && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                            CURRENT PLAN
                                        </div>
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Icon & Name */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isCurrent
                                            ? "bg-green-100 dark:bg-green-900/30"
                                            : "bg-gray-100 dark:bg-neutral-800"
                                            }`}>
                                            <Icon className={`w-6 h-6 ${isCurrent
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-indigo-600 dark:text-indigo-400"
                                                }`} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{tier.tagline}</p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-gray-900 dark:text-white">₹{price}</span>
                                            {price > 0 && (
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    /{billingCycle === "monthly" ? "month" : "year"}
                                                </span>
                                            )}
                                        </div>
                                        {billingCycle === "yearly" && price > 0 && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                ₹{Math.round(price / 12)} per month billed annually
                                            </p>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-3 mb-6">
                                        {tier.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                                                    </div>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <X className="w-3 h-3 text-gray-400 dark:text-gray-600" />
                                                    </div>
                                                )}
                                                <span
                                                    className={`text-sm ${feature.included
                                                        ? "text-gray-900 dark:text-white"
                                                        : "text-gray-400 dark:text-gray-600"
                                                        }`}
                                                >
                                                    {feature.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => startPayment(tier)}
                                        disabled={isLoading || isCurrent}
                                        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${isCurrent
                                            ? "bg-gray-200 dark:bg-neutral-800 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                                            : isUpgrade && tier.popular
                                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                                                : isUpgrade
                                                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                                    : "bg-gray-300 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-neutral-600"
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            getButtonText(tier)
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ */}
                <div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 border border-gray-200 dark:border-neutral-800 p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-2">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${openFaqIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {openFaqIndex === index && (
                                    <div className="px-6 pb-4 pt-2 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-neutral-800">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
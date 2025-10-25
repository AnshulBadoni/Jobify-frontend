// components/DocCard.tsx
import Image from "next/image";
import Link from "next/link";

export default function DocCard() {
    return (
        <Link
            href="https://tiptap.dev/docs"
            target="_blank"
            className="flex w-[90vw] max-w-5xl items-center justify-start gap-12 rounded-2xl bg-white p-8 shadow-md transition-all hover:rounded-3xl hover:shadow-xl"
        >
            {/* Left column */}
            <div className="flex flex-col items-start">
                <h2 className="font-extrabold text-2xl leading-tight tracking-tight">
                    Developer&apos;s
                    <br />
                    launchpad
                </h2>
                <p className="mt-4 text-sm text-gray-600">
                    Code with clarity: Explore comprehensive documentation and examples to
                    jumpstart your journey with Tiptap.
                </p>

                <div className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-semibold text-black transition-all group">
                    <span className="relative">Documentation</span>
                    <span className="flex h-3 w-3 items-center justify-center overflow-hidden transition-transform group-hover:translate-x-2">
                        <svg
                            className="h-full w-full"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M16 7.38197L15.4495 7.10674L15.4455 7.10464L15.4188 7.09062C15.393 7.07688 15.3516 7.05438 15.2965 7.02295C15.1862 6.96006 15.0213 6.86173 14.8166 6.72686C14.4066 6.45661 13.8417 6.0427 13.2383 5.47699C12.029 4.34323 10.6931 2.62752 10.1006 0.257465L8.16032 0.742531C8.87215 3.58987 10.4711 5.62416 11.8704 6.93606C11.9391 7 0 7 0 9H11.9391C11.8704 9.06394 10.4711 10.3758 8.16032 15.2575L10.1006 15.7425C10.6931 13.3725 12.029 11.6568 13.2383 10.523C13.8417 9.9573 14.4066 9.54339 14.8166 9.27313C15.2965 8.97705 15.393 8.92311 15.4188 8.90937L16 8.61803V7.38197Z" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* Right column (image) */}
            <div className="flex w-1/2 justify-end self-end">
                <img
                    src="https://cdn.prod.website-files.com/645a9acecda2e0594fac6126/666710cbb97aa4f3d0f72f65_tiptap-documentation.png"
                    alt="Tiptap documentation preview"
                    width={400}
                    height={250}
                    className="rounded-md"
                />
            </div>
        </Link>
    );
}

"use client";
import Image from "next/image";
import Link from "next/link";

const posts = [
    {
        title: "A Notion-style editor, ready to use in Tiptap Cloud",
        date: "Jul 24, 2025",
        category: "Templates",
        href: "/blog/release-notes/a-notion-style-editor-ready-to-use-in-tiptap-cloud",
        image:
            "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/68825b425043ef1d7b4815b1_ui-components-notion-like-template-blog.jpg",
    },
    {
        title: "Tiptap 3.0 is stable",
        date: "Jul 12, 2025",
        href: "/blog/release-notes/tiptap-3-0-is-stable",
        image:
            "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/686ed4b38053be4cc4b6fc1c_tiptap_editor-3_blog.jpg",
    },
    {
        title:
            "Faster, lighter, and more reliable DOCX import/export with Tiptap",
        date: "Jun 24, 2025",
        href: "/blog/release-notes/faster-lighter-and-more-reliable-docx-import-export-with-tiptap",
        image:
            "https://cdn.prod.website-files.com/649fb1e58cd0c1375ad3909b/685b160a41a72067ecea5cc4_docx-performance-inprovements-blog.jpg",
    },
];

export default function BlogSection() {
    return (
        <section className="mx-auto max-w-6xl px-4 py-16">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-cursive text-black italic font-light">Release notes</h2>
                <Link
                    href="/blog/release-notes"
                    className="group flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-black"
                >
                    All
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                    </span>
                </Link>
            </div>

            {/* Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, idx) => (
                    <Link

                        href={post.href}
                        className="flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Card Content */}
                        <div className="flex flex-1 flex-col justify-between gap-2 p-6">
                            <div className="flex flex-col gap-5">
                                <div className="text-xs leading-4 text-gray-700">{post.date}</div>
                                <h3 className="m-0 font-semibold leading-snug text-gray-900">
                                    {post.title}
                                </h3>
                            </div>

                            {post.category && (
                                <div className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
                                    <span className="rounded-md bg-gray-100 px-2 py-0.5">
                                        {post.category}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Card Image */}
                        <div className="relative w-full">
                            <img
                                src={post.image}
                                alt={post.title}
                                width={990}
                                height={660}
                                className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

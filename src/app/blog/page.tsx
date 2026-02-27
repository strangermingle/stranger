import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, Post, formatBlogDate } from '@/lib/blog';
import type { Metadata } from 'next';
import BlogSidebar from '@/components/BlogSidebar';

export const metadata: Metadata = {
    title: 'Stranger Mingle Blog | Friendship, Community, and Connection',
    description: 'Read stories about making friends, community building, and overcoming loneliness in the modern world.',
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogIndex() {
    const allPosts = getAllPosts([
        'title',
        'date',
        'slug',
        'author',
        'image',
        'excerpt',
    ]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Page Header */}
            <section className="w-full bg-white border-b border-gray-200 pt-32 pb-12 px-4 shadow-sm">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Stranger Mingle Blog
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stories about connection, community, and the art of making friends.
                    </p>
                </div>
            </section>

            {/* Main Content with Sidebar */}
            <main className="w-full max-w-7xl mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Blog Grid */}
                    <div className="flex-1">
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {allPosts.map((post: Partial<Post>) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 block border border-gray-200"
                                >
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={post.image || '/images/default-blog.jpg'}
                                            alt={post.title || 'Blog Post'}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                                            <span>{formatBlogDate(post.date || '')}</span>
                                            <span>•</span>
                                            <span>{post.author}</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 line-clamp-3 mb-4">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-blue-600 font-medium group-hover:underline">
                                            Read more →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:sticky lg:top-32 lg:self-start">
                        <BlogSidebar />
                    </div>
                </div>
            </main>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "name": "Stranger Mingle Blog",
                        "description": "Stories about making friends and community building.",
                        "url": "https://www.strangermingle.com/blog",
                        "blogPost": allPosts.map((post) => ({
                            "@type": "BlogPosting",
                            "headline": post.title,
                            "datePublished": post.date,
                            "author": {
                                "@type": "Person",
                                "name": post.author
                            },
                            "url": `https://www.strangermingle.com/blog/${post.slug}`
                        }))
                    })
                }}
            />
        </div>
    );
}

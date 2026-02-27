import { getPostBySlug, getAllPosts, markdownToHtml, formatBlogDate } from '@/lib/blog';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BlogSidebar from '@/components/BlogSidebar';
import AuthorCard from '@/components/AuthorCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import RecentPosts from '@/components/RecentPosts';

// Helper types
type Props = {
    params: Promise<{ slug: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug, [
        'title',
        'excerpt',
        'image',
        'date',
        'author',
    ]);

    return {
        title: `${post.title} | Stranger Mingle Blog`,
        description: post.excerpt,
        openGraph: {
            images: [post.image],
        },
        alternates: {
            canonical: `/blog/${slug}`,
        },
    };
}

export default async function Post({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'image',
        'tags',
        'excerpt',
        'keywords'
    ]);

    const content = await markdownToHtml(post.content || '');

    return (
        <div className="min-h-screen bg-white pt-32 pb-16">
            {/* Breadcrumb - Visual Only */}
            <div className="max-w-7xl mx-auto px-4 mb-8 text-sm text-gray-500">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/blog" className="hover:text-blue-600">Blog</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 truncate">{post.title}</span>
            </div>

            {/* Main Content with Sidebar */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Article Content */}
                    <article className="flex-1 lg:max-w-3xl">
                        {/* Post Header */}
                        <header className="mb-12 text-center">
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex justify-center gap-2 mb-6">
                                    {post.tags.map((tag: string) => (
                                        <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center justify-center gap-4 text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold">
                                        {post.author.charAt(0)}
                                    </div>
                                    <span className="font-medium text-gray-900">{post.author}</span>
                                </div>
                                <span>•</span>
                                <time>{formatBlogDate(post.date || '')}</time>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Content */}
                        <div
                            className="prose prose-lg prose-blue mx-auto prose-img:rounded-xl prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 max-w-none"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />

                        {/* Author Card */}
                        <AuthorCard authorName={post.author} />

                        {/* Newsletter */}
                        <NewsletterSignup variant="inline" />

                        {/* Article Footer */}
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <Link href="/blog" className="text-blue-600 font-medium hover:underline">
                                ← Back to all posts
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <div className="lg:w-80 lg:sticky lg:top-32 lg:self-start">
                        <BlogSidebar excludeSlug={slug} />
                    </div>
                </div>

                {/* Recent Posts */}
                <RecentPosts excludeSlug={slug} limit={4} />
            </div>

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "image": post.image,
                        "author": {
                            "@type": "Person",
                            "name": post.author,
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Stranger Mingle",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://www.strangermingle.com/logo.png"
                            }
                        },
                        "datePublished": post.date,
                        "description": post.excerpt,
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://www.strangermingle.com/blog/${post.slug}`
                        },
                        "keywords": post.keywords
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://www.strangermingle.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Blog",
                                "item": "https://www.strangermingle.com/blog"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": post.title,
                                "item": `https://www.strangermingle.com/blog/${post.slug}`
                            }
                        ]
                    })
                }}
            />
        </div>
    );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const posts = getAllPosts(['slug']);

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

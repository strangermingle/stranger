import Image from 'next/image';
import Link from 'next/link';
import { getAllAuthors } from '@/lib/authors';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authors | Stranger Mingle Blog',
    description: 'Meet the authors behind Stranger Mingle blog posts.',
    alternates: {
        canonical: '/authors',
    }
};

export default function AuthorsPage() {
    const authors = getAllAuthors();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            {/* Page Header */}
            <section className="w-full bg-white border-b border-gray-200 pt-32 pb-12 px-4 shadow-sm">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Our Authors
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Meet the talented writers sharing stories about connection, community, and the art of making friends.
                    </p>
                </div>
            </section>

            {/* Authors Grid */}
            <main className="w-full max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {authors.map((author) => (
                        <div
                            key={author.slug}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200"
                        >
                            <div className="p-8">
                                <div className="flex flex-col items-center text-center mb-6">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-100">
                                        <Image
                                            src={author.image}
                                            alt={author.name}
                                            fill
                                            className="object-cover"
                                            unoptimized={true}
                                        />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {author.name}
                                    </h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-center">
                                    {author.bio}
                                </p>
                                <div className="mt-6 text-center">
                                    <Link
                                        href={`/blog?author=${author.slug}`}
                                        className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
                                    >
                                        View all posts by {author.name.split(' ')[0]}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
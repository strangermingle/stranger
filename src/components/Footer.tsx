import Link from 'next/link';
import SocialLinks from './SocialLinks';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-gray-200 bg-gray-50/80 backdrop-blur-xl mt-auto z-10 relative">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <span className="font-bold text-gray-900 tracking-tight text-lg">Stranger Mingle</span>
                        <SocialLinks variant="footer" />
                    </div>

                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">


                        <Link href="/team" className="hover:text-gray-900 transition-colors">
                            Team
                        </Link>

                        <Link href="/testimonials" className="hover:text-gray-900 transition-colors">
                            Testimonials
                        </Link>

                        <Link href="/faqs" className="hover:text-gray-900 transition-colors">
                            FAQs
                        </Link>
                        <div className="hidden md:block w-px h-4 bg-gray-300 mx-2"></div>
                        <Link href="/privacy-policy" className="hover:text-gray-900 transition-colors">
                            Privacy
                        </Link>
                        <Link href="/cookie-policy" className="hover:text-gray-900 transition-colors">
                            Cookie Policy
                        </Link>
                        <Link href="/refund-policy" className="hover:text-gray-900 transition-colors">
                            Refund Policy
                        </Link>
                        <Link href="/safety-guidelines" className="hover:text-gray-900 transition-colors">
                            Safety
                        </Link>
                        <Link href="/terms" className="hover:text-gray-900 transition-colors">
                            Terms
                        </Link>
                        <Link href="/disclaimer" className="hover:text-gray-900 transition-colors">
                            Disclaimer
                        </Link>
                        <div className="hidden md:block w-px h-4 bg-gray-300 mx-2"></div>
                        <Link href="/blog" className="hover:text-gray-900 transition-colors font-semibold text-blue-600">
                            Blog
                        </Link>
                        <Link href="/authors" className="hover:text-gray-900 transition-colors">
                            Authors
                        </Link>
                    </nav>
                </div>

                {/* Copyright and Image Attribution - Center Aligned */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600 mb-2">
                        © {currentYear} Stranger Mingle | A Brand of
                        <a
                            href="https://saltymediaproduction.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 underline ml-1"
                        >
                            Salty Media Production (opc) Pvt Ltd
                        </a>.
                        All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500 max-w-3xl mx-auto">
                        Images and videos used are from Stranger Mingle events, Pexels, and Freepik.
                        All copyrights belong to their respective owners.
                    </p>
                </div>
            </div>
        </footer>
    );
}

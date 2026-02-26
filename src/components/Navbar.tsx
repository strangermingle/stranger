'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white/80 backdrop-blur-md border-b border-gray-100/50">
                <nav className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center max-w-7xl mx-auto">
                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity shrink-0" onClick={closeMobileMenu}>
                        <Image
                            src="/logo-2.svg"
                            alt="Stranger Mingle Logo"
                            width={180}
                            height={45}
                            className="h-8 sm:h-10 w-auto max-w-[140px] sm:max-w-none"
                            priority
                            style={{ objectFit: 'contain' }}
                            unoptimized
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="flex items-center gap-4 sm:gap-6 text-sm font-semibold text-gray-600">
                        <Link href="/events" className="hover:text-black transition-colors hidden sm:block">
                            Events
                        </Link>
                        <Link href="/pune" className="hover:text-black transition-colors hidden md:block">
                            Pune
                        </Link>
                        <Link href="/mumbai" className="hover:text-black transition-colors hidden md:block">
                            Mumbai
                        </Link>
                        <Link href="/delhi" className="hover:text-black transition-colors hidden md:block">
                            Delhi
                        </Link>
                        <Link href="/bangalore" className="hover:text-black transition-colors hidden md:block">
                            Bangalore
                        </Link>
                        <Link href="/hyderabad" className="hover:text-black transition-colors hidden md:block">
                            Hyderabad
                        </Link>
                        <Link href="/live-online-games" className="hover:text-black transition-colors hidden sm:block">
                            Games
                        </Link>
                        <Link href="/about" className="hover:text-black transition-colors hidden sm:block">
                            About
                        </Link>
                        <Link href="/contact" className="hover:text-black transition-colors hidden sm:block">
                            Contact
                        </Link>
                        <Link href="https://member.strangermingle.com/login" className="px-4 py-2 bg-yellow-500 text-black rounded-full font-bold hover:bg-gray-800 transition-colors hidden sm:inline-block">
                            Member Login
                        </Link>
                    </div>

                    {/* Hamburger Button (Mobile Only) */}
                    <button
                        onClick={toggleMobileMenu}
                        className="sm:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-gray-100 transition-colors shrink-0 ml-2"
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span
                            className={`w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                        />
                        <span
                            className={`w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                }`}
                        />
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[99999] sm:hidden"
                    onClick={closeMobileMenu}
                    style={{ top: '73px' }}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-[999999] sm:hidden transform transition-transform duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ top: '73px' }}
            >
                <div className="flex flex-col h-full py-6 px-6 overflow-y-auto">
                    <div className="flex flex-col gap-2 mb-6">
                        <Link
                            href="/events"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Events
                        </Link>
                        <Link
                            href="/pune"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Pune
                        </Link>
                        <Link
                            href="/mumbai"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Mumbai
                        </Link>
                        <Link
                            href="/delhi"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Delhi
                        </Link>
                        <Link
                            href="/bangalore"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Bangalore
                        </Link>
                        <Link
                            href="/hyderabad"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Hyderabad
                        </Link>
                        <Link
                            href="/live-online-games"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Games
                        </Link>
                        <Link
                            href="/about"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Contact
                        </Link>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                        <Link
                            href="/sign-up"
                            className="block w-full px-4 py-3 bg-black text-white text-center rounded-full font-bold hover:bg-gray-800 transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SocialLinks from './SocialLinks';
import SearchBar from './SearchBar';
import { useAuth } from './AuthProvider';
import { UserCircle, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
    const { user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[9999] w-full bg-white shadow-lg backdrop-blur-md border-b border-gray-100/50">
                <nav className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center max-w-7xl mx-auto gap-4">
                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity shrink-0" onClick={closeMobileMenu}>
                        <Image
                            src="/logo-2.svg"
                            alt="Stranger Mingle Logo"
                            width={180}
                            height={45}
                            className="h-8 sm:h-10 w-auto max-w-[120px] sm:max-w-none"
                            priority
                            style={{ objectFit: 'contain' }}
                            unoptimized
                        />
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden lg:flex flex-1 justify-center max-w-md mx-4">
                        <SearchBar />
                    </div>

                    {/* Desktop Menu */}
                    <div className="flex items-center gap-4 sm:gap-6 text-sm font-semibold text-gray-600">
                        <Link href="/events" className="hover:text-yellow-700 transition-colors hidden sm:block">
                            Events
                        </Link>
                        {/* Featured Cities */}
                        <div className="hidden xl:flex items-center gap-6">
                            <Link href="/bangalore" className="hover:text-pink-600 transition-colors">Bangalore</Link>
                            <Link href="/mumbai" className="hover:text-green-600 transition-colors">Mumbai</Link>
                            <Link href="/delhi" className="hover:text-purple-600 transition-colors">Delhi</Link>
                        </div>
                        
                        <Link href="/know-your-host" className="hover:text-blue-600 transition-colors hidden sm:block">
                            Know Your Host
                        </Link>
                        
                        {!user ? (
                            <Link href="/members" className="px-5 py-2.5 bg-yellow-400 text-black rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-yellow-500 transition-all flex items-center gap-2 shadow-sm active:scale-95">
                                <UserCircle className="w-4 h-4" />
                                <span>Members</span>
                            </Link>
                        ) : (
                            <Link href="/members" className="px-5 py-2.5 bg-gray-900 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all flex items-center gap-2 shadow-lg active:scale-95">
                                <LayoutDashboard className="w-4 h-4 text-green-400" />
                                <span>Dashboard</span>
                            </Link>
                        )}

                        {/* Mobile Actions (Location + Hamburger) */}
                        <div className="flex lg:hidden items-center gap-2">
                            <div className="sm:hidden">
                                <SearchBar locationOnly={true} />
                            </div>
                            
                            <button
                                onClick={toggleMobileMenu}
                                className="sm:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-gray-100 transition-colors shrink-0"
                                aria-label="Toggle mobile menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span
                                    className={`w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                                />
                                <span
                                    className={`w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                                />
                                <span
                                    className={`w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                                />
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-[99999] sm:hidden backdrop-blur-[2px]"
                    onClick={closeMobileMenu}
                    style={{ top: '73px' }}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed right-0 top-[73px] w-72 max-w-[80vw] bg-white shadow-2xl z-[999999] sm:hidden transform transition-all duration-300 ease-in-out border-l border-b border-gray-100 rounded-bl-3xl overflow-hidden ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            >
                <div className="flex flex-col h-auto max-h-[calc(100vh-90px)] py-6 px-6 overflow-y-auto">
                    {/* Mobile Search - Top of the menu as requested */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                        <SearchBar locationOnly={false} hideSearchOnMobile={false} />
                    </div>

                    <div className="flex flex-col gap-2 mb-6">
                        <Link
                            href="/events"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Events
                        </Link>
                        <Link
                            href="/know-your-host"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Know Your Host
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
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <Link
                            href="/members"
                            className="block w-full px-4 py-3 bg-yellow-400 text-black text-center rounded-full font-bold hover:bg-black hover:text-white transition-colors mb-6 shadow-sm"
                            onClick={closeMobileMenu}
                        >
                            Members Area
                        </Link>

                        {/* Social Media Icons */}
                        <div className="px-2">
                            <SocialLinks variant="mobile_menu" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

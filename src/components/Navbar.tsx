'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SocialLinks from './SocialLinks';
import SearchBar from './SearchBar';
import { useAuth } from './AuthProvider';
import { UserCircle, HeartHandshake, Crown } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { memberSignOutApi } from '@/lib/memberCallService';

export default function Navbar() {
    const { user, mappedUserId } = useAuth();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            const uid = mappedUserId || user?.uid;
            if (uid) {
                await memberSignOutApi(uid);
            }
            await signOut(auth);
            router.push('/');
            closeMobileMenu();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

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
                    <div className="flex items-center gap-3 lg:gap-5 text-sm font-semibold text-gray-600">
                        <Link href="/members/login" className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-colors font-bold text-xs uppercase tracking-wider shadow-sm">
                            <HeartHandshake className="w-3.5 h-3.5" />
                            <span>Hire a Companion</span>
                        </Link>
                        <Link href="/rent-a-friend-registration" className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors font-bold text-xs uppercase tracking-wider border border-rose-200">
                            <HeartHandshake className="w-3.5 h-3.5" />
                            <span>Become a Companion</span>
                        </Link>
                        <Link href="/events" className="hover:text-yellow-700 transition-colors hidden sm:block">
                            Events
                        </Link>

                        {!user ? (
                            <Link href="/members?mode=login" className="hidden sm:flex px-5 py-2.5 bg-yellow-400 text-black rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-yellow-500 transition-all items-center gap-2 shadow-sm active:scale-95">
                                <UserCircle className="w-4 h-4" />
                                <span>Member Login</span>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/members"
                                    className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-900 text-white rounded-full font-bold uppercase tracking-wider text-[10px] sm:text-[11px] hover:bg-black transition-all items-center justify-center shadow-xs active:scale-95"
                                >
                                    Dash
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="hidden sm:inline-flex px-3.5 py-2 rounded-full border border-gray-200/80 hover:border-rose-200 text-gray-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-all active:scale-95"
                                >
                                    Sign Out
                                </button>
                            </div>
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
                            href="/members/login"
                            className="px-4 py-3 text-base font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                            onClick={closeMobileMenu}
                        >
                            <HeartHandshake className="w-4 h-4" />
                            Hire a Companion
                        </Link>
                        <Link
                            href="/rent-a-friend-registration"
                            className="px-4 py-3 text-base font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-2 border border-rose-200"
                            onClick={closeMobileMenu}
                        >
                            <HeartHandshake className="w-4 h-4" />
                            Become a Companion
                        </Link>
                        <Link
                            href="/members"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-xl transition-colors flex items-center gap-2"
                            onClick={closeMobileMenu}
                        >
                            <Crown className="w-4 h-4 text-amber-500" />
                            Purchase Membership
                        </Link>
                        <Link
                            href="/events"
                            className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-xl transition-colors"
                            onClick={closeMobileMenu}
                        >
                            Weekend Events
                        </Link>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        {!user ? (
                            <Link
                                href="/members?mode=login"
                                className="block w-full px-4 py-3 bg-yellow-400 text-semibold text-center rounded-full font-semibold hover:bg-black hover:text-white transition-colors mb-6 shadow-sm"
                                onClick={closeMobileMenu}
                            >
                                Member Login
                            </Link>
                        ) : (
                            <div className="mb-6 space-y-2">
                                <Link
                                    href="/members"
                                    className="block w-full px-4 py-3 bg-gray-900 text-white text-center rounded-full font-bold hover:bg-black transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="block w-full px-4 py-3 border border-rose-200 text-rose-600 bg-rose-50/50 hover:bg-rose-100 text-center rounded-full font-bold transition-colors text-sm"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}

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

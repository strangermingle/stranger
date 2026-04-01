'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ALL_CITIES = [
    { name: "Pune", slug: "pune" },
    { name: "Mumbai", slug: "mumbai" },
    { name: "Delhi", slug: "delhi" },
    { name: "Bangalore", slug: "bangalore" },
    { name: "Hyderabad", slug: "hyderabad" },
    { name: "Chennai", slug: "chennai" },
    { name: "Kolkata", slug: "kolkata" },
    { name: "Ahmedabad", slug: "ahmedabad" },
    { name: "Jaipur", slug: "jaipur" },
    { name: "Surat", slug: "surat" },
    { name: "Lucknow", slug: "lucknow" },
    { name: "Kanpur", slug: "kanpur" },
    { name: "Nagpur", slug: "nagpur" },
    { name: "Indore", slug: "indore" },
    { name: "Bhopal", slug: "bhopal" },
    { name: "Patna", slug: "patna" },
    { name: "Visakhapatnam", slug: "visakhapatnam" },
    { name: "Vadodara", slug: "vadodara" },
    { name: "Ludhiana", slug: "ludhiana" },
    { name: "Coimbatore", slug: "coimbatore" }
].sort((a, b) => a.name.localeCompare(b.name));

interface SearchBarProps {
    hideSearchOnMobile?: boolean;
    locationOnly?: boolean;
}

export default function SearchBar({ hideSearchOnMobile = false, locationOnly = false }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const router = useRouter();
    const locationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
                setIsLocationOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/events?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className={`flex items-center gap-2 ${locationOnly ? '' : 'w-full max-w-md'}`}>
            {/* Search Input */}
            {!locationOnly && (
                <form
                    onSubmit={handleSearch}
                    className={`relative flex-1 group ${hideSearchOnMobile ? 'hidden sm:block' : ''}`}
                >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="weekend events in ..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 rounded-full text-sm font-medium outline-none transition-all"
                    />
                </form>
            )}

            {/* Location Selector */}
            <div className="relative" ref={locationRef}>
                <button
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                    className={`p-2 rounded-full transition-all ${isLocationOpen ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'}`}
                    title="Select Your City"
                >
                    <MapPin className="w-6 h-6" />
                </button>
                <span className="p-2 text-[10px] font-medium justify-center item-center text-gray-400 text-center">City</span>

                {isLocationOpen && (
                    <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[10000] animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Select Your City</h3>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto p-2 grid grid-cols-2 gap-1 custom-scrollbar">
                            {ALL_CITIES.map((city) => (
                                <Link
                                    key={city.slug}
                                    href={`/${city.slug}`}
                                    onClick={() => setIsLocationOpen(false)}
                                    className="px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 rounded-xl transition-all flex items-center justify-between group"
                                >
                                    <span>{city.name}</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                            <p className="text-[10px] text-gray-400 font-medium">More cities coming soon!</p>
                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f3f4f6;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #e5e7eb;
                }
            ` }} />
        </div>
    );
}

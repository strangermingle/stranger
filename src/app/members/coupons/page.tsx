'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { useAuth } from '@/components/AuthProvider';
import { Ticket, ExternalLink, QrCode, Search, ChevronRight, Loader2, Undo, Coffee, Train, Music, GlassWater, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MOCK_COUPONS = [
    { id: 1, brand: 'Blue Tokai', offer: 'Flat 50% OFF', code: 'STRANGER50', category: 'food', expiry: '2026-04-15', icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { id: 2, brand: 'Uber Intercity', offer: 'Free Ride Credits', code: 'SMTRAVEL', category: 'travel', expiry: '2026-05-01', icon: Train, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 3, brand: 'Social Offline', offer: 'Buy 1 Get 1', code: 'SMXSOCIAL', category: 'drinks', expiry: '2026-04-20', icon: GlassWater, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 4, brand: 'Zomato Live', offer: 'Early Access Entry', code: 'SMSTUBS', category: 'events', expiry: '2026-04-10', icon: Music, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

export default function CouponsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/members');
        }
    }, [user, loading, router]);

    const filteredCoupons = MOCK_COUPONS.filter(coupon => {
        const matchesCategory = !activeCategory || coupon.category === activeCategory;
        const matchesSearch = coupon.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             coupon.offer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 selection:bg-yellow-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <Link href="/members" className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200">
                            <Undo className="w-6 h-6 text-gray-400" />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Coupon Wallet</h1>
                            <p className="text-gray-500 font-medium tracking-tight mt-1">Exclusive rewards for our verified members.</p>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by brand or offer..."
                            className="w-full pl-10 pr-4 py-4 bg-white border border-gray-100 rounded-3xl focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/5 transition-all text-sm font-bold shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {['All', 'Food', 'Travel', 'Drinks', 'Events'].map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat === 'All' ? null : cat.toLowerCase())}
                                className={`px-6 py-4 rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap shadow-sm border ${
                                    (cat === 'All' && !activeCategory) || activeCategory === cat.toLowerCase()
                                    ? 'bg-yellow-400 text-black border-yellow-400 shadow-yellow-400/20'
                                    : 'bg-white text-gray-400 border-gray-50 hover:border-gray-900'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Coupons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {filteredCoupons.map(coupon => (
                        <div key={coupon.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col md:flex-row overflow-hidden hover:-translate-y-2 hover:shadow-yellow-200/20 transition-all border-dashed-r">
                            {/* Brand Side */}
                            <div className={`w-full md:w-32 py-10 flex flex-col items-center justify-center ${coupon.bg} border-r border-dashed border-gray-200`}>
                                <div className={`p-4 rounded-3xl bg-white shadow-xl ${coupon.color}`}>
                                    <coupon.icon className="w-8 h-8" />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest mt-4 ${coupon.color}`}>
                                    {coupon.category}
                                </span>
                            </div>
                            
                            {/* Details Side */}
                            <div className="flex-1 p-8 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-black italic text-gray-900 leading-none mb-2">{coupon.brand}</h3>
                                        <div className="text-3xl font-black text-gray-900 tracking-tight">{coupon.offer}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Expires In</div>
                                        <div className="flex items-center gap-1 text-xs font-black text-rose-500">
                                            <Clock className="w-3 h-3" />
                                            <span>21 Days</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-gray-400 text-sm font-medium mb-8">Valid at all physical outlets across {user?.email?.includes('bangalore') ? 'Bangalore' : 'India'}. Terms apply.</p>
                                
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="flex-1 bg-gray-50 rounded-2xl px-6 py-4 border border-gray-100 flex items-center justify-between group/code cursor-pointer active:scale-95 transition-all">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Copy Code</span>
                                            <span className="font-black text-gray-900 tracking-wider">XXXX-XXXX</span>
                                        </div>
                                        <QrCode className="w-6 h-6 text-gray-300 group-hover/code:text-gray-900 transition-colors" />
                                    </div>
                                    <button className="h-14 px-6 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-black transition-colors active:scale-90">
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCoupons.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 border-dashed">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <Ticket className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 uppercase">No Coupons Available</h2>
                        <p className="text-gray-400 font-medium">Check back soon for new exclusive offers!</p>
                    </div>
                )}

                {/* Info Card */}
                <div className="mt-16 bg-gradient-to-br from-gray-900 to-black p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-3xl shadow-gray-900/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 focus:opacity-10 blur-3xl rounded-full translate-x-32 -translate-y-32" />
                    <div className="relative z-10 flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle2 className="w-8 h-8 text-yellow-400" />
                            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Verified Member Benefits</h2>
                        </div>
                        <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-2xl text-center md:text-left">
                            We partner with premium brands to bring you curated experiences. These offers are <span className="text-yellow-400 font-black">strictly for verified members only</span> and cannot be shared.
                        </p>
                    </div>
                    <div className="relative z-10">
                        <button className="px-10 py-5 bg-yellow-400 text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl shadow-yellow-400/20 hover:scale-105 transition-all active:scale-95">
                            Partner with Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

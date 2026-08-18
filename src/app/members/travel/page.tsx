'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { MapPin, Navigation, Clock, Car, Bike, Plus, Search, ChevronRight, Loader2, Undo, Calendar, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const MOCK_ROUTES = [
    { id: 1, host: 'Pravin S.', from: 'Koramangala 4th Block', to: 'Whitefield (ITPL)', time: '09:30 AM', date: '2026-04-01', vehicle: 'Car', capacity: 3, joined: 1 },
    { id: 2, host: 'Anita R.', from: 'Indiranagar Metro', to: 'MG Road', time: '06:00 PM', date: '2026-04-01', vehicle: 'SUV', capacity: 4, joined: 0 },
    { id: 3, host: 'Rahul K.', from: 'Electronic City Phase 1', to: 'HSR Layout', time: '08:45 AM', date: '2026-04-02', vehicle: 'Bike', capacity: 1, joined: 0 },
];

export default function TravelPage() {
    const { user, loading, isMemberVerified } = useAuth();
    const router = useRouter();
    const [isPosting, setIsPosting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!loading && (!user || !isMemberVerified)) {
            router.push('/members');
        }
    }, [user, isMemberVerified, loading, router]);

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
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <Link href="/members" className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200">
                            <Undo className="w-6 h-6 text-gray-400" />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Route Share</h1>
                            <p className="text-gray-500 font-medium tracking-tight mt-1">Coordinate travel & share rides with verified members.</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => setIsPosting(!isPosting)}
                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl ${
                            isPosting ? 'bg-white text-gray-900 border border-gray-100 hover:bg-gray-50' : 'bg-gray-900 text-white hover:bg-black shadow-gray-900/10'
                        }`}
                    >
                        {isPosting ? <ChevronRight className="w-4 h-4 rotate-90" /> : <Plus className="w-4 h-4" />}
                        <span>{isPosting ? 'Hide Form' : 'Post New Route'}</span>
                    </button>
                </div>

                {/* Posting Form (Expandable) */}
                {isPosting && (
                    <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 focus:opacity-5 blur-3xl rounded-full translate-x-32 -translate-y-32" />
                            
                            <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                                <Navigation className="w-6 h-6 text-green-500" />
                                Create Travel Listing
                            </h2>

                            <form className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Starting Point</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input type="text" placeholder="e.g. Koramangala 4th Block" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-50 rounded-2xl focus:bg-white focus:border-green-500 transition-all font-bold text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Destination</label>
                                    <div className="relative">
                                        <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input type="text" placeholder="e.g. Whitefield" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-50 rounded-2xl focus:bg-white focus:border-green-500 transition-all font-bold text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Vehicle Details</label>
                                    <div className="relative">
                                        <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <select className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-50 rounded-2xl focus:bg-white focus:border-green-500 transition-all font-bold text-sm appearance-none outline-none">
                                            <option>Member's Car</option>
                                            <option>SUV / Van</option>
                                            <option>Private Bike</option>
                                            <option>Cab Share</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Travel Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input type="date" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-50 rounded-2xl focus:bg-white focus:border-green-500 transition-all font-bold text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Time Window</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input type="time" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-50 rounded-2xl focus:bg-white focus:border-green-500 transition-all font-bold text-sm" />
                                    </div>
                                </div>
                                <div className="flex items-end">
                                    <button className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-xl shadow-green-500/20 active:scale-95">
                                        Publish Route
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Search & Feed Header */}
                <div className="flex items-center justify-between gap-6 mb-8 mt-12 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40">
                    <div className="flex items-center gap-4 flex-1">
                        <Search className="w-5 h-5 text-gray-400 ml-2" />
                        <input 
                            type="text" 
                            placeholder="Filter routes by area or destination..."
                            className="bg-transparent border-none focus:ring-0 w-full text-lg font-bold text-gray-900 placeholder:text-gray-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Routes Feed */}
                <div className="space-y-6">
                    {MOCK_ROUTES.map(route => (
                        <div key={route.id} className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-2xl shadow-gray-200/50 hover:border-yellow-400/50 transition-all flex flex-col md:flex-row md:items-center gap-10 hover:-translate-y-1">
                            
                            {/* Route Visualizer */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    {route.vehicle === 'Bike' ? <Bike className="w-6 h-6" /> : <Car className="w-6 h-6" />}
                                </div>
                                <div className="w-px h-12 bg-gray-100 border-dashed border-r-2" />
                                <div className="w-4 h-4 bg-green-500 rounded-full" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-3 py-1 bg-yellow-400 text-black text-[8px] font-black uppercase tracking-widest rounded-full">Member Listing</span>
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{route.date}</span>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 bg-gray-300 rounded-full" />
                                            <div className="text-gray-900 font-bold tracking-tight">{route.from}</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                            <div className="text-gray-900 font-black tracking-tight text-xl">{route.to}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between md:justify-end gap-12">
                                        <div className="text-center md:text-right">
                                            <div className="text-[10px] font-black uppercase text-gray-300 tracking-widest mb-1">Departure</div>
                                            <div className="font-black text-gray-900 tracking-tight flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-green-500" />
                                                {route.time}
                                            </div>
                                        </div>
                                        <div className="text-center md:text-right">
                                            <div className="text-[10px] font-black uppercase text-gray-300 tracking-widest mb-1">Seats Left</div>
                                            <div className="font-black text-gray-900 tracking-tight flex items-center gap-2">
                                                <UserIcon className="w-4 h-4 text-blue-500" />
                                                {route.capacity - route.joined} / {route.capacity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="md:border-l border-gray-100 md:pl-10 flex flex-col items-center justify-center gap-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-10 h-10 bg-gray-100 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                                        <UserIcon className="w-full h-full p-2 text-gray-400" />
                                    </div>
                                    <span className="font-black text-gray-900 text-xs">{route.host}</span>
                                </div>
                                <button className="w-full md:w-40 py-4 bg-gray-50 hover:bg-yellow-400 group-hover:bg-yellow-400 text-gray-400 group-hover:text-black font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all active:scale-95 shadow-xl shadow-transparent hover:shadow-yellow-400/20 active:translate-y-1">
                                    Join Journey
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

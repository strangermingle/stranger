'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Users, MapPin, Plus, Search, ChevronRight, Loader2, Undo, Trophy, Bike, Mountain, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
    { id: 'turf', name: 'Turf', icon: Trophy, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    { id: 'trek', name: 'Trek', icon: Mountain, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'cycling', name: 'Cycling', icon: Bike, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'fitness', name: 'Fitness', icon: Dumbbell, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
];

const MOCK_GROUPS = [
    { id: 1, name: 'Bangalore Trekking Club', category: 'trek', members: 124, location: 'Bangalore', active: true },
    { id: 2, name: 'Mumbai Cyclists Union', category: 'cycling', members: 89, location: 'Mumbai', active: true },
    { id: 3, name: 'HSR Football Elite', category: 'turf', members: 15, location: 'Bangalore', active: false },
    { id: 4, name: 'Koramangala Fitness Group', category: 'fitness', members: 42, location: 'Bangalore', active: true },
];

export default function GroupsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/members');
        }
    }, [user, loading, router]);

    const filteredGroups = MOCK_GROUPS.filter(group => {
        const matchesCategory = !selectedCategory || group.category === selectedCategory;
        const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             group.location.toLowerCase().includes(searchQuery.toLowerCase());
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
                            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Local Circles</h1>
                            <p className="text-gray-500 font-medium tracking-tight mt-1">Connect with active members in your city.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search groups..."
                                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/5 transition-all text-sm font-bold"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-900/10 whitespace-nowrap">
                            <Plus className="w-4 h-4" />
                            <span>Create Circle</span>
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                    <button 
                        onClick={() => setSelectedCategory(null)}
                        className={`px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap ${
                            !selectedCategory ? 'bg-yellow-400 text-black shadow-xl shadow-yellow-400/20' : 'bg-white text-gray-400 hover:bg-white hover:text-gray-900 border border-gray-50'
                        }`}
                    >
                        All Groups
                    </button>
                    {CATEGORIES.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap ${
                                selectedCategory === cat.id ? `${cat.bg} ${cat.color} ${cat.border} ring-4 ring-yellow-400/5` : 'bg-white text-gray-400 hover:bg-white hover:text-gray-900 border border-gray-50'
                            }`}
                        >
                            <cat.icon className="w-4 h-4" />
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGroups.map(group => {
                        const CategoryIcon = CATEGORIES.find(c => c.id === group.category)?.icon || Users;
                        return (
                            <div key={group.id} className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 hover:-translate-y-2 transition-all">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-3xl ${CATEGORIES.find(c => c.id === group.category)?.bg || 'bg-gray-100'}`}>
                                        <CategoryIcon className={`w-8 h-8 ${CATEGORIES.find(c => c.id === group.category)?.color || 'text-gray-400'}`} />
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 rounded-full">
                                        <MapPin className="w-3 h-3" />
                                        {group.location}
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-black text-gray-900 mb-2 truncate group-hover:text-yellow-600 transition-colors">
                                    {group.name}
                                </h3>
                                
                                <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-8">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        <span>{group.members} Members</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${group.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                                        <span>{group.active ? 'Active Now' : 'Idle'}</span>
                                    </div>
                                </div>
                                
                                <button className="w-full py-4 bg-gray-50 group-hover:bg-yellow-400 text-gray-400 group-hover:text-black font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2">
                                    Join Circle <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>

                {filteredGroups.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 border-dashed">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <Search className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 uppercase">No Groups Found</h2>
                        <p className="text-gray-400 font-medium">Try searching for a different category or location.</p>
                        <button 
                            onClick={() => {setSelectedCategory(null); setSearchQuery('')}}
                            className="mt-6 text-yellow-600 font-black uppercase tracking-widest text-xs hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

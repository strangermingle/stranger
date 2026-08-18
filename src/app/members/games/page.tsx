'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Gamepad2, Trophy, Users, Zap, Shield, Info, Undo, Loader2, Sparkles, Brain, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GamesPage() {
    const { user, loading, isMemberVerified } = useAuth();
    const router = useRouter();

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
        <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-12 px-4 selection:bg-rose-500/30">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div className="flex items-center gap-6 animate-in fade-in slide-in-from-left duration-700">
                        <Link href="/members" className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 shadow-xl active:scale-95 group">
                            <Undo className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2 text-rose-500 font-black uppercase tracking-[0.3em] text-[10px] mb-2">
                                <Zap className="w-4 h-4 fill-rose-500" />
                                <span>Member Exclusives</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">Stranger Games</h1>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Your Rank</div>
                            <div className="font-black text-white">#12 in {user?.email?.split('@')[0]}</div>
                        </div>
                    </div>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    
                    {/* Game 1: Trivia */}
                    <div className="group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:border-rose-500/50 transition-all hover:-translate-y-2">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:opacity-100 opacity-0 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-rose-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Brain className="w-8 h-8 text-rose-500" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Stranger Trivia</h3>
                            <p className="text-gray-500 font-medium mb-8">Test your knowledge about the local community and hidden gems.</p>
                            <button className="w-full py-4 bg-white/5 group-hover:bg-rose-500 group-hover:text-white text-gray-400 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all flex items-center justify-center gap-2">
                                Start Quiz
                            </button>
                        </div>
                    </div>

                    {/* Game 2: Icebreakers */}
                    <div className="group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:opacity-100 opacity-0 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Icebreakers</h3>
                            <p className="text-gray-500 font-medium mb-8">Answer daily questions to reveal common interests with others.</p>
                            <button className="w-full py-4 bg-white/5 group-hover:bg-blue-500 group-hover:text-white text-gray-400 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all flex items-center justify-center gap-2">
                                Join Thread
                            </button>
                        </div>
                    </div>

                    {/* Game 3: Missions */}
                    <div className="group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden hover:border-emerald-500/50 transition-all hover:-translate-y-2">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:opacity-100 opacity-0 transition-opacity" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Social Quests</h3>
                            <p className="text-gray-500 font-medium mb-8">Complete real-world missions to earn unique badges.</p>
                            <button className="w-full py-4 bg-white/5 group-hover:bg-emerald-500 group-hover:text-white text-gray-400 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all flex items-center justify-center gap-2">
                                View Quests
                            </button>
                        </div>
                    </div>

                </div>

                {/* Leaderboard Section */}
                <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-yellow-400/10 rounded-2xl">
                            <Users className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter">Community Leaderboard</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { rank: 1, user: 'Stranger_77', score: '2,450 XP', city: 'Bangalore' },
                            { rank: 2, user: 'Neon_Trekker', score: '2,120 XP', city: 'Mumbai' },
                            { rank: 3, user: 'Alpha_Mingle', score: '1,980 XP', city: 'Delhi' },
                        ].map((item) => (
                            <div key={item.rank} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all cursor-default">
                                <div className="flex items-center gap-6">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                                        item.rank === 1 ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 
                                        item.rank === 2 ? 'bg-gray-300 text-black' : 
                                        'bg-orange-600 text-white'
                                    }`}>
                                        {item.rank}
                                    </div>
                                    <div>
                                        <div className="font-black text-lg tracking-tight">{item.user}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.city}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-black text-rose-500 tracking-wider">{item.score}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Points</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Footer */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    <div className="px-6 py-3 bg-white/5 border border-white/5 rounded-full flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Fair Play Guaranteed</span>
                    </div>
                    <div className="px-6 py-3 bg-white/5 border border-white/5 rounded-full flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">New Games Weekly</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

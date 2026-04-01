'use client';

import { useState } from 'react';
import { ChevronLeft, Shield, Skull, Users, Eye, Info, Play, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const roles = [
    { title: 'Mafia', description: 'Eliminate citizens without getting caught.', icon: <Skull className="text-red-500" /> },
    { title: 'Doctor', description: 'Each night, save one person from being eliminated.', icon: <Shield className="text-blue-500" /> },
    { title: 'Detective', description: 'Investigate one person each night to find the Mafia.', icon: <Eye className="text-indigo-500" /> },
    { title: 'Villager', description: 'Identify the Mafia and vote them out during the day.', icon: <Users className="text-gray-500" /> }
];

export default function MafiaGame() {
    const [gameState] = useState<'lobby' | 'night' | 'day'>('lobby');
    const [players] = useState([
        { name: 'Player 1', status: 'alive' },
        { name: 'Player 2', status: 'alive' },
        { name: 'Player 3', status: 'alive' },
        { name: 'Player 4', status: 'alive' },
    ]);

    return (
        <div className="min-h-screen bg-[#0a0a0c] pt-32 pb-20 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="flex items-center gap-4 text-left">
                        <Link href="/live-online-games" className="p-3 bg-white/5 rounded-2xl border border-white/10 text-gray-400 hover:text-purple-400 transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-white">Mafia Hub</h1>
                            <p className="text-gray-500">Social Deduction • Premium Mingle Experience</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-purple-400">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                </span>
                                {gameState} Phase
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Main Area */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Game Board/Lobby View */}
                        <div className="relative aspect-video rounded-[3rem] bg-linear-to-b from-purple-900/20 to-black border border-white/5 shadow-2xl flex flex-col items-center justify-center p-12 text-center group overflow-hidden">
                            <div className="absolute inset-0 bg-[#0a0a0c] opacity-50 bg-[radial-gradient(ellipse_at_center,_#581c87_0%,_transparent_70%)]" />

                            <div className="relative z-10">
                                <Users className="w-20 h-20 text-purple-500 mb-8 mx-auto animate-pulse" />
                                <h2 className="text-4xl font-black mb-4">Ready to Start?</h2>
                                <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
                                    Gather at least 6 people to launch the full experience. Host your own game right here.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <button className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-purple-50 transition-all flex items-center gap-3">
                                        <Play className="w-5 h-5 fill-current" /> Start Game
                                    </button>
                                    <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3">
                                        <MessageSquare className="w-5 h-5" /> Open Chat
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#0a0a0c] to-transparent pointer-events-none" />
                        </div>

                        {/* Roles Info */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {roles.map((role, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        {role.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{role.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white/5 rounded-[2rem] border border-white/10 p-8">
                            <div className="flex items-center gap-2 mb-8 font-black text-sm uppercase tracking-widest text-gray-400">
                                <Users className="w-4 h-4" />
                                Players in Lobby
                            </div>
                            <div className="space-y-4">
                                {players.map((p, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                                                {p.name.charAt(p.name.length - 1)}
                                            </div>
                                            <span className="font-bold text-gray-200">{p.name}</span>
                                        </div>
                                        <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase rounded-lg">Online</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 font-bold hover:text-white hover:bg-white/10 transition-all">
                                + Invite Friends
                            </button>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-linear-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 text-white">
                            <Info className="w-8 h-8 text-indigo-400 mb-4" />
                            <h3 className="text-xl font-bold mb-4">Mingle Hub</h3>
                            <p className="text-sm opacity-60 leading-relaxed">
                                Use this hub to manage your roles and phases. Perfect for Zoom calls or Discord hangs. Everyone stays synced, everyone stays mingling.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

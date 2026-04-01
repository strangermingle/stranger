'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { MessageSquare, Users, User as UserIcon, Send, Shield, Info, Ghost, Hash, Loader2, Undo } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChatPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'anonymous' | 'direct' | 'rooms'>('anonymous');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/members');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4 selection:bg-blue-500/30">
            <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] flex flex-col">
                
                {/* Chat Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/members" className="p-2 hover:bg-white/10 rounded-xl transition-all border border-white/5">
                            <Undo className="w-6 h-6 text-gray-400" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight uppercase">Member Chat</h1>
                            <p className="text-gray-500 text-sm font-medium">Safe & Encrypted Communication</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-green-500">248 Members Online</span>
                    </div>
                </div>

                {/* Main Chat Interface */}
                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row backdrop-blur-xl">
                    
                    {/* Sidebar / Tabs */}
                    <div className="w-full md:w-72 border-r border-white/5 p-6 flex flex-col gap-2">
                        {[
                            { id: 'anonymous', label: 'Anonymous', icon: Ghost, color: 'text-purple-400', desc: 'Alias-based matching' },
                            { id: 'direct', label: 'Direct', icon: UserIcon, color: 'text-blue-400', desc: 'Private 1-on-1' },
                            { id: 'rooms', label: 'Rooms', icon: Hash, color: 'text-emerald-400', desc: 'Group discussions' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${
                                    activeTab === tab.id 
                                    ? 'bg-white/10 shadow-xl' 
                                    : 'hover:bg-white/5 opacity-60 hover:opacity-100'
                                }`}
                            >
                                <div className={`p-2 rounded-xl bg-white/5 ${tab.color}`}>
                                    <tab.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-black text-sm uppercase tracking-wider">{tab.label}</div>
                                    <div className="text-[10px] text-gray-500 font-medium">{tab.desc}</div>
                                </div>
                            </button>
                        ))}

                        <div className="mt-auto p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                            <div className="flex items-center gap-2 text-blue-400 mb-2">
                                <Shield className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Privacy Level</span>
                            </div>
                            <p className="text-[10px] text-gray-500 leading-relaxed">
                                End-to-end encryption active. Messages are deleted from servers after 24h of inactivity.
                            </p>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col relative">
                        
                        {/* Area Content */}
                        <div className="flex-1 p-8 overflow-y-auto flex flex-col justify-center items-center text-center">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                {activeTab === 'anonymous' ? <Ghost className="w-10 h-10 text-purple-400" /> : 
                                 activeTab === 'direct' ? <UserIcon className="w-10 h-10 text-blue-400" /> : 
                                 <Hash className="w-10 h-10 text-emerald-400" />}
                            </div>
                            <h2 className="text-xl font-black uppercase mb-2 tracking-wide">
                                {activeTab === 'anonymous' ? 'Searching for Stranger...' : 
                                 activeTab === 'direct' ? 'Select a Contact' : 
                                 'Joining Public Room...'}
                            </h2>
                            <p className="text-gray-500 max-w-xs text-sm font-medium">
                                {activeTab === 'anonymous' ? 'We are matching you with another verified member. Your identity remains hidden.' : 
                                 activeTab === 'direct' ? 'Choose from your verified connections to start a private encrypted conversation.' : 
                                 'Enter a public room to discuss topics with the community in real-time.'}
                            </p>
                            
                            {activeTab === 'anonymous' && (
                                <button className="mt-8 px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white font-black rounded-xl transition-all active:scale-95 shadow-lg shadow-purple-500/20 uppercase tracking-widest text-xs">
                                    Flash Match Now
                                </button>
                            )}
                        </div>

                        {/* Message Input Box */}
                        <div className="p-6 border-t border-white/5 bg-black/20">
                            <form className="flex gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder={`Message in ${activeTab}...`}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium text-sm"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <button type="button" className="p-2 hover:text-white text-gray-500 transition-colors">
                                            <Info className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    className="p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-500/20 disabled:opacity-50"
                                    disabled={!message.trim()}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

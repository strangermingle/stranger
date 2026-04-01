import Link from 'next/link';
import MembershipAd from '@/components/ads/MembershipAd';
import { ArrowLeft, Search, Navigation } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-[#050505] overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] -z-10" />
            
            <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* 404 Content */}
                <div className="text-center lg:text-left space-y-10 animate-slide-in-left">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-bold backdrop-blur-md uppercase tracking-widest shadow-lg shadow-black/50">
                        <Navigation size={14} className="animate-pulse" />
                        <span>Lost in the Void</span>
                    </div>
                    
                    <div className="relative inline-block lg:block">
                        <h1 className="text-[9rem] md:text-[14rem] font-black leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/10 select-none pb-4">
                            404
                        </h1>
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
                    </div>

                    <div className="space-y-6 max-w-lg mx-auto lg:mx-0">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                            Well, this is <br />
                            <span className="text-blue-500">awkward.</span>
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed font-medium">
                            The page you&apos;re looking for has vanished into thin air. Don&apos;t worry though, our community is still waiting for you.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6">
                        <Link
                            href="/"
                            className="group flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-white hover:text-blue-600 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-blue-600/20 active:scale-95"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
                            Return Home
                        </Link>
                        <Link
                            href="/events"
                            className="group flex items-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest backdrop-blur-md transition-all active:scale-95 shadow-xl shadow-black/40"
                        >
                            <Search size={20} className="group-hover:scale-110 transition-transform text-blue-400" />
                            Find Events
                        </Link>
                    </div>
                </div>

                {/* Ad Content */}
                <div className="animate-slide-in-right delay-300">
                    <div className="relative group/ad">
                        {/* Decorative glow behind ad */}
                        <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-[3rem] -z-10 group-hover/ad:bg-blue-500/20 transition-all duration-700" />
                        
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 px-4 opacity-50">
                                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"></span>
                                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white">Suggested</span>
                                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20"></span>
                            </div>
                            
                            <div className="transform hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 shadow-2xl shadow-black/80 rounded-2xl overflow-hidden ring-1 ring-white/10">
                                <MembershipAd />
                            </div>
                            
                            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group/quote">
                                <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500/5 rounded-full blur-xl group-hover/quote:bg-blue-500/10 transition-colors" />
                                <p className="relative z-10 text-sm text-center text-gray-400 italic leading-relaxed font-medium">
                                    &quot;The best way to find yourself is to get lost in a crowd of <span className="text-white font-bold not-italic">strangers</span>.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


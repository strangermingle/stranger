import Link from "next/link";
import { Sparkles, Crown, ArrowRight, ShieldCheck, Users, Zap } from "lucide-react";

export default function MembershipAd() {
    return (
        <div className="bg-linear-to-br from-indigo-900 via-purple-900 to-fuchsia-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-2xl group border border-white/5">
            {/* Background Grain/Patten */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255, 255, 255, 0.1),transparent_50%)]"></div>

            <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner group-hover:scale-110 transition-transform">
                        <Crown className="text-yellow-400 fill-yellow-400" size={20} />
                    </div>
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-[10px] text-fuchsia-300 mb-0.5">Premium Club</h4>
                        <h3 className="text-lg font-black tracking-wide leading-tight uppercase">Stranger Mingle</h3>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Zap size={10} className="text-yellow-400" />
                        </div>
                        <p className="text-[11px] font-regular text-indigo-100 leading-tight">City-Based groups for any activities</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            <ShieldCheck size={10} className="text-emerald-400" />
                        </div>
                        <p className="text-[11px] font-regular text-indigo-100 leading-tight">Anonymous Chat</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Users size={10} className="text-blue-400" />
                        </div>
                        <p className="text-[11px] font-regular text-indigo-100 leading-tight">Member-Only Private Events</p>
                    </div>
                </div>

                <Link
                    href="/members"
                    className="flex items-center justify-center gap-2 bg-white text-indigo-900 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-50 transition-all hover:-translate-y-1 active:scale-95"
                >
                    Unlock Membership <ArrowRight size={14} />
                </Link>

                <p className="text-[12px] text-center text-white/90 font-bold uppercase tracking-widest leading-none">
                    Join nation-wide community
                </p>
            </div>

            {/* Decorative Sparkles */}
            <div className="absolute top-4 right-4 animate-pulse opacity-50">
                <Sparkles size={16} className="text-yellow-400" />
            </div>
            <div className="absolute bottom-4 left-4 animate-bounce-slow opacity-30">
                <Sparkles size={12} className="text-purple-300" />
            </div>
        </div>
    );
}

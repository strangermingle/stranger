import Link from 'next/link';
import { Crown, MessageSquare, PhoneCall, Users, ArrowRight } from 'lucide-react';

interface MembershipCTAProps {
  cityName?: string | null;
  className?: string;
}

export default function MembershipCTA({ cityName, className = '' }: MembershipCTAProps) {
  return (
    <section className={`w-full max-w-7xl mx-auto px-4 py-8 mb-8 ${className}`}>
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-6 shadow-2xl border border-purple-500/20 group">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 text-xs font-bold uppercase tracking-widest mb-3 shadow-inner">
            <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            Stranger Mingle Membership
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 leading-tight max-w-3xl">
            {cityName
              ? `Unlock Stranger Mingle Membership in ${cityName}`
              : 'Unlock Stranger Mingle Membership'}
          </h2>

          {/* Description */}
          <p className="text-purple-100/90 text-sm sm:text-base font-medium leading-relaxed mb-6 max-w-2xl text-center">
            {cityName
              ? `Connect directly with verified strangers in ${cityName}. Enjoy 1-on-1 private chat, secure calling without sharing your mobile number, and create your own activity and chat groups.`
              : 'Connect directly with verified strangers across India. Enjoy 1-on-1 private chat, secure calling without sharing your mobile number, and create your own activity and chat groups.'}
          </p>

          {/* Feature Highlights Grid - 3 Core Membership Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-6 text-left">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">1-on-1 Strangers Chat</h3>
                <p className="text-xs text-purple-200/70">100% private and anonymous 1-on-1 text messaging</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">1-on-1 Private Calling</h3>
                <p className="text-xs text-purple-200/70">Direct voice calls without sharing your mobile number</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">Create Activity &amp; Chat Groups</h3>
                <p className="text-xs text-purple-200/70">Create your own groups for meetups, activities &amp; chat</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/members"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-wider transition-all hover:scale-105 shadow-xl shadow-yellow-500/20 group/btn"
            >
              Explore Membership
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-[11px] text-purple-200/70 font-medium tracking-wide mt-4">
            Verified Members • Zero Mobile Numbers Shared • Safe &amp; Moderated
          </p>
        </div>
      </div>
    </section>
  );
}

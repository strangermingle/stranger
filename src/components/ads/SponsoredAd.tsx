"use client";

import { useState } from "react";
import { 
    Megaphone, 
    Phone, 
    Mail, 
    Sparkles, 
    Copy, 
    Check, 
    MessageCircle, 
    ArrowUpRight 
} from "lucide-react";


export default function SponsoredAd() {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const phoneNumber = "7385531551";
    const formattedPhone = "+91 73855 31551";
    const emailAddress = "strangermingleteam@gmail.com";
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=Hi%20Stranger%20Mingle%20Team%2C%20I'm%20interested%20in%20booking%20an%20ad%20space.`;

    const handleCopy = (text: string, field: string) => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-6 shadow-2xl border border-indigo-500/20 group hover:border-indigo-400/40 transition-all duration-500 text-left">
            {/* Ambient Animated Glow Effects */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/35 transition-all duration-700 animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-fuchsia-500/30 transition-all duration-700" />

            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Header / Status Badge */}
            <div className="relative z-10 flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold tracking-wide">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Available for Ads
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-300/90">
                    <Megaphone size={13} className="text-amber-400 animate-bounce" />
                    <span>Sponsored Slot</span>
                </div>
            </div>

            {/* Main Headline */}
            <div className="relative z-10 mt-5 space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-400">
                    <Sparkles size={13} className="text-amber-400 animate-pulse" />
                    <span>Prime Spotlight</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                    Advertisement Space<br />
                    Available
                </h3>
            </div>


            {/* Contact Information Cards */}
            <div className="relative z-10 mt-5 space-y-2.5">
                {/* Phone Contact */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.09] border border-white/10 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                            <Phone size={15} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Call</p>
                            <a 
                                href={`tel:${phoneNumber}`} 
                                className="text-xs font-bold text-white hover:text-indigo-300 transition-colors tracking-wide block truncate"
                            >
                                {formattedPhone}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            type="button"
                            onClick={() => handleCopy(phoneNumber, "phone")}
                            aria-label="Copy phone number"
                            title="Copy number"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            {copiedField === "phone" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Chat on WhatsApp"
                            title="Chat on WhatsApp"
                            className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
                        >
                            <MessageCircle size={15} />
                        </a>
                    </div>
                </div>

                {/* Email Contact */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.09] border border-white/10 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                            <Mail size={15} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Us</p>
                            <a 
                                href={`mailto:${emailAddress}?subject=Ad%20Space%20Inquiry%20-%20Stranger%20Mingle`}
                                className="text-xs font-bold text-white hover:text-purple-300 transition-colors block truncate"
                            >
                                {emailAddress}
                            </a>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => handleCopy(emailAddress, "email")}
                        aria-label="Copy email address"
                        title="Copy email"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                    >
                        {copiedField === "email" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                </div>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="relative z-10 grid grid-cols-2 gap-2 mt-4">
                <a
                    href={`tel:${phoneNumber}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-indigo-50 active:scale-98 transition-all shadow-lg hover:shadow-indigo-500/20"
                >
                    <Phone size={13} />
                    Call Now
                </a>
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs uppercase tracking-wider hover:from-emerald-500 hover:to-teal-500 active:scale-98 transition-all shadow-lg hover:shadow-emerald-500/20"
                >
                    <MessageCircle size={14} />
                    WhatsApp
                    <ArrowUpRight size={13} />
                </a>
            </div>

            {/* Copy Feedback Toast */}
            {copiedField && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black tracking-wide shadow-lg animate-fade-in flex items-center gap-1">
                    <Check size={12} />
                    Copied {copiedField === "phone" ? "phone number" : "email"}!
                </div>
            )}
        </div>
    );
}

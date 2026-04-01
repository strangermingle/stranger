'use client';

import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { sendGAEvent } from "@/lib/gtag";

interface SponsoredAdCardProps {
    url: string;
    title: string;
    description: string;
}

export default function SponsoredAdCard({ url, title, description }: SponsoredAdCardProps) {
    return (
        <Link
            href={url}
            target="_blank"
            rel="opener referrer sponsored"
            className="group relative block w-full overflow-hidden rounded-[2rem] transition-all hover:scale-[1.005] bg-yellow-400 p-0.5"
            onClick={() => sendGAEvent({
                action: 'sponsored_ad_click',
                category: 'sponsored_content',
                label: `Banner: ${title}`,
                value: 1
            })}
        >
            {/* Animated Rotating Border Effect */}
            <div className="absolute inset-[-200%] aspect-square animate-border-rotate bg-conic from-yellow-100/50 via-white/80 to-yellow-100/50 opacity-40" />

            {/* Main Banner Container */}
            <div className="relative bg-yellow-400 rounded-[1.5rem] md:rounded-[1.9rem] h-full w-full py-6 md:py-10 px-5 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 overflow-hidden border border-white/30">
                {/* Shine Sweep Animation */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent w-[50%] h-full skew-x-[-25deg] -translate-x-full group-hover:animate-shine pointer-events-none opacity-40" />
                
                {/* Subtle Background Decor */}
                <div className="absolute -top-6 -right-6 animate-float-slow opacity-10 text-white transition-transform group-hover:scale-110">
                    <Sparkles className="w-16 md:w-24 h-16 md:h-24" />
                </div>
                <div className="absolute -bottom-8 -left-8 animate-float-slow opacity-10 text-white delay-1000">
                    <Sparkles className="w-12 md:w-16 h-12 md:h-16" />
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left relative z-10 w-full">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-4">
                        <span className="bg-black text-[9px] md:text-[11px] text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full font-black uppercase tracking-[0.15em] shadow-lg">
                            Sponsored
                        </span>
                        <div className="flex gap-1 animate-pulse">
                            <span className="w-1 h-1 bg-white rounded-full" />
                            <span className="w-1 h-1 bg-white rounded-full opacity-60" />
                        </div>
                    </div>
                    <h4 className="text-lg md:text-3xl font-black text-gray-900 group-hover:text-blue-700 transition-colors tracking-tight md:tracking-wide mb-1 md:mb-3 leading-tight">
                        {title}
                    </h4>
                    <p className="text-[11px] md:text-[13px] text-gray-800 font-bold leading-tight md:leading-relaxed max-w-2xl opacity-80 italic line-clamp-2 md:line-clamp-none">
                        &ldquo; {description} &rdquo;
                    </p>
                </div>

                {/* Call to Action */}
                <div className="shrink-0 relative z-10 w-full md:w-auto">
                    <div className="bg-gray-900 text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 md:gap-3 group-hover:bg-blue-600 md:group-hover:px-12 transition-all shadow-2xl shadow-black/10 hover:translate-y-[-2px] md:hover:translate-y-[-4px] active:translate-y-0">
                        Visit Site
                        <ArrowUpRight className="w-3 md:w-5 h-3 md:h-5 group-hover:rotate-45 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

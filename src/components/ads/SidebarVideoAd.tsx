import { Info } from "lucide-react";
import Image from "next/image";

export default function SidebarVideoAd() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <a href="https://www.fittrock.com" target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                        <Info size={10} /> Sponsored
                    </span>
                    <span className="text-[10px] font-bold text-amber-700">Fittrock</span>
                </div>

                <div className="w-full bg-stone-900 overflow-hidden">
                    <Image
                        src="/images/fittrock-vertical-image.png"
                        alt="Fittrock Smart Electric Standing Desk"
                        width={1080}
                        height={1920}
                        unoptimized
                        priority
                        className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                </div>

                <div className="p-4 text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Smart Electric Standing Desk</p>
                    <h4 className="font-black text-gray-900 leading-tight uppercase tracking-wide text-sm">
                        www.fittrock.com
                    </h4>
                </div>
            </a>
        </div>
    );
}

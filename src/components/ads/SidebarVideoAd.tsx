import { Info } from "lucide-react";
import Image from "next/image";

export default function SidebarVideoAd() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <a href="https://www.nearbypetcare.com" target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                        <Info size={10} /> Sponsored
                    </span>
                    <span className="text-[10px] font-bold text-blue-600">NearByPetCare</span>
                </div>

                <div className="relative aspect-[9/16] w-full bg-black">
                    <Image
                        src="https://res.cloudinary.com/strangermingle/image/upload/v1783641616/nearby-pet-care_baxrop.png"
                        alt="NearByPetCare Ad"
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay for better integration */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-4 text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Free Pet Tools, Guide and Hacks</p>
                    <h4 className="font-black text-gray-900 leading-tight uppercase tracking-wide text-sm">
                        www.nearbypetcare.com
                    </h4>
                </div>
            </a>
        </div>
    );
}

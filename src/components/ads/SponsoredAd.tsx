import Image from "next/image";
import { ExternalLink, Info } from "lucide-react";

interface AdProps {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    sponsorName: string;
}

const MOCK_ADS: AdProps[] = [
    {
        title: "Smart Electric Standing Desk",
        description: "Elevate your workspace with Fittrock. Where elegance meets functionality.",
        imageUrl: "/images/fittrock-landscape-image.png",
        link: "https://www.fittrock.com/",
        sponsorName: "Fittrock"
    }
];

export default function SponsoredAd() {
    const ad = MOCK_ADS[0]; // For now, just show the first one

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group text-center">
            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                        <Info size={10} /> Sponsored
                    </span>
                    <span className="text-[10px] font-bold text-amber-700">{ad.sponsorName}</span>
                </div>
                
                <div className="w-full bg-stone-900 overflow-hidden">
                    <Image 
                        src={ad.imageUrl} 
                        alt={ad.title} 
                        width={1600}
                        height={900}
                        unoptimized
                        priority
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                
                <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-2 leading-tight group-hover:text-amber-700 transition-colors">
                        {ad.title}
                    </h4>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                        {ad.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-[14px] font-black uppercase tracking-widest transition-all">
                        Explore Now <ExternalLink size={12} />
                    </div>
                </div>
            </a>
        </div>
    );
}

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
        title: "Free Pet Care Tools, Guide and Hacks",
        description: "Explore Our Pet Care Resources. Comprehensive guides and resources.",
        imageUrl: "https://res.cloudinary.com/strangermingle/image/upload/v1774305947/og-image_gbcusn.png",
        link: "https://www.nearbypetcare.com/",
        sponsorName: "NearByPetCare"
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
                    <span className="text-[10px] font-bold text-blue-600">{ad.sponsorName}</span>
                </div>
                
                <div className="relative aspect-[2/1] w-full">
                    <Image 
                        src={ad.imageUrl} 
                        alt={ad.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                
                <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {ad.title}
                    </h4>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                        {ad.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-yellow-300 hover:text-black text-white rounded-xl text-[14px] font-black uppercase tracking-widest group-hover:bg-blue-600 transition-all">
                        Explore Now <ExternalLink size={12} />
                    </div>
                </div>
            </a>
        </div>
    );
}

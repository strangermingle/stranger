import Link from 'next/link';
import { ArrowRight, MapPin, Users, Music, Compass } from 'lucide-react';
import { LIVE_CITIES } from '@/lib/cities';

export interface CityDirectoryLinksProps {
    citySlug?: string;
    cityName?: string;
    showAllCities?: boolean;
    className?: string;
}

const CITY_NAME_MAP: Record<string, string> = {
    bangalore: 'Bengaluru',
    ahmedabad: 'Ahmedabad',
    bhopal: 'Bhopal',
    chennai: 'Chennai',
    coimbatore: 'Coimbatore',
    delhi: 'Delhi',
    hyderabad: 'Hyderabad',
    indore: 'Indore',
    jaipur: 'Jaipur',
    kanpur: 'Kanpur',
    kolkata: 'Kolkata',
    lucknow: 'Lucknow',
    ludhiana: 'Ludhiana',
    mumbai: 'Mumbai',
    nagpur: 'Nagpur',
    patna: 'Patna',
    pune: 'Pune',
    surat: 'Surat',
    vadodara: 'Vadodara',
    visakhapatnam: 'Visakhapatnam',
};

export default function CityDirectoryLinks({
    citySlug,
    cityName,
    showAllCities = false,
    className = '',
}: CityDirectoryLinksProps) {
    const slug = citySlug?.toLowerCase() || '';
    const name = cityName || CITY_NAME_MAP[slug] || (slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : '');

    const currentCityLinks = slug ? [
        {
            title: `Meetups & Events in ${name}`,
            href: `/${slug}`,
            desc: `Weekend stranger meetups & social events in ${name}`,
            icon: MapPin,
        },
        {
            title: `Make New Friends in ${name}`,
            href: `/${slug}/make-new-friends`,
            desc: `Offline social groups & friend circles in ${name}`,
            icon: Users,
        },
        {
            title: `House Parties in ${name}`,
            href: `/${slug}/house-parties`,
            desc: `Platonic house parties & social mixers in ${name}`,
            icon: Music,
        },
        {
            title: `Best Hangout Places in ${name}`,
            href: `/best-hangout-places/${slug}`,
            desc: `Curated cafes, venues & community hubs in ${name}`,
            icon: Compass,
        },
    ] : [];

    return (
        <section className={`w-full py-8 ${className}`}>
            {slug && currentCityLinks.length > 0 && (
                <div className="mb-12">
                    <h3 className="text-center text-base sm:text-lg font-black text-slate-900 uppercase tracking-wider mb-6">
                        Explore {name} Directories
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {currentCityLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="p-5 rounded-2xl bg-white hover:bg-indigo-600 border border-slate-200 hover:border-indigo-600 text-slate-900 hover:text-white transition-all duration-300 group shadow-xs hover:shadow-lg flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Icon className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
                                            <span className="font-bold text-xs uppercase tracking-wider group-hover:text-white">
                                                {link.title}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 group-hover:text-indigo-100 font-normal leading-relaxed">
                                            {link.desc}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-indigo-600 group-hover:text-white pt-2 border-t border-slate-100 group-hover:border-indigo-500/30">
                                        <span>Explore Page</span>
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {(showAllCities || !slug) && (
                <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-bold uppercase tracking-widest rounded-full inline-block mb-3">
                            Nationwide Network
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">
                            Explore All City Directories
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400">
                            Find weekend events, house parties, and friend circles in 20 major Indian cities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {LIVE_CITIES.map((cSlug) => {
                            const cName = CITY_NAME_MAP[cSlug] || cSlug.charAt(0).toUpperCase() + cSlug.slice(1);
                            return (
                                <div key={cSlug} className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50 hover:border-indigo-500/50 transition-colors">
                                    <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-400 mb-2 border-b border-slate-700/60 pb-1.5 flex items-center justify-between">
                                        <Link href={`/${cSlug}`} className="hover:text-white transition-colors">
                                            {cName}
                                        </Link>
                                        <MapPin className="w-3 h-3 text-slate-500" />
                                    </h4>
                                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                                        <li>
                                            <Link href={`/${cSlug}/make-new-friends`} className="hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                                                <span className="text-indigo-400">•</span> Make New Friends
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`/${cSlug}/house-parties`} className="hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                                                <span className="text-indigo-400">•</span> House Parties
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={`/best-hangout-places/${cSlug}`} className="hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                                                <span className="text-indigo-400">•</span> Hangout Places
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}

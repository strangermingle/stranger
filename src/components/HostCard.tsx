'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube, MapPin, Users, Star } from 'lucide-react';
import { sendGAEvent } from '@/lib/gtag';

interface HostProfile {
    id: string;
    anonymous_alias?: string;
    display_name: string;
    tagline?: string;
    description?: string;
    profile_image?: string;
    city?: string;
    total_events_hosted: number;
    follower_count: number;
    rating_avg: number;
    instagram_handle?: string;
    facebook_url?: string;
    twitter_handle?: string;
    youtube_url?: string;
}

interface HostCardProps {
    host: HostProfile;
}

export default function HostCard({ host }: HostCardProps) {
    const profileLink = host.anonymous_alias 
        ? `/know-your-host/${host.anonymous_alias}` 
        : `/host/${host.id}`;

    return (
        <Link 
            href={profileLink}
            onClick={() => sendGAEvent({
                action: 'view_host_profile',
                category: 'host_card',
                label: `Card Click: ${host.display_name}`
            })}
            className="group block bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 cursor-pointer h-full relative"
        >
            <div className="flex flex-col h-full uppercase">
                <div className="flex items-start gap-4 mb-6">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-gray-50 shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-105">
                        {host.profile_image ? (
                            <Image
                                src={host.profile_image}
                                alt={host.display_name}
                                fill
                                sizes="(max-width: 768px) 100vw, 96px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center text-blue-200">
                                <Users size={40} />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors">
                            {host.display_name}
                        </h3>
                        {host.city && (
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
                                <MapPin size={14} className="text-gray-400" />
                                <span>{host.city}</span>
                            </div>
                        )}
                        {host.tagline && (
                            <p className="text-sm text-gray-600 italic line-clamp-2 leading-relaxed">
                                &quot;{host.tagline}&quot;
                            </p>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-6 py-4 border-y border-gray-50">
                    <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{host.total_events_hosted}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Events</div>
                    </div>
                    <div className="text-center border-x border-gray-50">
                        <div className="text-lg font-bold text-gray-900">{host.follower_count}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 flex items-center justify-center gap-1">
                            {host.rating_avg.toFixed(1)}
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rating</div>
                    </div>
                </div>

                {/* Social Links & View Profile */}
                <div className="flex items-center gap-3 mt-auto relative z-20">
                    <div className="flex gap-2">
                        {host.instagram_handle && (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    window.open(`https://instagram.com/${host.instagram_handle}`, '_blank');
                                }}
                                className="p-2 bg-pink-50 text-pink-500 rounded-xl hover:bg-pink-500 hover:text-white transition-all transform hover:-translate-y-1"
                            >
                                <Instagram size={18} />
                            </div>
                        )}
                        {host.facebook_url && (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    window.open(host.facebook_url, '_blank');
                                }}
                                className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1"
                            >
                                <Facebook size={18} />
                            </div>
                        )}
                        {host.twitter_handle && (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    window.open(`https://twitter.com/${host.twitter_handle}`, '_blank');
                                }}
                                className="p-2 bg-sky-50 text-sky-500 rounded-xl hover:bg-sky-500 hover:text-white transition-all transform hover:-translate-y-1"
                            >
                                <Twitter size={18} />
                            </div>
                        )}
                        {host.youtube_url && (
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    window.open(host.youtube_url, '_blank');
                                }}
                                className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1"
                            >
                                <Youtube size={18} />
                            </div>
                        )}
                    </div>
                    
                    <div className="ml-auto px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-sm uppercase tracking-wider">
                        View Profile
                    </div>
                </div>
            </div>
        </Link>
    );
}

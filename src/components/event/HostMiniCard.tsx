'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Shield, Users, ArrowRight } from 'lucide-react';

interface HostProfile {
    display_name?: string | null;
    profile_image?: string | null;
    tagline?: string | null;
}

interface Host {
    username: string;
    anonymous_alias?: string | null;
    host_profile?: HostProfile | null;
}

interface HostMiniCardProps {
    host: Host | null | undefined;
}

export default function HostMiniCard({ host }: HostMiniCardProps) {
    if (!host) return null;

    const hostData = host.host_profile;
    const displayName = hostData?.display_name || host.username || 'Stranger Mingle Host';
    const profileImage = hostData?.profile_image;
    const tagline = hostData?.tagline;
    // Prefer anonymous_alias for the link
    const slug = host.anonymous_alias || host.username;
    const hostLink = `/know-your-host/${slug}`;

    return (
        <Link href={hostLink} className="group block">
            <div className="flex items-center gap-3 p-6 rounded-2xl border border-gray-700 bg-white hover:border-green-400 hover:shadow-md hover:shadow-gray-50/50 transition-all duration-300">
                {/* Profile Image with Ring Status */}
                <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-blue-300 shadow-sm bg-gray-100 relative">
                        {profileImage ? (
                            <Image
                                src={profileImage}
                                alt={displayName}
                                fill
                                sizes="64px"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <Users size={20} />
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                        <Shield size={20} fill="currentColor" />
                    </div>
                </div>

                {/* Host Info */}
                <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="text-md font-black text-blue-500 truncate tracking-wide uppercase group-hover:text-blue-600 transition-colors">
                            {displayName}
                        </h4>
                    </div>
                    {tagline ? (
                        <p className="text-[10px] text-gray-500 font-medium truncate italic leading-none">
                            {tagline}
                        </p>
                    ) : (
                        <p className="text-[10px] text-gray-600 font-medium truncate uppercase tracking-widest leading-none">
                            Verified Organizer
                        </p>
                    )}
                </div>

                {/* Action Indicator */}
                <div className="shrink-0 w-13 h-13 rounded-full bg-green-500 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mr-1">
                    <ArrowRight size={14} />
                </div>
            </div>
        </Link>
    );
}

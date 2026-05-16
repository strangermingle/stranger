import { createServerClient } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { Instagram, Facebook, Twitter, Youtube, MapPin, Users, Calendar, Star, Shield, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { getEventsByHostDisplayName, Event } from '@/lib/events';
export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ slug: string }>;
};

async function getHostProfileByAlias(alias: string) {
    const supabase = createServerClient();
    const { data: host, error } = await supabase
        .from('host_profiles')
        .select(`
            *,
            users!host_profiles_user_id_fkey!inner (
                anonymous_alias
            )
        `)
        .eq('users.anonymous_alias', alias)
        .single();
    
    if (error || !host) return null;
    return {
        ...host,
        anonymous_alias: host.users?.anonymous_alias
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const host = await getHostProfileByAlias(slug);
    
    if (!host) {
        return { title: 'Host Not Found | Stranger Mingle' };
    }

    return {
        title: `${host.display_name} | Verified Host | Stranger Mingle`,
        description: host.tagline || host.description || `Meet ${host.display_name}, a verified host at Stranger Mingle organizing social events and meetups.`,
        alternates: {
            canonical: `/know-your-host/${slug}`,
        },
        openGraph: {
            title: `${host.display_name} | Verified Host Profile`,
            description: host.tagline || host.description,
            url: `/know-your-host/${slug}`,
            images: host.profile_image ? [host.profile_image] : [],
        }
    };
}

export default async function HostProfilePage({ params }: Props) {
    const { slug } = await params;
    const host = await getHostProfileByAlias(slug);
    
    if (!host) {
        notFound();
    }

    const events = await getEventsByHostDisplayName(host.display_name);
    const now = new Date().toISOString();
    
    const upcomingEvents = events.filter((e: Event) => e.start_datetime >= now);
    const pastEvents = events.filter((e: Event) => e.start_datetime < now).sort((a: Event, b: Event) => b.start_datetime.localeCompare(a.start_datetime));

    return (
        <div className="min-h-screen bg-white">
            <main className="pb-20">
                {/* Banner Section */}
                <div className="w-full bg-gray-100 relative overflow-hidden flex justify-center pt-20 border-b border-gray-100">
                    <div className="relative w-full max-w-[1200px] aspect-[2/1] bg-white shadow-sm overflow-hidden md:rounded-b-3xl">
                        {host.banner_url ? (
                            <Image
                                src={host.banner_url}
                                alt={`${host.display_name} Banner`}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 flex items-center justify-center">
                                <Users size={120} className="text-blue-200/50" />
                            </div>
                        )}
                        
                        {/* Gradient Overlay for better readability if needed */}
                        <div className="absolute inset-0 bg-linear-to-t from-white/10 to-transparent"></div>
                    </div>
                </div>

                {/* Profile Header Section */}
                <div className="relative -mt-16 md:-mt-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
                            {/* Profile Image */}
                            <div className="relative group shrink-0">
                                <div className="absolute -inset-1.5 bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                                    {host.profile_image ? (
                                        <Image
                                            src={host.profile_image}
                                            alt={host.display_name}
                                            fill
                                            sizes="(max-width: 768px) 128px, 192px"
                                            className="object-cover"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center text-blue-200">
                                            <Users size={60} />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg border-2 border-white flex items-center justify-center" title="Verified Host">
                                    <Shield size={18} fill="currentColor" />
                                </div>
                            </div>

                            {/* Host Info */}
                            <div className="flex-1 text-center md:text-left md:pb-4">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                                        {host.display_name}
                                    </h1>
                                    <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-100 mx-auto md:mx-0 whitespace-nowrap">
                                        Verified Host
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-center md:justify-start gap-4 text-gray-500">
                                    {host.city && (
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={16} className="text-blue-500" />
                                            <span className="font-medium">{host.city}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold text-gray-900">{(host.rating_avg || 5.0).toFixed(1)}</span>
                                        <span className="text-xs text-gray-400">({host.rating_count || 0})</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Actions */}
                            <div className="flex gap-3 md:pb-4">
                                {host.instagram_handle && (
                                    <Link href={`https://instagram.com/${host.instagram_handle}`} target="_blank" className="p-3 bg-white text-pink-500 rounded-2xl border border-gray-100 shadow-sm hover:bg-pink-500 hover:text-white transition-all transform hover:-translate-y-1">
                                        <Instagram size={20} />
                                    </Link>
                                )}
                                <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-md hover:shadow-xl active:scale-95">
                                    Follow Host
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar: About & Stats */}
                        <aside className="lg:w-1/3 space-y-12">
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">About</h2>
                                    <div className="h-px flex-1 bg-gray-100"></div>
                                </div>
                                {host.tagline && (
                                    <p className="text-lg text-blue-600 font-bold mb-4 italic leading-relaxed">
                                        &ldquo;{host.tagline}&rdquo;
                                    </p>
                                )}
                                <div className="prose prose-lg text-gray-600 leading-relaxed font-regular whitespace-pre-wrap">
                                    {host.description || `Welcome to ${host.display_name}'s profile. This verified host is dedicated to creating safe and meaningful social experiences for the Stranger Mingle community.`}
                                </div>
                            </section>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                                    <div className="text-3xl font-black text-gray-900 mb-1">{host.total_events_hosted || 0}</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Events Hosted</div>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                                    <div className="text-3xl font-black text-gray-900 mb-1">{host.follower_count || 0}</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Followers</div>
                                </div>
                            </div>

                            <section className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
                                <h3 className="font-black text-gray-900 uppercase tracking-tight mb-4 text-sm tracking-widest opacity-50">Host Quality Badges</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-sm font-bold">✓</span>
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium">Verified Stranger Mingle Host</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-sm font-bold">✓</span>
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium">Committed to Safe Spaces</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="text-sm font-bold">✓</span>
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium">Top Rated Organizer</p>
                                    </li>
                                </ul>
                            </section>

                            {/* Social Buttons */}
                            <div className="flex flex-wrap gap-2">
                                {host.facebook_url && (
                                    <Link href={host.facebook_url} target="_blank" className="p-4 bg-gray-50 text-blue-600 rounded-2xl border border-gray-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                        <Facebook size={20} />
                                    </Link>
                                )}
                                {host.twitter_handle && (
                                    <Link href={`https://twitter.com/${host.twitter_handle}`} target="_blank" className="p-4 bg-gray-50 text-sky-500 rounded-2xl border border-gray-100 hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                                        <Twitter size={20} />
                                    </Link>
                                )}
                                {host.youtube_url && (
                                    <Link href={host.youtube_url} target="_blank" className="p-4 bg-gray-50 text-red-600 rounded-2xl border border-gray-100 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                        <Youtube size={20} />
                                    </Link>
                                )}
                            </div>
                        </aside>

                        {/* Main Content: Events */}
                        <div className="lg:w-2/3 space-y-20">
                            {/* Upcoming Events */}
                            <section>
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
                                        Upcoming <span className="text-blue-600">Events</span>
                                    </h2>
                                    <span className="text-sm font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                                        {upcomingEvents.length} Active
                                    </span>
                                </div>

                                {upcomingEvents.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {upcomingEvents.map((event: Event) => (
                                            <EventCard key={event.id} event={event} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                                        <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                                        <p className="text-gray-500 font-medium italic">No upcoming events planned at the moment.</p>
                                        <Link href="/events" className="mt-4 inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
                                            Explore all events <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                )}
                            </section>

                            {/* Past Events */}
                            {pastEvents.length > 0 && (
                                <section>
                                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
                                            Past <span className="text-gray-400">Experiences</span>
                                        </h2>
                                        <span className="text-sm font-black text-gray-500 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
                                            {pastEvents.length} Recent
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 opacity-75 grayscale hover:grayscale-0 transition-all duration-700">
                                        {pastEvents.slice(0, 4).map((event: Event) => (
                                            <EventCard key={event.id} event={event} />
                                        ))}
                                    </div>
                                    
                                    {pastEvents.length > 4 && (
                                        <div className="mt-8 text-center">
                                            <p className="text-gray-400 text-sm font-medium mb-4 italic tracking-wide">Plus {pastEvents.length - 4} more successful meetups</p>
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* Community Section */}
                            <section className="bg-linear-to-br from-gray-900 to-black rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                                <div className="relative z-10 max-w-xl">
                                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Join {host.display_name}&apos;s inner circle.</h3>
                                    <p className="text-lg text-gray-400 leading-relaxed mb-8 font-regular">
                                        Stay updated with latest events and exclusive meetup invites. Our community members get early access to limited-capacity events.
                                    </p>
                                    <Link href="/host-application" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95">
                                        Join Community
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                                <div className="absolute right-[-40px] bottom-[-40px] opacity-10 transform scale-150 rotate-12">
                                    <Users size={240} fill="currentColor" />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

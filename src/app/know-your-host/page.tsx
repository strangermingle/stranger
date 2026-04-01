import { createServerClient } from '@/lib/supabaseClient';
import HostCard from '@/components/HostCard';
import UpcomingExperiences from '@/components/event/UpcomingExperiences';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Meet Our Hosts | Stranger Mingle',
    description: 'Meet the passionate individuals and organizations who curate unique experiences for the Stranger Mingle community.',
};

export const revalidate = 3600; // Revalidate every hour

async function getHosts() {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from('host_profiles')
        .select(`
            *,
            users!host_profiles_user_id_fkey (
                anonymous_alias
            )
        `)
        .eq('is_approved', true)
        .order('total_events_hosted', { ascending: false });

    if (error) {
        console.error('Error fetching hosts:', error);
        return [];
    }

    // Flatten the nested anonymous_alias
    return data.map(host => ({
        ...host,
        anonymous_alias: host.users?.anonymous_alias
    }));
}

export default async function KnowYourHostPage() {
    const hosts = await getHosts();

    return (
        <div className="min-h-screen bg-white">
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
                        Know Your <span className="text-blue-600">Hosts</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed uppercase font-medium tracking-wide">
                        Meet the passionate individuals and organizations who curate unique experiences 
                        for the Stranger Mingle community.
                    </p>
                </div>

                {hosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hosts.map((host) => (
                            <HostCard key={host.id} host={host} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium italic">No host profiles found.</p>
                    </div>
                )}

                {/* Host CTA Section */}
                <div className="mt-20 p-8 md:p-12 rounded-[2rem] bg-linear-to-br from-blue-600 to-indigo-700 text-white text-center shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 text-sm font-bold uppercase tracking-widest">
                            <Sparkles size={16} />
                            <span>Join the Community</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">
                            Have an idea for an experience?
                        </h2>
                        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto uppercase font-medium tracking-wide">
                            Become a host on Stranger Mingle and start creating unique social 
                            gatherings that people will love.
                        </p>
                        <Link 
                            href="/host-an-event"
                            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl group/btn"
                        >
                            Become a Host <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Upcoming Experiences Section */}
                <div className="mt-20">
                    <UpcomingExperiences city="Bangalore" currentEventId="" />
                </div>
            </main>
        </div>
    );
}


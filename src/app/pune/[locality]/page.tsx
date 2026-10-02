import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import SponsoredAds from "@/components/SponsoredAds";
import FacebookGroupCTA from "@/components/FacebookGroupCTA";
import SocialMediaQRSection from "@/components/SocialMediaQRSection";
import { puneLocalities } from "@/data/puneLocalities";
import { MapPin, Users, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(puneLocalities).map((slug) => ({
    locality: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locality: string }> }): Promise<Metadata> {
  const { locality } = await params;
  const data = puneLocalities[locality];
  if (!data) return {};

  const title = `Weekend Events, Parties & Meetups in ${data.name}, Pune | Stranger Mingle`;
  const description = data.description;

  return {
    title,
    description,
    keywords: data.keywords,
    alternates: {
      canonical: `/pune/${locality}`,
    },
    openGraph: {
      title,
      description,
      url: `/pune/${locality}`,
      siteName: 'Stranger Mingle',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://res.cloudinary.com/dt3rse8bg/image/upload/v1769134847/pune-hero_sssw1x.jpg', // Placeholder
          width: 1200,
          height: 630,
          alt: `Stranger Meetups in ${data.name}, Pune`,
        },
      ],
    },
  };
}

export default async function LocalityPage({ params }: { params: Promise<{ locality: string }> }) {
  const { locality } = await params;
  const data = puneLocalities[locality];
  if (!data) {
    notFound();
  }

  const cityEvents = await getEventsByCity("Pune");

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dt3rse8bg/image/upload/v1769134847/pune-hero_sssw1x.jpg" // Placeholder Cloudinary URL
            title={`Events in ${data.name} Pune`}
            alt={`Stranger Meetup event in ${data.name} Pune`}
            fill
            className="object-cover opacity-50"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          <span className="px-4 py-2 rounded-full bg-blue-600 backdrop-blur-md text-sm font-medium text-white inline-block mb-6 uppercase tracking-wider shadow-lg">
            {data.vibe}
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Make New Friends & Find Events in <br />
            <span className="text-yellow-400">
              {data.name}, Pune
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#events" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:scale-105">
              Explore Upcoming Events
            </a>
            <Link href="/host-application" className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold text-lg transition-all shadow-lg hover:scale-105">
              Become a Host in {data.shortName}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area */}
          <main className="flex-1 w-full">
            {/* SEO & AEO Content Block */}
            <article className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Join Stranger Mingle in {data.name}?
              </h2>
              <div className="prose prose-lg prose-blue max-w-none text-gray-700">
                <p>
                  Whether you are a newcomer to Pune, an IT professional seeking a break from the routine, or a local resident wanting to expand your social circle, <strong>{data.name}</strong> is the perfect place to start. Known for {data.vibe.toLowerCase()}, {data.shortName} hosts some of our most engaging weekend meetups.
                </p>
                <h3 className="text-2xl font-semibold mt-8 mb-4">Popular Meetup Spots in {data.name}</h3>
                <p>
                  We collaborate with the best local venues to ensure our events are safe, comfortable, and highly social. In {data.name}, you might find us hosting events near:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-8">
                  {data.venues.map((venue: string) => (
                    <li key={venue} className="font-medium">{venue}</li>
                  ))}
                </ul>

                <div className="grid sm:grid-cols-2 gap-6 mt-8">
                  <div className="p-6 bg-blue-50 rounded-2xl">
                    <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
                    <h4 className="font-bold text-xl mb-2">100% Verified</h4>
                    <p className="text-sm">Every member attending our {data.name} events is strictly verified via LinkedIn or mobile for your safety.</p>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-2xl">
                    <Users className="w-8 h-8 text-purple-600 mb-4" />
                    <h4 className="font-bold text-xl mb-2">Curated Groups</h4>
                    <p className="text-sm">We ensure balanced group dynamics so making friends in {data.shortName} feels natural, not forced.</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Events Section */}
            <section id="events" className="mb-12">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Upcoming Events in Pune
                  </h2>
                  <p className="text-gray-600">
                    Join our latest curated meetups. Find your tribe in and around {data.name}.
                  </p>
                </div>
              </div>

              {cityEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {cityEvents.slice(0, 6).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center shadow-sm">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No upcoming events right now</h3>
                  <p className="text-gray-600 mb-6">We're planning something exciting near {data.name}. Check back soon!</p>
                  <Link href="/pune" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
                    View All Pune Events <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {cityEvents.length > 0 && (
                <div className="mt-10 text-center">
                  <Link href="/events" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl">
                    Browse All Pune Events <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </section>

            {/* AEO / FAQ Section */}
            {data.faqs && data.faqs.length > 0 && (
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {data.faqs.map((faq: { q: string, a: string }, i: number) => (
                    <div key={i}>
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Explore Other Areas (Interlinking) */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Explore Events in Other Pune Areas
              </h2>
              <div className="flex flex-wrap gap-3">
                {Object.keys(puneLocalities)
                  .filter((slug) => slug !== locality)
                  .map((slug) => (
                    <Link
                      key={slug}
                      href={`/pune/${slug}`}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-full text-sm font-medium transition-colors"
                    >
                      {puneLocalities[slug].name}
                    </Link>
                  ))}
              </div>
            </section>

          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 space-y-8">
             <div className="sticky top-24">
                <SponsoredAds />
             </div>
          </aside>

        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 mb-20 space-y-12">
        <FacebookGroupCTA />
        <SocialMediaQRSection />
      </div>

      {/* Structured Data for LocalBusiness & FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "name": `Events & Meetups in ${data.name}, Pune`,
                "description": data.description,
                "url": `https://www.strangermingle.com/pune/${locality}`
              },
              {
                "@type": "Place",
                "name": data.name,
                "containedInPlace": {
                  "@type": "City",
                  "name": "Pune"
                }
              },
              data.faqs && data.faqs.length > 0 ? {
                "@type": "FAQPage",
                "mainEntity": data.faqs.map((faq: any) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              } : null
            ].filter(Boolean)
          })
        }}
      />
    </div>
  );
}

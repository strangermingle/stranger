import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllLiveEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";
import RecentPosts from "@/components/RecentPosts";
import SocialLinks from "@/components/SocialLinks";
import HeroButtons from "@/components/HeroButtons";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Weekend Events & Stranger Meetups in Pune, Hyderabad, Bengaluru",
  description: "Join weekend events, stranger meetups and friendship groups in Pune, Hyderabad & Bengaluru. Small groups. Safe.",
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const events = await getAllLiveEvents();

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-blue-200">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center min-h-screen">

        {/* Hero Section */}
        <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-24 flex flex-col items-center text-center min-h-[600px] sm:min-h-[700px] overflow-hidden mb-20">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://res.cloudinary.com/dt3rse8bg/image/upload/v1770810935/ChatGPT_Image_Feb_8_2026_at_11_10_44_PM_smbepi.png"
              alt="Friends having fun at a Stranger Mingle event"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-4xl mx-auto">
            <span className="px-4 py-2 rounded-full bg-blue-50/90 backdrop-blur-sm border border-blue-100 text-sm font-medium text-blue-600 inline-block mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              Zero harassment policy, Safe space for everyone!
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 drop-shadow-lg">
              Weekend <br /> Events and MeetUps <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-300 to-pink-300">
                For Making New Friends
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 drop-shadow-md">
              Stranger Mingle is built to help people make real connections locally, not online. We create safe spaces where strangers meet and friendships begin through organized weekend events across Indian cities.
            </p>
            <HeroButtons />

            {/* Social Media Links */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
              <p className="text-white/80 text-sm font-medium mb-4 uppercase tracking-widest">Follow Us</p>
              <SocialLinks />
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section id="events" className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Upcoming Meetups</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Join a group this weekend. First-timers welcome; come alone (most people do)!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/events" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
              View all events <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </section>

        {/* Why Stranger Mingle Exists? */}
        <section className="w-full bg-gray-50 border-y border-gray-200 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
              Why Stranger Mingle Exists
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
              We&apos;re solving a problem millions of Indians face: feeling lonely in a crowded city. <br /> Making friends after college shouldn&apos;t be this hard.<br />
            </p>

            <div className="grid md:grid-cols-3 gap-8 sm:gap-12 mb-16">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  🏙️
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  You&apos;re Not Alone in Feeling Alone
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  Moved to a new city? Lost touch with college friends? Working from home with no social life? You&apos;re surrounded by millions, yet eating dinner alone. We get it—because we&apos;ve been there too.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  🤝
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Real Connections, Not Online Chats
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  Friendships happen when you&apos;re doing something together, not swiping through profiles. We create real spaces—chai circles, treks, game nights—where genuine bonds form naturally.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  🛡️
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Safe Spaces for Everyone
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  We don&apos;t judge by caste, class, colour, or background. Zero tolerance for harassment. Verified members only. Small groups where everyone matters. This is where India makes friends the right way.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-8 sm:p-12 border border-blue-100">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                How It Works
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-sm">
                    1
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Pick Your Event
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Browse weekend events on our portal. Choose what excites you. Events are priced fairly to keep things sustainable.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white text-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-sm">
                    2
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Just Show Up
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Come alone—80% of people do. We handle the awkward part with structured ice-breakers. Small groups (25-30 people) mean real conversations.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white text-pink-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-sm">
                    3
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    Build Real Friendships
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Exchange numbers. Make plans. Show up to the next event. Friendships take time, but they start with showing up once.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial / Social Proof */}
        <section className="w-full py-20 text-center" style={{ backgroundColor: '#ffe2a9ff' }}>
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-semibold text-gray-800 mb-10 tracking-wide uppercase">Trusted by Indians</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="flex flex-col">
                <div className="relative w-full aspect-square md:aspect-video">
                  <Image
                    src="/images/suraj-bhansingh.png"
                    alt="Suraj Bhan Singh testimonial"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                  />
                </div>
                <div className="bg-pink-100 p-8 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed flex-grow">&quot;I joined this group with my friend and initially we were just 2 of us. But slowly we started meeting new people and now we have a group of 10-15 people who regularly hang out together. It's a great way to meet new people and make friends.&quot;</p>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-gray-900">Suraj Bhan Singh</div>
                      <div className="text-xs text-gray-500">Software Engineer, Wakad</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="relative w-full aspect-square md:aspect-video">
                  <Image
                    src="/images/anuradha.png"
                    alt="Anuradha testimonial"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                  />
                </div>
                <div className="bg-blue-200 p-8 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed flex-grow">&quot;I met Trishul through my another friend and now he is my good friend. I wanted to meet people naturally. The board game night was so much fun, and I didn't have to worry about forcing conversation.&quot;</p>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-gray-900">Anuradha</div>
                      <div className="text-xs text-gray-500">IT Engineer, Hinjewadi</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="relative w-full aspect-square md:aspect-video">
                  <Image
                    src="/images/varsha.png"
                    alt="Varsha testimonial"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                  />
                </div>
                <div className="bg-green-200 p-8 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed flex-grow">&quot;I&apos;m working in Bengaluru since last 5 years and i haven&apos;t met many people. This group helped me to connect with new people and make friends.&quot;</p>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold text-gray-900">Varsha Sundaram</div>
                      <div className="text-xs text-gray-500">Bengaluru, India</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety / Values */}
        <section className="w-full max-w-7xl mx-auto px-4 py-12 mb-20">
          <div className="bg-linear-to-r from-blue-900/10 to-purple-900/10 border border-white/10 rounded-3xl p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">A Community Built on Trust</h2>
              <p className="text-gray-600 text-lg">
                We verify every member to keep our events safe and comfortable. We have a zero-tolerance policy for harassment. Our goal is to create the safest spaces in India to meet strangers.
              </p>
            </div>
            <a href="/safety-guidelines" className="whitespace-nowrap px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 rounded-xl font-bold text-lg transition-colors">
              Read Our Guidelines
            </a>
          </div>
        </section>

        {/* WhatsApp Channel Section */}
        <section className="w-full bg-linear-to-b from-blue-50 to-white py-20 border-y border-blue-100">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Join Our Community
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Get Updates <br className="hidden sm:block" /> on WhatsApp
              </h2>
              <p className="text-xl text-gray-600 max-w-xl mb-8 leading-relaxed">
                Be the first to know about new meetups, weekend events, and exclusive community news. Join our official WhatsApp channel.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://whatsapp.com/channel/0029Vb6lxh0L7UVX9VPXiM3U"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white hover:bg-green-700 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-green-200"
                >
                  Join Channel
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative group p-4 bg-white rounded-3xl shadow-2xl border border-gray-100 transition-transform hover:rotate-2">
                <a
                  href="https://whatsapp.com/channel/0029Vb6lxh0L7UVX9VPXiM3U"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                >
                  <div className="absolute -inset-1 bg-linear-to-r from-green-400 to-blue-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white rounded-2xl overflow-hidden">
                    <Image
                      src="/qr-code-whatsapp.png"
                      alt="WhatsApp Channel QR Code"
                      width={300}
                      height={300}
                      className="w-full h-auto p-2"
                      unoptimized
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm font-bold text-gray-500 bg-gray-50 py-2 rounded-lg group-hover:text-green-600 transition-colors">
                      Scan or click to follow
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* FAQs Section */}
        <section className="w-full max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Quick answers to help you get started with building real friendships.</p>
          </div>
          <div className="space-y-4">
            <details className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-blue-300">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What is Stranger Mingle and how does it work?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Stranger Mingle is a community platform for making real friends through organized weekend events in Indian cities. Browse events, register, and just show up – we handle the introductions and ice-breakers to ensure you have a great time and make genuine connections.
              </p>
            </details>
            <details className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-blue-300">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Is Stranger Mingle safe for women?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Absolutely. We have a zero-tolerance policy for harassment and maintain strict safety protocols. All participants are verified, events are held in public locations, and our organizers are trained to ensure a safe and comfortable environment for everyone.
              </p>
            </details>
            <details className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-blue-300">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How much do events cost?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Most events range from ₹49 to ₹1999. These fees go directly toward supporting the platform, booking venues, and organizing activities. We keep it sustainable and community-focused rather than profit-driven.
              </p>
            </details>
            <details className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-blue-300">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Who attends these events?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Our members are mostly young professionals, students, and people new to the city looking for platonic friendships. Whether you&apos;re an introvert or extrovert, you&apos;ll find a welcoming space. About 80% of people show up alone!
              </p>
            </details>
            <details className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-blue-300">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Which cities are you present in?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                We are currently active in Pune and expanding rapidly to Mumbai, Hyderabad, Bengaluru, and Delhi. Keep an eye on our events page for meetups in your city!
              </p>
            </details>
          </div>
          <div className="mt-12 text-center">
            <Link href="/faqs" className="text-blue-600 font-bold hover:underline">
              View all FAQs →
            </Link>
          </div>
        </section>

      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Stranger Mingle",
              "url": "https://www.strangermingle.com",
              "description": "Make new friends through Stranger Meetups and local events.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.strangermingle.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.strangermingle.com"
              }]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is Stranger Mingle and how does it work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Stranger Mingle is a community platform for making real friends through organized weekend events in Indian cities. Browse events, register, and just show up – we handle the introductions and ice-breakers to ensure you have a great time and make genuine connections."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Stranger Mingle safe for women?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We have a zero-tolerance policy for harassment and maintain strict safety protocols. All participants are verified, events are held in public locations, and our organizers are trained to ensure a safe and comfortable environment for everyone."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much do events cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most events range from ₹149 to ₹599. These fees go directly toward supporting the platform, booking venues, and organizing activities. We keep it sustainable and community-focused rather than profit-driven. It can vary based on the event and location."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who attends these events?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our members are mostly young professionals, students, and people new to the city looking for platonic friendships. Whether you're an introvert or extrovert, you'll find a welcoming space. About 80% of people show up alone!"
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which cities are you present in?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We are currently active in Pune and expanding rapidly to Mumbai, Hyderabad, Bengaluru, and Delhi. Keep an eye on our events page for meetups in your city!"
                  }
                }
              ]
            }
          ]),
        }}
      />
    </div>
  );
}
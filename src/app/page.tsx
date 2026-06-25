import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllLiveEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";
import UpcomingExperiences from "@/components/event/UpcomingExperiences";
import SocialLinks from "@/components/SocialLinks";
import HeroButtons from "@/components/HeroButtons";
import FeaturedEvents from "@/components/event/FeaturedEvents";
import TrendingEvents from "@/components/event/TrendingEvents";
import WeekendEvents from "@/components/event/WeekendEvents";
import FacebookGroupCTA from "@/components/FacebookGroupCTA";
import SocialMediaQRSection from "@/components/SocialMediaQRSection";
import { ArrowRight, Coffee, Mountain, Palette, HandHeart, Monitor, MapPin, ShieldCheck, MessageSquare } from "lucide-react";

const CITIES = [
  { name: "Pune", slug: "pune" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Delhi", slug: "delhi" },
  { name: "Kolkata", slug: "kolkata" },
  { name: "Chennai", slug: "chennai" },
  { name: "Ahmedabad", slug: "ahmedabad" },
  { name: "Jaipur", slug: "jaipur" },
  { name: "Lucknow", slug: "lucknow" },
  { name: "Indore", slug: "indore" },
  { name: "Bhopal", slug: "bhopal" },
  { name: "Nagpur", slug: "nagpur" },
  { name: "Surat", slug: "surat" },
  { name: "Vadodara", slug: "vadodara" },
  { name: "Visakhapatnam", slug: "visakhapatnam" },
  { name: "Patna", slug: "patna" },
  { name: "Coimbatore", slug: "coimbatore" },
  { name: "Ludhiana", slug: "ludhiana" },
  { name: "Kanpur", slug: "kanpur" },
];


export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: {
        absolute: "Stranger Mingle - Weekend Events & Meetups"
    },
    description: "Join weekend events, stranger meetups and friendship groups in Pune, Hyderabad & Bengaluru. Small groups. Safe.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Stranger Mingle - Weekend Events & Meetups",
        description: "Join weekend events, stranger meetups and friendship groups in Pune, Hyderabad & Bengaluru. Small groups. Safe.",
        url: "/",
        siteName: 'Stranger Mingle',
        locale: 'en_IN',
        type: 'website',
        images: [
            {
                url: '/images/og-images/og-image-default.webp',
                width: 1200,
                height: 630,
                alt: 'Stranger Mingle - Weekend Social Meetups & Events',
            },
        ],
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
        <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-24 flex flex-col items-center text-center min-h-[600px] sm:min-h-[700px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://res.cloudinary.com/dt3rse8bg/image/upload/v1770810935/ChatGPT_Image_Feb_8_2026_at_11_10_44_PM_smbepi.png"
              alt="Friends having fun at a Stranger Mingle event"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
            <span className="px-4 py-2 rounded-full bg-blue-50/90 backdrop-blur-sm border border-blue-100 text-sm font-medium text-blue-600 inline-block mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              Zero harassment policy, Safe space for everyone!
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 drop-shadow-lg">
              Weekend <br /> Events and MeetUps <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg">
                For Making New Friends
              </span>
            </h1>
            <p id="hero-description" className="text-xl text-white/90 px-2 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 drop-shadow-md">
              Stranger Mingle is built to help people make real connections locally, not only online. We create safe spaces where strangers meet and friendships begin through organized weekend events across Indian cities.
            </p>
            <HeroButtons />

            {/* Social Media Links with White Stripe */}
            <div className="max-w-xs mx-auto mt-10">
              <p className="text-white/80 text-[12px] font-black mb-2 uppercase tracking-[0.2em]">Let&apos;s Connect</p>
              <div className="flex justify-center bg-white p-3 rounded-full shadow-xl shadow-black/20">
                <SocialLinks />
              </div>
            </div>
          </div>
        </section>

        {/* How We Mingle Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-4 text-center relative z-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase mb-4">Weekend Events & Meetups</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-2">
                <Coffee className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-orange-600 mb-1">Social Meetups</h3>
              <p className="text-sm text-gray-600">Weekend events of board games, stranger meetups, hangouts for casual conversations.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <Mountain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-green-600 mb-1">Adventures</h3>
              <p className="text-sm text-gray-600">Treks & cycling trails to bond over shared experiences.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-purple-600 mb-1">Culture</h3>
              <p className="text-sm text-gray-600">Art workshops, heritage walks & party events to explore your city.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <HandHeart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-blue-600 mb-1">Membership</h3>
              <p className="text-sm text-gray-600">Get exclusive access to anonymous chat with verified and real people.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1 col-span-2 sm:col-span-1 lg:col-span-1">
              <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-2">
                <Monitor className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-teal-600 mb-1">Online Events</h3>
              <p className="text-sm text-gray-600">Virtual meetups, online games, and sessions — mingle from anywhere.</p>
            </div>
          </div>
        </section>


        {/* Featured Events Section */}
        <div className="w-full relative z-20">
          <FeaturedEvents limit={999} />
        </div>

        {/* Upcoming Events Section */}
        <section id="events" className="w-full max-w-7xl mx-auto px-3 py-1 text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Upcoming Events & Meetups</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Join a group this weekend. First-timers welcome; come alone <br />(most people do)!</p>
          </div>

          <div className="grid grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 gap-4 md:gap-10 mb-12">
            {events.slice(0, 6).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/events" className="inline-flex items-center gap-2 text-blue-600 hover:scale-105 font-bold transition-all bg-blue-50 px-8 py-3 rounded-xl border border-blue-100">
              View all upcoming events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Anonymous Chat Promotion Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-4 mb-4">
          <div className="relative overflow-hidden bg-indigo-900 rounded-[2rem] p-8 md:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-xl blur-[80px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-xl blur-[80px] -ml-32 -mb-32" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-[8px] font-bold uppercase tracking-widest mb-2">
                <ShieldCheck className="w-2 h-2" />
                Verified Members Only
              </div>
              <h2 className="text-[12px] md:text-[24px] font-bold text-white mb-1 leading-tight tracking-wider italic">
                Anonymous Chat <br />
                <span className="text-yellow-300 italic">with verified strangers</span>
              </h2>
              <p className="text-indigo-100/80 text-[8px] md:text-[12px] font-medium leading-relaxed mb-2">
                Mingle without the pressure. Access our exclusive anonymous chat room once you&apos;re a verified member. No real names, no profiles—just pure connection.
              </p>
              <Link
                href="/members"
                className="inline-flex items-center gap-3 px-2 py-2 border border-white bg-yellow-300 hover:bg-yellow-400 text-black rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-indigo-500/20 active:scale-95 group"
              >
                Join the Exclusive Club
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative z-10 w-full max-w-[300px] md:max-w-none md:w-1/3 aspect-square flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="relative bg-indigo-800/50 backdrop-blur-2xl border border-indigo-400/30 rounded-[2.5rem] p-8 shadow-2xl transform hover:rotate-3 transition-transform duration-500">
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-start">
                      <div className="bg-indigo-700/50 rounded-2xl p-4 max-w-[80%] border border-indigo-500/20">
                        <p className="text-[8px] text-yellow-400 font-regular mb-1 tracking-wide">Stranger6721</p>
                        <p className="text-[10px] text-white">Hey! Any plans for tonight? </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-indigo-600 rounded-2xl p-4 max-w-[80%] shadow-lg border border-indigo-400/30">
                        <p className="text-[8px] text-indigo-200 font-regular mb-1 tracking-wide">You</p>
                        <p className="text-[10px] text-white font-medium">Looking for people to join me for the board game 🎲</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-indigo-700/50 rounded-2xl p-4 max-w-[80%] border border-indigo-500/20">
                        <p className="text-[8px] text-yellow-400 font-regular mb-1 tracking-wide">Stranger6721</p>
                        <p className="text-[10px] text-white">Count me in! I&apos;ve been wanting to try Catan. 🙋‍♂️</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 border-t border-indigo-500/20 pt-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-700 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div className="h-2 flex-grow bg-indigo-900/50 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Facebook Group CTA Section */}
        <FacebookGroupCTA />

        {/* City Pages Carousel Section */}
        <section className="w-full py-4 relative z-20 overflow-hidden bg-white/50 border-y border-gray-100 mb-2]4">
          <div className="max-w-7xl mx-auto px-4 mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Make new friends in your city</h2>
            <p className="text-gray-500 mt-2 text-center">Find events happening in your city</p>
          </div>


          <div className="relative overflow-hidden w-full group/carousel">
            {/* Edge Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white/80 via-white/40 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white/80 via-white/40 to-transparent z-10 pointer-events-none"></div>

            <div className="flex animate-scroll no-scrollbar py-4 gap-10 items-center w-max">
              {[...CITIES, ...CITIES].map((city, idx) => (
                <Link
                  key={`${city.slug}-${idx}`}
                  href={`/${city.slug}`}
                  className="flex flex-col items-center min-w-[90px] gap-3 group transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shadow-sm border border-gray-100 group-hover:border-blue-600 group-hover:scale-110">
                    <MapPin className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-gray-600 group-hover:text-blue-600 whitespace-nowrap">
                    {city.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Events */}
        <div className="w-full bg-gray-50/50">
          <TrendingEvents limit={2} />
        </div>

        {/* Weekend Events */}
        <div className="w-full">
          <WeekendEvents limit={4} />
        </div>

        {/* Why Stranger Mingle Exists? */}
        <section className="w-full bg-gray-50 border-y border-gray-200 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
              Why Stranger Mingle Exists
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
              We&apos;re solving a problem millions of Indians face: feeling lonely in a crowded city. <br /> Making friends after college shouldn&apos;t be this hard.<br />
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
              <div className="bg-white p-5 md:p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-6">
                  🏙️
                </div>
                <h3 className="text-sm md:text-lg font-black text-gray-900 mb-2 md:mb-3 text-center uppercase tracking-tight">
                  Escape Urban Loneliness
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-center">
                  Surrounded by millions but eating dinner alone? We get it. Making friends after college is hard—we make it natural.
                </p>
              </div>

              <div className="bg-white p-5 md:p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-50 text-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-6">
                  🤝
                </div>
                <h3 className="text-sm md:text-lg font-black text-gray-900 mb-2 md:mb-3 text-center uppercase tracking-tight">
                  Real Bonds, Zero Swiping
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-center">
                  Friendships happen when you&apos;re doing something together. Chai circles, treks, game nights—naturally authentic.
                </p>
              </div>

              <div className="bg-white p-5 md:p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-50 text-pink-600 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-6">
                  🛡️
                </div>
                <h3 className="text-sm md:text-lg font-black text-gray-900 mb-2 md:mb-3 text-center uppercase tracking-tight">
                  Safe & Verified Spaces
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-center">
                  Zero harassment policy. Verified members only. Small groups where everyone counts. Safe is our first priority.
                </p>
              </div>

              <div className="bg-white p-5 md:p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-50 text-green-600 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-4 md:mb-6">
                  ✅
                </div>
                <h3 className="text-sm md:text-lg font-black text-gray-900 mb-2 md:mb-3 text-center uppercase tracking-tight">
                  Verified Only Community
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed text-center">
                  We verify IDs and profiles to ensure every &quot;Stranger&quot; you mingle with is a genuine person looking for community.
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

            {/* Upcoming Activities / Experiences */}
            <div className="mt-24">
              <UpcomingExperiences city="India" currentEventId="" />
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
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed flex-grow">&quot;I joined this group with my friend and initially we were just 2 of us. But slowly we started meeting new people and now we have a group of 10-15 people who regularly hang out together. It&apos;s a great way to meet new people and make friends.&quot;</p>
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
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed flex-grow">&quot;I met Trishul through my another friend and now he is my good friend. I wanted to meet people naturally. The board game night was so much fun, and I didn&apos;t have to worry about forcing conversation.&quot;</p>
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

        {/* Social Media Section */}
        <SocialMediaQRSection />


        {/* FAQs Section */}
        <section id="faqs-section" className="w-full max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Quick answers to help you get started with building real friendships.</p>
          </div>
          <div className="space-y-4">
            <details className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-blue-300">
              <summary className="font-bold text-xs text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What is Stranger Mingle and how does it work?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="text-gray-600 mt-4 text-xs leading-relaxed">
                Stranger Mingle is a community platform for making real friends through organized weekend events in Indian cities. Browse events, register, and just show up – we handle the introductions and ice-breakers to ensure you have a great time and make genuine connections.
              </p>
            </details>
            <details className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-blue-300">
              <summary className="font-bold text-xs text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Is Stranger Mingle safe for women?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="text-gray-600 mt-4 text-xs leading-relaxed">
                Absolutely. We have a zero-tolerance policy for harassment and maintain strict safety protocols. All participants are verified, events are held in public locations, and our organizers are trained to ensure a safe and comfortable environment for everyone.
              </p>
            </details>
            <details className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-blue-300">
              <summary className="font-bold text-xs text-gray-900 cursor-pointer list-none flex items-center justify-between">
                How much do events cost?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="text-gray-600 mt-4 text-xs leading-relaxed">
                Most events range from ₹49 to ₹1999. These fees go directly toward supporting the platform, booking venues, and organizing activities. We keep it sustainable and community-focused rather than profit-driven.
              </p>
            </details>
            <details className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-blue-300">
              <summary className="font-bold text-xs text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Who attends these events?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="text-gray-600 mt-4 text-xs leading-relaxed">
                Our members are mostly young professionals, students, and people new to the city looking for platonic friendships. Whether you&apos;re an introvert or extrovert, you&apos;ll find a welcoming space. About 80% of people show up alone!
              </p>
            </details>
            <details className="group bg-white border border-gray-200 rounded-2xl p-6 transition-all hover:border-blue-300">
              <summary className="font-bold text-xs text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Which cities are you present in?
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="text-gray-600 mt-4 text-xs leading-relaxed">
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
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
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
                "@type": "Organization",
                "name": "Stranger Mingle",
                "url": "https://www.strangermingle.com",
                "logo": "https://www.strangermingle.com/logo.png",
                "description": "Stranger Mingle organizes weekend events and meetups in India for people to make real friends.",
                "location": {
                  "@type": "Place",
                  "name": "Stranger Mingle HQ",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "IN"
                  }
                },
                "areaServed": [
                  { "@type": "City", "name": "Pune" },
                  { "@type": "City", "name": "Mumbai" },
                  { "@type": "City", "name": "Bangalore" },
                  { "@type": "City", "name": "Hyderabad" },
                  { "@type": "City", "name": "Delhi" }
                ]
              },
              {
                "@type": "WebPage",
                "@id": "https://www.strangermingle.com/",
                "url": "https://www.strangermingle.com/",
                "name": "Weekend Events & Stranger Meetups in Pune, Hyderabad, Bengaluru",
                "speakable": {
                  "@type": "SpeakableSpecification",
                  "cssSelector": ["#hero-description", "#faqs-section"]
                }
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [{
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.strangermingle.com"
                }]
              },
              {
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
                      "text": "Most events range from ₹49 to ₹599. These fees go directly toward supporting the platform, booking venues, and organizing activities. We keep it sustainable and community-focused rather than profit-driven. It can vary based on the event and location."
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
            ]
          }),
        }}
      />
    </div>
  );
}
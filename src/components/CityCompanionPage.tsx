import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  MapPin,
  HeartHandshake,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Coffee,
  Calendar,
  Lock,
  ChevronRight,
  Home as HomeIcon,
  MessageSquare,
  Clock,
  Award
} from 'lucide-react';
import { getCityCompanionData } from '@/data/cityCompanionData';
import { LIVE_CITIES } from '@/lib/cities';

interface CityCompanionPageProps {
  cityKey: string;
  companionType: 'girlfriend' | 'boyfriend';
}

export default function CityCompanionPage({ cityKey, companionType }: CityCompanionPageProps) {
  const { city, profile } = getCityCompanionData(cityKey, companionType);
  const isGirlfriend = companionType === 'girlfriend';
  const roleName = isGirlfriend ? 'Girlfriend' : 'Boyfriend';
  const counterpartRole = isGirlfriend ? 'Boyfriend' : 'Girlfriend';
  const counterpartType = isGirlfriend ? 'boyfriend' : 'girlfriend';

  const canonicalUrl = `https://www.strangermingle.com/${city.cityKey}/rent-a-${companionType}-in-${city.cityKey}`;

  // Structured Data for SEO, AEO, and GEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.strangermingle.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: city.cityName,
        item: `https://www.strangermingle.com/${city.cityKey}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Rent a ${roleName} in ${city.cityName}`,
        item: canonicalUrl
      }
    ]
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Rent a ${roleName} in ${city.cityName}`,
    serviceType: 'Platonic Friendship and Social Companionship',
    description: profile.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'Stranger Mingle',
      url: 'https://www.strangermingle.com'
    },
    areaServed: {
      '@type': 'City',
      name: city.cityName,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: city.state
      }
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '800',
      highPrice: '4000',
      offerCount: '50'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: profile.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-rose-500/20 selection:text-rose-900 antialiased text-slate-900">
      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white pt-32 pb-20 px-4 overflow-hidden border-b border-white/10">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs text-slate-300 mb-6 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <HomeIcon size={12} /> Home
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <Link href={`/${city.cityKey}`} className="hover:text-white transition-colors font-medium">
              {city.cityName}
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-pink-300 font-bold">
              Rent a {roleName}
            </span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            {profile.heroBadge}
          </div>

          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight max-w-4xl">
            {profile.h1}
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl font-semibold text-rose-200/90 mb-4 tracking-wide">
            {profile.heroTagline}
          </p>

          {/* Provocative Hook in Simple Indian English */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {profile.provocativeHook}
          </p>

          {/* Two Prominent Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-10">
            {/* CTA a: Hire a Friend -> redirects to members login */}
            <Link
              href="/members/login"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-sm uppercase tracking-wider transition-all hover:scale-105 shadow-xl shadow-rose-500/25 active:scale-95 text-center"
            >
              <HeartHandshake className="w-5 h-5" />
              Hire a Friend
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            {/* CTA b: Become a Companion -> redirects to companion registration */}
            <Link
              href="/rent-a-friend-registration"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-sm uppercase tracking-wider backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-center"
            >
              <Users className="w-5 h-5 text-amber-300" />
              Become a Companion
            </Link>
          </div>

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl text-left text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Platonic &amp; Safe</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <Award className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Govt ID Verified</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Strict Public Venues Only</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
              <Clock className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Pay Per Hour Transparently</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl mx-auto px-4 py-16 space-y-16">
        
        {/* Section 1: Relatable City Story & Local Vocabulary */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">
              Hyperlocal Experience in {city.cityName}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6">
              {profile.localScenarioHeading}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              {profile.localScenarioStory}
            </p>

            {/* Local Slang Vocabulary Card Grid */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4">
                Local {city.cityName} Slang &amp; Culture You Will Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.localSlangTerms.map((slang, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/60">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-black text-indigo-950 font-mono">&ldquo;{slang.term}&rdquo;</span>
                      <span className="text-[10px] uppercase font-bold text-indigo-500 px-2 py-0.5 bg-white rounded-md border border-indigo-100">Local Vibe</span>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold mb-2">{slang.meaning}</p>
                    <p className="text-xs text-indigo-900 italic">&ldquo;{slang.inContext}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Curated Hangout & Outing Ideas in City */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 block mb-2">
              Weekend Plans Sorted
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
              {profile.idealOutingsHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              No more wondering where to take a friend. Here are handpicked, verified public spots across {city.cityName} perfect for respectful companion meetups and social outings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.popularHangouts.map((spot, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-rose-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 font-black text-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                          {spot.name}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin size={12} className="text-rose-500" /> {spot.area}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">
                      {spot.vibe}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {spot.activity}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <CheckCircle2 size={13} /> Verified Safe Public Spot
                  </span>
                  <Link href="/members/login" className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1">
                    Book Companion <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Why Young Professionals Choose a Companion */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-2">
              Zero Pressure • Complete Respect
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Why Young Professionals in {city.cityName} Prefer Stranger Mingle
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Traditional swiping and social apps in India have become exhausting loops of ghosting and unsolicited biodatas. We provide honest, upfront companionship for modern people who just want good company.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {profile.whyChoosePoints.map((point, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: How It Works in 3 Simple Steps */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">
            Simple &amp; Transparent
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            How to Hire a {roleName} in {city.cityName} in 3 Easy Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-12">
            No complicated contracts or confusing steps. Here is how your upcoming weekend gets sorted in minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 relative">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md shadow-indigo-600/20">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Browse Verified {city.cityName} Profiles
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log in to the members portal. Filter companions by {city.cityName}, languages spoken, interests, hourly rate, and verified reviews.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 relative">
              <div className="w-12 h-12 rounded-2xl bg-pink-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md shadow-pink-600/20">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Agree on Public Venue &amp; Time
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose a well-known public cafe, shopping mall, museum, or registered event in {city.cityName}. Confirm the duration and hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Meet, Connect &amp; Enjoy 100% Platonic Friendship
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enjoy lively conversations, explore the city, attend a movie or dinner. Zero awkwardness, zero relationship baggage.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/members/login"
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              Start Browsing {city.cityName} Companions <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Section 5: Strictly Platonic Safety Guarantee */}
        <section className="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-8 sm:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-600/25">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                Our 100% Safe, Legal &amp; Strictly Platonic Guarantee
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                <strong>Platonic Friendship to Combat Loneliness:</strong> Stranger Mingle operates under strict safety and decorum standards across all Indian cities. The companion service is purely for platonic friendship to combat loneliness. We do <strong>NOT</strong> tolerate sexual solicitation, harassment, or private off-platform compromises.
              </p>
              <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-amber-950 text-xs font-semibold leading-relaxed mb-4">
                <strong>Important Non-Liability Notice:</strong> Stranger Mingle is strictly not liable or responsible if people are meeting in private places like home, hotel room, private residence, or vehicle. All companion interactions and outings must strictly take place in open, public places. Meeting in private premises is strictly forbidden and completely at your own independent risk.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-rose-600 shrink-0" />
                  <span>Public places only (cafes, malls, restaurants, parks)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-rose-600 shrink-0" />
                  <span>Zero physical intimacy or sexual advances permitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-rose-600 shrink-0" />
                  <span>Government ID verified members and companions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-rose-600 shrink-0" />
                  <span>Anonymous chat &amp; calls without mobile number on platform</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Comprehensive AEO / GEO FAQs */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-2">
              Common Questions Answered
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Frequently Asked Questions About Renting a {roleName} in {city.cityName}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear, transparent answers to help you understand how hiring or becoming a companion works in {city.cityName}.
            </p>
          </div>

          <div className="space-y-6">
            {profile.faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-6 last:border-none last:pb-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Final Dual Provocative CTA Banner */}
        <section className="relative overflow-hidden bg-gradient-to-r from-rose-950 via-indigo-950 to-slate-950 rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl border border-rose-500/20">
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-300 px-3.5 py-1 rounded-full bg-white/10 mb-4 inline-block">
              Beat Loneliness Today
            </span>
            <h2 className="text-2xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to Hire a Friendly {roleName} or Earn as a Companion in {city.cityName}?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Whether you want an awesome companion for this weekend&apos;s cafe crawl, or you are an articulate, friendly person looking to earn great hourly income by offering respectful companionship—join our verified community now.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <Link
                href="/members/login"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-sm uppercase tracking-wider transition-all hover:scale-105 shadow-xl shadow-rose-500/20"
              >
                Hire a Friend
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                href="/rent-a-friend-registration"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-black text-sm uppercase tracking-wider backdrop-blur-md transition-all hover:scale-105"
              >
                Become a Companion
              </Link>
            </div>
          </div>
        </section>

        {/* Section 8: Cross-Linking Directory & Counterpart Discovery */}
        <section className="border-t border-slate-200 pt-10">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4">
            Explore More in {city.cityName} &amp; Other Cities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
            {/* Counterpart Link */}
            <Link
              href={`/${city.cityKey}/rent-a-${counterpartType}-in-${city.cityKey}`}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex items-center justify-between text-slate-800"
            >
              <span>Rent a {counterpartRole} in {city.cityName}</span>
              <ChevronRight size={14} className="text-slate-400" />
            </Link>

            {/* Main City Page */}
            <Link
              href={`/${city.cityKey}`}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex items-center justify-between text-slate-800"
            >
              <span>All Meetups &amp; Events in {city.cityName}</span>
              <ChevronRight size={14} className="text-slate-400" />
            </Link>

            {/* House Parties */}
            <Link
              href={`/${city.cityKey}/house-parties`}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex items-center justify-between text-slate-800"
            >
              <span>House Parties in {city.cityName}</span>
              <ChevronRight size={14} className="text-slate-400" />
            </Link>

            {/* Make New Friends */}
            <Link
              href={`/${city.cityKey}/make-new-friends`}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all flex items-center justify-between text-slate-800"
            >
              <span>Make Friends in {city.cityName}</span>
              <ChevronRight size={14} className="text-slate-400" />
            </Link>
          </div>

          {/* Quick Links to Other Cities */}
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-slate-500">
            <span className="font-bold text-slate-700 mr-1">Other Cities:</span>
            {LIVE_CITIES.filter((c) => c !== city.cityKey).map((otherCity) => (
              <Link
                key={otherCity}
                href={`/${otherCity}/rent-a-${companionType}-in-${otherCity}`}
                className="hover:text-indigo-600 transition-colors uppercase tracking-wider"
              >
                {otherCity} •
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}


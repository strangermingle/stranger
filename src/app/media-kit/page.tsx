import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media Kit | Stranger Mingle',
  description: 'Press & Media Information for Stranger Mingle. Story angles, brand facts, audience snapshot, and press contact details.',
  alternates: {
    canonical: '/media-kit',
  },
};

const WA_NUMBER = '917411820025';
const WA_MESSAGE = encodeURIComponent(
  'Hi, I am reaching out regarding a media or press enquiry about Stranger Mingle. Here are my details:\n\nName:\nPublication or platform:\nType of coverage (article, podcast, video, etc.):\nDeadline (if any):\nWhat you need from us:'
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const brandFacts = [
  { label: 'Full Brand Name', value: 'Stranger Mingle' },
  { label: 'Legal Entity', value: 'StrangerMingle' },
  { label: 'Category', value: 'Community Platform · Social Friendship · Offline Events' },
  { label: 'Founded', value: 'Pune, Maharashtra, India' },
  { label: 'Active Cities', value: 'Pune · Mumbai · Bengaluru · Hyderabad · Delhi' },
  { label: 'Platform', value: 'strangermingle.com' },
  { label: 'Press Contact', value: 'strangermingleteam@gmail.com' },
];

const audienceFacts = [
  { stat: '18–35', label: 'Core member age range' },
  { stat: 'Verified', label: 'Identity-confirmed members — no anonymous users' },
  { stat: '5 Cities', label: 'Pune · Mumbai · Bengaluru · Hyderabad · Delhi' },
  { stat: '15–30', label: 'Members per event — intentionally small groups' },
  { stat: '80%', label: 'Members who attend events alone' },
  { stat: 'Weekly', label: 'Event frequency across active cities' },
];

const eventFormats = [
  { icon: '☕', name: 'Chai Circles', desc: 'Morning social meetups built around conversation and chai.' },
  { icon: '🎲', name: 'Board Game Nights', desc: 'Structured play evenings for groups of 15–25 members.' },
  { icon: '🥾', name: 'Treks & Outdoor Walks', desc: 'Half-day and full-day outdoor activities in and around cities.' },
  { icon: '🏛️', name: 'Heritage & Cultural Walks', desc: 'Guided walks through historical neighbourhoods and cultural spaces.' },
  { icon: '🍽️', name: 'Food & Culture Outings', desc: 'Exploring local food culture together as a group.' },
  { icon: '🤲', name: 'Volunteering Events', desc: 'Community service activities that combine doing good with meeting people.' },
  { icon: '💬', name: 'Talk to Me Sessions', desc: 'Structured small-group conversation and emotional connection events.' },
  { icon: '🎤', name: 'Workshop Sessions', desc: 'Skill-sharing and learning events led by community facilitators.' },
];

const storyAngles = [
  {
    angle: 'Urban Loneliness in India',
    description:
      'Millions of young Indians live and work in cities where they know almost no one outside their office. Stranger Mingle is one of the first platforms in India built specifically to address post-college loneliness and adult friendship formation.',
  },
  {
    angle: 'The Offline Social Revival',
    description:
      'At a time when social media platforms dominate social interaction, Stranger Mingle is part of a growing movement of young Indians consciously choosing in-person, structured social experiences over digital ones.',
  },
  {
    angle: 'Safety as a Community Standard',
    description:
      'Stranger Mingle operates a zero-tolerance harassment policy, identity verification for all members, and trained verified hosts at every event. It is among the few community platforms in India that has built safety infrastructure from the ground up rather than as an afterthought.',
  },
  {
    angle: 'Friendship Without Agenda',
    description:
      'In an era of networking events, speed dating, and professionally motivated socialising, Stranger Mingle is explicitly platonic — no dating, no networking, no commercial agendas. It is among the very few community platforms in India built purely around platonic friendship.',
  },
  {
    angle: 'Building Community in India\'s Tier 1 Cities',
    description:
      'The platform operates in Pune, Mumbai, Bengaluru, Hyderabad, and Delhi — cities with high in-migration, high professional density, and well-documented social isolation among young adults.',
  },
  {
    angle: 'The Verified Host Model',
    description:
      'Stranger Mingle events are not organised by the company alone — they are run by a network of trained, vetted community members called Verified Hosts who take personal responsibility for the safety and quality of every event they run.',
  },
];

const usageGuidelines = [
  {
    fits: true,
    label: 'Refer to us as "Stranger Mingle" — capitalised, two words, no hyphen',
  },
  {
    fits: true,
    label: 'Identify the legal entity as "StrangerMingle" when required for formal editorial',
  },
  {
    fits: true,
    label: 'Describe us as a "community platform for platonic friendship and offline social events"',
  },
  {
    fits: true,
    label: 'Reference our active cities accurately — Pune, Mumbai, Bengaluru, Hyderabad, and Delhi',
  },
  {
    fits: false,
    label: 'Do not describe Stranger Mingle as a dating app, matchmaking platform, or romantic social network',
  },
  {
    fits: false,
    label: 'Do not describe Stranger Mingle as a networking or professional events platform',
  },
  {
    fits: false,
    label: 'Do not use our logo, brand name, or event images for commercial purposes without written permission',
  },
  {
    fits: false,
    label: 'Do not publish unverified statistics or membership numbers attributed to us without confirmation from our team',
  },
];

export default function MediaKitPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Media Kit
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Stranger Mingle — Press & Media Information
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            For journalists, editors, podcasters, and content creators covering community
            building, urban loneliness, offline social culture, or the changing social lives
            of young Indians. Everything you need to cover us accurately is on this page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md text-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.859L.054 23.077a.75.75 0 00.919.919l5.218-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.528-5.228-1.449l-.374-.223-3.879 1.099 1.099-3.879-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Press Enquiry on WhatsApp
            </a>
            <a
              href="mailto:strangermingleteam@gmail.com?subject=Press Enquiry — [Publication Name]&body=Hi, I am reaching out with a press or media enquiry about Stranger Mingle.%0A%0AName:%0APublication or platform:%0AType of coverage:%0ADeadline (if any):%0AWhat I need from you:"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-lg transition-colors"
            >
              Email the Press Team
            </a>
          </div>
        </div>
      </section>

      {/* About Stranger Mingle */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Stranger Mingle</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Stranger Mingle is India&apos;s community platform for platonic friendship — a brand of
            StrangerMingle, built for young adults in their 20s and 30s
            who want to build a genuine social life in the city they live in. We organise
            verified, in-person events — chai circles, treks, board game nights, heritage
            walks, and more — across Pune, Mumbai, Bengaluru, Hyderabad, and Delhi.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Every member is identity-verified. Every event is facilitated by a trained, vetted
            community member called a Verified Host. Groups are kept intentionally small — 15
            to 30 people — to ensure meaningful interaction rather than crowded chaos. Events
            are priced fairly to keep the platform sustainable and quality high.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Stranger Mingle operates under a strict zero-tolerance harassment policy, with
            particular attention to the safety of women. Discrimination of any kind — based on
            caste, religion, gender, skin colour, or economic background — results in immediate
            and permanent removal from the platform. This is not a policy we revisit. It is a
            founding condition.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            The platform is strictly platonic. Events are not used for romantic matchmaking,
            professional networking, or commercial promotion of any kind. Members come to make
            genuine friends. That is the only purpose this community serves.
          </p>
        </div>
      </section>

      {/* Brand Facts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Brand Facts</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {brandFacts.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4 ${
                  i !== brandFacts.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide sm:w-44 flex-shrink-0">
                  {item.label}
                </p>
                <p className="text-gray-900 text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Snapshot */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Audience Snapshot</h2>
          <p className="text-gray-500 text-base mb-8">
            Key characteristics of the Stranger Mingle member community for editorial reference.
            All figures are indicative. For verified data requests, contact our press team.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {audienceFacts.map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-center"
              >
                <p className="text-2xl font-bold text-gray-900 mb-1">{item.stat}</p>
                <p className="text-xs text-gray-500 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Formats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Formats</h2>
          <p className="text-gray-500 text-base mb-8">
            A reference list of the event types Stranger Mingle organises across its active
            cities. Formats vary by city and season.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {eventFormats.map((format) => (
              <div
                key={format.name}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-4 shadow-sm"
              >
                <span className="text-2xl flex-shrink-0">{format.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{format.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{format.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Angles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Story Angles and Editorial Context
          </h2>
          <p className="text-gray-500 text-base mb-8">
            For journalists and editors looking for a starting point. These are the themes
            our work naturally intersects with.
          </p>
          <div className="space-y-4">
            {storyAngles.map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 rounded-xl p-6"
              >
                <h3 className="font-bold text-gray-900 text-base mb-2">{item.angle}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Brand Assets</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Official logos, brand colours, and event photography available for editorial use. 
            All assets should be used in accordance with our editorial usage guidelines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Logo Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🖼️</span> Official Logos
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center mb-3">
                    <Image src="/logo-2.svg" alt="Stranger Mingle Primary Logo" width={200} height={48} className="h-12 w-auto" />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Primary Logo (SVG)</p>
                    <a href="/logo-2.svg" download className="text-blue-600 hover:text-blue-700 text-sm font-semibold">Download ↓</a>
                  </div>
                </div>
                <div>
                  <div className="bg-gray-950 rounded-lg p-8 flex items-center justify-center mb-3">
                    <Image src="/logo.svg" alt="Stranger Mingle Inverse Logo" width={200} height={48} className="h-12 w-auto brightness-0 invert" />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Inverse Logo (SVG)</p>
                    <a href="/logo.svg" download className="text-blue-600 hover:text-blue-700 text-sm font-semibold">Download ↓</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Colour Palette */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🎨</span> Brand Colours
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 shadow-inner"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Stranger Blue</p>
                    <p className="text-xs text-gray-500 font-mono">HEX: #2563eb · HSL: 221, 83%, 53%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-950 shadow-inner"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Deep Space</p>
                    <p className="text-xs text-gray-500 font-mono">HEX: #030712 · HSL: 222, 47%, 4%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 shadow-inner"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Pure White</p>
                    <p className="text-xs text-gray-500 font-mono">HEX: #ffffff · HSL: 0, 0%, 100%</p>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 italic">
                    Typography: Outfit (Headings) and Inter (UI/Body) are our primary typefaces.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-6">Event Photography</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
            {[
              { src: '/images/suraj-bhansingh.png', name: 'Community Member — Suraj' },
              { src: '/images/varsha.png', name: 'Community Member — Varsha' },
              { src: '/images/anuradha.png', name: 'Community Member — Anuradha' },
            ].map((img) => (
              <div key={img.src} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <Image src={img.src} alt={img.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={img.src} download className="bg-white text-gray-900 px-4 py-2 rounded-lg text-xs font-bold shadow-lg">Download ↓</a>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{img.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <p className="text-blue-900 text-sm leading-relaxed">
              <strong>Need higher resolution or more assets?</strong> Email{' '}
              <a
                href="mailto:strangermingleteam@gmail.com?subject=Custom Asset Request — [Publication Name]"
                className="font-semibold underline hover:text-blue-700"
              >
                strangermingleteam@gmail.com
              </a>{' '}
              with your specific requirements. We typically respond to custom asset requests within 2 working days.
            </p>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Editorial Usage Guidelines
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            When writing about or referencing Stranger Mingle, please follow these guidelines
            to ensure accuracy. Misrepresentation — particularly describing us as a dating or
            networking platform — causes genuine harm to our community and we will request
            corrections.
          </p>
          <div className="space-y-3">
            {usageGuidelines.map((item, i) => (
              <div
                key={i}
                className={`border rounded-xl p-4 flex items-start gap-3 ${
                  item.fits
                    ? 'bg-green-50 border-green-100'
                    : 'bg-red-50 border-red-100'
                }`}
              >
                <span
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${
                    item.fits
                      ? 'bg-green-100 text-green-600 border-green-200'
                      : 'bg-red-100 text-red-600 border-red-200'
                  }`}
                >
                  {item.fits ? '✓' : '✕'}
                </span>
                <p
                  className={`text-sm leading-relaxed ${
                    item.fits ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Community Voice */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Community Voice
          </h2>
          <p className="text-gray-500 text-base mb-8">
            Verified quotes from Stranger Mingle members for editorial reference. For
            additional member quotes, case studies, or interview requests, contact our press
            team. All member interviews are coordinated through us — direct solicitation of
            members for press purposes is not permitted.
          </p>
          <div className="space-y-5">
            {[
              {
                quote:
                  'I joined this group with my friend and initially we were just 2 of us. But slowly we started meeting new people and now we have a group of 10–15 people who regularly hang out together. It\'s a great way to meet new people and make friends.',
                name: 'Suraj Bhan Singh',
                detail: 'Software Engineer, Wakad, Pune',
              },
              {
                quote:
                  'The board game night was so much fun, and I didn\'t have to worry about forcing conversation. I met people I genuinely wanted to see again.',
                name: 'Anuradha',
                detail: 'IT Engineer, Hinjewadi, Pune',
              },
              {
                quote:
                  'I\'ve been working in Bengaluru for five years and had not met many people outside work. This group helped me connect with new people and make real friends.',
                name: 'Varsha Sundaram',
                detail: 'Bengaluru',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                  &quot;{item.quote}&quot;
                </p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Press & Media Contact</h2>
          <p className="text-gray-300 text-lg mb-4">
            For interview requests, fact-checking, event access, member quotes, brand asset
            requests, or any other editorial enquiry — reach out to our team directly. We
            respond to press enquiries within 24–48 hours on working days.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Please include your publication name, story angle, and deadline in your first
            message. For time-sensitive requests, WhatsApp is faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md text-base transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.859L.054 23.077a.75.75 0 00.919.919l5.218-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.528-5.228-1.449l-.374-.223-3.879 1.099 1.099-3.879-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp — +91 74118 20025
            </a>
            <a
              href="mailto:strangermingleteam@gmail.com?subject=Press Enquiry — [Publication Name]&body=Hi, I am reaching out with a press or media enquiry about Stranger Mingle.%0A%0AName:%0APublication or platform:%0AType of coverage:%0ADeadline (if any):%0AWhat I need from you:"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-base transition-colors"
            >
              Email the Press Team
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Email:{' '}
            <a
              href="mailto:strangermingleteam@gmail.com"
              className="text-gray-300 hover:text-white underline"
            >
              strangermingleteam@gmail.com
            </a>{' '}
            · Subject: Press Enquiry — [Your Publication Name]
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Stranger Mingle is a brand of{' '}
          <span className="text-gray-600 font-medium">StrangerMingle</span>.
          All media usage of the Stranger Mingle brand, logo, event imagery, and member
          content is subject to our intellectual property rights and editorial usage guidelines.
          For permissions, contact{' '}
          <a
            href="mailto:strangermingleteam@gmail.com"
            className="text-blue-600 hover:underline"
          >
            strangermingleteam@gmail.com
          </a>
          .
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
          >
            About Stranger Mingle
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

    </div>
  );
}
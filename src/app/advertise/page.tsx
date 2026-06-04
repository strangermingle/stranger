import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertise With Us | Stranger Mingle',
  description: 'Reach a verified, engaged community of young urban Indians. Explore advertising opportunities with Stranger Mingle.',
  alternates: {
    canonical: '/advertise',
  },
};
const whyAdvertise = [
  {
    icon: '✅',
    title: 'A Verified Audience — Not Anonymous Traffic',
    description:
      'Every person on strangermingle.com has completed member verification. These are real, identified individuals — not bots, not anonymous browsers, not purchased traffic. When your ad appears here, it is seen by people whose identity and intent we can account for.',
  },
  {
    icon: '🎯',
    title: 'High Intent, High Engagement',
    description:
      'Our visitors are not mindlessly scrolling. They are actively browsing events, registering for experiences, and investing real money in offline social activities. A person reading the Stranger Mingle events page is in a distinctly different headspace from someone watching a 15-second social media ad.',
  },
  {
    icon: '🏙️',
    title: 'Five of India\'s Most Valuable Urban Markets',
    description:
      'Pune, Mumbai, Bengaluru, Hyderabad, Delhi. India\'s highest-earning, highest-spending urban demographics. Our community skews young professional — employed, independent, and with disposable income actively spent on real experiences.',
  },
  {
    icon: '🤝',
    title: 'A Community That Trusts the Platform',
    description:
      'Stranger Mingle members have verified their identity, paid event fees, and shown up in person to meet strangers. That level of platform trust is rare. When we carry an advertiser, members register it differently than a random retargeted banner. It carries weight because the platform does.',
  },
  {
    icon: '🔒',
    title: 'No Data Harvesting, No Invasive Targeting',
    description:
      'We do not build ad audiences from member profiles or sell personal data to anyone. All placements are contextual. This is not just our policy — it is a selling point. Privacy-respecting advertising is increasingly what thoughtful brands actively seek.',
  },
  {
    icon: '📋',
    title: 'Strict Category Review — So You Are in Good Company',
    description:
      'We reject dating apps, networking platforms, MLM schemes, alcohol brands, gambling products, and political content. What remains is a curated set of brands that genuinely fit this community. Your ad will never appear alongside content that undermines your brand\'s credibility.',
  },
];

const acceptedCategories = [
  { category: 'Food & Beverage', examples: 'Cafés, tea and coffee brands, packaged snacks, juice brands, casual dining' },
  { category: 'Outdoor & Lifestyle', examples: 'Trekking gear, sports apparel, cycling accessories, travel and adventure brands' },
  { category: 'Books & Learning', examples: 'Bookstores, reading apps, online learning platforms focused on personal growth' },
  { category: 'Mental Health & Wellness', examples: 'Therapy and counselling platforms, meditation apps, wellness services — reviewed individually' },
  { category: 'Local Venues & Experiences', examples: 'Board game cafés, escape rooms, activity centres, cultural experience organisers' },
  { category: 'Community & Social Good', examples: 'Non-commercial NGOs, volunteer platforms, community-oriented initiatives' },
];

const rejectedCategories = [
  { category: 'Dating apps and romantic matchmaking services', reason: 'Directly contradicts our platonic friendship mission and community guidelines.' },
  { category: 'Professional networking and B2B platforms', reason: 'Our Terms of Service prohibit business networking use. Advertising tools that enable it undermines that position.' },
  { category: 'MLM, direct selling, and "earn from home" schemes', reason: 'Prohibited under our Terms of Service. No exceptions.' },
  { category: 'Alcohol, tobacco, and related products', reason: 'Inconsistent with our safety culture and event standards.' },
  { category: 'Gambling, fantasy sports, and betting platforms', reason: 'Not aligned with community values. Rejected on review.' },
  { category: 'Political parties, religious organisations, and ideological groups', reason: 'Stranger Mingle maintains strict political and religious neutrality.' },
  { category: 'Cryptocurrency, NFT, and speculative investment products', reason: 'Not aligned with brand values. Rejected on review.' },
  { category: 'Any brand with documented harassment, discrimination, or safety violations', reason: 'Our zero-tolerance standards extend to every brand we associate with.' },
];

const standards = [
  { icon: '🏷️', title: 'All ads are clearly labelled', desc: 'Every paid placement is marked "Sponsored" or "Advertisement" in accordance with ASCI guidelines. No disguised content, no native advertising passed off as editorial.' },
  { icon: '🔒', title: 'No member data shared with advertisers', desc: 'Stranger Mingle does not share, sell, or transfer member personal data to any advertiser. Placements are contextual — page-based, never profile-based.' },
  { icon: '🚫', title: 'No ads inside the member experience', desc: 'The member portal, booking flow, event confirmation pages, and post-event communications are permanently advertisement-free. Ads appear on public-facing pages only.' },
  { icon: '✋', title: 'Zero advertiser influence on content or events', desc: 'Sponsoring an event gives a brand one brief acknowledgement. Nothing more. Advertisers have no influence over event format, host conduct, or any community content.' },
  { icon: '📋', title: 'Creative review before every placement', desc: 'All ad creative is reviewed by our team before going live. We reserve the right to reject or request changes to any creative that conflicts with our values — even within accepted categories.' },
  { icon: '⚖️', title: 'No implied endorsement', desc: 'Advertising on strangermingle.com does not constitute endorsement of any product or service by Stranger Mingle or StrangerMingle. Stated clearly on every placement confirmation.' },
];

const WA_NUMBER = '917411820025';
const WA_MESSAGE = encodeURIComponent(
  'Hi, I would like to enquire about advertising on Stranger Mingle. Here are my details:\n\nBrand name:\nProduct or service category:\nTarget cities:\nAnything else:'
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function AdvertiseWithUsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Advertise with Stranger Mingle
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Reach a Verified, Engaged Community of Young Urban Indians
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Stranger Mingle is India&apos;s most trust-forward offline community platform — active
            across Pune, Mumbai, Bengaluru, Hyderabad, and Delhi. We accept a carefully
            reviewed selection of advertisers whose products genuinely serve this community.
            Not everyone qualifies. If you do, this is a placement worth having.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md text-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.859L.054 23.077a.75.75 0 00.919.919l5.218-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.528-5.228-1.449l-.374-.223-3.879 1.099 1.099-3.879-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Enquire on WhatsApp
            </a>
            <a
              href="#category-policy"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-lg transition-colors"
            >
              Check Category Eligibility
            </a>
          </div>
        </div>
      </section>

      {/* Policy Banner */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto flex gap-4 items-start">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-amber-900 font-semibold text-base mb-1">
              Every Advertiser Is Reviewed Before Any Placement Goes Live
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Advertising here is not open to all categories. Every brand is reviewed for
              alignment with our community values before a single placement is confirmed. We
              reject dating apps, professional networking platforms, MLM schemes, alcohol brands,
              gambling products, and political content — regardless of budget. Our community&apos;s
              trust is not for sale. Our ad inventory is. There is an important difference
              between the two.
            </p>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who You Are Reaching</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            The Stranger Mingle audience is defined by intent, not just demographics. These are
            urban Indians in their 20s and 30s who have actively chosen to invest time and money
            in building a real social life offline. They are verified members, paying
            participants, and spread across India&apos;s highest-earning metro markets. This is not
            a passive scrolling audience — it is an engaged, trust-giving community.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-8">
            {[
              { stat: '18–35', label: 'Core age range' },
              { stat: 'Verified', label: 'Every member — no anonymous users' },
              { stat: '5 Cities', label: 'Pune · Mumbai · Bengaluru · Hyderabad · Delhi' },
              { stat: 'High Intent', label: 'Actively investing in offline experiences' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-center">
                <p className="text-xl font-bold text-gray-900 mb-1">{item.stat}</p>
                <p className="text-xs text-gray-500 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <p className="text-blue-900 text-sm leading-relaxed">
              <strong>On data and targeting:</strong> Stranger Mingle does not share, sell, or
              provide member data to advertisers. All placements are contextual — based on page
              type and content relevance, never on member profiles or personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Why Advertise Here */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Advertise on Stranger Mingle</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Six reasons this platform is worth your attention — and your budget.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAdvertise.map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Policy */}
      <section id="category-policy" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who We Work With — and Who We Don&apos;t
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Read this before reaching out. These lists are illustrative, not exhaustive.
              Final advertiser acceptance is at the sole discretion of Salty Media Production
              (opc) Pvt Ltd.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold border border-green-200">✓</span>
                Categories We Accept
              </h3>
              <div className="space-y-3">
                {acceptedCategories.map((item, i) => (
                  <div key={i} className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <p className="font-semibold text-green-900 text-sm mb-1">{item.category}</p>
                    <p className="text-green-700 text-xs leading-relaxed">{item.examples}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold border border-red-200">✕</span>
                Categories We Do Not Accept
              </h3>
              <div className="space-y-3">
                {rejectedCategories.map((item, i) => (
                  <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <p className="font-semibold text-red-900 text-sm mb-1">{item.category}</p>
                    <p className="text-red-700 text-xs leading-relaxed">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Standards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Advertising Standards</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              These are the commitments we make to our members about how advertising works on
              this platform. Every advertiser is held to these standards without exception.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {standards.map((item) => (
              <div key={item.title} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How the Process Works</h2>
            <p className="text-gray-500 text-lg">
              From first message to live campaign — four steps, no ambiguity.
            </p>
          </div>
          <div className="space-y-7">
            {[
              {
                number: '01',
                title: 'Send Us a WhatsApp Message',
                desc: 'Hit the WhatsApp button on this page. Tell us your brand name, product category, and the cities you want to target. We respond within 24–48 hours.',
              },
              {
                number: '02',
                title: 'Category and Brand Review',
                desc: 'Our team reviews your brand for alignment with our community values and advertising policy. This applies to every advertiser regardless of budget or brand size.',
              },
              {
                number: '03',
                title: 'Placement Details and Creative Submission',
                desc: 'Approved advertisers receive placement details, format specifications, and the creative submission process. All ad creative is reviewed by our team before any placement goes live.',
              },
              {
                number: '04',
                title: 'Campaign Live and Reporting',
                desc: 'Your placement goes live on the agreed date. You receive a performance report at the end of each billing period covering impressions and placement metrics. No member-level data is included in any report.',
              },
            ].map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white font-bold text-lg rounded-full flex items-center justify-center">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Advertiser FAQ</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Does Stranger Mingle sell member data to advertisers?',
                a: 'No. Stranger Mingle does not share, sell, or transfer member personal data to any advertiser under any circumstances. All placements are contextual — based on page type, not member profiles. Our Privacy Policy governs all member data handling.',
              },
              {
                q: 'Will ads appear inside the member portal or booking flow?',
                a: 'No. Advertising is restricted to public-facing pages of strangermingle.com only. The member portal, event checkout, booking confirmation pages, and all post-event member communications are and will remain advertisement-free.',
              },
              {
                q: 'Does advertising on Stranger Mingle mean the brand is endorsed by you?',
                a: 'No. The presence of an advertisement on strangermingle.com does not constitute an endorsement or recommendation of any advertiser\'s product or service by Stranger Mingle or StrangerMingle. All placements are clearly labelled as paid advertising.',
              },
              {
                q: 'Can an event sponsor influence what happens at the event?',
                a: 'No. Event sponsorship gives a brand a brief acknowledgement in the event listing, confirmation email, and a single mention by the host at event start. That is the full scope. Sponsors have no influence over event format, host conduct, participant interactions, or any community content.',
              },
              {
                q: 'How do I get pricing information?',
                a: 'Pricing is shared after your brand has been reviewed and accepted. Send us a WhatsApp message with your brand details and target cities and we will get back to you with everything you need.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Advertise?</h2>
          <p className="text-gray-300 text-lg mb-4">
            Send us a WhatsApp message with your brand name, product category, and the cities
            you want to target. Our team will review your enquiry and get back to you within
            24–48 hours.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Not sure if your brand qualifies? Message us anyway — we will give you an honest
            answer promptly. Enquiries from ineligible categories will not receive a placement
            offer.
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
              WhatsApp Us — +91 74118 20025
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-base transition-colors"
            >
              Contact Us First
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Prefer email?{' '}
            <a
              href="mailto:strangermingleteam@gmail.com?subject=Advertising Enquiry — [Brand Name]&body=Hi, I would like to enquire about advertising on Stranger Mingle.%0A%0ABrand name:%0AProduct or service category:%0ATarget cities:%0AAnything else:"
              className="text-gray-300 hover:text-white underline"
            >
              strangermingleteam@gmail.com
            </a>{' '}
            · Subject: Advertising Enquiry — [Your Brand Name]
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Advertising with Stranger Mingle is governed by the advertising standards of{' '}
          <span className="text-gray-600 font-medium">StrangerMingle</span>,
          our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          , and our{' '}
          <Link href="/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          . All placements are subject to advertiser review. Stranger Mingle reserves the right
          to reject any advertiser or creative at its sole discretion. Advertising does not
          constitute endorsement of any product or service by Stranger Mingle or Salty Media
          Production (opc) Pvt Ltd.
        </p>
        <div className="mt-6">
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
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community & Brand Partnerships | Stranger Mingle',
  description: 'Build something lasting with the Stranger Mingle community. Explore venue, cause, content, and city ecosystem partnerships.',
  alternates: {
    canonical: '/brand-partnership',
  },
};
const WA_NUMBER = '917411820025';
const WA_MESSAGE = encodeURIComponent(
  'Hi, I would like to enquire about a Community or Brand Partnership with Stranger Mingle. Here are my details:\n\nBrand or organisation name:\nWhat you do:\nCities you operate in:\nWhat kind of partnership you have in mind:\nAnything else:'
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const partnershipTypes = [
  {
    icon: '☕',
    title: 'Venue Partner',
    description:
      'Cafés, activity spaces, and community venues that become regular homes for Stranger Mingle events. Your space is associated with our events on a recurring basis — listed as the preferred venue in your city for specific event formats.',
    fit: 'Cafés, board game cafés, co-working spaces with social areas, rooftop venues, and activity centres in our active cities.',
    whatItLooksLike: [
      'Your venue is the named location for recurring event formats in your city',
      'Listed on relevant Stranger Mingle event pages with venue details',
      'Ongoing relationship reviewed quarterly — not a one-off transaction',
    ],
  },
  {
    icon: '🌿',
    title: 'Community Cause Partner',
    description:
      'Non-commercial organisations, NGOs, and community initiatives whose work aligns with genuine human connection, mental health, or social inclusion. We co-create events that serve both communities — ours and yours.',
    fit: 'Mental health organisations, animal welfare groups, environmental initiatives, volunteer networks, and community service organisations.',
    whatItLooksLike: [
      'Co-branded events where both communities participate',
      'Mutual visibility — we mention your cause, you mention our community',
      'No commercial exchange involved — this is mission alignment, not sponsorship',
    ],
  },
  {
    icon: '🎨',
    title: 'Content and Co-Creation Partner',
    description:
      'Brands with genuine expertise in areas relevant to our community — mental health, outdoor life, food culture, learning — who want to contribute meaningful content to our platform and members, not just advertising.',
    fit: 'Wellness platforms, learning apps, independent publications, podcasts, and brands with genuine editorial depth in areas our community cares about.',
    whatItLooksLike: [
      'Guest content on the Stranger Mingle blog or newsletter — clearly attributed',
      'Co-authored resources useful to community members',
      'No advertorial disguised as content — everything is transparently attributed',
    ],
  },
  {
    icon: '🏙️',
    title: 'City Ecosystem Partner',
    description:
      'Local businesses, cultural institutions, and city-focused brands that want to be woven into the Stranger Mingle experience in a specific city. This is for brands that are genuinely part of the fabric of a city and want their community to overlap with ours.',
    fit: 'Heritage experience operators, city walking tour companies, local bookstores, independent restaurants, and cultural spaces in our active cities.',
    whatItLooksLike: [
      'Embedded into city-specific events and event listings',
      'Mentioned in city pages and local community communications',
      'Long-term, city-specific relationship — not a national campaign',
    ],
  },
];

const whatMakesAGoodPartner = [
  {
    fits: true,
    label: 'Your brand or organisation genuinely serves the daily life, wellbeing, or experiences of young urban Indians',
  },
  {
    fits: true,
    label: 'You are interested in a sustained, ongoing relationship — not a one-time promotional placement',
  },
  {
    fits: true,
    label: 'You understand that Stranger Mingle is a platonic friendship community — not a networking, dating, or professional development platform',
  },
  {
    fits: true,
    label: 'You can bring something of genuine value to our community — a space, a cause, expertise, or cultural relevance',
  },
  {
    fits: true,
    label: 'You are comfortable with partnership terms that prioritise community trust over brand visibility',
  },
  {
    fits: false,
    label: 'You want a partnership primarily to generate leads, recruit customers, or grow a commercial audience',
  },
  {
    fits: false,
    label: 'You are a dating app, networking platform, MLM, alcohol brand, or gambling product',
  },
  {
    fits: false,
    label: 'You want access to member data, contact details, or audience profiling as part of the partnership',
  },
  {
    fits: false,
    label: 'You expect to influence event content, community communications, or the Stranger Mingle brand positioning',
  },
];

const principles = [
  {
    icon: '🤝',
    title: 'Mission Alignment Over Commercial Convenience',
    description:
      'We do not take on partners because they have a large budget. We take on partners whose presence in our community actually makes sense — for our members, not just for our revenue. Every partnership is evaluated on what it adds to the community experience, not what it adds to our balance sheet.',
  },
  {
    icon: '🔍',
    title: 'Transparency in Every Touchpoint',
    description:
      'Every partnership-related appearance in Stranger Mingle communications is clearly attributed. Members always know when they are seeing partner content or a partner venue. There is no hidden commercial arrangement and no disguised promotion — ever.',
  },
  {
    icon: '🛡️',
    title: 'Community Trust Is Non-Negotiable',
    description:
      'Our members trust this platform because we have not sold that trust cheaply. No partner gets access to member data, influence over event conduct, or the ability to use the Stranger Mingle name for purposes beyond the agreed partnership scope.',
  },
  {
    icon: '📅',
    title: 'Long-Term or Not at All',
    description:
      'We do not pursue one-off partnerships dressed up as relationships. A community partnership is meaningful only if it is sustained. We prefer fewer, deeper partnerships over a long list of superficial associations.',
  },
];

export default function CommunityBrandPartnershipPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Community & Brand Partnerships
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Build Something Lasting with the Stranger Mingle Community
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Not every brand relationship fits inside a banner ad or a single event sponsorship.
            If you represent a brand, venue, cause, or organisation that genuinely belongs in
            the lives of young urban Indians — and you are thinking long-term — a community
            partnership may be the right conversation to have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md text-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.859L.054 23.077a.75.75 0 00.919.919l5.218-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.528-5.228-1.449l-.374-.223-3.879 1.099 1.099-3.879-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Start the Conversation
            </a>
            <a
              href="#partnership-types"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-lg transition-colors"
            >
              Types of Partnership
            </a>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto flex gap-4 items-start">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-amber-900 font-semibold text-base mb-1">
              This Is Not a Sponsorship Package or an Ad Placement
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Community and brand partnerships are evaluated individually — there is no standard
              package, no rate card, and no guaranteed outcome from enquiring. We take on
              partnerships selectively, based on genuine mission alignment and long-term fit.
              If you are looking for a one-off event sponsorship or a digital ad placement,
              please visit our{' '}
              <Link href="/sponsor-an-event" className="underline font-medium text-amber-900 hover:text-amber-700">
                Sponsor an Event
              </Link>{' '}
              or{' '}
              <Link href="/advertise" className="underline font-medium text-amber-900 hover:text-amber-700">
                Advertise With Us
              </Link>{' '}
              pages instead.
            </p>
          </div>
        </div>
      </section>

      {/* What a Partnership Is */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What a Community Partnership Actually Means
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            A community partnership with Stranger Mingle is a sustained, structured relationship
            between our community and a brand, venue, cause, or organisation that has a genuine
            reason to be part of our members&apos; lives. It goes beyond a single placement or a
            single event — it is an ongoing association that is regularly reviewed, transparently
            communicated to members, and held to the same values that govern everything we do.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            This might look like a café that becomes the home for Stranger Mingle chai circles
            in a city. A mental health platform that co-creates resources for members who are
            navigating loneliness. A local bookstore that is woven into the cultural events we
            run in a particular city. A volunteer organisation whose mission overlaps with ours
            closely enough that running co-branded events makes genuine sense.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            In every case, the test is the same: does this partnership add something real to
            the community experience — or does it only add something to someone&apos;s marketing
            report? We take on the former. We decline the latter, consistently and without
            apology.
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section id="partnership-types" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Partnership We Consider</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              These are not fixed tiers or packages — they are the broad categories of
              partnerships that have genuine potential to serve our community. Every partnership
              is designed and negotiated individually.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {partnershipTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4"
              >
                <div className="text-3xl">{type.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{type.description}</p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    Best Fit
                  </p>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4">{type.fit}</p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    What It Looks Like
                  </p>
                  <ul className="space-y-1.5">
                    {type.whatItLooksLike.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="mt-0.5 flex-shrink-0 text-blue-500 font-bold">→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partnership Principles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How We Approach Partnerships
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Four principles that govern every partnership we enter — and explain why we turn
              down far more approaches than we accept.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((item) => (
              <div key={item.title} className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good Fit / Not a Fit */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Is a Partnership the Right Conversation to Have?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Read this honestly before reaching out. We invest significant time in evaluating
            partnership enquiries and give every one a considered response. Knowing whether you
            are a genuine fit upfront saves time on both sides.
          </p>
          <div className="space-y-3">
            {whatMakesAGoodPartner.map((item, i) => (
              <div
                key={i}
                className={`border rounded-xl p-4 flex items-start gap-3 ${item.fits ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
                  }`}
              >
                <span
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${item.fits
                      ? 'bg-green-100 text-green-600 border-green-200'
                      : 'bg-red-100 text-red-600 border-red-200'
                    }`}
                >
                  {item.fits ? '✓' : '✕'}
                </span>
                <p className={`text-sm leading-relaxed ${item.fits ? 'text-green-800' : 'text-red-800'}`}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Partnership Conversations Work
            </h2>
            <p className="text-gray-500 text-lg">
              There is no application form. This is a conversation — approached carefully on
              both sides.
            </p>
          </div>
          <div className="space-y-7">
            {[
              {
                number: '01',
                title: 'Send Us a WhatsApp Message',
                desc: 'Tell us who you are, what your brand or organisation does, the cities you operate in, and what kind of partnership you have in mind. Be honest about what you are hoping to get from it — we respond better to candour than to pitch decks.',
              },
              {
                number: '02',
                title: 'Initial Review',
                desc: 'We review your message and decide whether the fundamental fit is there. We respond within 3–5 working days. If the category or intent is clearly not a match, we will tell you promptly and explain why.',
              },
              {
                number: '03',
                title: 'Exploratory Conversation',
                desc: 'If the initial review is positive, we have a proper conversation — over WhatsApp or a brief call — to understand your brand\'s values, your community overlap with ours, and what a partnership could genuinely look like.',
              },
              {
                number: '04',
                title: 'Partnership Design',
                desc: 'If there is genuine alignment, we design the partnership together — what it includes, what it excludes, how long it runs, and how it is communicated to members. Everything is documented and transparent before anything goes live.',
              },
              {
                number: '05',
                title: 'Ongoing Review',
                desc: 'All partnerships are reviewed at regular intervals — typically every quarter. A partnership that is no longer serving the community well is either redesigned or ended. There are no automatic renewals.',
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
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Partnership FAQ
          </h2>
          <div className="space-y-5">
            {[
              {
                q: 'Is there a fee to become a community partner?',
                a: 'It depends entirely on the nature of the partnership. Some partnerships involve a commercial arrangement — a venue partner, for example, may receive event bookings that carry a fee. A community cause partner with no commercial exchange may involve no monetary transaction at all. Terms are discussed and agreed individually.',
              },
              {
                q: 'Will our brand be featured on the Stranger Mingle website?',
                a: 'Only if it is part of the agreed partnership scope. Not all partnerships include a public-facing listing. Where a partner is mentioned on our website or in communications, it is always clearly attributed and transparently labelled.',
              },
              {
                q: 'Can we use the Stranger Mingle name or logo in our own marketing?',
                a: 'Only with explicit written permission from StrangerMingle, and only within the scope agreed in the partnership documentation. Unauthorised use of the Stranger Mingle brand is prohibited under our Terms of Service.',
              },
              {
                q: 'Do community partners get access to our member data?',
                a: 'No. Under no circumstances does any partner receive member names, contact details, or any personally identifiable information. This applies to all partnership types without exception.',
              },
              {
                q: 'How is the partnership different from just advertising with you?',
                a: 'Advertising is transactional — you pay for a placement, it runs, it ends. A community partnership is relational — it is a sustained association designed around shared values and mutual benefit to the community. The criteria for acceptance are stricter, the relationship is longer-term, and the commercial terms, where applicable, reflect the deeper engagement.',
              },
              {
                q: 'Can an NGO or non-profit become a partner without a commercial arrangement?',
                a: 'Yes. Community cause partnerships with non-commercial organisations are evaluated on mission alignment, not financial contribution. If your organisation\'s work genuinely overlaps with what Stranger Mingle is building, we want to hear from you.',
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

      {/* Other Commercial Options */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Looking for Something More Immediate?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Community partnerships are long-term and selective. If you are looking for a quicker
            commercial arrangement — a digital ad placement or a one-off event sponsorship — we
            have dedicated pages for both.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/advertise"
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow group"
            >
              <span className="text-3xl flex-shrink-0">📱</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                  Advertise With Us →
                </p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                  Digital ad placements on strangermingle.com — homepage, events page, city pages, blog, and newsletter.
                </p>
              </div>
            </Link>
            <Link
              href="/sponsor-an-event"
              className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow group"
            >
              <span className="text-3xl flex-shrink-0">🎪</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                  Sponsor an Event →
                </p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                  Named association with a specific Stranger Mingle in-person event — listed on the event page, in emails, and acknowledged at event start.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let&apos;s Have an Honest Conversation
          </h2>
          <p className="text-gray-300 text-lg mb-4">
            If you have read this page and believe there is a genuine reason for your brand or
            organisation to be part of the Stranger Mingle community — we want to hear from you.
            Tell us who you are, what you do, where you operate, and what kind of partnership
            you have in mind. We give every serious enquiry a considered, honest response.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            We turn down partnerships that do not fit — and we explain why. We welcome
            enquiries that might be unconventional. If you are unsure whether this conversation
            makes sense, send us a message anyway.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md text-base transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.859L.054 23.077a.75.75 0 00.919.919l5.218-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.528-5.228-1.449l-.374-.223-3.879 1.099 1.099-3.879-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp Us — +91 74118 20025
            </a>
            <a
              href="mailto:strangermingleteam@gmail.com?subject=Community Partnership Enquiry — [Brand Name]&body=Hi, I would like to enquire about a community or brand partnership with Stranger Mingle.%0A%0ABrand or organisation name:%0AWhat you do:%0ACities you operate in:%0AWhat kind of partnership you have in mind:%0AAnything else:"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-base transition-colors"
            >
              Enquire via Email
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
            · Subject: Community Partnership Enquiry — [Your Brand Name]
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          All community and brand partnerships with Stranger Mingle are governed by the
          standards of{' '}
          <span className="text-gray-600 font-medium">StrangerMingle</span>,
          our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          , and our{' '}
          <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
            Safety Guidelines
          </Link>
          . All partnerships are subject to review and formal agreement. Stranger Mingle
          reserves the right to decline or terminate any partnership at its sole discretion.
          Partnership does not constitute endorsement by Stranger Mingle or Salty Media
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
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner With Us | Stranger Mingle',
  description: 'Work with a community that Indians actually trust. Explore venue, brand, sponsorship, and advertising partnerships.',
  alternates: {
    canonical: '/partner-with-us',
  },
};
const WA_NUMBER = '917411820025';
const WA_MESSAGE = encodeURIComponent(
  'Hi, I would like to enquire about partnering with Stranger Mingle. Here are my details:\n\nBrand or organisation name:\nWhat you do:\nCities you operate in:\nType of partnership you are interested in:\nAnything else:'
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const partnershipPaths = [
  {
    icon: '📍',
    title: 'Venue Partnership',
    tagline: 'Your space becomes a regular home for Stranger Mingle events.',
    description:
      'We bring a verified, paying community to your venue on a recurring basis. You are listed as a named partner venue in our event listings and member communications. Built for hospitality spaces, activity centres, outdoor spaces, and any publicly accessible venue in our active cities.',
    bestFor: 'Cafés, activity centres, rooftops, cultural spaces, community venues',
    commitment: 'Ongoing — reviewed quarterly',
    href: '/venue-partnership',
    cta: 'Learn About Venue Partnership',
    color: 'border-blue-200 bg-blue-50',
    tagColor: 'bg-blue-600',
  },
  {
    icon: '🤝',
    title: 'Community & Brand Partnership',
    tagline: 'A long-term, mission-aligned association with the Stranger Mingle community.',
    description:
      'For brands, causes, and organisations whose work genuinely belongs in the lives of young urban Indians — and who are thinking beyond a single placement or event. This includes content co-creation, community cause alignment, and city ecosystem partnerships.',
    bestFor: 'Wellness brands, NGOs, local businesses, cultural institutions, content-led brands',
    commitment: 'Long-term — minimum 3 months, reviewed quarterly',
    href: '/brand-partnership',
    cta: 'Learn About Brand Partnership',
    color: 'border-purple-200 bg-purple-50',
    tagColor: 'bg-purple-600',
  },
  {
    icon: '🎪',
    title: 'Sponsor an Event',
    tagline: 'Your brand named inside a real, in-person community moment.',
    description:
      'Named sponsorship of a specific Stranger Mingle event — visible on the event listing, in confirmation and reminder emails sent to attendees, and acknowledged once by the host at event start. Single events or city-month packages available.',
    bestFor: 'Brands wanting direct association with a specific city, format, or community gathering',
    commitment: 'Per event — no recurring obligation',
    href: '/sponsor-an-event',
    cta: 'Learn About Event Sponsorship',
    color: 'border-green-200 bg-green-50',
    tagColor: 'bg-green-600',
  },
  {
    icon: '📱',
    title: 'Advertise With Us',
    tagline: 'Reach a verified, engaged audience on strangermingle.com.',
    description:
      'Digital ad placements across the Stranger Mingle website and community newsletter. Homepage, events page, city pages, blog, and newsletter sponsorship — served to a verified, identity-confirmed member base across five Indian metros.',
    bestFor: 'Brands looking for contextual digital reach in India\'s top urban markets',
    commitment: 'Weekly or monthly — flexible, no long-term lock-in',
    href: '/advertise',
    cta: 'Learn About Advertising',
    color: 'border-orange-200 bg-orange-50',
    tagColor: 'bg-orange-500',
  },
];

const cityList = ['Pune', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Delhi'];

const sharedPolicies = [
  {
    icon: '🛡️',
    title: 'Every partner is reviewed before confirmation',
    desc: 'No commercial relationship with Stranger Mingle is confirmed without a brand review for alignment with our community values and Safety Guidelines. This applies without exception.',
  },
  {
    icon: '🔒',
    title: 'Member data is never shared with partners',
    desc: 'Regardless of partnership type, no partner receives member names, contact details, or any personally identifiable information. Our Privacy Policy governs all member data.',
  },
  {
    icon: '🚫',
    title: 'Partners do not influence community content or events',
    desc: 'Commercial relationships do not give any partner editorial influence over Stranger Mingle content, event formats, host conduct, or community communications.',
  },
  {
    icon: '⚖️',
    title: 'No implied endorsement',
    desc: 'Any commercial association with Stranger Mingle does not constitute endorsement of a partner\'s products or services by Stranger Mingle or StrangerMingle.',
  },
];

export default function PartnerWithUsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Partner With Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Work With a Community That Indians Actually Trust
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Stranger Mingle is India&apos;s most trust-forward offline community platform — verified
            members, genuine social intent, and active presence across Pune, Mumbai, Bengaluru,
            Hyderabad, and Delhi. There are four distinct ways to work with us. Each one is
            evaluated individually. None of them are open to all categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#partnership-options"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-lg transition-colors"
            >
              Explore Partnership Options →
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.859L.054 23.077a.75.75 0 00.919.919l5.218-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.528-5.228-1.449l-.374-.223-3.879 1.099 1.099-3.879-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Not Sure? WhatsApp Us
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
              Not Every Brand Qualifies — Read This Before Reaching Out
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Every commercial relationship with Stranger Mingle is reviewed for alignment with
              our community values and Safety Guidelines. We do not work with dating apps,
              professional networking platforms, MLM schemes, gambling products, or political
              organisations — regardless of budget or approach. Our community&apos;s trust is the
              foundation of everything we build. We do not compromise it for commercial
              convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are — Context for Partners */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What You Are Partnering With
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Stranger Mingle is a community platform for platonic friendship — a brand of Salty
            Media Production (opc) Pvt Ltd. We organise verified, in-person events across five
            Indian metro cities for young adults who want to build a genuine social life offline.
            Every member is identity-verified. Every event is facilitated by a trained, vetted
            host. Every space we use is reviewed for safety before a single event is listed.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Our community is not an advertising audience. It is a group of real people who have
            chosen to trust this platform with something personal — their social lives. Any brand
            that works with us is in proximity to that trust. We take that responsibility
            seriously, and we expect our partners to as well.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {cityList.map((city) => (
              <div
                key={city}
                className="bg-gray-50 border border-gray-200 rounded-xl py-3 text-center"
              >
                <p className="font-semibold text-gray-900 text-sm">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Options */}
      <section id="partnership-options" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Four Ways to Work With Stranger Mingle
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Each path has a different depth, commitment level, and kind of value exchange.
              Read all four before deciding which conversation to start.
            </p>
          </div>
          <div className="space-y-6">
            {partnershipPaths.map((path) => (
              <div
                key={path.title}
                className={`border-2 rounded-xl p-6 sm:p-8 ${path.color}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="flex-shrink-0 text-4xl">{path.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`${path.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        {path.title}
                      </span>
                    </div>
                    <p className="text-gray-900 font-semibold text-base mb-2">{path.tagline}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{path.description}</p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-5">
                      <div className="bg-white rounded-lg p-3 border border-white">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Best For</p>
                        <p className="text-gray-700 text-xs leading-relaxed">{path.bestFor}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-white">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Commitment</p>
                        <p className="text-gray-700 text-xs leading-relaxed">{path.commitment}</p>
                      </div>
                    </div>
                    <Link
                      href={path.href}
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-md text-sm transition-colors"
                    >
                      {path.cta} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Policies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Every Partnership Has in Common
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              These commitments apply across every type of commercial relationship with Stranger
              Mingle — without exception and regardless of partnership type.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sharedPolicies.map((item) => (
              <div key={item.title} className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Helper */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Not Sure Which Path Is Right?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Use this as a quick guide. If you are still unsure after reading it, send us a
            WhatsApp message and describe what you are trying to achieve — we will point you
            in the right direction.
          </p>
          <div className="space-y-3">
            {[
              {
                condition: 'You own or manage a venue and want regular community bookings',
                path: 'Venue Partnership',
                href: '/venue-partnership',
              },
              {
                condition: 'You want your brand to be associated with a specific live event',
                path: 'Sponsor an Event',
                href: '/sponsor-an-event',
              },
              {
                condition: 'You want digital ad placements on strangermingle.com or the newsletter',
                path: 'Advertise With Us',
                href: '/advertise',
              },
              {
                condition: 'Your brand or cause has deep mission alignment with our community and you want a sustained relationship',
                path: 'Community & Brand Partnership',
                href: '/brand-partnership',
              },
              {
                condition: 'You want more than one of the above',
                path: 'WhatsApp us — we will design something appropriate',
                href: WA_LINK,
                external: true,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  <span className="font-semibold text-gray-400 mr-2">If:</span>
                  {item.condition}
                </p>
                <div className="flex-shrink-0">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md text-xs transition-colors whitespace-nowrap"
                    >
                      {item.path} →
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-xs transition-colors whitespace-nowrap"
                    >
                      {item.path} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start the Conversation?
          </h2>
          <p className="text-gray-300 text-lg mb-4">
            If you have read through this page and believe there is a genuine reason for your
            brand or venue to work with Stranger Mingle — reach out. Tell us who you are, what
            you do, and what kind of relationship you have in mind. We respond to every serious
            enquiry personally.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            If you already know which partnership path you want, head directly to that page for
            full details and a pre-structured enquiry. If you are unsure, send us a WhatsApp
            message and we will guide you from there.
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
            <a
              href="mailto:strangermingleteam@gmail.com?subject=Partnership Enquiry — [Brand Name]&body=Hi, I would like to enquire about partnering with Stranger Mingle.%0A%0ABrand or organisation name:%0AWhat you do:%0ACities you operate in:%0AType of partnership you are interested in:%0AAnything else:"
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
            · Subject: Partnership Enquiry — [Your Brand Name]
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          All commercial relationships with Stranger Mingle are governed by the standards of{' '}
          <span className="text-gray-600 font-medium">StrangerMingle</span>,
          our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          ,{' '}
          <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
            Safety Guidelines
          </Link>
          , and our{' '}
          <Link href="/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          . All partnerships are subject to review and approval at the sole discretion of
          StrangerMingle. Commercial association does not constitute
          endorsement of any product, service, or organisation.
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
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sponsor an Event | Stranger Mingle',
  description: 'Put your brand inside a real community moment. Sponsor a Stranger Mingle offline social event.',
  alternates: {
    canonical: '/sponsor-an-event',
  },
};
const WA_NUMBER = '917411820025';
const WA_MESSAGE = encodeURIComponent(
  'Hi, I would like to enquire about sponsoring a Stranger Mingle event. Here are my details:\n\nBrand name:\nProduct or service category:\nCity or cities of interest:\nType of event you want to sponsor:\nAnything else:'
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const whatSponsorshipIncludes = [
  {
    icon: '📋',
    title: 'Brand Name on the Event Listing',
    description:
      'Your brand appears as the named sponsor on the public event listing page on strangermingle.com for the full duration the event is live. Every member who views the listing sees your name.',
  },
  {
    icon: '📧',
    title: 'Mention in Event Emails',
    description:
      'Your brand is mentioned in the event confirmation email and the pre-event reminder email sent to all registered attendees. These are high open-rate, direct-to-inbox touchpoints.',
  },
  {
    icon: '🎙️',
    title: 'Single Host Acknowledgement at Event Start',
    description:
      'The verified Stranger Mingle host acknowledges your brand once at the start of the event — a brief, natural mention, not a promotional script. No stage time, no banners, no interruptions to the event experience.',
  },
  {
    icon: '🤝',
    title: 'Association with a Trusted Community Experience',
    description:
      'Your brand is connected to a real, in-person community event attended by verified, identity-confirmed members. This is not a logo on a banner at a crowded trade expo — it is association with a genuine shared experience.',
  },
];

const whatSponsorshipDoesNotInclude = [
  'Product placement, distribution, or sampling at the event venue',
  'Branded merchandise, banners, standees, or physical collateral at the event',
  'Promotional scripting, product pitches, or sales activity during the event',
  'Access to attendee contact details, names, or any member data',
  'The ability to influence event format, host conduct, or participant interactions',
  'Recurring or automatic sponsorship — each event is booked individually',
  'Any form of implied endorsement by Stranger Mingle or StrangerMingle',
];

const suitableBrands = [
  {
    category: 'Food & Beverage',
    why: 'Events often revolve around chai, coffee, and casual shared meals. Contextual alignment is natural.',
  },
  {
    category: 'Outdoor & Lifestyle',
    why: 'Trek and adventure events attract members who actively invest in quality gear and experiences.',
  },
  {
    category: 'Books, Games & Culture',
    why: 'Board game nights, heritage walks, and cultural events attract curious, engaged audiences.',
  },
  {
    category: 'Mental Health & Wellness',
    why: 'A community built around genuine human connection is a natural fit for wellness-forward brands — reviewed individually.',
  },
  {
    category: 'Local Venues & Experiences',
    why: 'Cafés, activity spaces, and experience venues can co-associate with the events that already happen near them.',
  },
];

const eventTypes = [
  { icon: '☕', name: 'Chai Circles & Social Meetups', cities: 'All cities' },
  { icon: '🎲', name: 'Board Game Nights', cities: 'All cities' },
  { icon: '🥾', name: 'Treks & Outdoor Walks', cities: 'Pune · Bengaluru · Hyderabad' },
  { icon: '🏛️', name: 'Heritage & Cultural Walks', cities: 'Mumbai · Delhi · Pune' },
  { icon: '🍽️', name: 'Food & Culture Outings', cities: 'All cities' },
  { icon: '🤲', name: 'Volunteering Events', cities: 'Pune · Mumbai' },
];

export default function SponsorAnEventPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Sponsor an Event
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Put Your Brand Inside a Real Community Moment
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Stranger Mingle events are small, in-person gatherings of verified members across
            Indian cities. When your brand sponsors one, it is not seen on a billboard — it is
            acknowledged inside a genuine shared experience. That association is rare, and it
            means something different.
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
              Enquire on WhatsApp
            </a>
            <a
              href="#what-you-get"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-lg transition-colors"
            >
              What Sponsorship Includes
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
              Event Sponsorship Has Strict Boundaries — Read This First
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Sponsoring a Stranger Mingle event is a brand association, not a commercial
              activation. There is no product sampling, no on-site promotional activity, no
              access to attendee data, and no influence over the event experience. Our members
              attend events to make genuine friends — not to be marketed to. Every sponsorship
              is reviewed before confirmation. Categories that conflict with our community values
              are rejected without exception.
            </p>
          </div>
        </div>
      </section>

      {/* What Event Sponsorship Is */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Event Sponsorship Is</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            A Stranger Mingle event sponsorship places your brand in a specific, real-world
            community context. You are named as the sponsor of a particular event — visible on
            the listing page, in the event emails sent to registered attendees, and acknowledged
            once by the host when the event begins.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            The events themselves are small — typically 15 to 30 verified members gathering for
            a chai circle, a trek, a board game night, or a cultural walk. These are not
            large-format activations. The value of a sponsorship here is not reach in the
            conventional sense. It is the quality of association — your brand placed inside a
            trusted, genuine community moment rather than in front of an anonymous audience.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We run events across Pune, Mumbai, Bengaluru, Hyderabad, and Delhi. You can sponsor
            a single event in one city or a series of events across multiple cities — each
            booked individually and subject to review.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section id="what-you-get" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Every Event Sponsorship Includes
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              These are the exact deliverables — no more, no less. Read them carefully before
              enquiring.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whatSponsorshipIncludes.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What It Does Not Include */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Event Sponsorship Does Not Include
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            These exclusions are not negotiable. They exist to protect the experience our members
            have come to trust. Any sponsor found attempting to exceed these boundaries will have
            their sponsorship terminated immediately without refund.
          </p>
          <div className="space-y-3">
            {whatSponsorshipDoesNotInclude.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4"
              >
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold border border-red-200">
                  ✕
                </span>
                <p className="text-red-800 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types Available to Sponsor */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types of Events Available to Sponsor
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Availability varies by city and month. Specific upcoming events open for
              sponsorship are shared after your initial enquiry.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventTypes.map((event) => (
              <div
                key={event.name}
                className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 shadow-sm"
              >
                <span className="text-3xl flex-shrink-0">{event.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{event.name}</p>
                  <p className="text-gray-400 text-xs mt-1">{event.cities}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suitable Brands */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Which Brands Are a Good Fit
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Event sponsorship works best when there is a natural, credible connection between
            your brand and the community or activity being sponsored. The following categories
            tend to be the strongest fit — though all brands are reviewed individually regardless
            of category.
          </p>
          <div className="space-y-4">
            {suitableBrands.map((item, i) => (
              <div
                key={i}
                className="bg-green-50 border border-green-100 rounded-xl p-5 flex items-start gap-4"
              >
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold border border-green-200">
                  ✓
                </span>
                <div>
                  <p className="font-semibold text-green-900 text-sm mb-1">{item.category}</p>
                  <p className="text-green-700 text-xs leading-relaxed">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-gray-500 text-sm leading-relaxed">
              Categories not accepted for event sponsorship include dating apps, professional
              networking platforms, MLM schemes, alcohol and tobacco brands, gambling products,
              and political or religious organisations. The same category policy that governs our
              digital advertising applies here. Refer to our{' '}
              <Link href="/advertise" className="text-blue-600 hover:underline">
                Advertise With Us
              </Link>{' '}
              page for the full accepted and rejected category list.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Event Sponsorship Works</h2>
            <p className="text-gray-500 text-lg">
              From your first message to the event going live — four steps.
            </p>
          </div>
          <div className="space-y-7">
            {[
              {
                number: '01',
                title: 'Send Us a WhatsApp Message',
                desc: 'Tell us your brand name, product category, the city or cities you are interested in, and the type of event you want to sponsor. We respond within 24–48 hours.',
              },
              {
                number: '02',
                title: 'Brand Review and Event Matching',
                desc: 'Our team reviews your brand for category eligibility and aligns you with suitable upcoming events. You are not committed to anything at this stage — we are simply confirming fit.',
              },
              {
                number: '03',
                title: 'Sponsorship Confirmation',
                desc: 'Once you confirm the event and complete the booking, your brand name is added to the event listing, event emails, and the host is briefed on the single acknowledgement at event start.',
              },
              {
                number: '04',
                title: 'Event Day and Post-Event Report',
                desc: 'The event runs as normal. After the event, you receive a brief post-event report with attendance numbers, city, and event type. No attendee-level data is included.',
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
          <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-blue-900 text-sm leading-relaxed">
              <strong>Lead time:</strong> Sponsorship must be confirmed at least 7 working days
              before the event date to allow time for listing updates, email inclusion, and host
              briefing. Last-minute sponsorship requests cannot be accommodated.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Event Sponsorship FAQ
          </h2>
          <div className="space-y-5">
            {[
              {
                q: 'Can we distribute product samples or branded materials at the event?',
                a: 'No. There is no on-site brand activation of any kind — no sampling, no distribution, no branded materials, no standees, no banners. The sponsorship is a digital and verbal acknowledgement only. Attempting to activate at the venue beyond what is agreed will result in immediate termination of the sponsorship.',
              },
              {
                q: 'Can we send a brand representative to the event?',
                a: 'No. Sponsors do not attend events in a brand capacity. If someone from your brand wishes to attend as a regular member, they are welcome to register through the standard event registration process — as an individual, not a representative.',
              },
              {
                q: 'Will we receive attendee contact details after the event?',
                a: 'No. Stranger Mingle does not share attendee names, contact details, or any member data with sponsors. The post-event report includes aggregate information only — event type, city, and approximate attendance.',
              },
              {
                q: 'Can we choose which specific event to sponsor?',
                a: 'Yes, within the events available at the time of your enquiry. We will share upcoming events open for sponsorship after your brand has been reviewed. You choose from what is available.',
              },
              {
                q: 'Can we sponsor multiple events at once?',
                a: 'Yes. You can sponsor multiple events across one or several cities. Each event is booked individually. A city-month package — covering all events in one city for one month — is also available for brands that want consistent presence in a specific metro.',
              },
              {
                q: 'What if we want to do more than what the sponsorship includes?',
                a: 'The scope of event sponsorship is fixed and non-negotiable. It cannot be expanded to include on-site activation, data access, or influence over the event experience. If your campaign objectives require more than this, event sponsorship is not the right fit for your brand.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-6">
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Interested in Sponsoring an Event?
          </h2>
          <p className="text-gray-300 text-lg mb-4">
            Send us a WhatsApp message with your brand name, product category, and the city or
            cities you are interested in. Our team will review your enquiry, confirm eligibility,
            and share available upcoming events within 24–48 hours.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Please read the sponsorship scope and category policy on this page before reaching
            out. Enquiries from ineligible categories will not receive a sponsorship offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md text-base transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.76-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.859L.054 23.077a.75.75 0 00.919.919l5.218-1.478A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.528-5.228-1.449l-.374-.223-3.879 1.099 1.099-3.879-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp Us — +91 74118 20025
            </a>
            <a
              href="mailto:strangermingleteam@gmail.com?subject=Event Sponsorship Enquiry — [Brand Name]&body=Hi, I would like to enquire about sponsoring a Stranger Mingle event.%0A%0ABrand name:%0AProduct or service category:%0ACity or cities of interest:%0AType of event you want to sponsor:%0AAnything else:"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-base transition-colors"
            >
              Enquire via Email
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Also interested in digital placements on strangermingle.com?{' '}
            <Link href="/advertise" className="text-gray-300 hover:text-white underline">
              See our Advertise With Us page.
            </Link>
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Event sponsorship with Stranger Mingle is governed by the advertising and sponsorship
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
          . All sponsorships are subject to brand review and approval. Stranger Mingle reserves
          the right to reject any sponsor or terminate any sponsorship at its sole discretion.
          Sponsorship does not constitute endorsement of any product or service.
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
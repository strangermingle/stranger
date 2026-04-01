import Link from 'next/link';

const WA_NUMBER = '917411820025';
const WA_MESSAGE = encodeURIComponent(
  'Hi, I would like to enquire about a Venue Partnership with Stranger Mingle. Here are my details:\n\nVenue name:\nVenue type (café, activity space, rooftop, etc.):\nCity:\nCapacity (approximate):\nAvailability (days/times):\nAnything else:'
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const whatVenueGets = [
  {
    icon: '📍',
    title: 'Listed as a Preferred Venue',
    description:
      'Your venue is named in the relevant event listings on strangermingle.com. Every member who browses that event sees your venue name, location, and any relevant details before registering. For recurring event formats in your city, this becomes consistent, ongoing visibility.',
  },
  {
    icon: '📧',
    title: 'Mentioned in Event Communications',
    description:
      'Your venue details are included in event confirmation emails and pre-event reminder emails sent to registered attendees. Members arrive knowing exactly where they are going — and that it is a Stranger Mingle-approved space.',
  },
  {
    icon: '🔄',
    title: 'Recurring Business from a Verified Community',
    description:
      'Stranger Mingle events are regular, not one-off. A venue partner in good standing can expect consistent bookings tied to our event calendar. Our members are verified, non-disruptive, and arrive with a shared social purpose — they are among the easiest groups a hospitality venue can host.',
  },
  {
    icon: '🤝',
    title: 'Association with a Trusted Brand',
    description:
      'Being a Stranger Mingle venue carries its own signal. Our community has a strong reputation for safety, inclusion, and genuine social intent. Members who discover your venue through us arrive with positive prior associations already in place.',
  },
];

const whatWeRequire = [
  {
    icon: '🏛️',
    title: 'A Public, Accessible Location',
    description:
      'All Stranger Mingle events must be held in public, accessible venues. Private residences, closed offices, restricted-access spaces, and venues without clearly defined emergency exits are not eligible — under any circumstances.',
  },
  {
    icon: '👥',
    title: 'Capacity for 15 to 30 People',
    description:
      'Our events run in small groups — typically 15 to 30 members. The venue must be able to seat or accommodate this group comfortably in a dedicated or semi-dedicated space, without the event feeling either cramped or lost in a large crowd.',
  },
  {
    icon: '🛡️',
    title: 'A Safe, Inclusive Environment',
    description:
      'The venue must be safe and welcoming for all members regardless of gender, caste, religion, skin colour, or economic background. Venues with a history of discrimination, harassment incidents, or safety failures are not eligible. Our zero-tolerance standards extend to every space we associate with.',
  },
  {
    icon: '🔇',
    title: 'A Workable Environment for Conversation',
    description:
      'Events involve structured conversation and facilitated group activities. The designated event space must allow participants to hear each other comfortably for the duration of the session.',
  },
  {
    icon: '📋',
    title: 'Agreement to Our Event Standards',
    description:
      'Venue partners must agree to and support our Safety Guidelines and community standards. This includes allowing our verified host full operational authority over the event space for the duration of the event, including the right to ask a participant to leave.',
  },
];

const venueTypes = [
  { icon: '☕', label: 'Cafés & Coffee Shops', desc: 'The natural home of a chai circle. Dedicated seating areas, good acoustics, and a relaxed atmosphere.' },
  { icon: '🎲', label: 'Board Game Cafés', desc: 'Already set up for structured social play. A natural fit for game night formats.' },
  { icon: '🏙️', label: 'Rooftop Spaces', desc: 'Ideal for evening events in warmer months. Works well in Pune, Mumbai, and Hyderabad.' },
  { icon: '📚', label: 'Bookstores & Cultural Spaces', desc: 'For heritage walks, reading events, and cultural discussion formats.' },
  { icon: '🌳', label: 'Community Parks & Outdoor Spaces', desc: 'For morning meetups, casual walks, and low-key social gatherings in accessible public areas.' },
  { icon: '🎨', label: 'Activity & Experience Centres', desc: 'Art studios, pottery spaces, cooking workshops — venues where doing something together is the point.' },
];

const notSuitable = [
  'Private residences, farmhouses, or any non-public space',
  'Venues with a capacity below 15 or structured specifically for large crowds above 50',
  'Venues without clearly marked emergency exits and basic safety infrastructure',
  'Spaces with persistent high noise levels that prevent normal conversation',
  'Venues with any history of harassment, safety violations, or discriminatory incidents',
  'Venues that cannot provide a dedicated or semi-dedicated event space for the group',
  'Venues that require attendees to make a purchase as a condition of entry',
];

export default function VenuePartnershipPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Venue Partnership
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Become a Stranger Mingle Venue Partner
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            We bring a verified, paying community to your space on a regular basis. You provide
            a safe, accessible environment where genuine friendships can form. A Venue
            Partnership is the most grounded commercial relationship we offer — built on
            repeated, real-world presence rather than digital impressions.
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
              Enquire on WhatsApp
            </a>
            <a
              href="#requirements"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-lg transition-colors"
            >
              Venue Requirements
            </a>
          </div>
        </div>
      </section>

      {/* Important Context */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto flex gap-4 items-start">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-amber-900 font-semibold text-base mb-1">
              Venue Partnerships Are Evaluated on Safety and Suitability — Not Just Availability
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Every venue is assessed against our safety standards and community guidelines
              before any event is confirmed there. A venue that does not meet our requirements
              will not be approved regardless of location, pricing, or availability. The safety
              and comfort of our members takes precedence over operational convenience — always.
            </p>
          </div>
        </div>
      </section>

      {/* What a Venue Partnership Is */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What a Venue Partnership Means in Practice
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            A Stranger Mingle Venue Partnership is a formal, ongoing arrangement in which your
            venue hosts Stranger Mingle events on a recurring basis. Your space becomes the
            named, approved location for specific event formats in your city — and in exchange,
            you receive consistent bookings from a verified, paying community of young urban
            Indians who are actively investing in their social lives.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            This is different from a one-off venue hire. It is a named partnership — your venue
            is associated with Stranger Mingle in our event listings, our member communications,
            and our city pages. Members who attend events at your space once are likely to
            return, because the event format repeats and the community grows around a consistent
            set of spaces.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Every event at a partner venue is facilitated by a trained, verified Stranger Mingle
            host. The host has full operational authority over the event for its duration —
            including the authority to manage the group, enforce our safety guidelines, and,
            where necessary, ask someone to leave. Venue partners agree to support this
            authority as a condition of the partnership.
          </p>
        </div>
      </section>

      {/* What the Venue Gets */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What a Venue Partner Receives</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              The value of this partnership is practical and ongoing — not a one-time marketing
              placement.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whatVenueGets.map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Requirements */}
      <section id="requirements" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Require from a Venue Partner
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              These are the minimum standards every partner venue must meet. They are assessed
              during the venue review and maintained throughout the partnership. A venue that
              falls below these standards at any point will have the partnership suspended
              pending resolution.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whatWeRequire.map((item) => (
              <div key={item.title} className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suitable Venue Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types of Venues That Work Well
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              These are the venue types that consistently work for Stranger Mingle events.
              This list is illustrative — if your venue is different but meets our requirements,
              we still want to hear from you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {venueTypes.map((type) => (
              <div
                key={type.label}
                className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 shadow-sm"
              >
                <span className="text-3xl flex-shrink-0">{type.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{type.label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not Suitable */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Venues That Are Not Eligible
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            The following venue types and conditions are not eligible for a Stranger Mingle
            Venue Partnership. These are not preferences — they are policy requirements rooted
            in our Safety Guidelines and the standards our members rightly expect from every
            event space.
          </p>
          <div className="space-y-3">
            {notSuitable.map((item, i) => (
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

      {/* Cities */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Cities Where We Are Actively Looking for Venue Partners
          </h2>
          <p className="text-gray-500 mb-6">
            We are currently active in these cities and have an ongoing need for quality venue
            partners in each. If your venue is in a city not listed here, get in touch anyway
            — we may be expanding to your location sooner than expected.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {[
              { city: 'Pune', note: 'Most active — multiple formats running' },
              { city: 'Mumbai', note: 'Growing rapidly' },
              { city: 'Bengaluru', note: 'Active and expanding' },
              { city: 'Hyderabad', note: 'Active and expanding' },
              { city: 'Delhi', note: 'Launching' },
            ].map((item) => (
              <div
                key={item.city}
                className="px-5 py-3 bg-white border border-gray-200 rounded-xl text-center shadow-sm"
              >
                <p className="font-semibold text-gray-900 text-sm">{item.city}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.note}</p>
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
              How the Venue Partnership Process Works
            </h2>
            <p className="text-gray-500 text-lg">
              From your first message to your first event — five steps.
            </p>
          </div>
          <div className="space-y-7">
            {[
              {
                number: '01',
                title: 'Send Us a WhatsApp Message',
                desc: 'Tell us your venue name, venue type, city, approximate capacity, and your general availability for events. We respond within 24–48 hours.',
              },
              {
                number: '02',
                title: 'Initial Suitability Review',
                desc: 'Our team reviews your venue details against our requirements — location, capacity, venue type, and city activity. We may ask follow-up questions or request photos of the event space.',
              },
              {
                number: '03',
                title: 'Venue Visit or Virtual Walkthrough',
                desc: 'For venues that pass the initial review, we arrange either a physical visit by a team member or a brief video walkthrough of the event space. This step is non-negotiable — we do not approve venues we have not seen.',
              },
              {
                number: '04',
                title: 'Partnership Agreement',
                desc: 'Approved venues receive a formal Venue Partnership Agreement outlining booking terms, event frequency expectations, host authority, safety requirements, and the scope of listing and communication benefits.',
              },
              {
                number: '05',
                title: 'First Event and Ongoing Partnership',
                desc: 'Your first Stranger Mingle event is scheduled and listed with your venue details. The partnership is reviewed quarterly — consistent quality and safety standards are required to maintain active partner status.',
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
            Venue Partnership FAQ
          </h2>
          <div className="space-y-5">
            {[
              {
                q: 'Does Stranger Mingle pay for venue hire?',
                a: 'Commercial terms — including whether and how venue hire is compensated — are discussed and agreed as part of the Venue Partnership Agreement. Terms vary based on the city, event format, frequency, and the specific arrangement that works for both parties. Pricing is not published on this page and is discussed directly during the partnership review process.',
              },
              {
                q: 'Do we need to have staff available during the event?',
                a: 'Venue staff should be available as they would be during normal operations — for safety, service, and venue management. You do not need to dedicate specific staff to facilitate the event itself. Our verified host handles all event facilitation for the full duration.',
              },
              {
                q: 'Can we promote our venue\'s other services to Stranger Mingle members at the event?',
                a: 'No. Events are for community connection, not commercial promotion. Venue staff should not use the event as an opportunity to market products, services, loyalty programmes, or offers to attendees. Our host has the authority to redirect or stop any promotional activity during the event.',
              },
              {
                q: 'What happens if there is a safety incident at the venue during an event?',
                a: 'Our host is trained to handle safety concerns and is the first point of response for anything that occurs during the event. Venue staff should support the host and follow standard emergency protocols. After the event, all incidents are reported to the Stranger Mingle team. Repeated safety failures at a venue result in suspension of the partnership.',
              },
              {
                q: 'Can the venue request a minimum spend from attendees?',
                a: 'No. Attendees cannot be required to make a purchase as a condition of attending the event. Events are registered and paid for through the Stranger Mingle platform.',
              },
              {
                q: 'How many events per month can we expect?',
                a: 'This varies by city and event format. Frequency is agreed as part of the partnership terms and reviewed quarterly. Active cities can expect anywhere from two to eight events per month across different formats. We do not overcommit on frequency during the onboarding stage.',
              },
              {
                q: 'Can we end the partnership if it is not working for us?',
                a: 'Yes. Either party can end the partnership with reasonable notice, as specified in the Venue Partnership Agreement. We ask for a minimum of 15 days notice for any events already listed and confirmed at your venue. Abrupt cancellations that disrupt confirmed events are taken seriously.',
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

      {/* Other Partnership Options */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Other Ways to Work with Stranger Mingle
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            A venue partnership is the most operationally involved relationship we offer. If
            you are looking for something different, these pages cover the other ways brands
            and organisations can work with us.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🤝',
                title: 'Community & Brand Partnership',
                desc: 'A longer-term, mission-aligned relationship for brands with genuine community overlap.',
                href: '/brand-partnership',
              },
              {
                icon: '🎪',
                title: 'Sponsor an Event',
                desc: 'Named association with a specific Stranger Mingle event — listing, emails, and a host mention.',
                href: '/sponsor-an-event',
              },
              {
                icon: '📱',
                title: 'Advertise With Us',
                desc: 'Digital ad placements on strangermingle.com — homepage, events page, city pages, blog, and newsletter.',
                href: '/advertise',
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow group"
              >
                <span className="text-3xl flex-shrink-0">{card.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    {card.title} →
                  </p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Is Your Venue the Right Space for Stranger Mingle?
          </h2>
          <p className="text-gray-300 text-lg mb-4">
            If your venue is public, accessible, safe, and within our active cities — and you
            can comfortably host groups of 15 to 30 people — we want to hear from you. Send
            us a WhatsApp message with your venue details and we will respond within 24–48 hours.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Please include your venue name, venue type, city, approximate capacity, and your
            general availability. The more detail you share upfront, the faster we can assess
            the fit.
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
              href="mailto:strangermingleteam@gmail.com?subject=Venue Partnership Enquiry — [Venue Name]&body=Hi, I would like to enquire about a Venue Partnership with Stranger Mingle.%0A%0AVenue name:%0AVenue type:%0ACity:%0AApproximate capacity:%0AAvailability (days/times):%0AAnything else:"
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
            · Subject: Venue Partnership Enquiry — [Your Venue Name]
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Venue partnerships with Stranger Mingle are governed by a formal Venue Partnership
          Agreement with{' '}
          <span className="text-gray-600 font-medium">Salty Media Production (opc) Pvt Ltd</span>,
          our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          , and our{' '}
          <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
            Safety Guidelines
          </Link>
          . All venue partnerships are subject to review and approval. Stranger Mingle reserves
          the right to decline or terminate any venue partnership at its sole discretion.
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
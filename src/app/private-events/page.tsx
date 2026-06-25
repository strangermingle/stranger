import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Private Group Events',
    description: 'Book a private, structured social experience for your close-knit group, college alumni, or community interest group. Facilitated by a verified host.',
    alternates: {
        canonical: '/private-events',
    },
    openGraph: {
        title: 'Private Group Events',
        description: 'Book a private, structured social experience for your close-knit group, college alumni, or community interest group. Facilitated by a verified host.',
        url: '/private-events',
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
const eventTypes = [
  {
    icon: '🏘️',
    title: 'Apartment Complex & Housing Society Gatherings',
    description:
      'You live 10 feet from your neighbours and still don\'t know their names. A private Stranger Mingle event for your building or society changes that — one structured evening at a time. We design sessions where residents actually meet each other in a relaxed, facilitated setting.',
    examples: ['Rooftop chai circle for 20–25 residents', 'Board game night in the common area', 'Building-wide Sunday morning walkathon'],
  },
  {
    icon: '🎓',
    title: 'College Alumni Reconnect Events',
    description:
      'Your batch is scattered across five cities and the WhatsApp group is the only evidence you were ever friends. A private event brings together whoever is in the same city now — for a real, unhurried afternoon of catching up without the chaos of a large reunion.',
    examples: ['Batch reunion chai circle in Pune or Bengaluru', 'Casual board game evening for 15–20 batchmates', 'Half-day heritage walk with your old college crowd'],
  },
  {
    icon: '👥',
    title: 'Close-Knit Social Groups',
    description:
      'A group of friends who want a structured, properly organised social experience without doing all the planning themselves. You bring the people — we bring the format, the facilitation, and the energy that makes a gathering actually feel like an event.',
    examples: ['Structured game night for an existing friend group of 15–25', 'A facilitated conversation evening with ice-breakers and activities', 'A group trek with professional coordination and safety briefing'],
  },
  {
    icon: '🌱',
    title: 'Community Interest Groups',
    description:
      'Book clubs that want a single well-organised session. Volunteer circles that want to combine service with genuine bonding. Hobby communities — cycling groups, photography enthusiasts, readers — who want a facilitated gathering rather than a casual meetup.',
    examples: ['A structured gathering for an existing cycling or trekking circle', 'A book discussion evening with facilitator support', 'A volunteer group bonding session before or after community work'],
  },
];

const whatWeProvide = [
  {
    icon: '🗺️',
    title: 'Event Format and Structure',
    description:
      'We design a session format suited to your group size, the nature of your gathering, and the outcome you want. Every private event follows a Stranger Mingle-approved format with structured ice-breakers, facilitated activities, and a clear flow.',
  },
  {
    icon: '🛡️',
    title: 'A Verified Host',
    description:
      'Every private event is conducted by a trained, verified Stranger Mingle host. Your group gets the same standard of facilitation and safety oversight as any public Stranger Mingle event — without exception.',
  },
  {
    icon: '📋',
    title: 'Safety Briefing and Guidelines',
    description:
      'Our host conducts a standard safety briefing at the start of every event. Our zero-harassment policy and community guidelines apply fully to private events. These are non-negotiable conditions of every booking.',
  },
  {
    icon: '📍',
    title: 'Venue Guidance',
    description:
      'We help you identify suitable public venues in your city that fit your group size and activity. All private Stranger Mingle events must be held in public, accessible locations — not private residences.',
  },
  {
    icon: '🤝',
    title: 'Group Coordination Support',
    description:
      'We manage pre-event communication, logistics, and registration for your group members. You do not have to chase RSVPs or manage headcounts — we handle the operational side so you can focus on showing up.',
  },
  {
    icon: '💬',
    title: 'Post-Event Check-In',
    description:
      'After your event, our team follows up with a short feedback survey and, where appropriate, resources to help your group stay connected independently going forward.',
  },
];

const hardBoundaries = [
  {
    label: 'No corporate team-building or company events',
    detail:
      'Private Group Events are not available for organisations, companies, startups, or HR departments. We do not conduct corporate team-building, employee engagement, or company social events. Our platform is for personal, non-commercial community building only.',
  },
  {
    label: 'No business networking or lead generation',
    detail:
      'Private events cannot be used to network professionally, generate leads, promote services, or advance any commercial agenda. Any attempt to use a private event for business purposes will result in immediate cancellation without refund.',
  },
  {
    label: 'No private residences',
    detail:
      'All Stranger Mingle private group events must take place at public, accessible venues. Homes, private offices, farmhouses, or any non-public space are not permitted under any circumstances.',
  },
  {
    label: 'No romantic or dating facilitation',
    detail:
      'Private events cannot be framed, positioned, or used as singles meetups, speed dating events, or romantic matchmaking gatherings. Stranger Mingle is a platonic friendship community. This applies to private events in exactly the same way it applies to our public events.',
  },
  {
    label: 'No events for more than 30 participants',
    detail:
      'Our maximum group size for any single Stranger Mingle event — private or public — is 30 people. This is a quality and safety standard, not a logistical preference. Events above this threshold are not bookable.',
  },
  {
    label: 'No bypassing the verified host requirement',
    detail:
      'You cannot self-facilitate a private event under the Stranger Mingle name. Every private event must have a verified Stranger Mingle host present for its full duration. If you want to facilitate your own event, apply to become a verified host first.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Submit Your Enquiry',
    description:
      'Write to us at strangermingleteam@gmail.com with the subject line "Private Group Event Enquiry". Tell us your city, the nature of your group, approximate headcount, preferred dates, and the kind of experience you are looking for.',
  },
  {
    number: '02',
    title: 'Review and Fit Assessment',
    description:
      'Our team reviews your enquiry to confirm that your group and event purpose align with our values and policies. We may ask a few clarifying questions. If the event is not a fit for our platform, we will tell you honestly and promptly.',
  },
  {
    number: '03',
    title: 'Format Design and Proposal',
    description:
      'For confirmed enquiries, we propose a session format, suggest suitable public venues in your city, and share pricing and availability. You are under no obligation until you confirm the booking.',
  },
  {
    number: '04',
    title: 'Booking Confirmation and Payment',
    description:
      'Once you approve the format and logistics, a booking confirmation is issued. Payment is required to secure your date. All bookings are subject to our Terms of Service and Refund Policy.',
  },
  {
    number: '05',
    title: 'Pre-Event Coordination',
    description:
      'Our team handles member registration, sends event reminders, and ensures your group has everything they need before the day. Your assigned verified host connects with you 48 hours before the event.',
  },
  {
    number: '06',
    title: 'The Event',
    description:
      'Your verified host arrives early, sets up the space, conducts a brief safety briefing, and facilitates the session from start to finish. You show up as a participant — not an organiser. We take care of the rest.',
  },
];

const faqs = [
  {
    q: 'Can my company book a private event for our team?',
    a: 'No. Private Group Events are for personal, non-commercial social groups only — not companies, startups, NGOs, or any organisation. We do not provide corporate team-building or employee engagement events. If you are enquiring on behalf of a company or employer, this programme is not available to you.',
  },
  {
    q: 'What is the minimum group size for a private event?',
    a: 'The minimum is 10 participants and the maximum is 30. Below 10, a private booking is typically not the right format — we would suggest attending one of our public events together instead.',
  },
  {
    q: 'Can we choose our own venue?',
    a: 'Yes, subject to approval. The venue must be a public, accessible location in your city — a café, park, community space, or similar. Private residences, offices, and closed commercial spaces are not permitted. If you are unsure whether a venue qualifies, share it with us during the enquiry stage and we will confirm.',
  },
  {
    q: 'Can I facilitate the event myself without a Stranger Mingle host?',
    a: 'No. Every private event conducted under the Stranger Mingle name must be facilitated by a trained, verified Stranger Mingle host. This is a non-negotiable quality and safety standard. If you would like to facilitate your own events, you can apply to become a verified host through our host application process.',
  },
  {
    q: 'What happens if a participant misbehaves at a private event?',
    a: 'The same zero-tolerance policy that applies to all Stranger Mingle events applies here. The host has full authority to remove any participant immediately. Depending on the severity, the individual may be permanently banned from the platform. StrangerMingle reserves the right to take further action in accordance with our Terms of Service.',
  },
  {
    q: 'What is the pricing for private group events?',
    a: 'Pricing is determined based on the event format, duration, city, and group size. A detailed proposal with transparent pricing is shared after the initial enquiry review. There are no hidden charges. All fees go towards host facilitation, venue support, and platform operations.',
  },
  {
    q: 'Can we request a specific event format — like a trek or a board game night?',
    a: 'Yes. We offer a range of approved formats including chai circles, board game evenings, heritage walks, casual social meetups, and facilitated conversation sessions. Format availability varies by city. Share your preferences during the enquiry stage and we will design a session that fits.',
  },
  {
    q: 'What is the refund policy for private events?',
    a: 'Private event bookings follow our standard refund terms with some modifications for custom bookings. Full details are provided at the time of booking confirmation. Broadly: cancellations with more than 72 hours notice are eligible for full refund or credit. Cancellations under 72 hours are non-refundable. No-show groups receive no refund.',
  },
];

export default function PrivateGroupEventsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Private Group Events
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            A Stranger Mingle Experience — Just for Your Group
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            For close-knit groups, alumni circles, and community gatherings that want a properly
            structured, safely facilitated social experience — without the open registration of a
            public event. Small groups only. Public venues only. Always facilitated by a verified
            Stranger Mingle host.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#enquire"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-lg transition-colors"
            >
              Enquire About Your Event →
            </a>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-lg transition-colors"
            >
              See Public Events
            </Link>
          </div>
        </div>
      </section>

      {/* Critical Disclaimer */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto flex gap-4 items-start">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-amber-900 font-semibold text-base mb-1">
              Private Group Events Are for Personal Social Groups — Not Companies or Organisations
            </p>
            <p className="text-amber-800 text-sm leading-relaxed">
              Stranger Mingle does not offer corporate team-building, employee engagement, or any
              event for companies, startups, NGOs, or institutions. Private Group Events are strictly
              for personal, non-commercial social groups. Events cannot be used for business
              networking, product promotion, professional lead generation, or romantic matchmaking.
              These conditions are absolute and governed by our{' '}
              <Link href="/terms" className="underline text-amber-900 font-medium hover:text-amber-700">
                Terms of Service
              </Link>
              . Bookings made under false premises will be cancelled without refund.
            </p>
          </div>
        </div>
      </section>

      {/* What Is a Private Group Event */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What Is a Stranger Mingle Private Group Event?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            A Private Group Event is a closed, curated gathering designed exclusively for a
            specific group of people who already have a pre-existing connection — whether that is
            a shared building, a college batch, a hobby circle, or a long-standing group of
            friends. Unlike our public events, which are open to any verified member, a private
            event is accessible only to the people you invite.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            The experience is the same as a public Stranger Mingle event in every way that
            matters: a verified host, a structured format, a safe and inclusive environment, and
            the same zero-tolerance policy for harassment. What changes is the guest list —
            which is entirely your own.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Private Group Events are ideal when you want a genuinely well-run social experience
            for a specific group of people, without managing the logistics yourself — and without
            the event being open to the general public.
          </p>
        </div>
      </section>

      {/* Suitable Event Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Kinds of Groups Can Book a Private Event?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Private bookings are open to personal, non-commercial social groups that align with
              Stranger Mingle&apos;s values. Below are the kinds of groups we work with.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {eventTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
              >
                <div className="text-3xl mb-4">{type.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{type.description}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Example Formats
                  </p>
                  <ul className="space-y-1">
                    {type.examples.map((ex, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-0.5 flex-shrink-0 text-blue-500 font-bold">→</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Every Booking Includes</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Every private group event booking comes with the following as standard. There are no
              stripped-down tiers or upsells.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeProvide.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hard Boundaries */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Private Group Events Cannot Be Used For
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Stranger Mingle&apos;s platform policies apply in full to every private event. The
            following are absolute boundaries — not suggestions — and are enforced without
            exception.
          </p>
          <div className="space-y-4">
            {hardBoundaries.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-red-100 rounded-xl p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-xs font-bold border border-red-200">
                    ✕
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-500 leading-relaxed">
            Bookings found to be in violation of these conditions will be cancelled immediately,
            without refund, and the booking party may be permanently banned from the platform.
            Refer to our{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
              Safety Guidelines
            </Link>{' '}
            for the full policy framework.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Book a Private Group Event</h2>
            <p className="text-gray-500 text-lg">
              The process is straightforward. From initial enquiry to your event date, here is
              exactly what to expect.
            </p>
          </div>
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white font-bold text-lg rounded-full flex items-center justify-center">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-blue-900 text-sm leading-relaxed">
              <strong>Lead time:</strong> We require a minimum of 10 working days between your
              booking confirmation and the event date to ensure proper host assignment, venue
              coordination, and participant onboarding. Enquiries with less than 10 days&apos; notice
              cannot be guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cities We Currently Operate In</h2>
          <p className="text-gray-500 mb-6">
            Private Group Events are available in cities where Stranger Mingle has verified hosts.
            Currently, we can facilitate private events in:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Pune', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Delhi'].map((city) => (
              <span
                key={city}
                className="px-5 py-2 bg-white border border-gray-200 rounded-full text-gray-700 font-medium text-sm shadow-sm"
              >
                {city}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Don&apos;t see your city? Write to us anyway — we are expanding our verified host network
            actively and may be able to accommodate your location.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Frequently Asked Questions About Private Events
          </h2>
          <div className="space-y-5">
            {faqs.map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section id="enquire" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Enquire?</h2>
          <p className="text-gray-300 text-lg mb-4">
            Write to us with your group&apos;s details and we will respond within 48–72 hours. Please
            include your city, group type, approximate headcount, and any preferred dates or
            activity formats.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Enquiries that do not meet our eligibility criteria — including corporate bookings,
            groups exceeding 30 people, or events intended for business or promotional purposes —
            will not be accepted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a rel="nofollow"
              href="mailto:strangermingleteam@gmail.com?subject=Private Group Event Enquiry — [Your City]&body=Hi, I would like to enquire about booking a private group event. Here are the details:%0A%0ACity:%0AGroup type:%0AApproximate headcount:%0APreferred dates:%0AEvent format preference:%0AAnything else we should know:"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-base transition-colors"
            >
              Send Your Enquiry
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-base transition-colors"
            >
              Contact Us First
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Email:{' '}
            <a rel="nofollow"
              href="mailto:strangermingleteam@gmail.com"
              className="text-gray-300 hover:text-white underline"
            >
              strangermingleteam@gmail.com
            </a>{' '}
            · Subject line: Private Group Event Enquiry — [Your City]
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Stranger Mingle is a brand of{' '}
          <span className="text-gray-600 font-medium">StrangerMingle</span>.
          All private group event bookings are governed by our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          ,{' '}
          <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
            Safety Guidelines
          </Link>
          , and internal event policies. Private Group Events are for personal, non-commercial
          social gatherings only. This service is not available to companies or organisations.
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
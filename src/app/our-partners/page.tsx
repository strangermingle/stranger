import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Partners',
    description: 'Who helps us build real community. Meet the venue and experience partners that support Stranger Mingle events.',
    alternates: {
        canonical: '/our-partners',
    },
    openGraph: {
        title: 'Our Partners',
        description: 'Who helps us build real community. Meet the venue and experience partners that support Stranger Mingle events.',
        url: '/our-partners',
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
// ─── Data ────────────────────────────────────────────────────────────────────

const partnerCategories = [
  {
    id: 'venue',
    label: 'Venue Partners',
    icon: '🏛️',
    description:
      'Cafés, co-working spaces, parks, and cultural venues that open their doors to host Stranger Mingle events. They provide the physical space that makes real connections possible.',
  },
  {
    id: 'experience',
    label: 'Experience Partners',
    icon: '🎲',
    description:
      'Board game libraries, heritage walk curators, trek organisers, and activity providers whose offerings power our structured event formats.',
  },
  {
    id: 'community',
    label: 'Community Supporters',
    icon: '🌱',
    description:
      'Organisations aligned with mental wellness, social inclusion, and urban belonging — whose values mirror our mission of genuine human connection.',
  },
];

const partnershipPrinciples = [
  {
    icon: '🚫',
    title: 'No Promotions at Events',
    description:
      'Partners do not get access to our members for selling, pitching, or advertising. Our events are not marketing channels. No flyers, no pitches, no product placement — ever.',
  },
  {
    icon: '🤝',
    title: 'Mission Alignment First',
    description:
      'We partner only with organisations whose purpose supports safe social spaces, community building, or meaningful experiences. Commercial fit alone is not enough.',
  },
  {
    icon: '🛡️',
    title: 'Member Safety Always',
    description:
      'Venue and experience partners are evaluated for their own safety standards. Any partner that compromises member safety or comfort is removed immediately.',
  },
  {
    icon: '🔍',
    title: 'Transparent & Disclosed',
    description:
      'All partnerships are disclosed on this page. Members always know who we work with. We do not accept undisclosed sponsorships or hidden commercial arrangements.',
  },
  {
    icon: '❌',
    title: 'No MLM or Schemes',
    description:
      'We do not partner with direct-sales companies, MLM networks, business opportunity schemes, or any entity that would use our platform to recruit or solicit members.',
  },
  {
    icon: '🏙️',
    title: 'Local & Contextual',
    description:
      'We prioritise partners rooted in the same cities we operate in. Hyper-local partners understand the communities we serve and build more genuine relationships.',
  },
];

// currentPartners was unused and removed

const partnerFAQs = [
  {
    q: 'Can our brand sponsor a Stranger Mingle event?',
    a: "We evaluate partnership requests case by case. Sponsorships are only considered from organisations whose purpose genuinely supports community building, social safety, or meaningful experiences. Commercial sponsors who want access to our members for promotion are not a fit. If you believe your organisation aligns with our values, reach out and tell us why.",
  },
  {
    q: 'What do partners get in return?',
    a: "Venue partners receive visibility on this page and acknowledgement in event descriptions. Experience partners collaborate on event formats that benefit both communities. There are no guaranteed leads, no member data, and no promotional access. Our partnership is a relationship of shared values — not a transactional ad placement.",
  },
  {
    q: 'We run a wellness / mental health brand. Can we partner?',
    a: "Possibly. Organisations working in genuine mental wellness, social inclusion, or community well-being are among the types of partners we might work with — provided the collaboration doesn't involve promotions at events, solicitation of members, or any form of commercial exploitation of our community.",
  },
  {
    q: 'Does Stranger Mingle take money from sponsors?',
    a: "We may accept support in the form of venue subsidies, experience credits, or operational support from aligned partners — not in exchange for member access or promotional privilege, but in support of running better events. All financial arrangements are disclosed.",
  },
  {
    q: 'Can I use a Stranger Mingle event to promote my business?',
    a: "No. This is explicitly prohibited under our Terms of Service and Safety Guidelines. Our events are not networking events, business forums, or marketing opportunities. Members who use events to promote their business or services will be removed from the platform.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PartnerSponsorShowcasePage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Hero ── */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Partners & Supporters
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Who Helps Us Build Real Community
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Stranger Mingle is independent, community-focused, and non-commercial. The partners
            on this page support our mission — not the other way around. Every relationship here
            exists because it makes our events better for members, not because money changed hands
            for promotional access.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Our members come to events to make friends — not to be sold to. This page exists so
            you know exactly who we work with and why.
          </p>
        </div>
      </section>

      {/* ── What We Mean by Partner ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What &quot;Partner&quot; Means at Stranger Mingle
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            We use the word carefully. A Stranger Mingle partner is an organisation that supports
            the delivery of better, safer, more meaningful events — by providing spaces, activities,
            or community-level collaboration.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            A partner is <strong className="text-gray-900">not</strong> an advertiser. Partners
            do not get speaking slots at events. They do not receive member data. They do not hand
            out flyers or pitch their services to attendees. Stranger Mingle events are built
            around human connection — commercial interests have no place inside them.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            If you&apos;ve attended a Stranger Mingle event and felt like you were being marketed to,
            that is a violation of our guidelines — please report it to{' '}
            <a rel="nofollow" href="mailto:strangermingleteam@gmail.com" className="text-blue-600 hover:underline">
              strangermingleteam@gmail.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Partnership Categories ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Partners We Work With</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We keep it to three categories — each one directly tied to delivering better events,
              not broader commercial reach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="text-3xl mb-4">{cat.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cat.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Partnership Principles ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partnership Principles</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              These are non-negotiable. Any arrangement that conflicts with these principles will
              not happen — regardless of the financial benefit to us.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipPrinciples.map((p) => (
              <div
                key={p.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="text-2xl mb-3">{p.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current Partners ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Partners</h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              This page is updated as partnerships are formalised. All listed partners have been
              reviewed against our principles and agreed to our code of conduct for partner
              organisations.
            </p>
          </div>

          {/* Placeholder state */}
          <div className="bg-white border border-dashed border-gray-200 rounded-xl p-10 text-center mb-8">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Partnerships Being Finalised
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              We are in the process of formalising our first round of venue and experience
              partnerships across Pune, Hyderabad, and Bengaluru. Partners will be listed here
              once agreements are confirmed and reviewed for alignment with our principles.
            </p>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Partners are listed here only after formal agreements are in place. We do not list
            organisations with whom we have informal or undisclosed arrangements.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Partnership Questions</h2>
            <p className="text-gray-500 text-lg">
              Answers to the most common questions from organisations interested in working with us.
            </p>
          </div>
          <div className="space-y-6">
            {partnerFAQs.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interest CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Interested in Partnering?</h2>
          <p className="text-gray-300 text-lg mb-4 leading-relaxed">
            If your organisation supports safe social spaces, community experiences, or meaningful
            offline connections — and you understand that this is not a promotional opportunity —
            we&apos;d like to hear from you.
          </p>
          <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
            Tell us who you are, what you do, and specifically how you believe a partnership would
            benefit Stranger Mingle members — not your organisation. We read every message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a rel="nofollow"
              href="mailto:strangermingleteam@gmail.com?subject=Partnership Enquiry&body=Hi Stranger Mingle team, I'd like to enquire about a potential partnership. Here's who we are and how we think we could support the community:"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-base transition-colors"
            >
              Send Us a Partnership Enquiry
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-base transition-colors"
            >
              Contact the Team
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
            · We respond within 48–72 hours.
          </p>
        </div>
      </section>

      {/* ── Important Disclaimer ── */}
      <section className="py-10 px-4 bg-amber-50 border-t border-amber-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-800 text-sm leading-relaxed">
            <strong>Important:</strong> Stranger Mingle events are governed by our{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
              Safety Guidelines
            </Link>
            , which explicitly prohibit the use of events for business networking, product
            promotion, MLM schemes, or commercial solicitation of any kind. These prohibitions
            apply equally to all members, hosts, and partner organisations. Violation results in
            immediate removal from the platform.
          </p>
        </div>
      </section>

      {/* ── Footer Note ── */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Stranger Mingle is a brand of{' '}
          <span className="text-gray-600 font-medium">StrangerMingle</span>.
          All partnerships are governed by our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          {' '}and internal partner policies.
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
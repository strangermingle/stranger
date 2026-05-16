import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Social Coaching & 1-on-1 Sessions | Stranger Mingle",
  description: "Get guided support for social confidence and building platonic friendships. Our trained facilitators help you navigate loneliness and social anxiety.",
  alternates: {
    canonical: "/social-coaching",
  },
};


// ─── Data ────────────────────────────────────────────────────────────────────

const sessionTypes = [
  {
    icon: "💬",
    title: "Talk to Me — Honest Conversations",
    format: "Small group · 3–6 people",
    duration: "2–3 hours",
    price: "₹299",
    description:
      "A structured, guided conversation session for people going through social isolation, loneliness, or a rough patch in life. Not therapy. Not advice. Just a safe space to speak, be heard, and hear others — with a facilitator who keeps the space respectful and real.",
    goodFor: [
      "Feeling socially disconnected or stuck",
      "Wanting to open up but not knowing how",
      "Processing loneliness without professional therapy",
      "People new to the city with no one to talk to",
    ],
    tag: "Most booked",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🧭",
    title: "Social Confidence — Getting Started",
    format: "1-on-1 with a Stranger Mingle facilitator",
    duration: "45–60 minutes",
    price: "₹499",
    description:
      "A one-on-one session designed for people who want to attend community events but feel too anxious to take the first step. A Stranger Mingle facilitator helps you understand what's holding you back and prepares you for your first event with practical, honest guidance.",
    goodFor: [
      "Severe social anxiety around new people",
      "Never attended a group event alone",
      "Introverts unsure how to handle structured socialising",
      "People who've been rejected or excluded socially",
    ],
    tag: "For first-timers",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    icon: "🔄",
    title: "After the Event — Debrief & Reflect",
    format: "1-on-1 with a facilitator",
    duration: "30 minutes",
    price: "₹199",
    description:
      "Attended an event but felt like you didn't connect with anyone? This short follow-up session helps you process what happened, understand patterns in how you interact with new people, and figure out what to try differently next time.",
    goodFor: [
      "Attended events but not made friends yet",
      "Struggling to move from acquaintance to actual friendship",
      "Feeling like socialising just \"doesn't work\" for you",
      "Wanting honest feedback on your social approach",
    ],
    tag: null,
    tagColor: null,
  },
  {
    icon: "👥",
    title: "Small Circle Sessions",
    format: "Facilitated group · 4–8 people",
    duration: "2 hours",
    price: "₹249",
    description:
      "A themed facilitated group session focused on a specific social challenge — making conversation, navigating loneliness after relocation, reconnecting after a long break from social life. Structured discussions, not lectures. Everyone speaks, everyone is heard.",
    goodFor: [
      "Recently relocated to a new city",
      "Post-burnout re-entry into social life",
      "Long-term remote workers who've lost their social circle",
      "People rebuilding after difficult life transitions",
    ],
    tag: null,
    tagColor: null,
  },
];

const importantLimitations = [
  {
    icon: '🚫',
    title: 'Not professional therapy or counselling',
    description:
      'These sessions are run by trained community facilitators — not licensed therapists, psychologists, or mental health professionals. If you are experiencing clinical depression, anxiety disorders, trauma, or other mental health conditions, please consult a qualified mental health professional.',
  },
  {
    icon: '🚫',
    title: 'Not dating or relationship coaching',
    description:
      'Sessions are strictly focused on platonic social connection and friendship-building. We do not offer dating guidance, romantic advice, or relationship coaching of any kind. This is non-negotiable and consistent with our platform-wide policy.',
  },
  {
    icon: '🚫',
    title: 'Not professional or career coaching',
    description:
      'Stranger Mingle sessions are not networking sessions, personal branding workshops, or professional development coaching. Our purpose is genuine platonic friendship — not career advancement or business development.',
  },
  {
    icon: '🚫',
    title: 'Not third-party coaching services',
    description:
      'All sessions are conducted directly by trained Stranger Mingle facilitators. We do not allow third-party coaches, consultants, or service providers to offer sessions through our platform. There is no marketplace of coaches here.',
  },
];

const facilitatorPrinciples = [
  {
    label: 'Community-trained',
    description: 'All facilitators are trained by the Stranger Mingle team in our specific approach to guided social sessions.',
  },
  {
    label: 'Not therapists',
    description: 'Facilitators are community members with strong interpersonal skills and training — not mental health professionals.',
  },
  {
    label: 'Zero agenda',
    description: 'Facilitators do not sell anything, promote anything, or steer sessions toward any commercial outcome.',
  },
  {
    label: 'Strictly vetted',
    description: 'Facilitators go through the same screening process as Verified Hosts, plus additional training for 1-on-1 and small-group sessions.',
  },
  {
    label: 'Same safety rules',
    description: 'All Safety Guidelines and Terms of Service apply equally in coaching sessions. Zero tolerance for harassment applies here too.',
  },
];

const faqs = [
  {
    q: 'Is this the same as mental health counselling?',
    a: "No — and this distinction is important. These are community-facilitated social coaching sessions, not clinical services. If you are dealing with depression, anxiety, trauma, or any diagnosed mental health condition, please reach out to a qualified mental health professional. Stranger Mingle sessions are for people looking to build social confidence and platonic friendships — not for treating mental health conditions.",
  },
  {
    q: 'Who are the facilitators?',
    a: "Facilitators are trained Stranger Mingle community members — not licensed therapists or coaches. They are vetted, trained by our team, and held to the same code of conduct as our Verified Hosts. Their role is to guide conversations and create a structured, safe space — not to give advice, diagnose, or counsel.",
  },
  {
    q: 'Are sessions confidential?',
    a: "Yes. What is said in a session stays within the session. Facilitators do not share session content with other members or publicly. The only exceptions are genuine safety concerns — if something said indicates risk to self or others, we may need to take appropriate action, which may include recommending professional support.",
  },
  {
    q: 'Can I use a session to find romantic connections?',
    a: "No. This is explicitly not what these sessions are for. Anyone using sessions to seek romantic or dating connections will be removed from the platform. Our sessions exist solely to help people build social confidence and form genuine platonic friendships.",
  },
  {
    q: 'What if I\'m in a mental health crisis?',
    a: "Please reach out to a qualified mental health professional or a crisis helpline immediately. Stranger Mingle is not equipped to provide crisis support. Our sessions are not a substitute for professional care.",
  },
  {
    q: 'Can I book a session without attending group events?',
    a: "Yes. You must be a verified Stranger Mingle member to book sessions, but you don't need to have attended a group event first. Many people use the Social Confidence session specifically to prepare for their first group event.",
  },
  {
    q: 'What is the refund policy for sessions?',
    a: "Sessions follow our standard cancellation policy. Cancel 48+ hours before for a full refund. Cancel 24–48 hours before for a 50% refund or credit. No refunds for cancellations under 24 hours or no-shows. See our Refund Policy for full details.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SocialCoachingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Sessions
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Social Coaching & 1-on-1 Sessions
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Sometimes showing up to a group event isn&apos;t the right first step. These guided
            sessions are for people who want support getting there — or processing what happened
            when they did.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-10">
            Facilitated by trained Stranger Mingle team members. Focused entirely on platonic
            social connection. Not therapy. Not dating coaching. Not professional advice.
          </p>
          <a
            href="#sessions"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-lg transition-colors"
          >
            View Sessions →
          </a>
        </div>
      </section>

      {/* ── Important Notice ── */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-amber-50 border-b border-amber-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-amber-800 text-sm leading-relaxed text-center">
            <strong>Important:</strong> These sessions are community-facilitated support for
            social confidence and platonic friendship-building. They are{' '}
            <strong>not a substitute for professional mental health care.</strong> If you are
            experiencing a mental health crisis, please contact a qualified professionals.
          </p>
        </div>
      </section>

      {/* ── What This Is ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What These Sessions Are</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Making friends as an adult is genuinely hard. For some people, the barrier isn&apos;t
            finding events — it&apos;s the anxiety, uncertainty, or isolation that makes even
            showing up feel impossible. These sessions exist for those people.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Think of them as structured, guided conversations with a trained Stranger Mingle
            facilitator — someone whose job is to listen without judgment, help you understand
            your own patterns, and give you practical support for building real friendships.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            These are not life coaching, therapy, or professional services. They are a community
            offering — an extension of the same safe, honest environment that defines every
            Stranger Mingle event. The purpose is always the same: helping you build genuine
            platonic connections in your city.
          </p>
        </div>
      </section>

      {/* ── Session Types ── */}
      <section id="sessions" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Available Sessions</h2>
            <p className="text-gray-500 text-lg">
              All sessions require a verified Stranger Mingle membership. Book through the
              Member Portal once your account is active.
            </p>
          </div>
          <div className="space-y-6">
            {sessionTypes.map((session) => (
              <div
                key={session.title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="p-7 sm:p-8">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0 mt-0.5">{session.icon}</span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                          {session.tag && (
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${session.tagColor}`}>
                              {session.tag}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span>📍 {session.format}</span>
                          <span>⏱ {session.duration}</span>
                          <span className="font-semibold text-gray-700">💰 {session.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-5 text-sm sm:text-base">
                    {session.description}
                  </p>

                  {/* Good For */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Good for
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {session.goodFor?.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-0.5 flex-shrink-0 text-green-500">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-7 sm:px-8 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-xs text-gray-400">
                    Book via Member Portal · Verified members only
                  </p>
                  <a
                    href="https://www.strangermingle.com/members"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
                  >
                    Book This Session →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What These Are NOT ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What These Sessions Are Not</h2>
            <p className="text-gray-500 text-lg">
              These boundaries exist to protect our members and ensure sessions are used for the
              right reasons. They are non-negotiable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {importantLimitations.map((item) => (
              <div
                key={item.title}
                className="bg-red-50 border border-red-100 rounded-xl p-5"
              >
                <h3 className="text-sm font-bold text-red-800 mb-2">{item.title}</h3>
                <p className="text-sm text-red-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facilitators ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Who Runs These Sessions?</h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              Stranger Mingle facilitators are not therapists or external coaches. Here&apos;s exactly
              who they are and what they&apos;re held to.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilitatorPrinciples.map((p) => (
              <div
                key={p.label}
                className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
              >
                <p className="font-bold text-gray-900 text-sm mb-1.5">{p.label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
            <p className="text-blue-800 text-sm leading-relaxed">
              <strong>A note on professional mental health:</strong> If a facilitator believes a
              member&apos;s situation goes beyond what a community session can support, they will say
              so directly and recommend professional resources. We take this responsibility
              seriously. Stranger Mingle will never position itself as a substitute for qualified
              mental health care.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Session Questions</h2>
            <p className="text-gray-500 text-lg">
              Common questions before booking a session.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-gray-300 text-lg mb-4 leading-relaxed">
            If you&apos;re unsure whether a session or a group event is the right first step, reach
            out. Our team will help you figure out what makes sense for where you are.
          </p>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            Sessions require a verified Stranger Mingle membership. If you&apos;re not yet a member,
            you can join through the Member Portal below.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.strangermingle.com/members"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-base transition-colors"
            >
              Book via Member Portal
            </a>
            <a
              href="mailto:strangermingleteam@gmail.com?subject=Social Coaching Session Enquiry&body=Hi, I'd like to know more about the social coaching sessions available."
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-base transition-colors"
            >
              Ask Us First
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
            · We respond within 48–72 hours.
          </p>
        </div>
      </section>

      {/* ── Footer Note ── */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
          All sessions are governed by Stranger Mingle&apos;s{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
            Safety Guidelines
          </Link>
          . Stranger Mingle is a brand of{' '}
          <span className="text-gray-600 font-medium">Salty Media Production (opc) Pvt Ltd</span>
          . Facilitators are community-trained members — not licensed therapists or professional
          coaches. For professional mental health support, please consult a qualified practitioner.
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
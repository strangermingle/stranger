import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Workshops for Making Friends | Stranger Mingle',
  description: 'Live online sessions on conversation, social confidence, adult loneliness, and building genuine connections in Indian cities. Learn the skills that make real friendships possible.',
  alternates: {
    canonical: '/workshops',
  },
};
interface Workshop {
  icon: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  who: string;
  outcomes: string[];
}

interface FAQ {
  q: string;
  a: string;
}

const workshops: Workshop[] = [
  {
    icon: '🗣️',
    badge: 'Most Popular',
    badgeColor: 'bg-blue-600',
    title: 'How to Start a Conversation with a Complete Stranger',
    description:
      'The first 60 seconds with a new person are the hardest — and most people give up there. This workshop breaks down exactly what to say, how to listen, and how to make a stranger feel genuinely at ease around you.',
    duration: '90 minutes',
    format: 'Live + Q&A',
    who: 'Introverts, shy adults, anyone who freezes up in new social situations',
    outcomes: [
      'A simple, repeatable framework for opening conversations without it feeling scripted',
      'How to handle the awkward silences that kill conversations',
      'Why "how are you" fails — and what actually works instead',
      'Practice exercises you can use before attending your first Stranger Mingle event',
    ],
  },
  {
    icon: '🤝',
    badge: 'New',
    badgeColor: 'bg-green-600',
    title: 'Making Friends as an Adult in an Indian City — A Practical Guide',
    description:
      'College gave you proximity, routine, and time — the three ingredients friendships need. Adult life takes all three away. This masterclass is built specifically for Indians in their 20s and 30s who want to rebuild a social life after college, a city move, or a long stretch of working from home.',
    duration: '2 hours',
    format: 'Live + Workbook',
    who: 'Young professionals, people who have recently relocated, anyone who feels socially stagnant',
    outcomes: [
      'Why adult friendships are harder to form — and the specific habits that overcome this',
      'How to identify and consistently show up in spaces where genuine friendships form',
      'The difference between acquaintances and real friends — and how to cross that line',
      'Building a social routine that works alongside a demanding work schedule',
    ],
  },
  {
    icon: '🧠',
    badge: 'Introspective',
    badgeColor: 'bg-purple-600',
    title: 'Understanding Loneliness in Urban India — A Candid Conversation',
    description:
      'This is not a feel-good motivational session. It is an honest, structured conversation about the epidemic of loneliness in Indian cities — why it happens, what it actually costs us, and what building a real social life looks like in practice.',
    duration: '75 minutes',
    format: 'Live Panel + Open Discussion',
    who: 'Anyone who has felt alone despite being surrounded by people',
    outcomes: [
      'The real difference between solitude and loneliness — and why the distinction matters',
      'How social media and digital communication have made genuine connection harder, not easier',
      'Practical, honest strategies to rebuild a meaningful offline social life',
      'Stories from real Stranger Mingle members about what changed for them',
    ],
  },
  {
    icon: '🌐',
    badge: 'For Introverts',
    badgeColor: 'bg-orange-500',
    title: 'Social Confidence for Introverts — You Don&apos;t Have to Become Someone Else',
    description:
      'Social confidence is not about becoming louder, more extroverted, or the life of the party. This workshop is for introverts who want to navigate group settings comfortably, build genuine friendships on their own terms, and stop dreading social events.',
    duration: '90 minutes',
    format: 'Live + Follow-up Resource Pack',
    who: 'Introverts, highly sensitive people, anyone who finds group settings exhausting',
    outcomes: [
      'Why introversion is a social asset — and how to use it rather than fight it',
      'How to manage energy before, during, and after social events without burning out',
      'The specific kinds of conversations and settings where introverts naturally thrive',
      'How to build close friendships when small talk feels unbearable',
    ],
  },
  {
    icon: '🏙️',
    badge: 'City Movers',
    badgeColor: 'bg-teal-600',
    title: 'New to the City — Building Your Social Life from Scratch',
    description:
      'Moving to Pune, Mumbai, Bengaluru, Hyderabad, or Delhi alone is exhilarating and isolating in equal measure. This session is a practical, no-fluff guide to building a social circle in a new Indian city — starting from zero.',
    duration: '75 minutes',
    format: 'Live + City-Specific Breakout Rooms',
    who: 'People who have recently relocated to a new Indian city for work or education',
    outcomes: [
      'The fastest and most sustainable ways to meet people when you know nobody in a new city',
      'How to evaluate which communities, spaces, and events are worth your time',
      'Common mistakes people make in the first 3 months in a new city — and how to avoid them',
      'How to convert event acquaintances into people you actually hang out with regularly',
    ],
  },
  {
    icon: '💬',
    badge: 'Deep Dive',
    badgeColor: 'bg-gray-700',
    title: 'The Art of Meaningful Conversation — Going Beyond Small Talk',
    description:
      'Small talk is a necessary entry point. But most people never learn how to move past it. This masterclass teaches you how to steer conversations towards depth, meaning, and genuine connection — without being awkward or intense about it.',
    duration: '90 minutes',
    format: 'Live + Practice Scenarios',
    who: 'Anyone who wants richer conversations and deeper friendships',
    outcomes: [
      'How to transition from surface-level chat to real, engaging conversation',
      'The listening habits that make people feel genuinely heard — and want to open up',
      'Questions that create connection rather than feel like an interrogation',
      'How to leave a conversation with someone genuinely wanting to talk to you again',
    ],
  },
];

const faqs: FAQ[] = [
  {
    q: 'Are these workshops recorded? Can I watch them later?',
    a: 'All registered participants receive a recording link within 48 hours of the live session. However, the live format is where the real value is — the Q&A, breakout conversations, and peer interactions are not replicable in a recording.',
  },
  {
    q: 'Are these professional development or career courses?',
    a: 'No. Stranger Mingle workshops are exclusively focused on personal social skills, friendship building, and genuine human connection. These are not career, business, networking, or self-promotion programmes of any kind. If you are looking for professional development, this is not the right platform.',
  },
  {
    q: 'Who conducts these workshops?',
    a: 'Sessions are facilitated by the Stranger Mingle core team and experienced community members who have a demonstrated track record in building genuine communities. We do not bring in external motivational speakers or coaches whose approach conflicts with our values.',
  },
  {
    q: 'Is this the same as the offline Stranger Mingle events?',
    a: 'No. Offline events are where friendships form through doing things together. These online workshops are educational sessions that help you build the awareness and skills to get more out of those real-world events and social interactions.',
  },
  {
    q: 'Can I ask questions during the session?',
    a: 'Yes. Every session includes a dedicated Q&A window. Some workshops also include small group breakout discussions where participants can speak with each other directly.',
  },
  {
    q: 'Are these workshops open to non-members?',
    a: 'Most workshops are open to anyone aged 18 and above. Some advanced sessions are reserved for verified Stranger Mingle members. Session-specific eligibility is clearly stated at the time of registration.',
  },
];

export default function OnlineWorkshopsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Online Workshops & Masterclasses
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Learn the Skills That Make Real Friendships Possible
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Live online sessions on conversation, social confidence, adult loneliness, and
            building genuine connections in Indian cities. Practical, honest, and grounded in
            real community experience — not motivational theory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#workshops"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-lg transition-colors"
            >
              Browse Upcoming Sessions →
            </a>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-lg transition-colors"
            >
              See Offline Events
            </Link>
          </div>
        </div>
      </section>

      {/* Why These Workshops Exist */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Does Stranger Mingle Run Online Workshops?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Showing up to a Stranger Mingle event takes courage — particularly if you are an
            introvert, new to a city, or haven&apos;t built a social life from scratch before. Over
            the years, our community has told us clearly that what holds people back is not the
            desire for connection. It&apos;s the skills — starting a conversation, keeping it going,
            knowing how to move from acquaintance to actual friend.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            These workshops exist to bridge that gap. They are not motivational content. They are
            not life coaching. They are practical, experience-backed sessions that help you
            understand social dynamics, build conversation skills, and navigate the very real
            challenge of making friends as an adult in urban India.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Every session is anchored in the same values that govern everything Stranger Mingle
            does: genuine connection, zero judgment, absolute safety, and no hidden commercial
            agenda. You will not be upsold anything. You will not be given scripts to grow your
            personal brand. You will be given honest tools to build a more connected life.
          </p>
        </div>
      </section>

      {/* What These Workshops Are Not */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-amber-50 border-b border-amber-100">
        <div className="max-w-4xl mx-auto flex gap-4 items-start">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-amber-900 font-semibold text-base mb-1">What These Workshops Are Not</p>
            <p className="text-amber-800 text-sm leading-relaxed">
              These are not professional networking sessions, personal branding courses, or career
              development workshops. Stranger Mingle&apos;s mission is platonic friendship and genuine
              human connection — not professional advancement, business networking, or romantic
              matchmaking. Any participant found using these sessions for commercial solicitation,
              lead generation, or promotional purposes will be removed immediately and banned from
              the platform in accordance with our{' '}
              <Link href="/terms" className="underline text-amber-900 font-medium hover:text-amber-700">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { stat: '75–120', label: 'Minutes per session' },
            { stat: 'Live', label: 'Interactive format with Q&A' },
            { stat: '18+', label: 'Open to adults across India' },
            { stat: '₹199+', label: 'Per session, fairly priced' },
          ].map((item: { stat: string; label: string }) => (
            <div key={item.label}>
              <p className="text-2xl font-bold text-gray-900">{item.stat}</p>
              <p className="text-sm text-gray-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop Listings */}
      <section id="workshops" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upcoming Sessions and Masterclasses
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              All sessions are conducted live online. Registration closes 24 hours before each
              session begins. Recordings are shared with registered participants post-session.
            </p>
          </div>
          <div className="space-y-8">
            {workshops.map((ws: Workshop) => (
              <div
                key={ws.title}
                className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="flex-shrink-0 text-4xl">{ws.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`${ws.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                      >
                        {ws.badge}
                      </span>
                      <span className="text-xs text-gray-400 border border-gray-200 px-3 py-1 rounded-full">
                        {ws.duration}
                      </span>
                      <span className="text-xs text-gray-400 border border-gray-200 px-3 py-1 rounded-full">
                        {ws.format}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{ws.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{ws.description}</p>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Best For
                    </p>
                    <p className="text-sm text-gray-600 mb-4">{ws.who}</p>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      What You Will Walk Away With
                    </p>
                    <ul className="space-y-1.5">
                      {ws.outcomes.map((o, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-0.5 flex-shrink-0 text-blue-500 font-bold">→</span>
                          {o}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/events"
                        className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm transition-colors"
                      >
                        Check Schedule & Register
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium rounded-md text-sm transition-colors"
                      >
                        Ask a Question
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Online Sessions Work</h2>
            <p className="text-gray-500 text-lg">
              No complex setup. No mandatory camera. Just join, listen, participate as much or as
              little as you like.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '01',
                title: 'Register on the Events Page',
                desc: 'Browse upcoming sessions, pick one that resonates, and complete registration through the Member Portal. You will receive a confirmation with the session link.',
              },
              {
                number: '02',
                title: 'Join the Live Session',
                desc: 'Join 5 minutes before start time using the link sent to your registered email. No downloads required — runs directly in your browser.',
              },
              {
                number: '03',
                title: 'Participate at Your Comfort Level',
                desc: 'Camera is optional. You can contribute through chat, voice, or simply listen and absorb. There is no pressure to perform or impress anyone here.',
              },
              {
                number: '04',
                title: 'Receive the Recording and Resources',
                desc: 'Within 48 hours, you will receive the session recording and any accompanying workbooks or resource documents at your registered email.',
              },
            ].map((step: { number: string; title: string; desc: string }) => (
              <div key={step.number} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops vs Offline Events */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Workshops Fit with Offline Events
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3 text-base">🖥️ Online Workshops</h3>
              <p className="text-blue-800 text-sm leading-relaxed mb-3">
                Build the awareness, vocabulary, and mindset for genuine connection. Understand
                why you freeze up in social settings, what holds most adults back from making
                friends, and how to approach strangers with genuine ease.
              </p>
              <p className="text-blue-700 text-xs font-medium">Best for: learning, reflection, preparation</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-6">
              <h3 className="font-semibold text-green-900 mb-3 text-base">🏙️ Offline Events</h3>
              <p className="text-green-800 text-sm leading-relaxed mb-3">
                Where the actual friendships form. Chai circles, treks, board game nights, and
                heritage walks across Indian cities — small groups, structured ice-breakers, real
                conversations. This is where everything you learn in a workshop comes to life.
              </p>
              <p className="text-green-700 text-xs font-medium">Best for: doing, connecting, belonging</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            Most members do both. The workshops reduce the anxiety of showing up. The offline
            events are where you actually meet people who might become lifelong friends.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Common Questions About Our Online Sessions
          </h2>
          <div className="space-y-5">
            {faqs.map((item: FAQ, i: number) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{item.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">
            Have a question not covered here?{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Write to us
            </Link>{' '}
            — we respond within 48–72 hours.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            You Don&apos;t Have to Figure This Out Alone
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Thousands of people across Indian cities are navigating the same thing — loneliness
            after college, disconnection after a city move, the inability to make friends
            despite being surrounded by people. These workshops are built for exactly that. Show
            up. Ask your questions. Start there.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-base transition-colors"
            >
              See Upcoming Sessions
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-base transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Stranger Mingle is a brand of{' '}
          <span className="text-gray-600 font-medium">StrangerMingle</span>
          . All online workshops are governed by our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
          ,{' '}
          <Link href="/refund-policy" className="text-blue-600 hover:underline">
            Refund Policy
          </Link>
          , and{' '}
          <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
            Safety Guidelines
          </Link>
          . Workshop content is for personal development and connection-building only.
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
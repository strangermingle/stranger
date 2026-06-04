import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success Stories | Stranger Mingle',
  description: 'Friendships that started with a stranger. Read real stories from Stranger Mingle members about connections made at our events.',
  alternates: {
    canonical: '/success-stories',
  },
};
interface FeaturedStory {
  id: string;
  name: string;
  role: string;
  location: string;
  city: string;
  eventType: string;
  headline: string;
  summary: string;
  quote: string;
  tags: string[];
  avatar: string;
}

const featuredStories: FeaturedStory[] = [
  {
    id: "suraj",
    name: "Suraj Bhan Singh",
    role: "Software Engineer",
    location: "Wakad, Pune",
    city: "Pune",
    eventType: "Weekend Meetup",
    headline: "Came with one friend. Left with fifteen.",
    summary:
      "Suraj joined Stranger Mingle with a friend, unsure what to expect. A few months later, that one event had grown into a circle of 10–15 people who hang out together regularly — not because an app told them to, but because they kept showing up.",
    quote:
      "I joined this group with my friend and initially we were just 2 of us. But slowly we started meeting new people and now we have a group of 10-15 people who regularly hang out together.",
    tags: ["Pune", "Weekend Meetup", "Group Friendships"],
    avatar: "/images/suraj-bhansingh.png",
  },
  {
    id: "anuradha",
    name: "Anuradha",
    role: "IT Engineer",
    location: "Hinjewadi, Pune",
    city: "Pune",
    eventType: "Board Game Night",
    headline: "Natural conversation. No awkward networking.",
    summary:
      "Anuradha wanted to meet people the way it's supposed to happen — without forcing it. A board game night gave her exactly that. She met Trishul through a mutual friend at the event and now counts him as a genuine friend — the kind you don't have to perform for.",
    quote:
      "I wanted to meet people naturally. The board game night was so much fun, and I didn't have to worry about forcing conversation.",
    tags: ["Pune", "Board Game Night", "Platonic Friendships"],
    avatar: "/images/anuradha.png",
  },
  {
    id: "varsha",
    name: "Varsha Sundaram",
    role: "Professional",
    location: "Bengaluru",
    city: "Bengaluru",
    eventType: "Community Meetup",
    headline: "Five years in Bengaluru. Finally found her people.",
    summary:
      "Varsha had lived in Bengaluru for five years without building a real social circle. Busy work life, new city, no obvious entry point. Stranger Mingle gave her a structured way to just show up — and that was enough.",
    quote:
      "I'm working in Bengaluru since last 5 years and I haven't met many people. This group helped me to connect with new people and make friends.",
    tags: ["Bengaluru", "New in City", "Community"],
    avatar: "/images/varsha.png",
  },
];

const miniStories = [
  {
    context: "First event, came alone",
    outcome: "Ended up sharing a table with four strangers. Three of them are now on a shared WhatsApp group that plans weekend plans every Sunday.",
    eventType: "Chai Circle",
    city: "Pune",
  },
  {
    context: "Introvert who dreaded small talk",
    outcome: "The structured ice-breakers meant she never had to figure out how to start a conversation. Six months later, she's attended eleven events.",
    eventType: "Heritage Walk",
    city: "Hyderabad",
  },
  {
    context: "Recently relocated professional",
    outcome: "Knew nobody in the city. Attended his first trek event and found two people who also love hiking. They now plan treks outside the platform too.",
    eventType: "Trek",
    city: "Bengaluru",
  },
  {
    context: "Someone who'd tried \"networking events\" before",
    outcome: "Found that the no-business-talk rule made all the difference. Everyone was just there to make friends. Nothing to sell, nothing to pitch.",
    eventType: "Board Game Night",
    city: "Pune",
  },
  {
    context: "Woman attending her first event alone",
    outcome: "Appreciated the verified-members-only policy and the organiser who introduced her to the group immediately. Felt safe from the moment she arrived.",
    eventType: "Weekend Meetup",
    city: "Hyderabad",
  },
  {
    context: "Someone who'd tried dating apps looking for friends",
    outcome: "Found that platonic, structured events removed all the ambiguity. Just people, a shared activity, and honest conversation.",
    eventType: "Chai Circle",
    city: "Pune",
  },
];

const whatMakesItWork = [
  {
    icon: "🧱",
    title: "Structure removes the awkward part",
    description:
      "Every Stranger Mingle event begins with structured introductions and ice-breakers. You don't have to figure out how to start — we handle that. What you do with it after is up to you.",
  },
  {
    icon: "👥",
    title: "Small groups mean real conversations",
    description:
      "Events are capped at 15–30 people. Not 200. Not a conference. A room where you can actually hear someone and remember their name the next day.",
  },
  {
    icon: "🚫",
    title: "No agenda except friendship",
    description:
      "No networking. No pitching. No romantic matchmaking. Everyone is here for the same reason: to meet people they wouldn't otherwise meet and see if something genuine forms.",
  },
  {
    icon: "🔁",
    title: "Consistency builds community",
    description:
      "The members who form the deepest friendships are the ones who come back. One event is an introduction. Ten events is a community. Showing up consistently is the whole strategy.",
  },
  {
    icon: "🛡️",
    title: "Safety is why people open up",
    description:
      "Verified members, zero-harassment policy, public venues only. When people feel safe, they relax. When they relax, they're actually themselves. That's when real friendships happen.",
  },
  {
    icon: "🏙️",
    title: "Built for adult life in Indian cities",
    description:
      "Making friends after college in India is genuinely hard. Work takes over, old circles scatter, and there's no obvious way back in. Stranger Mingle is that way back in.",
  },
];

const cityStats = [
  { city: "Pune", label: "Where it started", note: "Our most active city" },
  { city: "Hyderabad", label: "Growing fast", note: "Chai circles & treks" },
  { city: "Bengaluru", label: "Expanding", note: "Weekend meetups live" },
  { city: "Mumbai", label: "Coming soon", note: "Events being planned" },
  { city: "Delhi", label: "Coming soon", note: "Watch this space" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Real Stories
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Friendships That Started With a Stranger
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            These are not testimonials crafted for marketing. They are accounts of what happens
            when people show up, trust the process, and give connection a real chance.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Every story on this page is from an actual Stranger Mingle member. Names and details
            are used with their knowledge and consent.
          </p>
        </div>
      </section>

      {/* ── Context Note ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-blue-50 border-b border-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-800 text-sm sm:text-base leading-relaxed">
            <strong>What &quot;success&quot; means at Stranger Mingle:</strong> A friendship formed. A face
            remembered. A weekend that wasn&apos;t spent alone. We don&apos;t measure success in revenue,
            followers, or leads. We measure it in people who found their people.
          </p>
        </div>
      </section>

      {/* ── Featured Stories ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Member Stories</h2>
            <p className="text-gray-500 text-lg">From our community — in their own words.</p>
          </div>
          <div className="space-y-12">
            {featuredStories.map((story: FeaturedStory, i: number) => (
              <div
                key={story.id}
                className={`rounded-2xl border border-gray-100 overflow-hidden shadow-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
              >
                <div className="p-8 sm:p-10">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                        {story.name.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {story.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-0.5">{story.headline}</h3>
                      <p className="text-sm text-gray-500">
                        {story.name} · {story.role} · {story.location}
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <p className="text-gray-600 leading-relaxed mb-6">{story.summary}</p>

                  {/* Quote */}
                  <blockquote className="border-l-4 border-blue-600 pl-5 py-1">
                    <p className="text-gray-700 italic leading-relaxed text-sm sm:text-base">
                      &quot;{story.quote}&quot;
                    </p>
                    <footer className="mt-2 text-xs text-gray-400 font-medium not-italic">
                      — {story.name}, {story.location}
                    </footer>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mini Stories ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Moments From the Community</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Not every story needs paragraphs. Sometimes a friendship is just a before and an
              after.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {miniStories.map((story, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {story.eventType}
                  </span>
                  <span className="text-xs text-gray-400">{story.city}</span>
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  The situation
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{story.context}</p>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                  What happened
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{story.outcome}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            These accounts are shared anonymously with member permission. Names have been withheld
            by request.
          </p>
        </div>
      </section>

      {/* ── What Makes It Work ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Friendships Actually Form Here</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              It&apos;s not magic. There are specific, intentional reasons why Stranger Mingle works
              when other attempts to make friends as an adult don&apos;t.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatMakesItWork.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cities ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Friendships Across Indian Cities</h2>
            <p className="text-gray-500 text-lg">
              Stranger Mingle started in Pune and is expanding. Stories are being written in
              every city we&apos;re active in.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cityStats.map((c) => (
              <div
                key={c.city}
                className="bg-white rounded-xl border border-gray-100 p-4 text-center"
              >
                <p className="font-bold text-gray-900 text-base mb-0.5">{c.city}</p>
                <p className="text-xs text-blue-600 font-medium mb-1">{c.label}</p>
                <p className="text-xs text-gray-400">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Submit Your Story ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Has Stranger Mingle Made a Difference for You?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you&apos;ve formed a genuine friendship — or even just had one evening that reminded
              you what good social time feels like — we&apos;d love to hear about it. Your story might
              be the reason someone else finally decides to show up.
            </p>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Stories are shared only with your explicit consent. You can choose to share your
              name and details, remain anonymous, or share just the experience without any
              identifying information. We will never share your story without confirming the
              final version with you first.
            </p>
            <a
              href={`mailto:strangermingleteam@gmail.com?subject=My Stranger Mingle Story&body=Hi, I&apos;d like to share my Stranger Mingle experience. Here&apos;s what happened:`}
              className="inline-flex items-center justify-center px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm transition-colors"
            >
              Share Your Story →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Story Hasn&apos;t Started Yet</h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Every story on this page started the same way: someone decided to show up. That&apos;s
            all it takes. There&apos;s no algorithm, no swipe, no perfect profile. Just you, a
            Saturday, and a room full of strangers who were also just trying to make friends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-base transition-colors"
            >
              Find an Event Near You →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-md text-base transition-colors"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer Note ── */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          All stories shared on this page are from real Stranger Mingle members and are used
          with their knowledge and consent. Stranger Mingle is a brand of{' '}
          <span className="text-gray-600 font-medium">StrangerMingle</span>
          . Our events are governed by our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/safety-guidelines" className="text-blue-600 hover:underline">
            Safety Guidelines
          </Link>
          .
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
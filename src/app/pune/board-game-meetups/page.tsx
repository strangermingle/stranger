import type { Metadata } from "next";
import Link from "next/link";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import NewsletterSignup from "@/components/NewsletterSignup";

export const revalidate = 3600;

const PAGE_URL = "https://www.strangermingle.com/pune/board-game-meetups";

export const metadata: Metadata = {
  title: "Board Game Meetups in Pune 2026 | Mafia, Codenames & Game Nights | Stranger Mingle",
  description:
    "Join Pune's board game meetups — Mafia, Codenames, Catan and more. Verified, small-group game nights at Stranger Mingle's Lohegaon Activity Centre. Come alone, most people do.",
  keywords: [
    "board game meetups Pune",
    "board game cafe Pune",
    "Mafia game night Pune",
    "game night Pune",
    "tabletop games Pune",
    "board games to make friends Pune"
  ],
  alternates: { canonical: "/pune/board-game-meetups" },
  openGraph: {
    title: "Board Game Meetups in Pune | Stranger Mingle",
    description:
      "Verified board game nights in Pune — Mafia, Codenames, Catan and more. Small groups, real gender ratios, come alone.",
    url: PAGE_URL,
    type: "website",
    locale: "en_IN"
  }
};

const GAMES_PLAYED = [
  { name: "Mafia / Social Deduction", note: "Our most popular recurring format" },
  { name: "Codenames", note: "Great for large mixed groups" },
  { name: "Catan", note: "Classic strategy, ~90 min" },
  { name: "Uno & Card Games", note: "Easy entry point for first-timers" },
  { name: "Jenga & Party Games", note: "Icebreaker rounds before the main game" }
];

const FAQS = [
  {
    q: "Where are Stranger Mingle's board game meetups in Pune held?",
    a: "Our board game nights run primarily out of the Stranger Mingle Activity Centre in Lohegaon, Pune, with occasional partner venues announced on individual event pages."
  },
  {
    q: "Do I need to know how to play the games?",
    a: "No. Every session starts with a quick explanation of the rules, and hosts are there to guide first-timers through their first round."
  },
  {
    q: "Is it awkward to come alone?",
    a: "About 80% of attendees come alone. The game itself gives everyone something to focus on and talk about, so there's no pressure to make small talk from a standing start."
  },
  {
    q: "Is the group gender-balanced?",
    a: "We publish an expected gender ratio on each event page before you book, and keep groups small (typically 25-30 people) so it never feels like a crowd."
  },
  {
    q: "How much do board game nights cost?",
    a: "Pricing is shown on each event listing and typically varies by gender tier and membership status — usually in the ₹99–₹199 range for a standard game night."
  }
];

export default async function Page() {
  const cityEvents = await getEventsByCity("Pune");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.strangermingle.com/" },
      { "@type": "ListItem", position: 2, name: "Pune", item: "https://www.strangermingle.com/pune" },
      { "@type": "ListItem", position: 3, name: "Board Game Meetups", item: PAGE_URL }
    ]
  };

  // Rendered as an Event list item too, so recurring game nights can pick up Event rich results
  const eventJsonLd =
    cityEvents.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: cityEvents.slice(0, 4).map((event, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://www.strangermingle.com/events/${event.slug ?? event.id}`
          }))
        }
      : null;

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {eventJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      )}

      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-900 text-white pt-32 pb-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/strangermingle/image/upload/v1790443665/friends02_hzvksz.png"
            alt="Friends playing board games at Stranger Mingle Pune"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-left mb-8">
          <nav aria-label="Breadcrumb" className="text-sm text-indigo-200">
            <ol className="flex gap-2">
              <li><Link href="/" className="hover:underline">Home</Link> /</li>
              <li><Link href="/pune" className="hover:underline">Pune</Link> /</li>
              <li className="font-medium text-white">Board Game Meetups</li>
            </ol>
          </nav>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 drop-shadow-lg">Board Game Meetups in Pune</h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
            When people ask online how to beat loneliness in a new city, one of the most trusted,
            peer-recommended answers is always: <strong>&quot;Try going to board game meetups.&quot;</strong>
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#events"
              className="px-8 py-4 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
              Browse Games
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Board Games?</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Board games provide a natural, low-pressure focus. You don&apos;t need to be amazing at small talk —
              the game itself gives you something to discuss, laugh about, and bond over. It removes the
              awkwardness of traditional networking events.
            </p>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Pune&apos;s Thriving Tabletop Scene</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Pune has a real appetite for offline, community-led gaming — grassroots groups like Pune Chess
              Hangouts have scaled to 250+ meetups and over 1,000 members across areas like Kothrud, Baner,
              Pimpri-Chinchwad and Camp. Stranger Mingle brings that same energy to structured, verified board
              game nights.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Games You&apos;ll Play</h3>
            <ul className="space-y-4 text-gray-700">
              {GAMES_PLAYED.map((game) => (
                <li key={game.name} className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-2 font-medium">🎲 {game.name}</span>
                  <span className="text-sm text-gray-500 pl-7">{game.note}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-6 pt-4 border-t border-gray-200">
              Sessions run out of our Activity Centre in Lohegaon — exact venue and games for each date are
              listed on the event page.
            </p>
          </div>
        </div>
      </section>

      <section id="events" className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Next Board Game Sessions</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Every listing shows the venue, expected gender ratio, and host before you book.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {cityEvents.slice(0, 4).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details key={faq.q} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-indigo-600 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore more ways to connect in Pune</h2>
          <div className="flex flex-wrap justify-center gap-4 text-indigo-700 font-medium">
            <Link href="/pune/trekking-and-outdoor-groups" className="hover:underline">Trekking &amp; Outdoor Groups</Link>
            <Link href="/pune/how-to-make-friends-in-pune" className="hover:underline">How to Make Friends in Pune</Link>
            <Link href="/pune/women-only-meetups" className="hover:underline">Women-Only Meetups</Link>
            <Link href="/safety-guidelines" className="hover:underline">Our Safety Guidelines</Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </div>
  );
}
import type { Metadata } from "next";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import FacebookGroupCTA from "@/components/FacebookGroupCTA";
import Link from "next/link";

export const revalidate = 3600;

const PAGE_URL = "https://www.strangermingle.com/pune/trekking-and-outdoor-groups";

export const metadata: Metadata = {
    title: "Trekking Groups in Pune 2026 | Sinhgad, Rajgad & Weekend Hikes | Stranger Mingle",
    description:
        "Join verified trekking & outdoor groups in Pune for Sinhgad, Rajgad, Lohagad and more. Safe, women-friendly weekend hikes with real gender ratios. No solo booking needed.",
    keywords: [
        "trekking group Pune",
        "Sinhgad trek group",
        "weekend trek Pune",
        "outdoor meetup Pune",
        "hiking group Pune for women",
        "Sahyadri trek community"
    ],
    alternates: { canonical: "/pune/trekking-and-outdoor-groups" },
    openGraph: {
        title: "Trekking & Outdoor Groups in Pune | Stranger Mingle",
        description:
            "Verified weekend trekking groups around Pune's Sahyadri range — Sinhgad, Rajgad, Lohagad, Rajmachi and more. Safe, small groups, real gender ratios.",
        url: PAGE_URL,
        type: "website",
        locale: "en_IN"
    }
};

const POPULAR_TREKS = [
    { name: "Sinhgad Fort", distance: "35 km from Pune", level: "Easy" },
    { name: "Rajgad Fort", distance: "60 km from Pune", level: "Moderate" },
    { name: "Lohagad Fort", distance: "65 km from Pune", level: "Easy" },
    { name: "Torna Fort", distance: "60 km from Pune", level: "Difficult" },
    { name: "Rajmachi", distance: "90 km from Pune", level: "Moderate" },
    { name: "Kalsubai Peak", distance: "110 km from Pune", level: "Moderate" }
];

const FAQS = [
    {
        q: "Is it safe to trek with a group of strangers in Pune?",
        a: "Every Stranger Mingle trek is led by a verified, named host with a public event history. We publish gender ratio, group size, and meeting point details on every event page before you book, and maintain a zero-tolerance harassment policy across all outdoor meetups."
    },
    {
        q: "Is this suitable for women trekking alone in Pune?",
        a: "Yes. We display the expected gender ratio on each trek listing, and run women-only outdoor formats regularly. Most treks start early morning and return by afternoon, with a well-known public meeting point such as Sarasbaug or AeroMall Viman Nagar."
    },
    {
        q: "Do I need trekking experience or gear to join?",
        a: "No. Most of our Pune treks — including Sinhgad and Lohagad — are beginner-friendly. We'll list gear and fitness expectations on each specific event page."
    },
    {
        q: "How much do trekking meetups cost?",
        a: "Pricing varies by trek and includes group coordination and, where applicable, transport pooling. Exact pricing is shown on each event's page before you book."
    },
    {
        q: "Can I come alone?",
        a: "Yes — most people do. About 80% of Stranger Mingle attendees show up solo. Structured icebreakers before the trek starts mean you're not walking in silence with strangers."
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
            { "@type": "ListItem", position: 3, name: "Trekking & Outdoor Groups", item: PAGE_URL }
        ]
    };

    return (
        <div className="min-h-screen bg-green-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Breadcrumb (visible, helps rankings + UX) */}
            <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-4 pt-6 text-sm text-green-800/70">
                <ol className="flex gap-2">
                    <li><Link href="/" className="hover:underline">Home</Link> /</li>
                    <li><Link href="/pune" className="hover:underline">Pune</Link> /</li>
                    <li className="font-medium text-green-900">Trekking & Outdoor Groups</li>
                </ol>
            </nav>

            <section className="pt-10 pb-20 px-4 max-w-5xl mx-auto text-center">
                <div className="inline-block px-4 py-1 bg-green-600 text-white rounded-full font-bold text-sm tracking-widest uppercase mb-6">
                    Sahyadri Community
                </div>
                <h1 className="text-5xl sm:text-7xl font-black text-green-900 mb-8">
                    Trekking &amp; Outdoor Groups in Pune
                </h1>
                <p className="text-xl text-green-800/80 mb-6 max-w-3xl mx-auto">
                    Pune sits at the doorstep of the Sahyadri range, making forts like Sinhgad, Rajgad and Lohagad a weekend
                    ritual for the city. But a hesitation we see repeated across local forums is:{" "}
                    <em>&quot;I want to go trekking, but I don&apos;t want to go alone.&quot;</em>
                </p>
                <p className="text-lg text-green-800/70 max-w-3xl mx-auto">
                    Stranger Mingle runs verified, small-group treks around Pune with a published gender ratio, a named host,
                    and a public meeting point — so you can decide it&apos;s safe before you book, not after you arrive.
                </p>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Finding Your Trail Companions</h2>
                        <p className="text-gray-600 text-lg mb-6">
                            Solo-explorer apps try to pair you one-on-one with a stranger for a hike. Stranger Mingle instead
                            brings together verified, like-minded young professionals in small, hosted groups — a safer and more
                            social way to explore the hills around Pune.
                        </p>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Safe, Inclusive Outdoors</h2>
                        <p className="text-gray-600 text-lg">
                            Whether it&apos;s a casual weekend walk around Baner-Pashan Link Road or working up to a Sinhgad or
                            Rajgad trek, our outdoor meetups are the low-pressure way to find your regular trekking crew. Come
                            alone, leave with people you&apos;ll trek with again.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://res.cloudinary.com/strangermingle/image/upload/v1790448456/1_nayhcn.png"
                            alt="Stranger Mingle group trekking at Sinhgad Fort near Pune"
                            className="h-48 w-full object-cover rounded-3xl"
                            loading="lazy"
                        />
                        <img
                            src="https://res.cloudinary.com/strangermingle/image/upload/v1790448459/2_t9kipc.png"
                            alt="Icebreaker activity before a Pune outdoor meetup"
                            className="h-48 w-full object-cover rounded-3xl mt-8"
                            loading="lazy"
                        />
                        <img
                            src="https://res.cloudinary.com/strangermingle/image/upload/v1790448465/3_goszrd.png"
                            alt="Weekend hikers on the trail to Lohagad Fort"
                            className="h-48 w-full object-cover rounded-3xl"
                            loading="lazy"
                        />
                        <img
                            src="https://res.cloudinary.com/strangermingle/image/upload/v1790448492/4_ygyqdu.png"
                            alt="Sunrise view during a Stranger Mingle Sahyadri trek"
                            className="h-48 w-full object-cover rounded-3xl mt-8"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Popular treks table — targets long-tail "trek near Pune" searches */}
            <section className="py-16 bg-green-50">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4 text-green-900">
                        Popular Treks Near Pune Our Community Covers
                    </h2>
                    <p className="text-center text-green-800/70 mb-10 max-w-2xl mx-auto">
                        From easy half-day forts to full-day climbs, here&apos;s what group treks around Pune typically look like.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="px-6 py-3">Trek</th>
                                    <th className="px-6 py-3">Distance from Pune</th>
                                    <th className="px-6 py-3">Difficulty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {POPULAR_TREKS.map((trek) => (
                                    <tr key={trek.name} className="border-t border-green-100">
                                        <td className="px-6 py-3 font-medium text-gray-900">{trek.name}</td>
                                        <td className="px-6 py-3 text-gray-600">{trek.distance}</td>
                                        <td className="px-6 py-3 text-gray-600">{trek.level}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-green-800/60 mt-4 text-center">
                        Exact upcoming treks and meeting points are listed in the events below — availability changes weekly.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4 text-green-900">
                        Upcoming Meetups to Find Trek Buddies
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Every listing shows the meeting point, expected gender ratio, and host — so you know exactly what
                        you&apos;re signing up for.
                    </p>
                    <div className="grid md:grid-cols-4 gap-6">
                        {cityEvents.slice(0, 4).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ — visible + schema, targets "is it safe" / "can women trek alone" queries */}
            <section className="py-20 bg-green-50">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 text-green-900">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {FAQS.map((faq) => (
                            <details key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm group">
                                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                                    {faq.q}
                                    <span className="text-green-600 group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <p className="text-gray-600 mt-3">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Internal links — spreads authority + keeps users on-site */}
            <section className="py-12 bg-white border-t border-green-100">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore more ways to connect in Pune</h2>
                    <div className="flex flex-wrap justify-center gap-4 text-green-700 font-medium">
                        <Link href="/pune/board-game-meetups" className="hover:underline">Board Game Meetups</Link>
                        <Link href="/pune/how-to-make-friends-in-pune" className="hover:underline">How to Make Friends in Pune</Link>
                        <Link href="/pune/women-only-meetups" className="hover:underline">Women-Only Meetups</Link>
                        <Link href="/safety-guidelines" className="hover:underline">Our Safety Guidelines</Link>
                    </div>
                </div>
            </section>

            <FacebookGroupCTA />
        </div>
    );
}
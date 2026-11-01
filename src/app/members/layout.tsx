import type { Metadata } from "next";
import { GlobalCallProvider } from "@/components/providers/GlobalCallProvider";

export const metadata: Metadata = {
  title: "Anonymous Chat India | Safe 1-on-1 Stranger Chat & Meetups | Stranger Mingle",
  description: "Looking for safe anonymous chat in India? Connect 1-on-1 with verified strangers for private messaging, audio calls, and city meetups. 100% anonymous, zero fake profiles, no phone number required.",
  keywords: [
    // Short-tail queries
    "anonymous chat",
    "anonymous chat india",
    "talk to strangers",
    "stranger chat",
    "random chat india",
    "chat with strangers",
    "safe stranger chat",
    "online stranger chat",
    "private chat online",
    "stranger talk",
    // Mid-tail queries
    "safe anonymous chat platform in india",
    "talk to strangers online india",
    "anonymous chat without phone number",
    "stranger chat without fake profiles",
    "anonymous chat website india",
    "anonymous messaging india",
    "anonymous audio call and chat",
    "clean stranger chat alternative",
    "anonymous venting platform india",
    // Long-tail & Conversational Search Queries (AEO / GEO)
    "how to talk to strangers anonymously in india safely",
    "talk to strangers online without revealing identity",
    "safe anonymous chat for women in india",
    "anonymous chat for working professionals",
    "make friends through anonymous chat in bangalore mumbai pune hyderabad",
    "platonic stranger chat platform india",
    "member portal login stranger mingle",
    // Community & city queries
    "city activity circles",
    "weekend meetups india",
    "community groups",
    "phone a friend call india"
  ],
  alternates: {
    canonical: "/members",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Anonymous Chat India | Safe 1-on-1 Stranger Chat & Meetups | Stranger Mingle",
    description: "Looking for safe anonymous chat in India? Connect 1-on-1 with verified strangers for private messaging, audio calls, and city meetups. 100% anonymous, zero fake profiles, no phone number required.",
    url: "/members",
    siteName: 'Stranger Mingle',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/og-images/og-image-default.webp',
        width: 1200,
        height: 630,
        alt: 'Stranger Mingle - Safe Anonymous Chat & Verified Member Community in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anonymous Chat India | Safe 1-on-1 Stranger Chat | Stranger Mingle",
    description: "Connect 1-on-1 with verified strangers across India for private text chat, audio calls, and weekend meetups. 100% confidential, zero fake profiles.",
    images: ['/images/og-images/og-image-default.webp'],
  },
};

const anonymousChatSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://www.strangermingle.com/members#webapp",
      "name": "Stranger Mingle - Anonymous Chat & Verified Member Community",
      "url": "https://www.strangermingle.com/members",
      "applicationCategory": "SocialNetworkingApplication",
      "operatingSystem": "Web, iOS, Android",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "description": "India's premier safe anonymous chat platform. Connect 1-on-1 with verified strangers for confidential messaging, private audio calls, online games, and local city activity circles without exposing your phone number or identity.",
      "featureList": [
        "1-on-1 Anonymous Text Chat",
        "Phone a Friend 1-on-1 Confidential Audio Calls",
        "100% Verified Profiles with Zero Fake Accounts",
        "Zero Phone Number or Social Media Exposure",
        "Zero Harassment Policy with Strict Active Moderation",
        "City Activity Groups in Bangalore, Pune, Mumbai, Hyderabad, Delhi NCR",
        "Online Live Games with Strangers"
      ],
      "offers": [
        {
          "@type": "Offer",
          "name": "Monthly Membership",
          "price": "499",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://www.strangermingle.com/members?mode=apply"
        },
        {
          "@type": "Offer",
          "name": "Yearly Membership",
          "price": "1999",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://www.strangermingle.com/members?mode=apply"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.strangermingle.com/members#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Stranger Mingle and how does its anonymous chat work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stranger Mingle is India's safe, verified anonymous chat and social connection platform. Unlike random unmoderated chat sites, every member goes through screening to eliminate bots and fake profiles. Members connect 1-on-1 using private anonymous aliases, so your mobile number, real name, and personal profiles are never revealed while chatting or taking audio calls."
          }
        },
        {
          "@type": "Question",
          "name": "Is anonymous chat on Stranger Mingle safe for women in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Safety is the central pillar of Stranger Mingle. With no phone number sharing, end-to-end alias privacy, and an enforced zero-tolerance anti-harassment policy, women can converse freely, vent, or make friends without fear of harassment, stalking, or creeps."
          }
        },
        {
          "@type": "Question",
          "name": "Can I chat with strangers online without revealing my phone number?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Both 1-on-1 anonymous text messaging and Phone-a-Friend audio calls take place directly within the secure platform. You never need to share your WhatsApp number, phone number, or social media handles to talk with strangers."
          }
        },
        {
          "@type": "Question",
          "name": "How is Stranger Mingle different from Omegle, OmeTV, or random chat rooms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unmoderated chat sites are overrun by automated bots, scammers, and explicit content. Stranger Mingle is a verified member community where every user is screened. This eliminates fake profiles and toxic behavior, ensuring real, respectful, and platonic conversations."
          }
        },
        {
          "@type": "Question",
          "name": "Why do working professionals and city transplants use anonymous chat?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Moving to a new tech hub or corporate city often leads to isolation after long office hours. Anonymous chat provides a non-judgmental, pressure-free space to unwind, discuss career stress, talk through life dilemmas, and form genuine platonic friendships without matrimonial or dating pressures."
          }
        },
        {
          "@type": "Question",
          "name": "Can online anonymous chat lead to real-world friends and meetups?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Beyond online 1-on-1 anonymous chat and voice calls, Stranger Mingle organizes verified local community circles (turf sports, board game nights, cafe meetups, treks) across Indian metros including Bangalore, Pune, Mumbai, Delhi-NCR, and Hyderabad."
          }
        },
        {
          "@type": "Question",
          "name": "How do I subscribe and start chatting anonymously on Stranger Mingle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply choose a monthly or annual membership plan, complete the quick screening, set up your private anonymous alias, and instantly enter the member portal to start 1-on-1 anonymous chats, confidential audio calls, and interactive games."
          }
        }
      ]
    }
  ]
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalCallProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(anonymousChatSchema) }}
      />
      {children}
    </GlobalCallProvider>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stranger Mingle - Anonymous Chat & Local Community Meetups",
    description: "Join the Stranger Mingle community for anonymous chat, city-based activity groups, live games with strangers, and exclusive discount coupons. Make new friends and build your profile in the premium social club.",
    keywords: [
    "anonymous chat",
    "make new friends in city",
    "stranger talk",
    "weekend party",
    "weekend events",
    "social meetups",
    "community groups",
    "activity circles"
  ],
    alternates: {
        canonical: "/members",
    },
    openGraph: {
        title: "Stranger Mingle - Anonymous Chat & Local Community Meetups",
        description: "Join the Stranger Mingle community for anonymous chat, city-based activity groups, live games with strangers, and exclusive discount coupons. Make new friends and build your profile in the premium social club.",
        url: "/members",
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

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

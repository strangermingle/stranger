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
  openGraph: {
    title: "Stranger Mingle - Anonymous Chat & Local Community Meetups",
    description: "Join India's most active community for making friends. Anonymous chat, city-based groups, live games, and profile building.",
    images: [
      {
        url: "https://res.cloudinary.com/strangermingle/image/upload/v1774261273/full-shot-friends-with-fireworks_tijjpi.jpg",
        width: 1200,
        height: 630,
        alt: "Stranger Mingle Community",
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

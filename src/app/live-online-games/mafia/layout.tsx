import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Play Mafia Online - Social Deduction Game',
    description: 'Play Mafia online with your friends. A classic social deduction game where villagers try to find the mafia before it is too late.',
    alternates: {
        canonical: '/live-online-games/mafia',
    },
    openGraph: {
        title: 'Play Mafia Online - Social Deduction Game',
        description: 'Play Mafia online with your friends. A classic social deduction game where villagers try to find the mafia before it is too late.',
        url: '/live-online-games/mafia',
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

export default function MafiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

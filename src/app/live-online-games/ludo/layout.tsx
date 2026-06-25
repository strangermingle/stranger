import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Play Ludo Online Free - Classic Ludo Game',
    description: 'Play Ludo online for free with friends and family. No download required. Instant multiplayer Ludo game. Best free online Ludo platform in India for 2-4 players.',
    alternates: {
        canonical: '/live-online-games/ludo',
    },
    openGraph: {
        title: 'Play Ludo Online Free - Classic Ludo Game',
        description: 'Play Ludo online for free with friends and family. No download required. Instant multiplayer Ludo game. Best free online Ludo platform in India for 2-4 players.',
        url: '/live-online-games/ludo',
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

export default function LudoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

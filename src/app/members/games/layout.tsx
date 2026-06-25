import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Stranger Games',
    description: 'Play exclusive interactive games with other verified Stranger Mingle members.',
    alternates: {
        canonical: '/members/games',
    },
    openGraph: {
        title: 'Stranger Games',
        description: 'Play exclusive interactive games with other verified Stranger Mingle members.',
        url: '/members/games',
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

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

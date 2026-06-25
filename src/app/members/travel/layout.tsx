import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Route Share',
    description: 'Coordinate travel and share rides with verified members in your local community.',
    alternates: {
        canonical: '/members/travel',
    },
    openGraph: {
        title: 'Route Share',
        description: 'Coordinate travel and share rides with verified members in your local community.',
        url: '/members/travel',
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

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

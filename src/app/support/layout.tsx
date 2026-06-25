import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Safety & Support',
    description: 'Report safety concerns, harassment, or misconduct directly to the Stranger Mingle team. Your comfort and safety is non-negotiable.',
    alternates: {
        canonical: '/support',
    },
    openGraph: {
        title: 'Safety & Support',
        description: 'Report safety concerns, harassment, or misconduct directly to the Stranger Mingle team. Your comfort and safety is non-negotiable.',
        url: '/support',
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

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

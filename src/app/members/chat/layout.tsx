import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Member Chat',
    description: 'Anonymous stealth chat for verified Stranger Mingle members.',
    alternates: {
        canonical: '/members/chat',
    },
    openGraph: {
        title: 'Member Chat',
        description: 'Anonymous stealth chat for verified Stranger Mingle members.',
        url: '/members/chat',
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

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

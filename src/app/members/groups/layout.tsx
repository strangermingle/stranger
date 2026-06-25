import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Local Groups',
    description: 'Discover and join local community groups matching your hobbies and interests.',
    alternates: {
        canonical: '/members/groups',
    },
    openGraph: {
        title: 'Local Groups',
        description: 'Discover and join local community groups matching your hobbies and interests.',
        url: '/members/groups',
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

export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

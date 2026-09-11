import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Manage your verified member profile and private details.',
    alternates: {
        canonical: '/members/profile',
    },
    openGraph: {
        title: 'Profile',
        description: 'Manage your verified member profile and private details.',
        url: '/members/profile',
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

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

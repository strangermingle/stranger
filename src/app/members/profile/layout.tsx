import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Identity Vault',
    description: 'Manage your verified member credentials and public anonymous alias.',
    alternates: {
        canonical: '/members/profile',
    },
    openGraph: {
        title: 'Identity Vault',
        description: 'Manage your verified member credentials and public anonymous alias.',
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

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Host Application',
    description: 'Apply to become a verified Stranger Mingle host. Facilitate safe, meaningful connections in your city.',
    alternates: {
        canonical: '/host-application',
    },
    openGraph: {
        title: 'Host Application',
        description: 'Apply to become a verified Stranger Mingle host. Facilitate safe, meaningful connections in your city.',
        url: '/host-application',
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

export default function HostApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

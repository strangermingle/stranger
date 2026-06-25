import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reset Password',
    description: 'Reset your Stranger Mingle member portal password.',
    alternates: {
        canonical: '/reset-password',
    },
    openGraph: {
        title: 'Reset Password',
        description: 'Reset your Stranger Mingle member portal password.',
        url: '/reset-password',
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

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

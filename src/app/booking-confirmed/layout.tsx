import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Booking Confirmed',
    description: 'Your booking has been successfully confirmed.',
    alternates: {
        canonical: '/booking-confirmed',
    },
    openGraph: {
        title: 'Booking Confirmed',
        description: 'Your booking has been successfully confirmed.',
        url: '/booking-confirmed',
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

export default function BookingConfirmedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Coupon Wallet',
    description: 'Exclusive rewards and discount coupons for verified Stranger Mingle members.',
    alternates: {
        canonical: '/members/coupons',
    },
    openGraph: {
        title: 'Coupon Wallet',
        description: 'Exclusive rewards and discount coupons for verified Stranger Mingle members.',
        url: '/members/coupons',
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

export default function CouponsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

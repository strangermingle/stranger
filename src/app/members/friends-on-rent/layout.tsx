import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rent a Friend in India | Hire Verified Local Companions | Stranger Mingle',
  description: 'Connect with verified companions across India for exploring cafes, movies, concerts, and meaningful platonic conversations. 100% safe, verified members only.',
  keywords: [
    'rent a friend india',
    'hire a companion india',
    'platonic companion',
    'rent a buddy',
    'companion for movies events',
    'stranger mingle friends on rent',
  ],
  alternates: {
    canonical: 'https://www.strangermingle.com/members/friends-on-rent',
  },
  openGraph: {
    title: 'Rent a Friend in India | Hire Verified Local Companions',
    description: 'Explore verified companions across India for attending events, cafes, and friendly company.',
    url: 'https://www.strangermingle.com/members/friends-on-rent',
    siteName: 'Stranger Mingle',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/og-images/og-image-default.webp',
        width: 1200,
        height: 630,
        alt: 'Rent a Friend - Stranger Mingle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent a Friend in India | Stranger Mingle',
    description: 'Hire verified companions across India for attending events, cafes, and friendly company.',
    images: ['/images/og-images/og-image-default.webp'],
  },
};

export default function FriendsOnRentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


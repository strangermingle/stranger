import type { Metadata } from 'next';
import RentFriendRegisterForm from './RentFriendRegisterForm';

export const metadata: Metadata = {
  title: 'Become a Companion | Stranger Mingle Registration',
  description: 'Become a verified companion on Stranger Mingle. Earn money by offering friendly companionship, exploring cafes, attending movies and events in your city.',
  keywords: [
    'become a companion india',
    'companion registration',
    'rent a friend companion',
    'earn money as companion',
    'stranger mingle companions',
    'freelance companion india',
  ],
  alternates: {
    canonical: 'https://www.strangermingle.com/rent-a-friend-registration',
  },
  openGraph: {
    title: 'Become a Companion | Stranger Mingle Registration',
    description: 'Become a verified companion on Stranger Mingle. Earn money by offering friendly companionship, exploring cafes, attending movies and events in your city.',
    url: 'https://www.strangermingle.com/rent-a-friend-registration',
    siteName: 'Stranger Mingle',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/og-images/og-image-default.webp',
        width: 1200,
        height: 630,
        alt: 'Become a Companion - Stranger Mingle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Become a Companion | Stranger Mingle Registration',
    description: 'Earn money as a verified platonic companion in your city. Safe, flexible, and rewarding.',
    images: ['/images/og-images/og-image-default.webp'],
  },
};

export default function RentAFriendRegistrationPage() {
  return <RentFriendRegisterForm />;
}


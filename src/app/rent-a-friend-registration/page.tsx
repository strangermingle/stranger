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
  ],
  alternates: {
    canonical: 'https://strangermingle.com/rent-a-friend-registration',
  },
};

export default function RentAFriendRegistrationPage() {
  return <RentFriendRegisterForm />;
}


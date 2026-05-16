import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking Confirmed | Stranger Mingle',
  description: 'Your booking has been successfully confirmed.',
  alternates: {
    canonical: '/booking-confirmed',
  },
};

export default function BookingConfirmedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

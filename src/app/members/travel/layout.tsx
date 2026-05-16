import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Route Share | Stranger Mingle',
  description: 'Coordinate travel and share rides with verified members in your local community.',
  alternates: {
    canonical: '/members/travel',
  },
};

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

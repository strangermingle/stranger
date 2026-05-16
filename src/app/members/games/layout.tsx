import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stranger Games | Stranger Mingle',
  description: 'Play exclusive interactive games with other verified Stranger Mingle members.',
  alternates: {
    canonical: '/members/games',
  },
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

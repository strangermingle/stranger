import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play Chess Online Free - Grandmaster Chess Game',
  description: 'Play chess online for free with friends. No download required. Instant multiplayer chess game with easy controls. Best free online chess platform in India.',
  alternates: {
    canonical: '/live-online-games/chess',
  },
};

export default function ChessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

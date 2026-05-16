import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play Mafia Online - Social Deduction Game',
  description: 'Play Mafia online with your friends. A classic social deduction game where villagers try to find the mafia before it is too late.',
  alternates: {
    canonical: '/live-online-games/mafia',
  },
};

export default function MafiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Member Chat | Stranger Mingle',
  description: 'Anonymous stealth chat for verified Stranger Mingle members.',
  alternates: {
    canonical: '/members/chat',
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

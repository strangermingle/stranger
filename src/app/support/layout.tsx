import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safety & Support | Stranger Mingle',
  description: 'Report safety concerns, harassment, or misconduct directly to the Stranger Mingle team. Your comfort and safety is non-negotiable.',
  alternates: {
    canonical: '/support',
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

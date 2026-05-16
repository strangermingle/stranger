import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Host Application | Stranger Mingle',
  description: 'Apply to become a verified Stranger Mingle host. Facilitate safe, meaningful connections in your city.',
  alternates: {
    canonical: '/host-application',
  },
};

export default function HostApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

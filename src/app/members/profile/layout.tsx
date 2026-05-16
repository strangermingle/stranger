import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Identity Vault | Stranger Mingle',
  description: 'Manage your verified member credentials and public anonymous alias.',
  alternates: {
    canonical: '/members/profile',
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

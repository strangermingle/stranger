import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password | Stranger Mingle',
  description: 'Reset your Stranger Mingle member portal password.',
  alternates: {
    canonical: '/reset-password',
  },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

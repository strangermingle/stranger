import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Local Groups | Stranger Mingle',
  description: 'Discover and join local community groups matching your hobbies and interests.',
  alternates: {
    canonical: '/members/groups',
  },
};

export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

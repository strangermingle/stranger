import type { Metadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const id = params.id;
  
  return {
    title: `Group Lounge | Stranger Mingle`,
    description: `Join the encrypted group lounge to chat and coordinate with members.`,
    alternates: {
      canonical: `/members/groups/${id}`,
    },
  };
}

export default function GroupIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

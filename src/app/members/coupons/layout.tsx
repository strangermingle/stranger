import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coupon Wallet | Stranger Mingle',
  description: 'Exclusive rewards and discount coupons for verified Stranger Mingle members.',
  alternates: {
    canonical: '/members/coupons',
  },
};

export default function CouponsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MembersLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/members?mode=login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-gray-500 font-medium">Redirecting to member login...</p>
      </div>
    </div>
  );
}

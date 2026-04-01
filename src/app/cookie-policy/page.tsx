import type { Metadata } from 'next';
import CookieConsentManager from '@/components/CookieConsentManager';

export const metadata: Metadata = {
  title: "Cookie Policy | Stranger Mingle",
  description: "Learn how Stranger Mingle uses cookies to improve your experience and how you can manage your preferences.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
            Cookie Policy
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <CookieConsentManager />
      </div >
    </div >
  );
}

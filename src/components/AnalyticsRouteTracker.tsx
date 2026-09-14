'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/metaPixel';

export default function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip the very first mount because initial page load is already fired by GTM and Meta script
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // 1. Dispatch GTM / GA4 Virtual Page View
    if (typeof window !== 'undefined') {
      const win = window as unknown as { dataLayer?: Record<string, unknown>[] };
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        event: 'virtual_pageview',
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    // 2. Dispatch Meta Pixel SPA PageView
    trackPageView();
  }, [pathname, searchParams]);

  return null;
}

export const FB_PIXEL_ID = '1290028446285070';

// Meta Pixel Standard Event Names according to Meta Events Manager specifications
export type StandardEventName =
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'Schedule'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe';

// Standard Event Parameter Types
export interface StandardEventParams {
  content_category?: string;
  content_ids?: string[] | number[];
  content_name?: string;
  content_type?: string;
  contents?: Array<{
    id: string | number;
    quantity?: number;
    item_price?: number;
    title?: string;
    category?: string;
  }>;
  currency?: string;
  num_items?: number;
  search_string?: string;
  status?: boolean | string;
  value?: number;
  order_id?: string;
  predicted_ltv?: number;
  [key: string]: unknown;
}

export interface ViewContentParams extends StandardEventParams {
  content_name?: string;
  content_category?: string;
  content_ids?: string[] | number[];
  content_type?: 'product' | 'product_group' | string;
  value?: number;
  currency?: string;
}

export interface SearchParams extends StandardEventParams {
  search_string: string;
  content_category?: string;
  content_ids?: string[] | number[];
  value?: number;
  currency?: string;
}

export interface InitiateCheckoutParams extends StandardEventParams {
  content_name?: string;
  content_category?: string;
  content_ids?: string[] | number[];
  num_items?: number;
  value?: number;
  currency?: string;
}

export interface PurchaseParams extends StandardEventParams {
  content_name?: string;
  content_type?: string;
  content_ids?: string[] | number[];
  num_items?: number;
  value: number;
  currency: string;
  order_id?: string;
}

export interface CompleteRegistrationParams extends StandardEventParams {
  content_name?: string;
  status?: boolean | string;
  value?: number;
  currency?: string;
}

export interface LeadParams extends StandardEventParams {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}

export interface ContactParams extends StandardEventParams {
  content_name?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    fbq?: {
      (action: 'track', eventName: StandardEventName, params?: StandardEventParams): void;
      (action: 'trackCustom', eventName: string, params?: Record<string, unknown>): void;
      (action: 'init', pixelId: string, userData?: Record<string, unknown>): void;
      (action: string, ...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: Window['fbq'];
  }
}

/**
 * Tracks a standard Meta Pixel event.
 */
export const trackEvent = (eventName: StandardEventName, params?: StandardEventParams) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('track', eventName, params);
    } else {
      window.fbq('track', eventName);
    }
  }
};

/**
 * Tracks a custom Meta Pixel event.
 */
export const trackCustomEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('trackCustom', eventName, params);
    } else {
      window.fbq('trackCustom', eventName);
    }
  }
};

/**
 * Convenience helper for standard PageView.
 */
export const trackPageView = () => {
  trackEvent('PageView');
};

/**
 * Convenience helper for ViewContent event.
 */
export const trackViewContent = (params: ViewContentParams) => {
  trackEvent('ViewContent', params);
};

/**
 * Convenience helper for Search event.
 */
export const trackSearch = (params: SearchParams) => {
  trackEvent('Search', params);
};

/**
 * Convenience helper for InitiateCheckout event.
 */
export const trackInitiateCheckout = (params: InitiateCheckoutParams) => {
  trackEvent('InitiateCheckout', params);
};

/**
 * Convenience helper for Purchase event.
 */
export const trackPurchase = (params: PurchaseParams) => {
  trackEvent('Purchase', params);
};

/**
 * Convenience helper for CompleteRegistration event.
 */
export const trackCompleteRegistration = (params?: CompleteRegistrationParams) => {
  trackEvent('CompleteRegistration', params);
};

/**
 * Convenience helper for Contact event (e.g. WhatsApp button clicks).
 */
export const trackContact = (params?: ContactParams) => {
  trackEvent('Contact', params);
};

/**
 * Convenience helper for Lead event.
 */
export const trackLead = (params?: LeadParams) => {
  trackEvent('Lead', params);
};

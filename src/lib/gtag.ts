declare global {
    interface Window {
        dataLayer: (Record<string, unknown> | unknown[])[];
    }
}

export const sendGAEvent = ({ action, category, label, value, ...rest }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
    [key: string]: string | number | boolean | undefined | null;
}) => {
    if (typeof window !== "undefined") {
        // Ensure dataLayer exists
        window.dataLayer = window.dataLayer || [];
        
        window.dataLayer.push({
            event: action,
            event_category: category,
            event_label: label,
            value: value,
            ...rest
        });
    }
};

export interface GA4Item {
    item_id: string;
    item_name: string;
    affiliation?: string;
    coupon?: string;
    currency?: string;
    discount?: number;
    index?: number;
    item_brand?: string;
    item_category?: string;
    item_category2?: string;
    item_category3?: string;
    item_category4?: string;
    item_category5?: string;
    item_list_id?: string;
    item_list_name?: string;
    item_variant?: string;
    location_id?: string;
    price: number;
    quantity: number;
}

export const trackEcommerceEvent = (eventName: string, ecommerceData: Record<string, unknown>) => {
    if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        // GA4 specification: clear the previous ecommerce object before pushing a new one
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
            event: eventName,
            ecommerce: ecommerceData
        });
    }
};

export const trackViewItem = ({
    item,
    currency = "INR",
    value
}: {
    item: GA4Item;
    currency?: string;
    value?: number;
}) => {
    trackEcommerceEvent('view_item', {
        currency,
        value: value ?? item.price,
        items: [item]
    });
};

export const trackAddToCart = ({
    items,
    currency = "INR",
    value
}: {
    items: GA4Item[];
    currency?: string;
    value: number;
}) => {
    trackEcommerceEvent('add_to_cart', {
        currency,
        value,
        items
    });
};

export const trackRemoveFromCart = ({
    items,
    currency = "INR",
    value
}: {
    items: GA4Item[];
    currency?: string;
    value: number;
}) => {
    trackEcommerceEvent('remove_from_cart', {
        currency,
        value,
        items
    });
};

export const trackBeginCheckout = ({
    items,
    currency = "INR",
    value
}: {
    items: GA4Item[];
    currency?: string;
    value: number;
}) => {
    trackEcommerceEvent('begin_checkout', {
        currency,
        value,
        items
    });
};

export const trackCartAbandonment = ({
    items,
    currency = "INR",
    value,
    step = 'payment_modal',
    reason
}: {
    items: GA4Item[];
    currency?: string;
    value: number;
    step?: string;
    reason: 'modal_closed' | 'payment_dismissed' | 'payment_failed' | string;
}) => {
    trackEcommerceEvent('cart_abandonment', {
        currency,
        value,
        abandon_step: step,
        abandon_reason: reason,
        items
    });
};

export const trackPurchase = ({
    transaction_id,
    value,
    currency = "INR",
    items
}: {
    transaction_id: string;
    value: number;
    currency?: string;
    items: GA4Item[];
}) => {
    trackEcommerceEvent('purchase', {
        transaction_id,
        value,
        currency,
        items
    });
};

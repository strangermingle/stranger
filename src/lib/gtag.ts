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

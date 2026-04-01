'use client';

import { useCallback } from 'react';

/**
 * Custom hook to interact with Google reCAPTCHA Enterprise.
 * It provides a function to execute reCAPTCHA and return a token for a given action.
 */
export const useRecaptcha = () => {
    const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        
        if (!siteKey) {
            console.error('[reCAPTCHA] Site key missing in environment variables.');
            return null;
        }

        // Check if grecaptcha is available on the window object
        const grecaptcha = (window as any).grecaptcha;
        if (!grecaptcha?.enterprise) {
            console.error('[reCAPTCHA] enterprise.js not loaded yet.');
            return null;
        }

        try {
            return await new Promise((resolve) => {
                grecaptcha.enterprise.ready(async () => {
                    try {
                        const token = await grecaptcha.enterprise.execute(siteKey, { action });
                        resolve(token);
                    } catch (error) {
                        console.error('[reCAPTCHA] Execution failed:', error);
                        resolve(null);
                    }
                });
            });
        } catch (error) {
            console.error('[reCAPTCHA] Internal Error:', error);
            return null;
        }
    }, []);

    return { executeRecaptcha };
};

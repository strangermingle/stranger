import Script from 'next/script';

const GTM_ID = 'GTM-PFT3C8CZ';

export default function GoogleTagManager() {
  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;

          // Set default consent mode
          const savedConsent = typeof localStorage !== 'undefined' ? localStorage.getItem('consent_preferences') : null;
          if (!savedConsent) {
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
          } else {
            try {
              const prefs = JSON.parse(savedConsent);
              gtag('consent', 'default', prefs);
            } catch (e) {
              console.error('Error parsing saved consent', e);
            }
          }

          // Standard GTM initialization
          dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          });
        `}
      </Script>
      <Script
        {...({
          id: "gtm-script",
          strategy: "afterInteractive",
          src: `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
        } as any)}
      />
      <div 
        id="gtm-noscript-container"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
              ></iframe>
            </noscript>
          `,
        }}
      />
    </>
  );
}
